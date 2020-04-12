import mongoose from "mongoose";
mongoose.set("useCreateIndex", true);

const postSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    content: String,
    created_at: Date,
    author_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    activity_id: { type: mongoose.Schema.Types.ObjectId, ref: "activity" },
    view: { type: Number, default: 0 },
    active: { type: Boolean, default: false },
    cover_img: { type: String, default: "" },
  },
  { versionKey: false }
);

postSchema.index({ title: "text" });

const post = mongoose.model("post", postSchema);

module.exports = post;
