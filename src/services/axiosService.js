import axios from 'axios';
import Constants from 'expo-constants';

const envVar = process.env.NODE_ENV || 'development';

const serviceURL = envVar === 'development'
  ? `http://${Constants.manifest.debuggerHost.split(':').shift()}:3001/api/v1`
  : Constants.manifest.extra.semaServiceUrl;

const axiosOptions = {
  baseURL: serviceURL
};

const axiosService = axios.create(axiosOptions);

// Our custom middleware to always update our axios headers with the latest
// token. This saves us from including the token on every request.
// In redux, a middleware is a bridge between the action creator and the reducer
export const axiosMiddleware = () => next => (action) => {
  if (action.type === 'SAVE_TOKEN') {
    axiosService.defaults.headers.common.Authorization = `Bearer ${action.data.token}`;
  }

  return next(action);
};

export default axiosService;
