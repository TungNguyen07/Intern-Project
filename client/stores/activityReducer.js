import {
  NEW_ACTIVITY,
  DELETE_ACTIVITY,
  UPDATE_ACTIVITY,
  SET_ACTIVITY
} from "../actions/activityActionType";

const initActivity = {
  activity_id: "",
  activity_name: "",
  error: ""
};

export default function activityReducer(state = initActivity, action) {
  switch (action.type) {
    case SET_ACTIVITY:
      return {
        ...state,
        activity_id: action.payload.id
      };

    default:
      return state;
  }
}
