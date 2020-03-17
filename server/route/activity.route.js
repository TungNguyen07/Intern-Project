import express from "express";
const router = express.Router();
import activityApi from "../api/activity.api";

router.get("/get-activity", activityApi.getAllActivity);

router.post("/new-activity", activityApi.newActivity);

router.post("/update-activity", activityApi.updateActivity);

router.post("/delete-activity", activityApi.deleteActivity);

module.exports = router;
