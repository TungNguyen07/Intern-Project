import express from "express";
const router = express.Router();
import postApi from "../api/post.api";

router.post("/new-post", postApi.newPost);

module.exports = router;
