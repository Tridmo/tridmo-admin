import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios'
import Cookies from 'js-cookie';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  progress: 0,
};
export const getOneInterior = createAsyncThunk('/interiors/:id', async (id: any) => {
  const response = await api.get(`interiors/${id}`)
  return response.data
})

const get_one_interior = createSlice({
  name: 'get_one_interior',
  initialState,
  reducers: {
    getOneInteriorReducer(state?: any, action?: any) {
      const { one_interior } = action.payload;
      state.customers = one_interior;
    },
    resetOneInterior() {
      return {
        ...initialState
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getOneInterior.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getOneInterior.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.status = 'succeeded'
        // Add any fetched posts to the array;
        state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getOneInterior.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const { resetOneInterior, getOneInteriorReducer } = get_one_interior.actions;
export const reducer = get_one_interior.reducer;
export const selectOneInterior = (state: any) => state?.get_one_interior?.data[0]?.data?.interior
export default get_one_interior;