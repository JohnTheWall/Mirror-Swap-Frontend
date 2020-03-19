import { call, put, takeEvery } from 'redux-saga/effects';
import { startUpdateAccount } from '../User/reducer';
import { updateMetaMask, updateNetworkId, connectMetamask } from './reducer';
import { history } from '../../app/store'
import { isMetamaskInstalled, initializeWeb3, getNetworkId } from '../../utils/metamask';

function* metamaskSaga(action) {
   try {
      const isInstalled = isMetamaskInstalled();
      if (isInstalled) {
         yield call(initializeWeb3);
         const networkId = yield call(getNetworkId);
         yield put(updateNetworkId({ networkId }));
         yield put(startUpdateAccount());
      } else {
         history.push('/no-metamask')
      }
   } catch (e) {
      yield put(updateMetaMask({ isAvailable: false }));
   }
}

function* detectMetamask() {
   const isInstalled = isMetamaskInstalled();
   if (isInstalled) {
      yield put(updateMetaMask({ isAvailable: true }));
   }
   else {
      yield history.push('/no-metamask')
   }
}

function* connectMetamaskSaga() {
   yield call(detectMetamask)
   yield takeEvery(connectMetamask.type, metamaskSaga);
}

export default connectMetamaskSaga;
