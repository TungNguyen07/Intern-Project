import { postData } from "../libs/postData";
import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_OUT_SUCCESS,
  SET_USER_DETAIL
} from "./userActionsType";
import Router from "next/router";
const { SERVER_URL } = process.env;
import { checkToken } from "../auth/auth";

export const userActions = {
  Signin,
  Signout,
  setUserDetail,
  updateInfo
};

function Signin(signinInfo) {
  return dispatch => {
    postData(`${SERVER_URL}/signin`, signinInfo).then(res => {
      if (res.token) {
        localStorage.setItem("access_token", res.token);
        dispatch(SigninSuccess(res));
      }
      if (res.error) dispatch(SigninFail(res));
    });
  };
}

const SigninSuccess = data => {
  return {
    type: SIGN_IN_SUCCESS,
    payload: {
      user: data.user,
      token: data.token,
      error: []
    }
  };
};

const SigninFail = data => {
  return {
    type: SIGN_IN_FAIL,
    payload: {
      user: {},
      token: [],
      error: [data.message]
    }
  };
};

function Signout() {
  return dispatch => {
    localStorage.removeItem("access_token");
    if (Router.pathname != "/") Router.push("/signin");
    dispatch(SignoutSuccess());
  };
}

function SignoutSuccess() {
  return {
    type: SIGN_OUT_SUCCESS,
    payload: {
      user: {},
      token: ""
    }
  };
}

export function setUserDetail(userDetail) {
  return {
    type: SET_USER_DETAIL,
    payload: {
      user: userDetail
    }
  };
}

function updateInfo(info) {
  return dispatch => {
    postData(`${SERVER_URL}/profile/update`, info)
      .then(res => {
        if (res.success) dispatch(setUserDetail(info));
      })
      .catch(err => console.log(err));
  };
}

export function changePassword(passwordInfo) {
  console.log(passwordInfo);
  postData(`${SERVER_URL}/profile/change-password`, passwordInfo).then(res => {
    console.log(res);
  });
}
