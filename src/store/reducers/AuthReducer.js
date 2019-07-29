/* eslint-disable default-case */
import {
  LOGIN_SUCCESS,
  LOGOUT
} from '../actions/AuthActions';
import produce from '../../services/immerService';

const INITIAL_STATE = {
  users: [],
  currentUser: null,
};

const AuthReducer = produce((state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      state.currentUser = action.data.user;

      const userCredentials = {
        usernameOrEmail: action.data.usernameOrEmail,
        password: action.data.password,
      };

      let exists = false;

      state.users = state.users.map((user) => {
        if (user.usernameOrEmail === userCredentials.usernameOrEmail) {
          exists = true;
          user.password = userCredentials.password;
        }
        return user;
      });

      if (!exists) {
        state.users.unshift(userCredentials);
      }
      break;
    case LOGOUT:
      state.currentUser = null;
      break;
  }
}, INITIAL_STATE);

export default AuthReducer;
