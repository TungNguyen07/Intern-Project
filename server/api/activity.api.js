import activityModel from "../model/activity.model";
import postModel from "../model/post.model";
import mongoose from "mongoose";
import { PENDING, APPROVED, REJECTED } from "../enums/postStatus";

module.exports.getAllActivity = async function (req, res) {
  const activity = await activityModel.find({});
  res.json(activity);
};

module.exports.newActivity = async function (req, res) {
  const activity = req.body;
  await activityModel.create(activity);
  res.json({ success: true });
};

module.exports.updateActivity = async function (req, res) {
  const id = req.body._id;
  const condition = { _id: id };
  const query = {
    $set: {
      activity_name: req.body.activity_name,
      description: req.body.description,
    },
  };
  await activityModel.updateOne(condition, query, function (err, res) {
    if (err) throw err;
    console.log("Update Successfully");
  });
  res.json({ success: true });
};

module.exports.deleteActivity = async function (req, res) {
  const id = req.body._id;
  const condition = { _id: id };
  await activityModel.deleteOne(condition, function (err, res) {
    if (err) throw err;
    console.log("Delete activity successfully");
  });
  await postModel.deleteMany({ activity_id: id }, function (err, res) {
    if (err) throw err;
    console.log("Delete post successfully");
  });
  res.json({ success: true });
};

module.exports.getSomePost = async function (req, res) {
  let name = req.params.activity_name;
  const activity_id = await activityModel.find(
    {
      $text: { $search: name },
    },
    { _id: 1 }
  );
  const page = parseInt(req.params.page);
  const activity_post = await postModel
    .find({ activity_id: activity_id, active: APPROVED })
    .sort({ created_at: "desc" })
    .limit(10)
    .skip((page - 1) * 10);
  const activity = name.charAt(0).toUpperCase() + name.slice(1);
  let count = await postModel.countDocuments({ activity_id: activity_id });
  count = Math.ceil(count / 10);
  res.json({
    activity: activity,
    activity_post: activity_post,
    count: count,
  });
};
