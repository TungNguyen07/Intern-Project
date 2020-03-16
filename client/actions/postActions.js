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
  let error = [];
  return dispatch => {
    if (!post.title.length) error.push("Title is required!");
    if (!post.description.length) error.push("Description is required!");
    if (!post.content.length) error.push("Content is required!");

    if (error.length) dispatch(newPostFail(error));
    else dispatch(newPost(post));
  };
}

const newPostSucess = success => {
  return {
    type: NEW_POST_SUCCESS,
    payload: {
      success: success
    }
  };
};

const newPostFail = fail => {
  return {
    type: NEW_POST_FAIL,
    payload: {
      error: fail
    }
  };
};
