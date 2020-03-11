import { postData } from "../libs/postData";
import Router from "next/router";

export const checkTokenNGetUser = async token => {
  console.log("token", token);

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
