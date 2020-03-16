import userModel from "../model/user.model";

export const checkUsername = async (req, res, next) => {
  const username = req.body.username;
  const user = await userModel.findOne({ username: username });
  if (user) {
    res.json({ error: true });
  } else next();
};
