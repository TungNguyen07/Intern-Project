import mongoose from "mongoose";
import postModel from "../model/post.model";

module.exports.newPost = async function(req, res) {
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
  res.json(activePost);
};
