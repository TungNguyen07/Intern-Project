import userModel from "../model/user.model";

module.exports.signin = function(req, res) {
  if (req.body) res.json("Success");
  else res.json("Failed");
};

module.exports.getUserFollowId = async function(req, res) {
  const id = req.query.id;
  console.log(id);
  const data = await userModel.findById({ id });
  console.log("data", data);
};
