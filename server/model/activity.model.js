import mongoose from "mongoose";
mongoose.set("useCreateIndex", true);

const activitySchema = mongoose.Schema(
  {
    activity_name: String,
    description: String,
  },
  { versionKey: false }
);

activitySchema.index({ activity_name: "text" });

const activity = mongoose.model("activity", activitySchema);

module.exports = activity;
