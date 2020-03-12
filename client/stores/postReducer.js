import {
  APPROVE_POST,
  NEW_POST,
  DELETE_POST,
  GET_POST,
  NEW_POST_SUCCESS,
  NEW_POST_FAIL
} from "../actions/postActionType";

const initPost = {
  post: {},
  message: []
};

export default function postReducer(state = initPost, action) {
  switch (action.type) {
    case NEW_POST_SUCCESS:
      return {
        ...state,
        message: action.payload.success
      };

    case NEW_POST_FAIL:
      return {
        ...state,
        message: action.payload.error
      };

    default:
      return state;
  }
}
