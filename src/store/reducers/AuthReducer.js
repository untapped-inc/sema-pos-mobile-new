import {
  SAVE_LOGIN,
  LOGIN_SUCCESS
} from "../actions/AuthActions";

const INITIAL_STATE = {
  token: null,
  isLoggedIn: false,
  usernameOrEmail: null,
  currentUser: null,
  password: null
};

const authReducer = (state = INITIAL_STATE, action) => {
  let newState = { ...state };

  switch (action.type) {
    case SAVE_LOGIN:
      newState.usernameOrEmail = action.data.usernameOrEmail;
      newState.password = action.data.password;
      return newState;
    case LOGIN_SUCCESS:
      newState.token = action.data.token;
      newState.currentUser = action.data.user;
      newState.isLoggedIn = true;
      return newState;
    default:
      return newState;
  }
};

export default authReducer;