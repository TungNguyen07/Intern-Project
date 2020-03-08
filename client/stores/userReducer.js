import {
  SIGN_OUT_SUCCESS,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL
} from "../actions/userActionsType";

const initUser = {
  user: {},
  token: "",
  error: "",
  isLoading: false
};

export default function userReducer(state = initUser, action) {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        error: action.payload.error
      };

    case SIGN_IN_FAIL:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        error: action.payload.error
      };

    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        error: action.payload.error
      };

    default:
      return state;
  }
}
