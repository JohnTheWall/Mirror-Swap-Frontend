import BigNumber from 'bignumber.js'
import { call, put, takeEvery, select } from 'redux-saga/effects';
import { 
  startContractDeployment,
  contractDeploymentSuccess,
  contractDeploymentError,
} from './reducer';
import { setOpen } from '../Notifications/reducer';
import MirrorSwap from '../../contracts/mirrorSwap';
import ERC20 from '../../contracts/erc20';
import { push } from 'connected-react-router'

export const getUser = state => state.user;

function* deployContract(action) {
  try {
    const { inputCurrency, outputCurrency, inputValue, outputValue } = action.payload;

    const makerAsset = inputCurrency.tokenAddress;
    const takerAsset = outputCurrency.tokenAddress;
    
    let makerAssetAmount, takerAssetAmount;
    const user = yield select(getUser);
    let balance;

    if (inputCurrency.symbol !== 'ETH') {
      const inputContract  = new ERC20(makerAsset);
      const inputCurrencyDecimals = yield call(inputContract.getDecimals.bind(inputContract));
      makerAssetAmount = new BigNumber(inputValue).multipliedBy(`1e${inputCurrencyDecimals}`).toFixed(0).toString();
      balance = yield call(inputContract.getBalance.bind(inputContract), user.address);
    } else {
      makerAssetAmount = new BigNumber(inputValue).multipliedBy(1e18).toFixed().toString();
      balance = user.balance
    }

    if (!(new BigNumber(balance)).isGreaterThanOrEqualTo(makerAssetAmount)) {
      throw Error('Insufficient Balance!')
    }

    if (outputCurrency.symbol !== 'ETH') {
      const outputContract  = new ERC20(takerAsset);
      const outputCurrencyDecimals = yield call(outputContract.getDecimals.bind(outputContract));
      takerAssetAmount = new BigNumber(outputValue).multipliedBy(`1e${outputCurrencyDecimals}`).toFixed(0).toString();
    } else {
      takerAssetAmount = new BigNumber(outputValue).multipliedBy(1e18).toFixed().toString();
    }

    const mirrorSwapContract = new MirrorSwap();

    const data = yield call(
      mirrorSwapContract.deployContract.bind(mirrorSwapContract),
      makerAsset,
      takerAsset,
      makerAssetAmount,
      takerAssetAmount,
    );

    const contractAddress = data.options.address;
    yield put(push(`/fill/${contractAddress}`));
    yield put(contractDeploymentSuccess(data));
    yield put(setOpen({ isSuccess: true, message: 'Contract Deployed Successfully !' }))
  } catch (e) {
    console.log('Error in Contract Deployment: ', e);
    yield put(contractDeploymentError());
    yield put(setOpen({ isSuccess: false, message: e.message }))
  }
}

function* mirrorSwapContractSaga() {
  yield takeEvery(startContractDeployment.type, deployContract);
}

export default mirrorSwapContractSaga;
