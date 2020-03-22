import userReducer from "./userReducer";
import postReducer from "./postReducer";
import adminReducer from "./adminReducer";
import activityReducer from "./activityReducer";
import { combineReducers } from "redux";

const allReducer = combineReducers({
  userReducer,
  postReducer,
  adminReducer,
  activityReducer
});

export default allReducer;
