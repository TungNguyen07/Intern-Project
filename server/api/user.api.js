import userModel from "../model/user.model";
import mongoose from "mongoose";
import jwt, { verify } from "jsonwebtoken";
const SECRET_KEY = process.env.SECRET_KEY || "wNnwkOXE7HWShgBN";
import cloudinary from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "djy0l9bwl",
  api_key: "826977265699649",
  api_secret: "RLo0uDO7vMMYvTc_GPt661Xgf6I",
});

module.exports.signin = async function (req, res) {
  const data = (await userModel.find({ username: req.body.username }))[0];
  if (data) {
    const payload = {
      fullname: data.fullname,
      role: data.role,
      staffId: data.staffId,
      id: data._id,
    };

    const user = {
      ...payload,
      gender: data.gender.toString(),
      birth_date: data.birth_date,
      email: data.email,
      phone_number: data.phone_number,
      address: data.address,
      avatar: data.avatar,
    };

    const token = jwt.sign({ payload }, SECRET_KEY);

    res.json({
      user: user,
      token: token,
    });
  } else {
    const user = {
      isSignedIn: false,
    };
    res.json(user);
  }
};

module.exports.getUserFollowId = async function (req, res) {
  const id = mongoose.Types.ObjectId(req.body.id);

  const data = await userModel.findOne({ _id: id });
  if (data) {
    console.log(data);
    res.json(data);
  }
};

module.exports.updateInfo = function (req, res) {
  const newInfo = req.body;
  const condition = { _id: mongoose.Types.ObjectId(newInfo.id) };
  const query = {
    $set: {
      fullname: newInfo.fullname,
      gender: parseInt(newInfo.gender),
      birth_date: newInfo.birth_date,
      email: newInfo.email,
      phone_number: newInfo.phone_number,
      address: newInfo.address,
      avatar: newInfo.avatar,
    },
  };
  userModel.updateOne(condition, query, function (err, html) {
    if (err) throw err;
    res.json({ success: true });
  });
};

module.exports.updateAvatar = async function (req, res) {
  const id = { _id: mongoose.Types.ObjectId(req.body.id) };
  const imgData = req.body.avatar;
  var matches = imgData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  let img = new Buffer.from(matches[2], "base64");
  fs.writeFileSync(`public/images/${id}.png`, img);

  const oldAvatar = await userModel.findOne({ _id: id }, { avatar: 1, _id: 0 });

  cloudinary.v2.uploader
    .upload(`public/images/${id}.png`)
    .then(async (data) => {
      await userModel.updateOne(
        { _id: id },
        { $set: { avatar: data.url } },
        (err, html) => {
          if (err) throw err;
          res.json({ success: true, avatar: data.url });
        }
      );
    });
  fs.unlinkSync(`public/images/${id}.png`);

  const public_id = oldAvatar.avatar.split("/").pop().split(".")[0];
  cloudinary.v2.uploader.destroy(public_id);
};

module.exports.addUser = async function (req, res) {
  const user = req.body;
  await userModel.create(user);
  res.json({ success: true });
};

module.exports.getAllUser = async function (req, res) {
  const allUser = await userModel.find(
    {},
    {
      staffId: 1,
      fullname: 1,
      username: 1,
    }
  );
  res.json(allUser);
};

module.exports.getProfile = async function (req, res) {
  const staffId = req.params.id;
  const profile = await userModel.findOne(
    { staffId: staffId },
    { _id: 0, username: 0, password: 0 }
  );
  if (profile) res.json(profile);
  else res.json({ error: true });
};

module.exports.deleteUser = async function (req, res) {
  const id = req.body.staffId;
  const condition = { staffId: id };
  await userModel.deleteOne(condition, function (err, res) {
    if (err) throw err;
    console.log("Delete user sucessfully!");
  });
  res.json({ success: true });
};

module.exports.checkCurrentPassword = function (req, res) {
  res.json({ success: true });
};

module.exports.changePassword = function (req, res) {
  const id = req.body.id;
  const newPassword = req.body.newPassword;
  userModel.findById(id, function (err, doc) {
    if (err) throw err;
    doc.password = newPassword;
    doc.save();
  });
  res.json({ success: true });
};

module.exports.resetPassword = async function (req, res) {
  const staffId = req.body.staffId;
  userModel.findOne({ staffId: staffId }, (err, doc) => {
    if (err) throw err;
    doc.password = "123456";
    doc.save();
  });
  res.json({ success: true });
};
