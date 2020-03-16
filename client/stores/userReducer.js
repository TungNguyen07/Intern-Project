import {
  SIGN_OUT_SUCCESS,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SET_USER_DETAIL
} from "../actions/userActionsType";

const initUser = {
  user: {},
  token: "",
  error: [],
  isLoading: true
};

export default function userReducer(state = initUser, action) {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        error: action.payload.error,
        isLoading: action.payload.isLoading
      };

    case SIGN_IN_FAIL:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        error: action.payload.error,
        isLoading: action.payload.isLoading
      };

    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        error: action.payload.error,
        isLoading: action.payload.isLoading
      };

    case SET_USER_DETAIL:
      return {
        ...state,
        user: action.payload.user,
        isLoading: action.payload.isLoading
      };

    default:
      return state;
  }
}
