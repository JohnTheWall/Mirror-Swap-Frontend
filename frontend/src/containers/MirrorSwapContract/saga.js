import { call, put, takeEvery } from 'redux-saga/effects';
import { 
  getContractState,
  getContractStateSuccess,
  getContractStateFailure,
  depositMakerAsset,
  swapTakerAsset,
  cancelSwap,
  actionSuccess,
  actionFailure,
} from './reducer';
import { setOpen } from '../Notifications/reducer';
import MirrorSwap from '../../contracts/mirrorSwap';

function* getContractStateSaga(action) {
  try {
    const contractAddress = action.payload;
    const mirrorSwapContract = new MirrorSwap(contractAddress);
    const contractState = yield call(mirrorSwapContract.getState.bind(mirrorSwapContract));
    yield put(getContractStateSuccess(contractState));
    yield put(setOpen({ isSuccess: true, message: 'Got Contract Successfully !' }))
  } catch (e) {
    console.log('Error in getting contract state: ', e);
    yield put(getContractStateFailure(e.message));
    yield put(setOpen({ isSuccess: false, message: e.message }))
  }
}

function* swapTakerAssetSaga(action) {
  try {
    const contractAddress = action.payload;
    const mirrorSwapContract = new MirrorSwap(contractAddress);
    const contractState = yield call(mirrorSwapContract.swapTakerAsset.bind(mirrorSwapContract));
    yield put(actionSuccess(contractState));
    yield put(setOpen({ isSuccess: true, message: 'Taker Asset Deposited Successfully !' }))
  } catch (e) {
    console.log('Error in swap taker deposit asset: ', e);
    yield put(actionFailure(e.message));
    yield put(setOpen({ isSuccess: false, message: e.message }))
  }
}

function* depositMakerAssetSaga(action) {
  try {
    const contractAddress = action.payload;
    const mirrorSwapContract = new MirrorSwap(contractAddress);
    const txHash = yield call(mirrorSwapContract.depositMakerAsset.bind(mirrorSwapContract));
    yield put(actionSuccess(txHash));
    yield put(setOpen({ isSuccess: true, message: 'Maker Asset Deposited Successfully !' }))
  } catch (e) {
    console.log('Error in depositing maker asset: ', e);
    yield put(actionFailure(e.message));
    yield put(setOpen({ isSuccess: false, message: e.message }))
  }
}

function* cancelSwapSaga(action) {
  try {
    const contractAddress = action.payload;
    const mirrorSwapContract = new MirrorSwap(contractAddress);
    const contractState = yield call(mirrorSwapContract.cancelSwap.bind(mirrorSwapContract));
    yield put(actionSuccess(contractState));
    yield put(setOpen({ isSuccess: true, message: 'Swap Cancelled Successfully !' }))
  } catch (e) {
    console.log('Error in swap cancel: ', e);
    yield put(actionFailure(e.message));
    yield put(setOpen({ isSuccess: false, message: e.message }))
  }
}

function* mirrorSwapSaga() {
  yield takeEvery(getContractState.type, getContractStateSaga);
  yield takeEvery(depositMakerAsset.type, depositMakerAssetSaga);
  yield takeEvery(swapTakerAsset.type, swapTakerAssetSaga);
  yield takeEvery(cancelSwap.type, cancelSwapSaga);
}

export default mirrorSwapSaga;
