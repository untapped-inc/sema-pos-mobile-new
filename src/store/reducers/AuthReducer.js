import {
  LOGIN_SUCCESS,
  LOGOUT
} from "../actions/AuthActions";

const INITIAL_STATE = {
  users: [],
  currentUser: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  let newState = { ...state };

  switch (action.type) {
    case LOGIN_SUCCESS:
      newState.currentUser = action.data.user;
      const userCredentials = {
        usernameOrEmail: action.data.usernameOrEmail,
        password: action.data.password,
        token: action.data.token,
      };

      const userIdx = newState.users.reduce((user, final, idx) => {
        if (user.usernameOrEmail === userCredentials.usernameOrEmail) return idx;
        return final;
      }, -1);

      // If this user credentials are already saved locally
      if (userIdx !== -1) {
        newState.users[userIdx] = userCredentials;
      } else {
        newState.users = [...newState.users, userCredentials];
      }
      return newState;
    case LOGOUT:
      newState.currentUser = null;
      return newState;
    default:
      return newState;
  }
};

export default authReducer;