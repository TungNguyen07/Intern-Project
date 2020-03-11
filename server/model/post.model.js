import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    content: String,
    create_at: Date,
    author_id: String,
    activity_id: String,
    view: Number,
    active: Boolean,
    cover_img: String
  },
  { versionKey: false }
);

const post = mongoose.model("post", postSchema);

module.exports = post;
