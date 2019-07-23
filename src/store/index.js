import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { axiosMiddleware } from '../services/axiosService';

import RootReducer from './reducers/RootReducer';

const middlewares = [
	thunk,
	axiosMiddleware,
];

if (process.env.NODE_ENV === 'development') {
  const { createLogger } = require('redux-logger');
  const logger = createLogger({
	  collapsed: (getState, action) => action.type === 'persist/REHYDRATE' || action.type === 'persist/PERSIST',
	  diff: true,
  })

  middlewares.push(logger);
}

export default createStore(RootReducer, applyMiddleware(...middlewares));