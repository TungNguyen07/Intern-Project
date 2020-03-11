import { APPROVE_POST, NEW_POST, DELETE_POST } from "../actions/postActionType";

const initPost = {
  post: {},
  error: ""
};

export default function postReducer(state = initPost, action) {
  switch (action.type) {
    default:
      return state;
  }
}
