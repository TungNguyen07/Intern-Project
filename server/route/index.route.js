import express from "express";
const router = express.Router();
import userApi from "../api/user.api";
import { checkPassword } from "../middlewares/checkPassword";

router.post("/signin", checkPassword, userApi.signin);

router.post("/check-token", userApi.checkToken);

module.exports = router;
