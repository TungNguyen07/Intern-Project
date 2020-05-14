import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    owner: String,
    comment: String,
    created_at: Date,
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
