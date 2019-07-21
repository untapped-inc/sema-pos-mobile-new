import { combineReducers } from 'redux';
import authReducer from "./AuthReducer";

// Combine all the reducers
const RootReducer = combineReducers({
	authReducer,
});

export default RootReducer;
