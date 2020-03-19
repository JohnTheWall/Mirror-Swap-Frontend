import { createSlice } from '@reduxjs/toolkit'
import { EXCHANGE_RATES } from '../../constants'

const configSlice = createSlice({
  name: 'currencies',
  initialState: {
    error: null,
    loading: false,
    exchangeRates: EXCHANGE_RATES
  },
  reducers: {
    getExchangeRates(state) {
      state.loading = true;
    },
    successInGettingExchangeRates(state, action) {
      state.exchangeRates = action.payload;
      state.loading = false;
    },
    errorInGettingExchangeRates(state, action) {
      state.error = action.payload;
      state.loading = false;
    }
  }
})
// Extract the action creators object and the reducer
const { actions, reducer } = configSlice;
// Extract and export each action creator by name
export const {
  getExchangeRates,
  successInGettingExchangeRates,
  errorInGettingExchangeRates
} = actions;
// Export the reducer, either as a default or named export
export default reducer;
