import BigNumber from 'bignumber.js'
import { call, put, takeEvery, select } from 'redux-saga/effects';
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
import ERC20 from '../../contracts/erc20';
import { EMPTY_ADDRESS } from '../../constants';

export const getContractData = state => state.mirrorSwapContract.contractData;
export const getUser = state => state.user;

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
    const contract = yield select(getContractData);
    if(contract.takerAssetAddress !== EMPTY_ADDRESS) {
      const inputContract = new ERC20(contract.takerAssetAddress);
      const user = yield select(getUser);

      const balance = yield call(inputContract.getBalance.bind(inputContract), user.address);
      
      if (!(new BigNumber(balance)).isGreaterThanOrEqualTo(contract.takerAssetAmount)) {
        throw Error('Insufficient Balance!')
      }
    }

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
    const contract = yield select(getContractData);

    if(contract.makerAssetAddress !== EMPTY_ADDRESS) {
      const inputContract = new ERC20(contract.makerAssetAddress);
      const balance = yield call(inputContract.getBalance.bind(inputContract), contract.makerWalletAdress);

      if (!(new BigNumber(balance)).isGreaterThanOrEqualTo(contract.makerAssetAmount)) {
        throw Error('Insufficient Balance!')
      }
    }
    
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
