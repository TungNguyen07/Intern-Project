import mongoose, { Schema } from "mongoose";

const commentSchema = mongoose.Schema(
  {
    owner: String,
    comment: String,
    created_at: Date,
    post_id: mongoose.Schema.Types.ObjectId,
    reply: [
      {
        owner: String,
        repComment: String,
        created_at: Date,
      },
    ],
  },
  { versionKey: false }
);

const comment = mongoose.model("comment", commentSchema);

module.exports = comment;
