import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    content: String,
    created_at: Date,
    author_id: String,
    activity_id: String,
    view: { type: Number, default: 0 },
    active: { type: Boolean, default: false },
    cover_img: { type: String, default: "" }
  },
  { versionKey: false }
);

const post = mongoose.model("post", postSchema);

module.exports = post;
