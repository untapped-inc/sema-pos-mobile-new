import { SET_LOGIN } from "../actions/AuthActions";

const INITIAL_STATE = {
  token: null,
  isLoggedIn: false,
  usernameOrEmail: null,
  password: null
};

const authReducer = (state = INITIAL_STATE, action) => {
  let newState = { ...state };

  switch (action.type) {
    case SET_LOGIN:
      return action.data;
    default:
      return newState;
  }
};

export default authReducer;