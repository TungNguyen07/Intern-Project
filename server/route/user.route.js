import express from "express";
import userApi from "../api/user.api";
const router = express.Router();

router.get("", userApi.getUserFollowId);

module.exports = router;
