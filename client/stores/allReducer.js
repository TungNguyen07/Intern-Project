import { initialUser } from "./initialUser";
import userReducer from "./userReducer";
import { combineReducers } from "redux";

const allReducer = combineReducers({
  userReducer
});

export default allReducer;
