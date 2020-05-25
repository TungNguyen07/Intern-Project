import userModel from "../model/user.model";
import mongoose from "mongoose";
import jwt, { verify } from "jsonwebtoken";
const SECRET_KEY = process.env.SECRET_KEY || "wNnwkOXE7HWShgBN";
import cloudinary from "cloudinary";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import resetPasswordModel from "../model/reset_password_token.model";

const CLOUD_NAME = process.env.CLOUD_NAME || "djy0l9bwl";
const API_KEY = process.env.API_KEY || "826977265699649";
const API_SECRET = process.env.API_SECRET || "RLo0uDO7vMMYvTc_GPt661Xgf6I";
const USERNAME_EMAIL = process.env.USERNAME_EMAIL || "nstung_17th@agu.edu.vn";
const PASSWORD_EMAIL = process.env.PASSWORD_EMAIL || "DTH166368";

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: USERNAME_EMAIL,
    pass: PASSWORD_EMAIL,
  },
});

module.exports.signin = async function (req, res) {
  const data = (await userModel.find({ username: req.body.username }))[0];
  if (data) {
    const payload = {
      fullname: data.fullname,
      role: data.role,
      staff_id: data.staff_id,
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

  const oldAvatar = await userModel.findOne({ _id: id }, { avatar: 1, _id: 0 });

  cloudinary.v2.uploader.upload(imgData).then(async (data) => {
    await userModel.updateOne(
      { _id: id },
      { $set: { avatar: data.url } },
      (err, html) => {
        if (err) throw err;
        res.json({ success: true, avatar: data.url });
      }
    );
  });
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
      staff_id: 1,
      fullname: 1,
      username: 1,
    }
  );
  res.json(allUser);
};

module.exports.getProfile = async function (req, res) {
  const staff_id = req.params.id;
  const profile = await userModel.findOne(
    { staff_id: staff_id },
    { _id: 0, username: 0, password: 0 }
  );
  if (profile) res.json(profile);
  else res.json({ error: true });
};

module.exports.deleteUser = async function (req, res) {
  const id = req.body.staff_id;
  const condition = { staff_id: id };
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
  const staff_id = req.body.staff_id;
  userModel.findOne({ staff_id: staff_id }, (err, doc) => {
    if (err) throw err;
    doc.password = "123456";
    doc.save();
  });
  res.json({ success: true });
};

module.exports.checkUsername = async function (req, res) {
  const username = req.body.username;
  const user = await userModel.findOne({ username: username });

  if (user) res.json({ success: true, email: user.email });
  else res.json({ error: true });
};

module.exports.getResetPasswordToken = async function (req, res) {
  const token = uuidv4();
  const hostname = req.body.hostname;
  const username = req.body.username;

  const user = await userModel.findOne(
    { username: username },
    { _id: 1, email: 1, fullname: 1 }
  );

  await resetPasswordModel.findOneAndDelete({ user_id: user._id });

  const reset_password_token = {
    token: token,
    time_expired: new Date().getTime() + 600000,
    user_id: user._id,
  };

  await resetPasswordModel.create(reset_password_token);

  const mailOptions = {
    from: USERNAME_EMAIL || "nstung_17th@agu.edu.vn",
    to: user.email,
    subject: "Reset password",
    html: `
    <div style="width: 100%; font-family: sans-serif;">
      <div style="width: 60%; margin: auto;">
        <div style="height: 3rem;  background-color: #4fd2ef">
        <h2 style=" width: fit-content; margin: auto; padding-top: 0.5rem; font-size: 1.7rem">Long Xuyen City Cultural and Sports Center</h2>
        </div>
        <div style="padding-left: 1rem">
          <h2 style="font-size: 1.4rem">Reset Password</h2>
          <div style="font-size: medium;">
            <p>Hi ${user.fullname},</p>
            <p>We received a request to reset your password for your Long Xuyen City Cultural and Sports Center. We are here to help!</p>
            <p>Simply click the button below to set a new password</p>
            <div style="text-align: center;">
              <a href="${hostname}/reset-password?token=${token}">
              <button style="height: 2rem;border-radius: 4px;border: none;color: white;
              background-color: #028ef1;width: 35%;font-size: 1rem;cursor: pointer;">Reset your password</button></a>
            </div>
            <p>If you don't ask to change your password, don't worry! Your password is still safe and you can delete this email.</p>
          </div>
        </div>
      </div>
	  </div>`,
    // html: `
    // <h4>Hi ${user.fullname},</h4>
    // <p>We received a request to reset your password for your Long Xuyen City Cultural and Sports Center. We are here to help!</p>
    // <br/>
    // <p>Simply click <a href='${hostname}/reset-password?token=${token}'>here </a>to set a new password</p>
    // <p>If you don't ask to change your password, don't worry! Your password is still safe and you can delete this email.</p>`,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) res.json({ erro: err });
    res.json({ success: true });
  });
};

module.exports.checkResetPasswordToken = async function (req, res) {
  const token = req.body.token;
  const user_token = await resetPasswordModel.findOne({ token: token });
  if (user_token) {
    if (user_token.time_expired >= new Date().getTime())
      res.json({ success: true, user_id: user_token.user_id });
    else {
      res.json({ error: true });
      await resetPasswordModel.findOneAndDelete({ token: token });
    }
  } else res.json({ error: true });
};

module.exports.resetPasswordByEmail = async function (req, res) {
  const password_info = req.body;
  if (password_info.new_password == password_info.confirm_password) {
    await userModel.findOne(
      { _id: password_info.user_id },
      async (err, doc) => {
        if (err) res.json({ error: true });
        else {
          doc.password = password_info.new_password;
          doc.save();
          res.json({ success: true });
          await resetPasswordModel.findOneAndDelete({
            user_id: password_info.user_id,
          });
        }
      }
    );
  }
};
