import { put, takeEvery } from 'redux-saga/effects';
import {
  getCurrencies,
  successInGettingCurrencies,
  errorInGettingCurrenciese
} from './reducer';
import { backendUrl } from '../../constants'
import Axios from 'axios'

function* fetchCurrencies() {
  try {
    const response = yield Axios.get(`${backendUrl}/tokens`)
    yield put(successInGettingCurrencies(response.data));
  } catch (e) {
    console.log('Error in fetchCurrencies ----------: ', e);
    yield put(errorInGettingCurrenciese(e.message));
  }
}

function* fetchCurrenciesSaga() {
  yield takeEvery(getCurrencies.type, fetchCurrencies);
}

export default fetchCurrenciesSaga;
