import Constants from 'expo-constants';
import jwt from 'expo-jwt';
import axios from '../../services/axiosService';
import {
  BadCredentialsError,
  ServerError
} from '../../errors';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

const fetchLogin = (usernameOrEmail, password) => {
  return axios.post('/sema/login', { usernameOrEmail, password, })
    .then(response => response.data)
    .then(async response => {
      const decodedUser = await jwt.decode(response.token, Constants.manifest.extra.jwtSecret);

      return { decodedUser, token: response.token };
    })
    .catch(err => {
      if (err.response) {
        if (err.response.status === 401 || err.response.status === 400) {
          throw new BadCredentialsError;
        }
      }

      throw new ServerError;
    });
}

export const login = (usernameOrEmail, password) => {
  return async (dispatch, getState) => {
    const state = getState();

    // If there are users logged on the tablet already
    // No need to hit the server
    if (state.auth.users.length) {
      const currentUser = state.auth.users.reduce((user, final) => {
        if (user.usernameOrEmail === usernameOrEmail) return user;
        return final;
      }, {});

      try {
        if (currentUser.password && currentUser.password === password) {
          const decodedUser = jwt.decode(currentUser.token, Constants.manifest.extra.jwtSecret);

          dispatch({
            type: LOGIN_SUCCESS,
            data: {
              user: decodedUser,
              token: currentUser.token,
              usernameOrEmail: currentUser.usernameOrEmail,
              password: currentUser.password
            }
          });

          return Promise.resolve(decodedUser);
        }
      } catch (e) {
        // If the user's token has expired, we try to login
        // server side
        // TODO: only do this when there's internet, on no internet, let the user in
        // since we don't need the token to do the tasks
        if (e.message === 'Token has expired') {
          return fetchLogin(usernameOrEmail, password)
            .then(({ decodedUser, token }) => {
              dispatch({
                type: LOGIN_SUCCESS,
                data: {
                  user: decodedUser,
                  token,
                  usernameOrEmail,
                  password
                }
              });

              return decodedUser;
            }).catch(e => { throw e });
        }

        throw e;
      }
    }

    // In case there were users in the local list but the current user was not found
    // or there were no users at all, or the password is wrong,
    // hit the API
    return fetchLogin(usernameOrEmail, password)
      .then(({ decodedUser, token }) => {
        dispatch({
          type: LOGIN_SUCCESS,
          data: {
            user: decodedUser,
            token,
            usernameOrEmail,
            password
          }
        });

        return decodedUser;
      }).catch(e => { throw e });
  };
}

export const logout = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT });
  };
}