import Constants from 'expo-constants';
import jwt from 'expo-jwt';
import { YellowBox } from 'react-native';
import bcrypt from 'react-native-bcrypt';
import isaac from 'isaac';
import axios from '../../services/axiosService';
import {
  BadCredentialsError,
  ServerError
} from '../../errors';
import {
  SAVE_KIOSKS,
  SAVE_TOKEN
} from './SessionActions';
import Users from '../../../assets/data/users.json';
import kiosksFromBaseData from '../../../assets/data/kiosks.json';

// eslint-disable-next-line no-console
YellowBox.ignoreWarnings(['Using Math.random']);

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

const fetchLogin = (usernameOrEmail, password) => axios.post('/login', { usernameOrEmail, password })
  .then(response => response.data)
  .then(async (response) => {
    const decodedUser = await jwt.decode(response.token, Constants.manifest.extra.jwtSecret);

    return { decodedUser, token: response.token, kiosks: response.kiosks };
  })
  .catch((err) => {
    if (err.response) {
      if (err.response.status === 401 || err.response.status === 400) {
        throw new BadCredentialsError();
      }
    }

    throw new ServerError();
  });

export const login = (usernameOrEmail, password) => async (dispatch, getState) => {
  const state = getState();

  // If there are users logged on the tablet already
  // No need to hit the server
  if (state.auth.users.length) {
    const currentUser = state.auth.users.reduce((final, user) => {
      if (user.usernameOrEmail.toLowerCase() === usernameOrEmail.toLowerCase()) return user;
      return final;
    }, {});

    const userToken = state.session.tokens.reduce((final, data) => {
      if (data.usernameOrEmail.toLowerCase() === usernameOrEmail.toLowerCase()) return data.token;
      return final;
    }, null);

    if (currentUser.password && currentUser.password === password && userToken) {
      try {
        const decodedUser = await jwt.decode(userToken, Constants.manifest.extra.jwtSecret);

        dispatch({
          type: LOGIN_SUCCESS,
          data: {
            user: decodedUser,
            usernameOrEmail: currentUser.usernameOrEmail,
            password: currentUser.password,
          }
        });

        return Promise.resolve(decodedUser);
      } catch (e) {
        // If the user's token has expired, we try to login
        // server side
        // TODO: only do this when there's internet, on no internet, let the user in
        // since we don't need the token to do the tasks
        if (e.message === 'Token has expired') {
          return fetchLogin(usernameOrEmail, password)
            .then(({ decodedUser, token, kiosks }) => {
              dispatch({
                type: LOGIN_SUCCESS,
                data: {
                  user: decodedUser,
                  usernameOrEmail,
                  password
                }
              });

              dispatch({
                type: SAVE_TOKEN,
                data: {
                  usernameOrEmail,
                  token
                }
              });

              dispatch({
                type: SAVE_KIOSKS,
                data: {
                  kiosks
                }
              });

              return decodedUser;
            }).catch(() => {
              const currentUserFromBaseData = Users.reduce((final, user) => {
                if (user.username.toLowerCase() === usernameOrEmail.toLowerCase()) return user;
                return final;
              }, {});

              if (!currentUserFromBaseData.password) {
                throw new BadCredentialsError();
              }

              bcrypt.setRandomFallback((len) => {
                const buf = new Uint8Array(len);

                return buf.map(() => Math.floor(isaac.random() * 256));
              });

              const isValid = bcrypt.compareSync(password, currentUserFromBaseData.password);

              if (!isValid) {
                throw new BadCredentialsError();
              }

              dispatch({
                type: LOGIN_SUCCESS,
                data: {
                  user: currentUserFromBaseData,
                  usernameOrEmail,
                  password
                }
              });

              dispatch({
                type: SAVE_TOKEN,
                data: {
                  usernameOrEmail,
                  token: null
                }
              });

              dispatch({
                type: SAVE_KIOSKS,
                data: {
                  kiosks: kiosksFromBaseData
                }
              });

              return currentUserFromBaseData;
            });
        }

        throw e;
      }
    }
  }

  // In case there were users in the local list but the current user was not found
  // or there were no users at all, or the password is wrong,
  // hit the API
  return fetchLogin(usernameOrEmail, password)
    .then(({ decodedUser, token, kiosks }) => {
      dispatch({
        type: LOGIN_SUCCESS,
        data: {
          user: decodedUser,
          usernameOrEmail,
          password
        }
      });

      dispatch({
        type: SAVE_TOKEN,
        data: {
          usernameOrEmail,
          token
        }
      });

      dispatch({
        type: SAVE_KIOSKS,
        data: {
          kiosks
        }
      });

      return decodedUser;
    }).catch(() => {
      const currentUser = Users.reduce((final, user) => {
        if (user.username.toLowerCase() === usernameOrEmail.toLowerCase()) return user;
        return final;
      }, {});

      if (!currentUser.password) {
        throw new BadCredentialsError();
      }

      bcrypt.setRandomFallback((len) => {
        const buf = new Uint8Array(len);

        return buf.map(() => Math.floor(isaac.random() * 256));
      });

      const isValid = bcrypt.compareSync(password, currentUser.password);

      if (!isValid) {
        throw new BadCredentialsError();
      }

      dispatch({
        type: LOGIN_SUCCESS,
        data: {
          user: currentUser,
          usernameOrEmail,
          password
        }
      });

      dispatch({
        type: SAVE_TOKEN,
        data: {
          usernameOrEmail,
          token: null
        }
      });

      dispatch({
        type: SAVE_KIOSKS,
        data: {
          kiosks: kiosksFromBaseData
        }
      });

      return currentUser;
    });
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
