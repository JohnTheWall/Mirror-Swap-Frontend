import { call, put, takeEvery } from 'redux-saga/effects';
import { startUpdateAccount } from '../User/reducer';
import { connectMetamask } from './reducer';
import { isMetamaskInstalled, askPermission } from '../../utils/metamask';

function* metamaskSaga(action) {
   try {
      const isInstalled = isMetamaskInstalled();
      if (isInstalled) {
         yield call(askPermission);
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
