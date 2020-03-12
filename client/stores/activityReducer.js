import {
  NEW_ACTIVITY,
  DELETE_ACTIVITY,
  UPDATE_ACTIVITY,
  GET_ACTIVITY
} from "../actions/activityActionType";

const initActivity = {
  activity: [],
  error: ""
};

export default function activityReducer(state = initActivity, action) {
  switch (action.type) {
    default:
      return state;
  }
}
