import activityModel from "../model/activity.model";
import postModel from "../model/post.model";

module.exports.getAllActivity = async function(req, res) {
  const activity = await activityModel.find({});
  res.json(activity);
};

module.exports.newActivity = async function(req, res) {
  const activity = req.body;
  await activityModel.create(activity);
  res.json({ success: true });
};

module.exports.updateActivity = async function(req, res) {
  const id = req.body._id;
  const condition = { _id: id };
  const query = {
    $set: {
      activity_name: req.body.activity_name,
      description: req.body.description
    }
  };
  await activityModel.updateOne(condition, query, function(err, res) {
    if (err) throw err;
    console.log("Update Successfully");
  });
  res.json({ success: true });
};

module.exports.deleteActivity = async function(req, res) {
  const id = req.body._id;
  const condition = { _id: id };
  await activityModel.deleteOne(condition, function(err, res) {
    if (err) throw err;
    console.log("Delete successfully");
  });
  res.json({ success: true });
};

module.exports.getPost = async function(req, res) {
  const activity_id = req.params.activity_id;
  const activity_post = await postModel.find({ activity_id: activity_id });
  res.json(activity_post);
};
