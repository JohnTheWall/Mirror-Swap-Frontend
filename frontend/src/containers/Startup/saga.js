import { put, call } from 'redux-saga/effects';
// import { startUpdateAccount } from '../User/reducer';
import { updateMetaMask } from '../Metamask/reducer';
// import { history } from '../../app/store'
import { initializeWeb3, isMetamaskInstalled } from '../../utils/metamask';
import { startUpdateAccount } from '../User/reducer';

function* startupSaga() {
  const isInstalled = isMetamaskInstalled();
  if (isInstalled) {
    yield put(updateMetaMask({ isAvailable: true }));
    yield call(initializeWeb3);
    yield put(startUpdateAccount())
  } else {
    yield put(updateMetaMask({ isAvailable: false }));
  }
}

export default startupSaga;
