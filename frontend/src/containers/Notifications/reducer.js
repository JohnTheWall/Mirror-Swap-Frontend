import { createSlice } from '@reduxjs/toolkit'

const configSlice = createSlice({
  name: 'notifications',
  initialState: {
    open: false,
    message: '',
    isSuccess: false,
  },
  reducers: {
    setOpen(state, action) {
      state.open = true;
      state.message = action.payload.message;
      state.isSuccess = action.payload.isSuccess;
    },
    setClose(state) {
      state.open = false;
    },
  }
})

const { actions, reducer } = configSlice;

export const { setOpen, setClose } = actions;

export default reducer;
