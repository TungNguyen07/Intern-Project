import mongoose from "mongoose";

const activitySchema = mongoose.Schema(
  {
    activity_name: String,
    description: String
  },
  { versionKey: false }
);

const activity = mongoose.model("activity", activitySchema);

module.exports = activity;
