import userModel from "../model/user.model";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

module.exports.signin = async function(req, res) {
  const user = await userModel.find({ username: req.body.username });
  const payload = {
    fullname: user[0].fullname,
    role: user[0].role,
    username: user[0].username,
    id: user[0]._id
  };
  const token = jwt.sign({ payload }, process.env.SECRET_KEY);
  res.json({
    user: user[0],
    token: token
  });
};

module.exports.getUserFollowId = async function(req, res) {
  const id = mongoose.Types.ObjectId(req.query.id);
  const data = await userModel.find({ _id: id });
  if (data) {
    console.log("success");
    res.json(data);
  }
};
