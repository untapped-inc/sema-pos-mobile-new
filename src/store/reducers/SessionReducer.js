/* eslint-disable default-case */
import { SAVE_KIOSKS, SAVE_TOKEN } from '../actions/SessionActions';
import produce from '../../services/immerService';

const INITIAL_STATE = {
  kiosks: [],
  tokens: [],
  isLoaded: false
};

const SessionReducer = produce((state, action) => {
  switch (action.type) {
    case SAVE_KIOSKS:
      state.kiosks = action.data.kiosks;
      break;
    case SAVE_TOKEN:
      const payload = {
        usernameOrEmail: action.data.usernameOrEmail,
        token: action.data.token
      };

      let exists = false;

      state.tokens = state.tokens.map((tokenObj) => {
        if (tokenObj.usernameOrEmail === payload.usernameOrEmail) {
          exists = true;
          tokenObj.token = payload.token;
        }
        return tokenObj;
      });

      if (!exists) {
        state.tokens.unshift(payload);
      }
      break;
  }
}, INITIAL_STATE);

export default SessionReducer;
