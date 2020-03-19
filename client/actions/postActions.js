import { postData } from "../libs/postData";
import {
  NEW_POST,
  GET_POST,
  NEW_POST_SUCCESS,
  NEW_POST_FAIL
} from "./postActionType";
const { SERVER_URL } = process.env;

export const postActions = {
  checkValidPost
};

function newPost(post) {
  return dispatch => {
    postData(`${SERVER_URL}/post/new-post`, post).then(res => {
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

export const approvePost = postId => {
  postData(`${SERVER_URL}/post/approve-post`, postId).then(res => {
    if (res.error) console.log(res.error);
    else console.log(res);
  });
};

export const denyPost = postId => {
  postData(`${SERVER_URL}/post/deny-post`, postId).then(res => {
    if (res.error) console.log(res.error);
    else console.log(res);
  });
};
