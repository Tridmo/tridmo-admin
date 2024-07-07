import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../utils/axios'
const initialState = {
  data: [],
  one_data: [],
  interior_data: [],
  brand_data: [],
  user_downloads_data: [],
  user_interiors_data: [],
  model_data: [],
  model_tags_data: [],
  data_with_model_count: [],
  status: 'idle',
  with_model_count_status: 'idle',
  model_status: 'idle',
  model_tags_status: 'idle',
  interior_status: 'idle',
  user_downloads_status: 'idle',
  user_interiors_status: 'idle',
  brand_status: 'idle',

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
export const getCategoriesByUserDownloads = createAsyncThunk('/catgories/user/downloads/:username', async (username: string) => {
  const response = await api.get(`/categories/user/downloads/${username}/?orderBy=name&order=asc`)
  return response.data
})
export const getCategoriesByUserInteriors = createAsyncThunk('/catgories/user/interiors/:username', async (username: string) => {
  const response = await api.get(`/categories/user/interiors/${username}/?orderBy=name&order=asc`)
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
export const getBrandCategories = createAsyncThunk('/brand/categories', async (brand_id: string) => {
  const response = await api.get(`/categories/brand/${brand_id}`)
  return response.data
})
export const getModelTagsCategories = createAsyncThunk('/model_tags/categories', async (model_id: string) => {
  const response = await api.get(`/categories/model_tags/${model_id}`)
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

      .addCase(getCategoriesByUserDownloads.pending, (state?: any, action?: any) => {
        state.user_downloads_status = 'loading'
      })
      .addCase(getCategoriesByUserDownloads.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.user_downloads_status = 'succeeded'
        // Add any fetched posts to the array;
        state.user_downloads_data = [];
        state.user_downloads_data = state.user_downloads_data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getCategoriesByUserDownloads.rejected, (state?: any, action?: any) => {
        state.user_downloads_status = 'failed'
        state.error = action.error.message
      })

      .addCase(getCategoriesByUserInteriors.pending, (state?: any, action?: any) => {
        state.user_interiors_status = 'loading'
      })
      .addCase(getCategoriesByUserInteriors.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.user_interiors_status = 'succeeded'
        // Add any fetched posts to the array;
        state.user_interiors_data = [];
        state.user_interiors_data = state.user_interiors_data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getCategoriesByUserInteriors.rejected, (state?: any, action?: any) => {
        state.user_interiors_status = 'failed'
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

      .addCase(getBrandCategories.pending, (state?: any, action?: any) => {
        state.brand_status = 'loading'
      })
      .addCase(getBrandCategories.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.brand_status = 'succeeded'
        // Add any fetched posts to the array;
        state.brand_data = [];
        state.brand_data = state.brand_data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getBrandCategories.rejected, (state?: any, action?: any) => {
        state.brand_status = 'failed'
        state.error = action.error.message
      })

      .addCase(getModelTagsCategories.pending, (state?: any, action?: any) => {
        state.model_tags_status = 'loading'
      })
      .addCase(getModelTagsCategories.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.model_tags_status = 'succeeded'
        // Add any fetched posts to the array;
        state.model_tags_data = [];
        state.model_tags_data = state.model_tags_data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getModelTagsCategories.rejected, (state?: any, action?: any) => {
        state.model_tags_status = 'failed'
        state.error = action.error.message
      })
  }
});
export const { setOneSelectedCategory } = categories.actions;
export const selectCategories = (state: any) => state?.categories?.data[0]?.data
export const selectOneCategory = (state: any) => state?.categories?.one_data[0]?.data
export const selectCategoriesWithModelCount = (state: any) => state?.categories?.data_with_model_count[0]?.data
export const selectCategoriesByUserDownloads = (state: any) => state?.categories?.user_downloads_data[0]?.data
export const selectCategoriesByUserInteriors = (state: any) => state?.categories?.user_interiors_data[0]?.data
export const selectModelCategories = (state: any) => state?.categories?.model_data[0]?.data
export const selectInteriorCategories = (state: any) => state?.categories?.interior_data[0]?.data
export const selectBrandCategories = (state: any) => state?.categories?.brand_data[0]?.data
export const selectModelTagsCategories = (state: any) => state?.categories?.model_tags_data[0]?.data

export const reducer = categories.reducer;
export default categories