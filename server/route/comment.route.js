import express from "express";
const router = express.Router();
import commentApi from "../api/comment.api";

router.post("/post-comment", commentApi.postComment);

module.exports = router;
