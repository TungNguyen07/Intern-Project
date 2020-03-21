import userModel from "../model/user.model";
import mongoose from "mongoose";

export const checkPassword = async (req, res, next) => {
  const id = req.body.id;
  const currentPassword = req.body.currentPassword;

  const user = await userModel.findOne({ _id: id });

  const checkResult = await user.comparePassword(currentPassword);

  res.json({ result: checkResult });
};
