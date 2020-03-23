import { SET_ACTIVITY } from "./activityActionType";

export const activityActions = {
  setActivity
};

function setActivity(activity_id) {
  localStorage.setItem("activity_id", activity_id);
  return {
    type: SET_ACTIVITY,
    payload: {
      id: activity_id
    }
  };
}
