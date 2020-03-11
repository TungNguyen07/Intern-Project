import userModel from "../model/user.model";
import mongoose from "mongoose";
import jwt, { verify } from "jsonwebtoken";
const { SECRET_KEY } = process.env;

module.exports.signin = async function(req, res) {
  const data = (await userModel.find({ username: req.body.username }))[0];
  if (data) {
    const payload = {
      fullname: data.fullname,
      role: data.role,
      id: data._id
    };

    const user = {
      ...payload,
      gender: data.gender.toString(),
      birth_date: data.birth_date,
      email: data.email,
      phone_number: data.phone_number,
      address: data.address,
      avatar: data.avatar
    };

    const token = jwt.sign({ payload }, process.env.SECRET_KEY);

    res.json({
      user: user,
      token: token
    });
  } else {
    const user = {
      isSignedIn: false
    };
    res.json(user);
  }
};

module.exports.getUserFollowId = async function(req, res) {
  const id = mongoose.Types.ObjectId(req.body.id);

  const data = await userModel.findOne({ _id: id });
  if (data) {
    console.log(data);
    res.json(data);
  }
};

module.exports.updateInfo = function(req, res) {
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
      avatar: newInfo.avatar
    }
  };
  userModel.updateOne(condition, query, function(err, res) {
    if (err) throw err;
    console.log("Update Successfully");
  });

  res.json({ success: true });
};
