import express from "express";
const router = express.Router();
import multer from "multer";
import fs from "fs";
import userApi from "../api/user.api";
import indexApi from "../api/index.api";
import { checkPassword } from "../middlewares/checkPassword";
import { checkStaffId } from "../middlewares/checkStaffId";
import { checkUsername } from "../middlewares/checkUsername";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, "top-banner.jpg");
  },
});

const upload = multer({ storage: storage });

router.post("/signin", checkPassword, userApi.signin);

router.post("/check-token", indexApi.checkToken);

router.post("/add-user", checkStaffId, checkUsername, userApi.addUser);

router.get("/get-user", userApi.getAllUser);

router.get("/get-statistics-data", indexApi.getStatisticsData);

router.post(
  "/upload-banner",
  (req, res, next) => {
    if (fs.existsSync("./public/images/abc.jpg")) {
      fs.unlinkSync("./public/images/abc.jpg");
      next();
    } else next();
  },
  upload.single("banner"),
  (req, res) => {
    res.json({ success: true });
  }
);

router.get("/search/:query/:page", indexApi.search);

router.post("/send-feedback", indexApi.sendFeedback);

router.get("/info-virus", indexApi.getApiVirus);

module.exports = router;
