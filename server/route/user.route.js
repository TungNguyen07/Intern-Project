import express from "express";
import userApi from "../api/../api/user.api";
const router = express.Router();

router.post("/signin", userApi.signin);

router.get("", userApi.getUserFollowId);

module.exports = router;
