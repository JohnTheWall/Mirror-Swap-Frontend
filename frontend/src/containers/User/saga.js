import { call, put, takeEvery, fork, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { getAccounts, getBalance, metaMaskAccountsChanged } from '../../utils/metamask';
import { updateAccount, startUpdateAccount, updateAccountFailure } from './reducer';
import { setOpen } from '../Notifications/reducer';

function createMetaMaskAccountChannel() {
   return eventChannel(emit => {
      metaMaskAccountsChanged(account => emit(account));
     return function() {
       console.log('de registering createMetaMaskAccountChannel');
     }
   })
 }
 
 export function* watchMetaMaskAccountChange() {
   const channel = yield call(createMetaMaskAccountChannel)
   while (true) {
     try {
       yield take(channel)
       yield put(startUpdateAccount())
     } catch(err) {
       console.error('error in Channel:', err)
       yield put(setOpen({ isSuccess: false, message: err.message }));
     }
   }
 }

function* updateAccountSaga() {
   try {
      const accounts = yield call(getAccounts);
      const address = accounts[0];
      if (!address) {
        yield put(updateAccount({ address: '', balance: 0 }));
      } else {
        const balance = yield call(getBalance, address)
        yield put(updateAccount({ address, balance }));
      }
   } catch (e) {
      yield put(updateAccountFailure(e.message));
   }
}

function* userSaga() {
  yield takeEvery(startUpdateAccount.type, updateAccountSaga);
  yield fork(watchMetaMaskAccountChange);
}

export default userSaga;
