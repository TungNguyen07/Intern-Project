import {
  ADD_USER_FAIL,
  ADD_USER_SUCCESS,
  GET_ALL_USER,
  GET_ALL_USER_SUCCESS,
  GET_ALL_USER_FAIL
} from "../actions/adminActionType";

const initAdmin = {
  owner: {},
  user: [],
  error: []
};

export default function adminReducer(state = initAdmin, action) {
  switch (action.type) {
    case ADD_USER_SUCCESS:
      return {
        ...state,
        user: [...user, action.payload.newUser]
      };
    case ADD_USER_FAIL:
      return {
        ...state,
        error: action.payload.error
      };
    case GET_ALL_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user
      };
    case GET_ALL_USER_FAIL:
      return {
        ...state,
        error: action.payload.error
      };
    default:
      return state;
  }
}
