import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../utils/axios'
const initialState = {
  data: [],
  one_data: [],
  interior_data: [],
  model_data: [],
  data_with_model_count: [],
  status: 'idle',
  with_model_count_status: 'idle',
  model_status: 'idle',
  interior_status: 'idle',
  error: null,
};
export const getCategories = createAsyncThunk('/catgories', async () => {
  const response = await api.get(`/categories/main/?orderBy=name&order=asc`)
  return response.data
})
export const getOneCategory = createAsyncThunk('/catgories/:id', async (id: any) => {
  const response = await api.get(`/categories/${id}`)
  return response.data
})
export const getCategoriesWithModelCount = createAsyncThunk('/catgories/?models_count=true', async () => {
  const response = await api.get(`/categories/main/?models_count=true&orderBy=name&order=asc`)
  return response.data
})
export const getModelCategories = createAsyncThunk('/model/categories', async () => {
  const response = await api.get(`/categories/main/?type=model`)
  return response.data
})
export const getInteriorCategories = createAsyncThunk('/interior/categories', async () => {
  const response = await api.get(`/categories/main/?type=interior`)
  return response.data
})
const categories = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    getCategories(state, action) {
      const { budget } = action.payload;
      // state.budget = budget;
    },
    setOneSelectedCategory: (state, actions: PayloadAction<any>) => {
      state.one_data = actions.payload
    },
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
        state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getCategories.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      .addCase(getOneCategory.pending, (state?: any, action?: any) => {
        state.one_status = 'loading'
      })
      .addCase(getOneCategory.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.one_status = 'succeeded'
        // Add any fetched posts to the array;
        state.one_data = [];
        state.one_data = state.one_data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getOneCategory.rejected, (state?: any, action?: any) => {
        state.one_status = 'failed'
        state.error = action.error.message
      })

      .addCase(getCategoriesWithModelCount.pending, (state?: any, action?: any) => {
        state.with_model_count_status = 'loading'
      })
      .addCase(getCategoriesWithModelCount.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.with_model_count_status = 'succeeded'
        // Add any fetched posts to the array;
        state.data_with_model_count = [];
        state.data_with_model_count = state.data_with_model_count.concat(action.payload)
        state.progress = 100
      })
      .addCase(getCategoriesWithModelCount.rejected, (state?: any, action?: any) => {
        state.with_model_count_status = 'failed'
        state.error = action.error.message
      })

      .addCase(getModelCategories.pending, (state?: any, action?: any) => {
        state.model_status = 'loading'
      })
      .addCase(getModelCategories.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.model_status = 'succeeded'
        // Add any fetched posts to the array;
        state.model_data = [];
        state.model_data = state.model_data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getModelCategories.rejected, (state?: any, action?: any) => {
        state.model_status = 'failed'
        state.error = action.error.message
      })

      .addCase(getInteriorCategories.pending, (state?: any, action?: any) => {
        state.interior_status = 'loading'
      })
      .addCase(getInteriorCategories.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.interior_status = 'succeeded'
        // Add any fetched posts to the array;
        state.interior_data = [];
        state.interior_data = state.interior_data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getInteriorCategories.rejected, (state?: any, action?: any) => {
        state.interior_status = 'failed'
        state.error = action.error.message
      })
  }
});
export const { setOneSelectedCategory } = categories.actions;
export const selectCategories = (state: any) => state?.categories?.data[0]?.data
export const selectOneCategory = (state: any) => state?.categories?.one_data[0]?.data
export const selectCategoriesWithModelCount = (state: any) => state?.categories?.data_with_model_count[0]?.data
export const selectModelCategories = (state: any) => state?.categories?.model_data[0]?.data
export const selectInteriorCategories = (state: any) => state?.categories?.interior_data[0]?.data
export const reducer = categories.reducer;
export default categories