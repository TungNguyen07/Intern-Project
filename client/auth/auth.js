import { postData } from "../libs/postData";

export const checkTokenNGetUser = async token => {
  //console.log("token", token);

  return postData("http://localhost:4000/check-token", { token })
    .then(res => {
      if (res.error) return null;
      else return res;
    })
    .catch(err => {
      return err;
    });
};

export const verifyUser = user => {
  if (user) return true;
  else return false;
};

export const verifyAdmin = user => {
  if (user.role == 1) return true;
  else return false;
};
