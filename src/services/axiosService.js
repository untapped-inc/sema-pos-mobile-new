import axios from 'axios';
import Constants from 'expo-constants';

const envVar = process.env.NODE_ENV || 'development';

const axiosOptions = {
  baseURL: Constants.manifest.extra.semaServiceUrl[envVar]
};

const axiosService = axios.create(axiosOptions);

// Our custom middleware to always update our axios headers with the latest
// token. This saves us from including the token on every request.
// In redux, a middleware is a bridge between the action creator and the reducer
export const axiosMiddleware = ({ dispatch, getState }) => next => action => {
  if (action.type === 'SAVE_TOKEN') {
    axiosService.defaults.headers.common['Authorization'] = `Bearer ${action.data.token}`;
  }

  return next(action);
}

export default axiosService;