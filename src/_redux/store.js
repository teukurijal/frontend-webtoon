import { createStore, applyMiddleware } from 'redux';
import { logger, thunk, promise } from './middleware';
import webtoonsReducer from '../_reducers/toons';


const middleware = applyMiddleware(logger, thunk, promise);

// const reducer = combineReducers({
//   webtoonsReducer,
// })

const store = createStore(
  webtoonsReducer,
  middleware
);

export default store