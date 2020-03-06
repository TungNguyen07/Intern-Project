import { SIGN_IN, SIGN_OUT } from "../actions/userActionsType";
import { initialUser } from "./initialUser";
import { postData } from "../libs/postData";

export default function userReducer(state = initialUser, action) {
  switch (action.type) {
    case SIGN_IN:
      signin(action.signinInfo);
    default:
      return state;
  }
}

function signin(signinInfo) {
  console.log("Signing...");
  postData("http://localhost:4000/signin", signinInfo).then(res => {
    if (res.token) {
      localStorage.setItem("access_token", res.token);
    }
  });
}
