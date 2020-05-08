import mongoose from "mongoose";
import postModel from "../model/post.model";
import activityModel from "../model/activity.model";
const DEFAULT_COVER_IMG =
  process.env.DEFAULT_COVER_IMG ||
  "https://res.cloudinary.com/djy0l9bwl/image/upload/v1588745533/default-image_g2unmc.jpg";
import cloudinary from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "djy0l9bwl",
  api_key: "826977265699649",
  api_secret: "RLo0uDO7vMMYvTc_GPt661Xgf6I",
});

module.exports.newPost = function (req, res) {
  if (!req.body.cover_img) req.body.cover_img = DEFAULT_COVER_IMG;
  else {
    const cover_img = req.body.cover_img;
    var matches = cover_img.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let img = new Buffer.from(matches[2], "base64");
    fs.writeFileSync("public/images/cover_img.png", img);
  }

  cloudinary.v2.uploader
    .upload("public/images/cover_img.png")
    .then(async (data) => {
      req.body.cover_img = data.url;
      await postModel.create(req.body, function (err, html) {
        if (err) throw err;
        else res.json({ success: true });
      });
    });
};

module.exports.getPendingPost = async function (req, res) {
  const pendingPost = await postModel.aggregate([
    {
      $match: { active: false },
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
      },
    },
  ]);
  res.json(pendingPost);
};

module.exports.getActivePost = async function (req, res) {
  const activePost = await postModel.aggregate([
    {
      $match: { active: true },
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

module.exports.approvePost = function (req, res) {
  const id = req.body.id;
  const condition = { _id: id };
  const query = { $set: { active: true } };
  postModel.updateOne(condition, query, function (err, res) {
    if (err) throw err;
    console.log("Approved!");
  });
  res.json({ success: true });
};

module.exports.rejectPost = function (req, res) {
  const id = req.body.id;
  const condition = { _id: id };
  postModel.remove(condition, function (err, res) {
    if (err) throw err;
    console.log("Rejected!");
  });
  res.json({ success: true });
};

module.exports.getSomePost = async function (req, res) {
  const activityList = await activityModel.find(
    {},
    { activity_name: 1, _id: 1 }
  );
  const somePost = await postModel
    .find({ active: true }, { _id: 1, cover_img: 1, description: 1, title: 1 })
    .sort({ created_at: "desc" })
    .limit(4);

  res.json({ somePost, activityList });
};

module.exports.getPostFollowUser = async function (req, res) {
  const id = mongoose.Types.ObjectId(req.params.id);
  const post = await postModel.find(
    { author_id: id, active: true },
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
      { activity_id: id, active: true },
      { title: 1, cover_img: 1, description: 1 }
    )
    .limit(4)
    .sort({ created_at: 1 });

  res.json(post);
};

module.exports.getNewestPost = async function (req, res) {
  const page = parseInt(req.params.page);
  let length = await postModel.countDocuments({ active: true });
  const post = await postModel
    .find({ active: true })
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
  await postModel.deleteOne(condition, function (err, res) {
    if (err) throw err;
    console.log("Delete post successfully!");
  });
  res.json({ success: true });
};

module.exports.relativePost = async function (req, res) {
  const id = req.params.id;
  const activity = await postModel.findOne(
    { _id: id },
    { _id: 0, activity_id: 1 }
  );
  const data = await postModel
    .find(
      { active: true, activity_id: activity.activity_id, _id: { $ne: id } },
      { title: 1, description: 1, cover_img: 1 }
    )
    .sort({ created: 1 })
    .limit(2);
  res.json({ relativePost: data });
};
