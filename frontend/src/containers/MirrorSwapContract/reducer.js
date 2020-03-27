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
      isTokensApprovedByMaker: false,
      isTokensApprovedByTaker: false,
      hasTokensDepositedByMaker: false,
      takerDecimals: 18,
      makerDecimals: 18,
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
    depositMakerAsset(state) { 
      state.loadingAction = true;
    },
    swapTakerAsset(state) { 
      state.loadingAction = true;
    },
    cancelSwap(state) { 
      state.loadingAction = true;
    },
    approveToken(state) { 
      state.loadingAction = true;
    },
    actionSuccess(state) {
      state.loadingAction = false;
    },
    actionFailure(state, action) {
      state.loadingAction = false;
      state.error = action.payload;
    }
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
  approveToken,
} = actions;
// Export the reducer, either as a default or named export
export default reducer;
