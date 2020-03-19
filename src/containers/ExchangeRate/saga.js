import { put, takeEvery } from 'redux-saga/effects';
import {
  getExchangeRates,
  successInGettingExchangeRates,
  errorInGettingExchangeRates
} from './reducer';
import { fetchExchangeRatesUrl } from '../../apis/index'
import Axios from 'axios'

function* fetchExchangeRates() {
  try {
    const json = yield Axios
      .get(fetchExchangeRatesUrl)
      .then(async response => {
        if (response.data.success === false) {
          throw response.data
        }

        return response.data
      });

    yield put(successInGettingExchangeRates(json));
  } catch (e) {
    console.log('Error in fetchExchangeRates ----------: ', e);
    yield put(errorInGettingExchangeRates(e.message));
  }
}

function* fetchCurrenciesSaga() {
  yield takeEvery(getExchangeRates.type, fetchExchangeRates);
}

export default fetchCurrenciesSaga;
