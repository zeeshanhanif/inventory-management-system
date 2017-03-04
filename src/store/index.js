import { combineReducers, applyMiddleware, createStore, compose } from 'redux'
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import AuthReducer from './reducers/authReducer';
import StockReducer from './reducers/stockReducer';

import AuthMiddleware from './middleware/authMiddleware'
import StockMiddleware from './middleware/stockMiddleware'

export {
    AuthMiddleware,
    StockMiddleware
}


//const middleware = applyMiddleware(thunk,logger());
const middleware = compose(
      applyMiddleware(thunk,logger())
      ,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
export const rootReducer = combineReducers({
    AuthReducer,
    StockReducer
// more reducers go here
})

export let store = createStore(
    rootReducer,
    middleware
);