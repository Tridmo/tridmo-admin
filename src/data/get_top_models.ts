import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  progress: 0,
};
export const getTopModels = createAsyncThunk('/models/?top=true',
  async (wrapper?: {
    limit?: number;
    [x: string]: any;
  }) => {
    let send__route = `/models/?top=true`

    wrapper?.categories?.forEach(category_id => {
      send__route += send__route.includes("/?") ? `&categories=${category_id}` : `/?categories=${category_id}`;
    });

    wrapper?.colors?.forEach(color_id => {
      send__route += send__route.includes("/?") ? `&colors=${color_id}` : `/?colors=${color_id}`;
    });

    wrapper?.styles?.forEach(style_id => {
      send__route += send__route.includes("/?") ? `&styles=${style_id}` : `/?styles=${style_id}`;
    });

    send__route +=
      wrapper?.brand_id
        ? (send__route?.includes("/?") ? `&brand_id=${wrapper?.brand_id}` : `/?brand_id=${wrapper?.brand_id}`)
        : "";

    send__route +=
      wrapper?.limit
        ? (send__route?.includes("/?") ? `&limit=${wrapper?.limit}` : `/?limit=${wrapper?.limit}`)
        : "";

    send__route +=
      wrapper?.orderBy
        ? (send__route?.includes("/?") ? `&orderBy=${wrapper?.orderBy}` : `/?orderBy=${wrapper?.orderBy}`)
        : "";

    send__route += !send__route.includes("/?") && wrapper?.page ? `/?page=${wrapper.page}` : wrapper?.page ? `&page=${wrapper.page}` : "";

    const response = await api.get(send__route)
    return response.data
  })

const get_top_models = createSlice({
  name: 'get_top_models',
  initialState,
  reducers: {
    resetTopModels() {
      return {
        ...initialState
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getTopModels.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getTopModels.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.status = 'succeeded'
        // Add any fetched posts to the array;
        state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getTopModels.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const { resetTopModels } = get_top_models.actions;
export const reducer = get_top_models.reducer;
export const selectTopModels = (state: any) => state?.get_top_models?.data[0]?.data?.models
export default get_top_models;