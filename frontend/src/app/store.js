import { configureStore } from "@reduxjs/toolkit";
import sagaMiddleware from './rootSaga';
import { createBrowserHistory } from 'history';
import createRootReducer from './rootReducer';

export const history = createBrowserHistory();

const rootReducer = createRootReducer(history)

const store = configureStore({
  middleware: [ sagaMiddleware ],
  reducer: rootReducer
});

export default store;
