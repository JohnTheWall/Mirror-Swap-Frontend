import { createSlice } from '@reduxjs/toolkit'

const configSlice = createSlice({
  name: 'mirrorSwapContract',
  initialState: {
    loadingContractState: false,
    loadingAction: false,
    contractAddress: '',
    contractData: {
      makerAssetAddress: '',
      takerAssetAddress: '',
      makerAssetAmount: '',
      takerAssetAmount: '',
      makerWalletAdress: '',
      takerWalletAddress: '',
      RevertTimestamp: '',
      swapComplete: false,
    },
    error: '',
  },
  reducers: {
    getContractState(state, action) { 
      state.loadingContractState = true;
      state.contractAddress = action.payload;
    },
    getContractStateSuccess(state, action) {
      state.loadingContractState = false;
      state.contractData = action.payload;
    },
    getContractStateFailure(state, action) {
      state.loadingContractState = false;
      state.error = action.payload;
    },
    depositMakerAsset(state, action) { 
      state.loadingAction = true;
      state.contractAddress = action.payload;
    },
    swapTakerAsset(state, action) { 
      state.loadingAction = true;
      state.contractAddress = action.payload;
    },
    cancelSwap(state, action) { 
      state.loadingAction = true;
      state.contractAddress = action.payload;
    },
    actionSuccess(state) {
      state.loadingAction = false;
    },
    actionFailure(state) {
      state.loadingAction = false;
    },
  }
})
// Extract the action creators object and the reducer
const { actions, reducer } = configSlice;
// Extract and export each action creator by name
export const { 
  getContractState, 
  getContractStateSuccess, 
  getContractStateFailure, 
  depositMakerAsset,
  swapTakerAsset,
  cancelSwap,
  actionSuccess,
  actionFailure,
} = actions;
// Export the reducer, either as a default or named export
export default reducer;
