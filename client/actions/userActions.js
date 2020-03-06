import { postData } from "../libs/postData";
import { SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS, SIGN_IN } from "./userActionsType";
import { signin } from "../stores/userReducer";

export const userActions = {
  Signin,
  signout
};

export function Signin(signinInfo) {
  return {
    type: SIGN_IN,
    signinInfo
  };
}

export const SigninSuccess = data => {
  return {
    type: SIGN_IN,
    payload: {
      user: data.user,
      token: data.token
    }
  };
};

function signout() {
  return dispatch => {
    localStorage.removeItem("access_token"), dispatch(signoutUser());
  };
}

export function setUserDetail(user) {
  return {
    type: SIGN_IN_SUCCESS,
    token: user.token
  };
}

export function signoutUser() {
  return {
    type: SIGN_OUT_SUCCESS,
    token: ""
  };
}
