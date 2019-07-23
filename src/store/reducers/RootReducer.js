import { combineReducers } from 'redux';
import authReducer from "./AuthReducer";
import createSecureStore from "redux-persist-expo-securestore";
import { persistReducer } from "redux-persist";
import ExpoFileSystemStorage from "redux-persist-expo-filesystem";

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
  auth: persistReducer(authPersistConfig, authReducer)
});

export default persistReducer(rootPersistConfig, RootReducer);
