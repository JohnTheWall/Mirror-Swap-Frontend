import { all, fork } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import metamaskSaga from '../containers/Metamask/saga';
import userSaga from '../containers/User/saga';
import currecySaga from '../containers/Currency/saga'
import startupSaga from '../containers/Startup/saga';

function* rootSaga() {
  yield all(
    [
      fork(startupSaga),
      fork(metamaskSaga),
      fork(userSaga),
      fork(currecySaga)
    ]
  );
};

const sagaMiddleware = createSagaMiddleware();

export const startSaga = () => {
  sagaMiddleware.run(rootSaga);
};

export default sagaMiddleware;
