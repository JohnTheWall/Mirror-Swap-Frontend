import { createSlice } from '@reduxjs/toolkit'

const configSlice = createSlice({
  name: 'user',
  initialState: {
    address: '',
    balance: '',
    error: '',
  },
  reducers: {
    startUpdateAccount() {},
    updateAccount(state, action) {
      state.address = action.payload.address;
      state.balance = action.payload.balance;
    },
    updateAccountFailure(state, action) {
      state.error = action.payload.error;
    },
  }
})
// Extract the action creators object and the reducer
const { actions, reducer } = configSlice;
// Extract and export each action creator by name
export const { updateAccount, startUpdateAccount, updateAccountFailure } = actions;

// Export the reducer, either as a default or named export
export default reducer;
