import { postData } from "../libs/postData";
import {
  NEW_POST,
  GET_POST,
  NEW_POST_SUCCESS,
  NEW_POST_FAIL
} from "./postActionType";

export const postActions = {
  checkValidPost
};

function newPost(post) {
  return dispatch => {
    postData("http://localhost:4000/post/new-post", post).then(res => {
      if (res.success) {
        dispatch(newPostSucess(res.success));
      } else dispatch(newPostFail("Unknown Error!"));
    });
  };
}

function checkValidPost(post) {
  return dispatch => {
    if (!post.title || !post.description || !post.content) {
      dispatch(newPostFail("Invalid content!"));
    } else dispatch(newPost(post));
  };
}

const newPostSucess = success => {
  return {
    type: NEW_POST_SUCCESS,
    payload: {
      success: [success]
    }
  };
};

const newPostFail = fail => {
  return {
    type: NEW_POST_FAIL,
    payload: {
      error: [fail]
    }
  };
};
