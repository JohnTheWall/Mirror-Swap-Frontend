import { configureStore } from "@reduxjs/toolkit";
import sagaMiddleware from './rootSaga';
import { createBrowserHistory } from 'history';
import createRootReducer from './rootReducer';
import { routerMiddleware } from 'connected-react-router'

export const history = createBrowserHistory();

const rootReducer = createRootReducer(history)

const store = configureStore({
  middleware: [ routerMiddleware(history), sagaMiddleware ],
  reducer: rootReducer
});

export default store;
