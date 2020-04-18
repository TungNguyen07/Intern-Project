import { postData } from "../libs/postData";
import { IS_CHANGE } from "./adminActionType";
const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000";

export const adminActions = {
  addUser,
  deleteUser,
  addActivity,
  updateActivity,
  deleteActivity,
  isChange,
};

function addUser(newUser) {
  postData(`${SERVER_URL}/add-user`, newUser).then((res) => {
    if (res.error) console.log(res.error);
    else console.log(res);
  });
}

function deleteUser(staffId) {
  postData(`${SERVER_URL}/profile/delete`, staffId).then((res) => {
    if (res.error) console.log(res.error);
    else console.log(res);
  });
}

function addActivity(newActivity) {
  postData(`${SERVER_URL}/activity/new-activity`, newActivity).then((res) => {
    if (res.error) console.log(res.error);
    else console.log(res);
  });
}

function updateActivity(newActivity) {
  postData(`${SERVER_URL}/activity/update-activity`, newActivity).then(
    (res) => {
      if (res.error) console.log(res.error);
      else console.log(res);
    }
  );
}

function deleteActivity(activity) {
  postData(`${SERVER_URL}/activity/delete-activity`, activity).then((res) => {
    if (res.error) console.log(res.error);
    else console.log(res);
  });
}

function isChange(status) {
  return {
    type: IS_CHANGE,
    payload: {
      isChange: status,
    },
  };
}
