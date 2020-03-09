import express from "express";
const router = express.Router();
import userApi from "../api/user.api";
import indexApi from "../api/index.api";
import { checkPassword } from "../middlewares/checkPassword";

router.post("/signin", checkPassword, userApi.signin);

router.post("/check-token", indexApi.checkToken);

module.exports = router;
