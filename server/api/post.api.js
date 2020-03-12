import mongoose from "mongoose";
import postModel from "../model/post.model";

module.exports.newPost = async function(req, res) {
  await postModel.create(req.body, function(err, res) {
    if (err) throw err;
    console.log("Create successfully");
  });
  res.json({ success: true });
};
