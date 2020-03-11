import userModel from "../model/user.model";
import mongoose from "mongoose";
import jwt, { verify } from "jsonwebtoken";
const { SECRET_KEY } = process.env;

module.exports.checkToken = async function(req, res) {
  const token = req.body.token;

  const result = jwt.decode(token, SECRET_KEY);
  if (result) {
    const id = result.payload.id;
    const data = await userModel.findOne({ _id: mongoose.Types.ObjectId(id) });
    const user = {
      id: data._id,
      fullname: data.fullname,
      gender: data.gender.toString(),
      birth_date: data.birth_date,
      email: data.email,
      phone_number: data.phone_number,
      address: data.address,
      role: data.role,
      avatar: data.avatar
    };

    res.json(user);
  } else res.json({ error: true });
};
