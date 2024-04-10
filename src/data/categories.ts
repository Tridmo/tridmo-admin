import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios'
const initialState = {
  data: [],
  interior_data: [],
  status: 'idle',
  interior_status: 'idle',
  error: null,
};
export const getCategories = createAsyncThunk('/catgories', async () => {
  const response = await api.get(`/categories/main?type=model`)
  return response.data
})
export const getInteriorCategories = createAsyncThunk('/interior/categories', async () => {
  const response = await api.get(`/categories/main?type=interior`)
  return response.data
})
const categories = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    getCategories(state, action) {
      const { budget } = action.payload;
      // state.budget = budget;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getCategories.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getCategories.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.status = 'succeeded'
        // Add any fetched posts to the array;
        //   state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getCategories.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(getInteriorCategories.pending, (state?: any, action?: any) => {
        state.interior_status = 'loading'
      })
      .addCase(getInteriorCategories.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.interior_status = 'succeeded'
        // Add any fetched posts to the array;
        //   state.data = [];
        state.interior_data = state.interior_data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getInteriorCategories.rejected, (state?: any, action?: any) => {
        state.interior_status = 'failed'
        state.error = action.error.message
      })
  }
});
// export const { resetcategories } = categories.actions;
export const selectCategories = (state: any) => state?.categories?.data[0]?.data
export const selectInteriorCategories = (state: any) => state?.categories?.interior_data[0]?.data
// export default categories
export const reducer = categories.reducer;