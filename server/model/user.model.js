import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { MALE } from "../enums/userGender";
const DEFAULT_AVATAR = process.env.DEFAULT_AVATAR || "";
import { STAFF } from "../enums/userRoles";

const userSchema = mongoose.Schema(
  {
    staff_id: String,
    fullname: String,
    gender: { type: Number, default: MALE },
    phone_number: { type: String, default: "" },
    birth_date: { type: Date, default: new Date() },
    email: { type: String, default: "" },
    role: {
      type: Number,
      default: STAFF,
    },
    username: String,
    password: { type: String, default: "123456" },
    address: { type: String, default: "" },
    avatar: { type: String, default: DEFAULT_AVATAR },
  },
  { versionKey: false }
);

userSchema.pre("save", function (next) {
  var user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        user.updated_at = Date.now();
        return next();
      });
    });
  } else {
    if (user.username) {
      user.username = user.username.toLowerCase();
    }
    return next();
  }
});

userSchema.methods.comparePassword = function (password) {
  try {
    return bcrypt.compare(password, this.password);
  } catch (err) {
    return err;
  }
};

const user = mongoose.model("user", userSchema);

module.exports = user;
