import { postData } from "../libs/postData";
import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_OUT_SUCCESS
} from "./userActionsType";

export const userActions = {
  Signin,
  Signout
};

export function Signin(signinInfo) {
  return dispatch => {
    postData("http://localhost:4000/signin", signinInfo).then(res => {
      if (res.token) {
        localStorage.setItem("access_token", res.token);
        localStorage.setItem("current_user", JSON.stringify(res.user));
        dispatch(SigninSuccess(res));
      }
      if (res.error) dispatch(SigninFail(res));
    });
  };
}

export const SigninSuccess = data => {
  return {
    type: SIGN_IN_SUCCESS,
    payload: {
      user: data.user,
      token: data.token,
      error: ""
    }
  };
};

export const SigninFail = data => {
  return {
    type: SIGN_IN_FAIL,
    payload: {
      user: {},
      token: "",
      error: data.message
    }
  };
};

export function Signout() {
  return dispatch => {
    localStorage.removeItem("access_token"),
      localStorage.removeItem("current_user"),
      dispatch(SignoutSuccess());
  };
}

// export function setUserDetail(user) {
//   return {
//     type: SIGN_IN_SUCCESS,
//     token: user.token
//   };
// }

export function SignoutSuccess() {
  return {
    type: SIGN_OUT_SUCCESS,
    payload: {
      user: {},
      token: "",
      error: ""
    }
  };
}
