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
      gender: data.gender,
      birth_date: data.birth_date,
      email: data.email,
      phone_number: data.phone_number,
      address: data.phone_number,
      isSignedIn: true
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
  console.log(req.body);
  const data = await userModel.find({ _id: id });
  if (data) {
    console.log(data[0]);
    res.json(data[0]);
  }
};

module.exports.checkToken = function(req, res) {
  const token = req.body.token;
  console.log(req.body);
  const result = jwt.verify(token, SECRET_KEY);
  console.log(result);
  res.json(result);
};
