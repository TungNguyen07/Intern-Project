import {
  ADD_USER_FAIL,
  ADD_USER_SUCCESS,
  DELETE_SUCCESS,
  DELETE_FAIL
} from "../actions/adminActionType";
import { NEW_ACTIVITY_SUCCESS } from "../actions/activityActionType";
const initAdmin = {
  owner: {},
  error: [],
  message: []
};

export default function adminReducer(state = initAdmin, action) {
  switch (action.type) {
    case ADD_USER_SUCCESS:
      return {
        ...state,
        message: action.payload.message
      };

    case ADD_USER_FAIL:
      return {
        ...state,
        error: action.payload.error
      };

    case DELETE_SUCCESS:
      return {
        ...state,
        message: action.payload.message
      };

    case DELETE_FAIL:
      return {
        ...state,
        error: action.payload.error
      };

    case NEW_ACTIVITY_SUCCESS:
      return {
        ...state,
        message: action.payload.message
      };

    default:
      return state;
  }
}
