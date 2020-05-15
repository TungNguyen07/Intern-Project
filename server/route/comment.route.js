import express from "express";
const router = express.Router();
import commentApi from "../api/comment.api";

router.post("/post-comment", commentApi.postComment);

router.post("/post-reply", commentApi.postReply);

router.get("/get-comment-by-post-id/:id/:page", commentApi.getComment);

module.exports = router;
