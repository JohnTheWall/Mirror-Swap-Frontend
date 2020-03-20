import { put, call } from 'redux-saga/effects';
import { updateMetaMask } from '../Metamask/reducer';
import { initializeWeb3, isMetamaskInstalled, getNetworkId } from '../../utils/metamask';
import { startUpdateAccount } from '../User/reducer';
import { updateNetworkId } from '../Metamask/reducer';

function* startupSaga() {
  const isInstalled = isMetamaskInstalled();
  if (isInstalled) {
    yield put(updateMetaMask({ isAvailable: true }));
    yield call(initializeWeb3);
    const networkId = yield call(getNetworkId);
    yield put(updateNetworkId({ networkId }));
    yield put(startUpdateAccount())
  } else {
    yield put(updateMetaMask({ isAvailable: false }));
  }
}

export default startupSaga;
