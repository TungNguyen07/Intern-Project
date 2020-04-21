import userModel from "../model/user.model";
import postModel from "../model/post.model";
import activityModel from "../model/activity.model";
import mongoose from "mongoose";
import jwt, { verify } from "jsonwebtoken";
const { SECRET_KEY } = process.env;
import nodemailer from "nodemailer";

module.exports.checkToken = async function (req, res) {
  const token = req.body.token;

  const result = jwt.decode(token, SECRET_KEY);
  if (result) {
    const id = result.payload.id;
    const data = await userModel.findOne({ _id: mongoose.Types.ObjectId(id) });
    const user = {
      id: data._id,
      staffId: data.staffId,
      fullname: data.fullname,
      gender: data.gender.toString(),
      birth_date: data.birth_date,
      email: data.email,
      phone_number: data.phone_number,
      address: data.address,
      role: data.role,
      avatar: data.avatar,
    };

    res.json(user);
  } else res.json({ error: true });
};

module.exports.getStatisticsData = async function (req, res) {
  const countUser = await userModel.countDocuments();
  const countActivity = await activityModel.countDocuments();
  const countPost = await postModel.countDocuments({ active: true });
  const countPendingPost = await postModel.countDocuments({ active: false });
  res.json({
    user: countUser,
    activity: countActivity,
    post: countPost,
    pendingPost: countPendingPost,
  });
};

module.exports.search = async function (req, res) {
  const query = req.params.query;
  const page = parseInt(req.params.page);
  const length = await postModel.countDocuments({
    title: { $regex: new RegExp(query) },
    active: true,
  });
  const data = await postModel
    .find({ $text: { $search: query }, active: true })
    .limit(10)
    .skip((page - 1) * 10);
  res.json({
    result: data,
    count: Math.ceil(length / 10),
  });
};

module.exports.sendFeedback = function (req, res) {
  const info = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nstung_17th@agu.edu.vn",
      pass: "DTH166368",
    },
  });

  const mailOptions = {
    from: "nstung_17th@agu.edu.vn",
    to: "feedback.ttvhtt.longxuyen@gmail.com",
    subject: info.title,
    text: `Hi, I'm ${info.fullname}.
    I want feedback to you about ${info.title}. ${info.content}.
    Here is my contact info:
    Name: ${info.fullname}.
    Email: ${info.email}.
    Phone: ${info.phone}.
    Address: ${info.address}.
    I look forward to hearing response from you as soon as posible.
    Best regards!`,
  };

  transporter.sendMail(mailOptions, function (error, result) {
    if (error) res.json({ error: true });
    else res.json({ success: true });
  });
};
