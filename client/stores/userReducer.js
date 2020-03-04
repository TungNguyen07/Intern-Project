import { fetchData } from "../libs/fetchData";
import { postData } from "../libs/postData";
import { initialUser } from "./initialUser";

export const UserReducer = (state = initialUser, action) => {
  switch (action.type) {
    case "SIGN_IN": {
      postData("http://localhost:4000/signin", action.info)
        .then(res => {
          if (res.user.isSignedIn) {
            state = { ...state, user: res.user, token: res.token };
            localStorage.setItem("access_user", JSON.stringify(state));
          } else return state;
        })
        .catch(err => {
          console.log(err);
        });
    }

    default:
      return state;
  }
};
