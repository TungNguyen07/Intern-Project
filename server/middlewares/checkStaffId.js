import userModel from "../model/user.model";

export const checkStaffId = async (req, res, next) => {
  const staff_id = req.body.staff_id;
  const user = await userModel.findOne({ staff_id: staff_id });
  if (user) res.json({ error: true });
  else next();
};
