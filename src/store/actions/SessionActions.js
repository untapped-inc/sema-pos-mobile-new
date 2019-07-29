// import Constants from 'expo-constants';
// import axios from '../../services/axiosService';
// import {
//   BadCredentialsError,
//   ServerError
// } from '../../errors';

export const SAVE_KIOSKS = 'SAVE_KIOSKS';
export const SAVE_TOKEN = 'SAVE_TOKEN';

export const saveKiosks = kiosks => (dispatch) => {
  dispatch({
    type: SAVE_KIOSKS,
    data: {
      kiosks
    },
  });
};
