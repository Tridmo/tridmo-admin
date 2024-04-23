import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  progress: 0,
};
export const getOneBrand = createAsyncThunk(`/brands/:id`, async (id: string) => {
  const response = await api.get(`/brands/${id}`)
  return response.data
})

const get_one_brand = createSlice({
  name: 'get_one_brand',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOneBrand.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getOneBrand.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.status = 'succeeded'
        // Add any fetched posts to the array;
        state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getOneBrand.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});


export const reducer = get_one_brand.reducer;
export const selectOneBrand = (state: any) => state?.get_one_brand?.data[0]?.data?.brand
export default get_one_brand