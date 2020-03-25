import mongoose from "mongoose";
import postModel from "../model/post.model";
import activityModel from "../model/activity.model";
import { defaultCoverImg } from "../defaultCoverImg";

module.exports.newPost = async function(req, res) {
  if (!req.body.cover_img) req.body.cover_img = defaultCoverImg;
  await postModel.create(req.body, function(err, res) {
    if (err) throw err;
    console.log("Create successfully");
  });
  res.json({ success: true });
};

module.exports.getPendingPost = async function(req, res) {
  const pendingPost = await postModel.aggregate([
    {
      $match: { active: false }
    },
    {
      $lookup: {
        from: "users",
        localField: "author_id",
        foreignField: "_id",
        as: "author"
      }
    },
    {
      $unwind: "$author"
    },
    {
      $project: {
        _id: 1,
        title: 1,
        fullname: "$author.fullname"
      }
    }
  ]);
  res.json(pendingPost);
};

module.exports.getActivePost = async function(req, res) {
  const activePost = await postModel.aggregate([
    {
      $match: { active: true }
    },
    {
      $lookup: {
        from: "users",
        localField: "author_id",
        foreignField: "_id",
        as: "author"
      }
    },
    {
      $lookup: {
        from: "activities",
        localField: "activity_id",
        foreignField: "_id",
        as: "activity"
      }
    },
    {
      $unwind: "$author",
      $unwind: "$activity"
    },
    {
      $project: {
        _id: 1,
        title: 1,
        activity: "$activity.activity_name",
        fullname: "$author.fullname"
      }
    }
  ]);
  res.json(activePost);
};

module.exports.approvePost = function(req, res) {
  const id = req.body.id;
  const condition = { _id: id };
  const query = { $set: { active: true } };
  postModel.updateOne(condition, query, function(err, res) {
    if (err) throw err;
    console.log("Approved!");
  });
  res.json({ success: true });
};

module.exports.denyPost = function(req, res) {
  const id = req.body.id;
  const condition = { _id: id };
  postModel.remove(condition, function(err, res) {
    if (err) throw err;
    console.log("Denied!");
  });
  res.json({ success: true });
};

module.exports.getSomePost = async function(req, res) {
  const activityList = await activityModel.find(
    {},
    { activity_name: 1, _id: 1 }
  );
  const somePost = await postModel
    .find({ active: true }, { _id: 1, cover_img: 1, description: 1, title: 1 })
    .limit(4)
    .sort({ created_at: 1 });

  res.json({ somePost, activityList });
};

module.exports.getPostFollowUser = async function(req, res) {
  const id = mongoose.Types.ObjectId(req.params.id);
  const post = await postModel.find(
    { author_id: id, active: true },
    { _id: 1, cover_img: 1, description: 1, title: 1 }
  );
  res.json(post);
};

module.exports.getPost = async function(req, res) {
  const id = mongoose.Types.ObjectId(req.params.id);
  // const post = await postModel.findOne({ _id: id });
  const post = await postModel.aggregate([
    {
      $match: { _id: id }
    },
    {
      $lookup: {
        from: "users",
        localField: "author_id",
        foreignField: "_id",
        as: "author"
      }
    },
    {
      $unwind: "$author"
    },
    {
      $project: {
        _id: 1,
        view: 1,
        title: 1,
        description: 1,
        content: 1,
        created_at: 1,
        fullname: "$author.fullname"
      }
    }
  ]);
  res.json(post[0]);
};

module.exports.getPostByActivity = async function(req, res) {
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

module.exports.getNewestPost = async function(req, res) {
  const page = parseInt(req.params.page);
  let length = await postModel.countDocuments({ active: true });
  const post = await postModel
    .find({ active: true })
    .sort({ created: 1 })
    .limit(10)
    .skip((page - 1) * 10);
  length = Math.ceil(length / 10);
  res.json({
    post,
    length
  });
};
