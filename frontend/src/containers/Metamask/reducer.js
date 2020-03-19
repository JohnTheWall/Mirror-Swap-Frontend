import { createSlice } from '@reduxjs/toolkit'

const configSlice = createSlice({
  name: 'metamask',
  initialState: {
    isAvailable: false,
    networkId: 3,
  },
  reducers: {
    connectMetamask() { },
    updateMetaMask(state, action) {
      state.isAvailable = action.payload.isAvailable;
    },
    updateNetworkId(state, action) {
      state.networkId = action.payload.networkId;
    }
  }
})
// Extract the action creators object and the reducer
const { actions, reducer } = configSlice;
// Extract and export each action creator by name
export const { updateMetaMask, updateNetworkId, connectMetamask } = actions;
// Export the reducer, either as a default or named export
export default reducer;
