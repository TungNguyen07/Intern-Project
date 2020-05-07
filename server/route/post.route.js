import express from "express";
const router = express.Router();
import postApi from "../api/post.api";

router.post("/new-post", postApi.newPost);

router.get("/get-pending-post", postApi.getPendingPost);

router.get("/get-active-post", postApi.getActivePost);

router.post("/approve-post", postApi.approvePost);

router.post("/reject-post", postApi.rejectPost);

router.get("/get-some-post/", postApi.getSomePost);

router.get("/get-post-by-user/:id", postApi.getPostFollowUser);

router.get("/get-post/:id", postApi.getPost);

router.get("/get-post-by-activity/:id", postApi.getPostByActivity);

router.get("/get-newest-post/:page", postApi.getNewestPost);

router.post("/delete-post/:id", postApi.deletePost);

router.get("/get-relative-post/:id", postApi.relativePost);

module.exports = router;
