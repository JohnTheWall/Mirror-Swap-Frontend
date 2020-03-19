import { put, takeEvery } from 'redux-saga/effects';
import {
  getCurrencies,
  successInGettingCurrencies,
  errorInGettingCurrenciese
} from './reducer';
import { fetchCurrencyUrl } from '../../constants'
import Axios from 'axios'

function* fetchCurrencies() {
  try {
    const json = yield Axios.get(fetchCurrencyUrl, {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.REACT_APP_COIN_MARKETCAP_API_KEY
      },
    }).then(async response => {
      if (response.data.status.error_code !== 0) {
        throw response.data
      }

      return response.data.data
    });

    yield put(successInGettingCurrencies(json));
  } catch (e) {
    console.log('Error in fetchCurrencies ----------: ', e);
    yield put(errorInGettingCurrenciese(e.message));
  }
}

function* fetchCurrenciesSaga() {
  yield takeEvery(getCurrencies.type, fetchCurrencies);
}

export default fetchCurrenciesSaga;
