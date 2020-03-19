import { createSlice } from '@reduxjs/toolkit'

const configSlice = createSlice({
  name: 'contract',
  initialState: {
    loading: false,
  },
  reducers: {
    startContractDeployment(state) { 
      state.loading = true;
    },
    contractDeploymentSuccess(state, action) {
      state.loading = false;
    },
    contractDeploymentError(state, action) {
      state.loading = false;
    }
  }
})
// Extract the action creators object and the reducer
const { actions, reducer } = configSlice;
// Extract and export each action creator by name
export const { startContractDeployment, contractDeploymentSuccess, contractDeploymentError } = actions;
// Export the reducer, either as a default or named export
export default reducer;
