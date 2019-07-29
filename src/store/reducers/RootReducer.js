import { combineReducers } from 'redux';
import createSecureStore from 'redux-persist-expo-securestore';
import { persistReducer } from 'redux-persist';
import ExpoFileSystemStorage from 'redux-persist-expo-filesystem';
import AuthReducer from './AuthReducer';
import SessionReducer from './SessionReducer';

// Secure storage
const secureStorage = createSecureStore();

const authPersistConfig = {
  key: 'secure',
  storage: secureStorage
};

const rootPersistConfig = {
  key: 'root',
  storage: ExpoFileSystemStorage,
  blacklist: ['auth']
};

// Combine all the reducers
const RootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, AuthReducer),
  session: SessionReducer,
});

export default persistReducer(rootPersistConfig, RootReducer);
