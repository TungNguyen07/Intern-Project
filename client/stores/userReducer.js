import { useReducer } from "react";
import fetchData from "../libs/fetchData";
import { postData } from "../libs/postData";

const initialUser = {};
const reducer = (state = initialUser, action) => {
  switch (action.type) {
    case "SIGNIN":
      return postData("http://localhost:4000/signin", action.info)
        .then(res => {
          return { ...state, res };
        })
        .catch(err => console.log(err));

    case "SIGNOUT":
      return {};
    case "PROFILE":
      return {};
    case "CHANGE_PASSWORD":
      return {};
    case "CHANGE_INFOR":
      return {};
    default:
      return state;
  }
};

export const userReducer = () => {
  const [user, dispatch] = useReducer(reducer, initialUser);
  return [user, dispatch];
};
