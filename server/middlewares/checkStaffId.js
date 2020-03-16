import userModel from "../model/user.model";

export const checkStaffId = async (req, res, next) => {
  const staffId = req.body.staffId;
  const user = await userModel.findOne({ staffId: staffId });
  if (user) res.json({ error: true });
  else next();
};
