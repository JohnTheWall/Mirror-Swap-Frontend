import { createSlice } from '@reduxjs/toolkit'

const configSlice = createSlice({
  name: 'user',
  initialState: {
    address: '',
    balance: '',
    incrementCountOfUser: 0,
    error: '',
  },
  reducers: {
    startUpdateAccount() {},
    updateAccount(state, action) {
      state.address = action.payload.address;
      state.balance = action.payload.balance;
      state.incrementCountOfUser = action.payload.incrementCountOfUser;
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
