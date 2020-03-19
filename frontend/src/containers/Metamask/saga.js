import { call, put, takeEvery } from 'redux-saga/effects';
import { startUpdateAccount } from '../User/reducer';
import { updateNetworkId, connectMetamask } from './reducer';
import { isMetamaskInstalled, askPermission, getNetworkId } from '../../utils/metamask';

function* metamaskSaga(action) {
   try {
      const isInstalled = isMetamaskInstalled();
      if (isInstalled) {
         yield call(askPermission);
         const networkId = yield call(getNetworkId);
         yield put(updateNetworkId({ networkId }));
         yield put(startUpdateAccount());
      }
   } catch (e) {
      console.log('Error: ', e)
   }
}

function* connectMetamaskSaga() {
   yield takeEvery(connectMetamask.type, metamaskSaga);
}

export default connectMetamaskSaga;
