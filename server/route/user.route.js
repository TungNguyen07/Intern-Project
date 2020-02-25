import express from "express";
import userApi from "../api/../api/user.api";
const router = express.Router();

router.post("/signin", userApi.signin);

module.exports = router;
