import {
  ADD_USER_FAIL,
  ADD_USER_SUCCESS,
  GET_ALL_USER_SUCCESS,
  GET_ALL_USER_FAIL
} from "./adminActionType";
import { postData } from "../libs/postData";
import { fetchData } from "../libs/fetchData";

export const adminActions = {
  addUser,
  getAllUser
};

function addUser(newUser) {
  return dispatch => {
    postData("http://localhost:4000/add-user", newUser).then(res => {
      if (res.error) dispatch(addUserFail);
      else dispatch(addUserSuccess(newUser));
    });
  };
}

function addUserSuccess(newUser) {
  return {
    type: ADD_USER_SUCCESS,
    payload: {
      newUser: newUser
    }
  };
}

function addUserFail() {
  return {
    type: ADD_USER_FAIL,
    payload: {
      error: ["Duplicate Staff Id or Username!"]
    }
  };
}

function getAllUser() {
  return dispatch => {
    fetchData("http://localhost:4000/get-user").then(res => {
      if (res.error) dispatch(getAllUserFail(res.error));
      else dispatch(getAllUserSuccess(res.data));
    });
  };
}

function getAllUserSuccess(data) {
  return {
    type: GET_ALL_USER_SUCCESS,
    payload: {
      user: data
    }
  };
}

function getAllUserFail(err) {
  return {
    type: GET_ALL_USER_FAIL,
    payload: {
      error: err
    }
  };
}
