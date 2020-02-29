import userModel from "../model/user.model";

export const checkPassword = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await userModel.findOne({ username });
  if (user) {
    if (await user.comparePassword(password)) {
      next();
    }
  } else
    res.status(404).json({
      error: true,
      message: "Incorect Username or Password!"
    });
};
