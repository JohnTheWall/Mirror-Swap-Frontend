import { createSlice } from '@reduxjs/toolkit'
import { INITIAL_CURRENCY_DATA } from '../../constants'

const configSlice = createSlice({
  name: 'currencies',
  initialState: {
    error: null,
    loading: false,
    currencies: INITIAL_CURRENCY_DATA
  },
  reducers: {
    getCurrencies(state) {
      state.loading = true;
    },
    successInGettingCurrencies(state, action) {
      state.currencies = action.payload;
      state.loading = false;
    },
    errorInGettingCurrencies(state, action) {
      state.error = action.payload;
      state.loading = false;
    }
  }
})
// Extract the action creators object and the reducer
const { actions, reducer } = configSlice;
// Extract and export each action creator by name
export const {
  getCurrencies,
  successInGettingCurrencies,
  errorInGettingCurrenciese
} = actions;
// Export the reducer, either as a default or named export
export default reducer;
