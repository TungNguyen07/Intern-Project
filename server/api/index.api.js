import userModel from "../model/user.model";
import postModel from "../model/post.model";
import activityModel from "../model/activity.model";
import mongoose from "mongoose";
import jwt, { verify } from "jsonwebtoken";
const SECRET_KEY = process.env.SECRET_KEY || "wNnwkOXE7HWShgBN";
import nodemailer from "nodemailer";
import axios from "axios";
import { APPROVED, PENDING } from "../enums/postStatus";
const USERNAME_EMAIL = process.env.USERNAME_EMAIL || "nstung_17th@agu.edu.vn";
const PASSWORD_EMAIL = process.env.PASSWORD_EMAIL || "DTH166368";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: USERNAME_EMAIL,
    pass: PASSWORD_EMAIL,
  },
});

module.exports.checkToken = async function (req, res) {
  const token = req.body.token;

  const result = jwt.decode(token, SECRET_KEY);
  if (result) {
    const id = result.payload.id;
    const data = await userModel.findOne({ _id: mongoose.Types.ObjectId(id) });
    const user = {
      id: data._id,
      staff_id: data.staff_id,
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
  const countPost = await postModel.countDocuments({ active: APPROVED });
  const countPendingPost = await postModel.countDocuments({ active: PENDING });
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
    active: APPROVED,
  });
  const data = await postModel
    .find({ $text: { $search: query }, active: APPROVED })
    .limit(10)
    .skip((page - 1) * 10);
  res.json({
    result: data,
    count: Math.ceil(length / 10),
  });
};

module.exports.sendFeedback = function (req, res) {
  const info = req.body;

  const mailOptions = {
    from: USERNAME_EMAIL,
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
    console.log(result);
  });
};

module.exports.getApiVirus = async function (req, res) {
  let data;
  await getData().then((res) => {
    data = res.data.data;
  });
  const global = data.global;
  const vietnam = data.vietnam;
  res.json({
    global,
    vietnam,
  });
};

function getData() {
  return new Promise((resolve, reject) => {
    axios({
      url: "https://code.junookyo.xyz/api/ncov-moh/data.json",
      method: "get",
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
}
