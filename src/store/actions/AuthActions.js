import Constants from 'expo-constants';
import jwt from 'expo-jwt';
import axios from '../../services/axiosService';
import {
  BAD_CREDENTIALS_ERR,
  SERVER_ERR
} from '../../errors/types';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const SAVE_LOGIN = 'SAVE_LOGIN';

// Save the username or email and the password fields securely
// on the device
export const saveLogin = (usernameOrEmail, password) => {
  return (dispatch) => {
    dispatch({
      type: SAVE_LOGIN,
      data: {
        usernameOrEmail,
        password
      }
    })
  };
}

export const login = (usernameOrEmail, password) => {
  return (dispatch) => {
    saveLogin(usernameOrEmail, password);

    return axios.post('/sema/login', { usernameOrEmail, password, })
      .then(response => response.data)
      .then(async response => {
        const decodedUser = await jwt.decode(response.token, Constants.manifest.extra.jwtSecret);

        dispatch({
          type: LOGIN_SUCCESS,
          data: {
            token: response.token,
            user: decodedUser
          }
        });

        return decodedUser;
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 401 || err.response.status === 400) {
            throw {
              type: BAD_CREDENTIALS_ERR,
              msg: "Invalid credentials."
            }
          }
        }

        throw {
          type: SERVER_ERR,
          msg: 'Something went wrong. Please contact HQ.',
        }
      });
  };
}