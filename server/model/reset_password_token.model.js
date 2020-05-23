import mongoose, { Schema } from "mongoose";

const resetPasswordTokenSchema = mongoose.Schema(
  {
    token: String,
    time_expired: Number,
    user_id: mongoose.Schema.Types.ObjectId,
  },
  { versionKey: false }
);

const resetPasswordToken = mongoose.model(
  "reset_password_token",
  resetPasswordTokenSchema
);

module.exports = resetPasswordToken;
