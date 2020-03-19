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

module.exports.getSomePost = function(req, res) {
  const SomePost = postModel.find(
    {},
    { cover_img: 1, description: 1, title: 1, created_at: 1 }
  );
  res.json(SomePost);
};
