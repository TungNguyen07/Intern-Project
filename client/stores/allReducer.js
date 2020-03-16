import userReducer from "./userReducer";
import postReducer from "./postReducer";
import adminReducer from "./adminReducer";
import { combineReducers } from "redux";

const allReducer = combineReducers({
  userReducer,
  postReducer,
  adminReducer
});

export default allReducer;
