import userReducer from "./userReducer";
import postReducer from "./postReducer";
import { combineReducers } from "redux";

const allReducer = combineReducers({
  userReducer,
  postReducer
});

export default allReducer;
