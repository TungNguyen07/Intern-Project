import express from "express";
import userApi from "../api/user.api";
import postApi from "../api/post.api";
import { checkPassword } from "../middlewares/checkCurrentPassword";
const router = express.Router();

router.post("/", userApi.getUserFollowId);

router.post("/update", userApi.updateInfo);

router.post("/update-avatar", userApi.updateAvatar);

router.get("/:id", userApi.getProfile);

router.post("/delete", userApi.deleteUser);

router.post("/check-current-password", checkPassword);

router.post("/change-password", userApi.changePassword);

router.post("/reset-password", userApi.resetPassword);

module.exports = router;
