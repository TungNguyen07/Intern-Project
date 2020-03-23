import { postData } from "../libs/postData";
import {
  NEW_POST,
  GET_POST,
  NEW_POST_SUCCESS,
  NEW_POST_FAIL
} from "./postActionType";
const { SERVER_URL } = process.env;

export const newPost = post => {
  postData(`${SERVER_URL}/post/new-post`, post).then(res => {
    if (res.success) {
      console.log(res.success);
    } else console.log(res.error);
  });
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

export const getPost = (postId, postTitle) => {
  localStorage.setItem("post_id", postId);
  localStorage.setItem("post_title", postTitle);
  return {
    type: GET_POST,
    payload: {
      id: postId
    }
  };
};
