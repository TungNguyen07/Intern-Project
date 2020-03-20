import express from "express";
const router = express.Router();
import userApi from "../api/user.api";
import indexApi from "../api/index.api";
import { checkPassword } from "../middlewares/checkPassword";
import { checkStaffId } from "../middlewares/checkStaffId";
import { checkUsername } from "../middlewares/checkUsername";

router.post("/signin", checkPassword, userApi.signin);

router.post("/check-token", indexApi.checkToken);

router.post("/add-user", checkStaffId, checkUsername, userApi.addUser);

router.get("/get-user", userApi.getAllUser);

router.get("/get-statistics-data", indexApi.getStatisticsData);

module.exports = router;
