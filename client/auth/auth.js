import { postData } from "../libs/postData";
const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000";

export const checkTokenNGetUser = async (token) => {
  return postData(`${SERVER_URL}/check-token`, { token })
    .then((res) => {
      if (res.error) return null;
      else return res;
    })
    .catch((err) => {
      return err;
    });
};

export const verifyUser = (user) => {
  if (user) return true;
  else return false;
};

export const verifyAdmin = (user) => {
  if (user) {
    if (user.role == 1) return true;
    else return false;
  } else return false;
};
