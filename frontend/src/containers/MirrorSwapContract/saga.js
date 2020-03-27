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
  approveToken,
} from './reducer';
import { setOpen } from '../Notifications/reducer';
import MirrorSwap from '../../contracts/mirrorSwap';
import ERC20 from '../../contracts/erc20';
import { EMPTY_ADDRESS } from '../../constants';
import { getBalance } from '../../utils/metamask'; 

export const getContractData = state => state.mirrorSwapContract.contractData;
export const getUser = state => state.user;

function* getContractStateSaga(action) {
  try {
    const contractAddress = action.payload;
    const mirrorSwapContract = new MirrorSwap(contractAddress);
    const contractState = yield call(mirrorSwapContract.getState.bind(mirrorSwapContract));
    const user = yield select(getUser);
    let isTokensApprovedByMaker = false;
    let isTokensApprovedByTaker =false;
    let hasTokensDepositedByMaker = false;

    let takerDecimals = 18;
    if (contractState.takerAssetAddress !== EMPTY_ADDRESS) {
      const takerERC20Contract = new ERC20(contractState.takerAssetAddress);
      takerDecimals = yield call(takerERC20Contract.getDecimals.bind(takerERC20Contract));
    }
    const takerAssetAmount = new BigNumber(contractState.takerAssetAmount).dividedBy(`1e${takerDecimals}`).toString();

    let makerDecimals = 18;
    if (contractState.makerAssetAddress !== EMPTY_ADDRESS) {
      const makerERC20Contract = new ERC20(contractState.makerAssetAddress);
      makerDecimals = yield call(makerERC20Contract.getDecimals.bind(makerERC20Contract));
    }
    const makerAssetAmount = new BigNumber(contractState.makerAssetAmount).dividedBy(`1e${makerDecimals}`).toString();

    if (user.address === contractState.makerWalletAdress) {
      let balance;
      if (contractState.makerAssetAddress !== EMPTY_ADDRESS) {
        const inputContract = new ERC20(contractState.makerAssetAddress);
        const allowedBalance = yield call(inputContract.getAllowance.bind(inputContract), user.address, contractAddress);
        isTokensApprovedByMaker = new BigNumber(allowedBalance).isGreaterThan(0);
        balance = yield call(inputContract.getBalance.bind(inputContract), contractAddress);
      } else {
        isTokensApprovedByMaker = true;
        balance = yield call(getBalance, contractAddress);
      }

      hasTokensDepositedByMaker = new BigNumber(balance).isGreaterThanOrEqualTo(contractState.makerAssetAmount);
      if (hasTokensDepositedByMaker) {
        isTokensApprovedByMaker = hasTokensDepositedByMaker
      }
    } else {
      if (contractState.takerAssetAddress !== EMPTY_ADDRESS) {
        const inputContract = new ERC20(contractState.takerAssetAddress);
        const allowedBalance = yield call(inputContract.getAllowance.bind(inputContract), user.address, contractAddress);
        isTokensApprovedByTaker = new BigNumber(allowedBalance).isGreaterThan(0);
      } else {
        isTokensApprovedByTaker = true;
      }
    }

    yield put(getContractStateSuccess({ 
      ...contractState, 
      isTokensApprovedByMaker, 
      isTokensApprovedByTaker, 
      hasTokensDepositedByMaker,
      takerAssetAmount,
      makerAssetAmount,
      takerDecimals,
      makerDecimals,
    }));
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
    const user = yield select(getUser);
    let balance;

    if(contract.takerAssetAddress !== EMPTY_ADDRESS) {
      const inputContract = new ERC20(contract.takerAssetAddress);
      balance = yield call(inputContract.getBalance.bind(inputContract), user.address);
    } else {
      balance = user.balance;
    }

    const amountInInteger = (new BigNumber(contract.takerAssetAmount)).multipliedBy(`1e${contract.takerDecimals}`).toString();

    if (!(new BigNumber(balance)).isGreaterThanOrEqualTo(amountInInteger)) {
      throw Error('Insufficient Balance!')
    }

    const contractAddress = action.payload;
    const mirrorSwapContract = new MirrorSwap(contractAddress);
    const contractState = yield call(mirrorSwapContract.swapTakerAsset.bind(mirrorSwapContract), amountInInteger);
    yield put(actionSuccess(contractState));
    yield put(getContractState(contractAddress));
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
    let balance;
    const user = yield select(getUser);
    
    if(contract.makerAssetAddress !== EMPTY_ADDRESS) {
      const inputContract = new ERC20(contract.makerAssetAddress);
      balance = yield call(inputContract.getBalance.bind(inputContract), user.address);
    } else {
      balance = user.balance;
    }
    const amountInInteger = (new BigNumber(contract.makerAssetAmount)).multipliedBy(`1e${contract.makerDecimals}`).toString();

    if (!(new BigNumber(balance)).isGreaterThanOrEqualTo(amountInInteger)) {
      throw Error('Insufficient Balance!')
    }
    
    const contractAddress = action.payload;
    const mirrorSwapContract = new MirrorSwap(contractAddress);
    const txHash = yield call(mirrorSwapContract.depositMakerAsset.bind(mirrorSwapContract), amountInInteger);
    yield put(actionSuccess(txHash));
    yield put(getContractState(contractAddress));
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
    yield put(getContractState(contractAddress));
  } catch (e) {
    console.log('Error in swap cancel: ', e);
    yield put(actionFailure(e.message));
    yield put(setOpen({ isSuccess: false, message: e.message }))
  }
}

function* approveTokenSaga(action) {
  try {
    const { tokenContractAddress, spenderAddress, tokenAmount } = action.payload;
    const erc20 = new ERC20(tokenContractAddress);
    const decimals = yield call(erc20.getDecimals.bind(erc20));
    const amountInInteger = (new BigNumber(tokenAmount)).multipliedBy(`1e${decimals}`).toString();

    const txHash = yield call(erc20.approve.bind(erc20), spenderAddress, amountInInteger);

    yield put(actionSuccess(txHash));
    yield put(setOpen({ isSuccess: true, message: 'Token Amount Approved Successfully !' }))
    yield put(getContractState(spenderAddress));
  } catch (e) {
    console.log('Error in Approving Tokens: ', e);
    yield put(actionFailure(e.message));
    yield put(setOpen({ isSuccess: false, message: e.message }))
  }
}

function* mirrorSwapSaga() {
  yield takeEvery(getContractState.type, getContractStateSaga);
  yield takeEvery(depositMakerAsset.type, depositMakerAssetSaga);
  yield takeEvery(swapTakerAsset.type, swapTakerAssetSaga);
  yield takeEvery(cancelSwap.type, cancelSwapSaga);
  yield takeEvery(approveToken.type, approveTokenSaga);
}

export default mirrorSwapSaga;
