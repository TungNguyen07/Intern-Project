import { postData } from "../libs/postData";
import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_OUT_SUCCESS,
  SET_USER
} from "./userActionsType";

export const userActions = {
  Signin,
  Signout,
  setUserDetail
};

export function Signin(signinInfo) {
  return dispatch => {
    postData("http://localhost:4000/signin", signinInfo).then(res => {
      if (res.token) {
        localStorage.setItem("access_token", res.token);

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

// export function getUserDetail() {
//   return dispatch => {
//     const userDetail = JSON.parse(localStorage.getItem("current_user"));
//     if (userDetail) dispatch(setUserDetail(userDetail));
//     else dispatch(getUserDetailFail());
//   };
// }

export function setUserDetail(userDetail) {
  console.log("Setting...", userDetail);
  return {
    type: SET_USER,
    payload: {
      user: userDetail
    }
  };
}
