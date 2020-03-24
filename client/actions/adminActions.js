import {
  ADD_USER_FAIL,
  ADD_USER_SUCCESS,
  DELETE_SUCCESS,
  DELETE_FAIL
} from "./adminActionType";
import { NEW_ACTIVITY_SUCCESS } from "./activityActionType";
import { postData } from "../libs/postData";
import { fetchData } from "../libs/fetchData";
const { SERVER_URL } = process.env;

export const adminActions = {
  addUser,
  deleteUser,
  addActivity,
  updateActivity,
  deleteActivity,
  activeActivity
};

function addUser(newUser) {
  return dispatch => {
    postData(`${SERVER_URL}/add-user`, newUser).then(res => {
      if (res.error) dispatch(addUserFail);
      else dispatch(addUserSuccess());
    });
  };
}

function addUserSuccess() {
  return {
    type: ADD_USER_SUCCESS,
    payload: {
      message: ["Add new user successfully!"]
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

function deleteUser(staffId) {
  console.log("right here", staffId);
  return dispatch => {
    postData(`${SERVER_URL}/profile/delete`, staffId).then(res => {
      if (res.error) dispatch(deleteFail());
      else dispatch(deleteSuccess());
    });
  };
}

function deleteSuccess() {
  return {
    type: DELETE_SUCCESS,
    payload: {
      message: ["Delete user successfully!"]
    }
  };
}

function deleteFail() {
  return {
    type: DELETE_FAIL,
    payload: {
      error: ["Delete user failed!"]
    }
  };
}

function addActivity(newActivity) {
  return dispatch => {
    postData(`${SERVER_URL}/activity/new-activity`, newActivity).then(res => {
      if (res.error) console.log(res.error);
      else dispatch(addActivitySuccess(res));
    });
  };
}

function addActivitySuccess() {
  return {
    type: NEW_ACTIVITY_SUCCESS,
    payload: {
      message: ["Add activity successfully!"]
    }
  };
}

function updateActivity(newActivity) {
  postData(`${SERVER_URL}/activity/update-activity`, newActivity).then(res => {
    if (res.error) console.log(res.error);
    else console.log(res);
  });
}

function deleteActivity(activity) {
  postData(`${SERVER_URL}/activity/delete-activity`, activity).then(res => {
    if (res.error) console.log(res.error);
    else console.log(res);
  });
}

function activeActivity(activity) {
  console.log(activity);
  // postData(`${SERVER_URL}/activity/active-activity`, activity).then(res => {
  //   console.log(res);
  // });
}
