import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import DEFAULT_AVATAR from "../defaultAvatar";

const userSchema = mongoose.Schema(
  {
    fullname: String,
    gender: Number,
    phone_number: String,
    birth_date: Date,
    email: String,
    role: {
      type: Number,
      default: process.env.MEMBERSHIP
    },
    username: String,
    password: String,
    address: String,
    avatar: {
      type: String,
      default: DEFAULT_AVATAR
    }
  },
  { versionKey: false }
);

userSchema.pre("save", function(next) {
  var user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function(err, hash) {
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

userSchema.methods.comparePassword = function(password) {
  try {
    return bcrypt.compare(password, this.password);
  } catch (err) {
    return err;
  }
};

let user = mongoose.model("user", userSchema);

module.exports = user;
