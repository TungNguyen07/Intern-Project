import mongoose from "mongoose";
import postModel from "../model/post.model";
import activityModel from "../model/activity.model";
const DEFAULT_COVER_IMG =
  process.env.DEFAULT_COVER_IMG ||
  "https://res.cloudinary.com/djy0l9bwl/image/upload/v1588745533/default-image_g2unmc.jpg";
import cloudinary from "cloudinary";
import nodemailer from "nodemailer";
const CLOUD_NAME = process.env.CLOUD_NAME || "djy0l9bwl";
const API_KEY = process.env.API_KEY || "826977265699649";
const API_SECRET = process.env.API_SECRET || "RLo0uDO7vMMYvTc_GPt661Xgf6I";
import userModel from "../model/user.model";
import { REJECTED, APPROVED, PENDING } from "../enums/postStatus";

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nstung_17th@agu.edu.vn",
    pass: "DTH166368",
  },
});

module.exports.newPost = async function (req, res) {
  let cover_img = "";
  if (!req.body.cover_img) cover_img = DEFAULT_COVER_IMG;
  else {
    await cloudinary.v2.uploader.upload(req.body.cover_img).then((data) => {
      cover_img = data.url;
    });
  }
  let content = req.body.content;
  const imgArr = content.match(/<img.*?src="(.*?)"/gm);
  let arrSrc = [];
  if (imgArr)
    arrSrc = imgArr.map((element) => {
      return element.match(/<img.*?src="(.*?)"/)[1];
    });
  if (arrSrc.length) {
    for (let index = 0; index < arrSrc.length; index++) {
      await cloudinary.v2.uploader.upload(arrSrc[index]).then((data) => {
        content = content.replace(/src="([^"]+)"/, `src='${data.url}'`);
      });
    }
  }

  await postModel.create(
    { ...req.body, cover_img: cover_img, content: content },
    (err, html) => {
      if (err) throw err;
      res.json({
        success: true,
      });
    }
  );

  const admin_email = await userModel.findOne(
    { _id: mongoose.Types.ObjectId(req.body.author_id), staff_id: "admin" },
    { email: 1, _id: 0 }
  );

  const mailOptions = {
    from: "nstung_17th@agu.edu.vn",
    to: admin_email,
    subject: "New pending post",
    html: `<p>You have a new pending post in the Long Xuyen City Cultural and Sports Center!</p>`,
  };

  transporter.sendMail(mailOptions);
};

module.exports.getPendingPost = async function (req, res) {
  const pendingPost = await postModel.aggregate([
    {
      $match: { active: PENDING },
    },
    {
      $lookup: {
        from: "users",
        localField: "author_id",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $unwind: "$author",
    },
    {
      $project: {
        _id: 1,
        title: 1,
        fullname: "$author.fullname",
        author_id: "$author._id",
      },
    },
  ]);
  res.json(pendingPost);
};

module.exports.getActivePost = async function (req, res) {
  const activePost = await postModel.aggregate([
    {
      $match: { active: APPROVED },
    },
    {
      $lookup: {
        from: "users",
        localField: "author_id",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $lookup: {
        from: "activities",
        localField: "activity_id",
        foreignField: "_id",
        as: "activity",
      },
    },
    {
      $unwind: "$author",
      $unwind: "$activity",
    },
    {
      $sort: { created_at: -1 },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        activity: "$activity.activity_name",
        fullname: "$author.fullname",
      },
    },
  ]);
  res.json(activePost);
};

module.exports.approvePost = async function (req, res) {
  const post_id = req.body.id;
  const author_id = req.body.author_id;
  const condition = { _id: post_id };
  const query = { $set: { active: APPROVED } };

  const author_email = await userModel.findOne(
    { _id: author_id },
    { _id: 0, email: 1 }
  );

  const mailOptions = {
    from: "nstung_17th@agu.edu.vn",
    to: author_email,
    subject: "Approved your post",
    html: `<p>Your post has been approved!</p>`,
  };

  await postModel.updateOne(condition, query, function (err, html) {
    if (err) throw err;
    else {
      res.json({ success: true });
      transporter.sendMail(mailOptions);
    }
  });
};

module.exports.rejectPost = async function (req, res) {
  const post_id = req.body.id;
  const author_id = req.body.author_id;
  const condition = { _id: post_id };
  const query = { $set: { active: REJECTED } };

  const author_email = await userModel.findOne(
    { _id: author_id },
    { _id: 0, email: 1 }
  );

  const mailOptions = {
    from: "nstung_17th@agu.edu.vn",
    to: author_email,
    subject: "Rejected your post",
    html: `<p>Your post has been rejected! Let's edit it and submit again!</p>`,
  };

  postModel.updateOne(condition, query, function (err, html) {
    if (err) throw err;
    else {
      res.json({ success: true });
      transporter.sendMail(mailOptions);
    }
  });
};

module.exports.getSomePost = async function (req, res) {
  const activityList = await activityModel.find(
    {},
    { activity_name: 1, _id: 1 }
  );
  const somePost = await postModel
    .find(
      { active: APPROVED },
      { _id: 1, cover_img: 1, description: 1, title: 1 }
    )
    .sort({ created_at: "desc" })
    .limit(4);

  res.json({ somePost, activityList });
};

module.exports.getPostFollowUser = async function (req, res) {
  const id = mongoose.Types.ObjectId(req.params.id);
  const post = await postModel.find(
    { author_id: id, active: APPROVED },
    { _id: 1, cover_img: 1, description: 1, title: 1 }
  );
  res.json(post);
};

module.exports.getPost = async function (req, res) {
  if (req.params.id) {
    const id = mongoose.Types.ObjectId(req.params.id);
    await postModel.updateOne({ _id: id }, { $inc: { view: 1 } });
    const post = await postModel.aggregate([
      {
        $match: { _id: id },
      },
      {
        $lookup: {
          from: "users",
          localField: "author_id",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: "$author",
      },
      {
        $project: {
          _id: 1,
          view: 1,
          title: 1,
          description: 1,
          content: 1,
          created_at: 1,
          fullname: "$author.fullname",
        },
      },
    ]);
    res.json(post[0]);
  }
};

module.exports.getPostByActivity = async function (req, res) {
  const id = req.params.id;
  const post = await postModel
    .find(
      { activity_id: id, active: APPROVED },
      { title: 1, cover_img: 1, description: 1 }
    )
    .limit(4)
    .sort({ created_at: 1 });

  res.json(post);
};

module.exports.getNewestPost = async function (req, res) {
  const page = parseInt(req.params.page);
  let length = await postModel.countDocuments({ active: APPROVED });
  const post = await postModel
    .find({ active: APPROVED })
    .limit(10)
    .sort({ created_at: "desc" })
    .skip((page - 1) * 10);
  length = Math.ceil(length / 10);
  res.json({
    post,
    length,
  });
};

module.exports.deletePost = async function (req, res) {
  const id = req.params.id;
  const condition = { _id: id };
  await postModel.deleteOne(condition, function (err, html) {
    if (err) throw err;
    res.json({ success: true });
  });
};

module.exports.relativePost = async function (req, res) {
  const id = mongoose.Types.ObjectId(req.params.id);
  const activity = await postModel.findOne(
    { _id: id },
    { _id: 0, activity_id: 1 }
  );
  const data = await postModel
    .find(
      { active: APPROVED, activity_id: activity.activity_id, _id: { $ne: id } },
      { title: 1, description: 1, cover_img: 1 }
    )
    .sort({ created: 1 })
    .limit(2);
  res.json({ relativePost: data });
};
