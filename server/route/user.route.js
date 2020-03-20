import express from "express";
import userApi from "../api/user.api";
import postApi from "../api/post.api";
const router = express.Router();

router.post("/", userApi.getUserFollowId);

router.post("/update", userApi.updateInfo);

router.get("/:id", userApi.getProfile);

router.post("/delete", userApi.deleteUser);

module.exports = router;
