import express from "express";
const router = express.Router();
import postApi from "../api/post.api";

router.post("/new-post", postApi.newPost);

router.get("/get-pending-post", postApi.getPendingPost);

router.get("/get-active-post", postApi.getActivePost);

router.post("/approve-post", postApi.approvePost);

router.post("/deny-post", postApi.denyPost);

module.exports = router;
