import mongoose from "mongoose";
import { ADMIN } from "../enums/userRoles";
import userModel, { deleteOne } from "../model/user.model";
import { MALE } from "../enums/userGender";
const { MONGO_URL, MONGO_OPTIONS } = process.env;

const Admin = {
  fullname: "Son Tung Nguyen",
  gender: MALE,
  phone_number: "0707071869",
  birth_date: "07/07/1998",
  email: "nstung07@gmail.com",
  role: ADMIN,
  username: "admin",
  password: "123456",
  address: "Long Xuyen",
  avatar: ""
};

const insertAdminAccount = () => new userModel(Admin).save();

const url = MONGO_URL || "mongodb://localhost/cultural-and-sports-center";
const options = (MONGO_OPTIONS && JSON.parse(MONGO_OPTIONS)) || {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const connect = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(url, options, err => {
      if (err) {
        reject(err);
      }
      resolve(mongoose);
    });
  });
};

export async function up() {
  const db = await connect();
  await insertAdminAccount();
  await db.disconnect();
}

export async function down() {
  const db = await connect();
  await deleteOne({ username: Admin.username });
  await db.disconnect();
}
