import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios'
import { modelOrderBy, modelsLimit, order } from '../types/filters';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  progress: 0,
};
export const getAllModels = createAsyncThunk('/models',
  async (wrapper?: {
    name?: string;
    brand?: string;
    top?: boolean;
    categories?: any[];
    colors?: any[];
    styles?: any[];
    limit?: number;
    orderBy?: modelOrderBy | string;
    order?: order;
    page?: number;
  }) => {
    try {
      let send__route = `/models`

      if (wrapper?.brand) {
        send__route += send__route.includes("/?") ? `&brand_id=${wrapper?.brand}` : `/?brand_id=${wrapper?.brand}`
      }
      if (wrapper?.name) {
        send__route += send__route.includes("/?") ? `&name=${wrapper?.name}` : `/?name=${wrapper?.name}`
      }
      if (wrapper?.top != undefined) {
        send__route += send__route.includes("/?") ? `&top=${wrapper?.top}` : `/?top=${wrapper?.top}`
      }

      if (wrapper?.categories?.length) wrapper?.categories?.forEach(category_id => {
        send__route += send__route.includes("/?") ? `&categories=${category_id}` : `/?categories=${category_id}`;
      });

      if (wrapper?.colors?.length) wrapper?.colors?.forEach(color_id => {
        send__route += send__route.includes("/?") ? `&colors=${color_id}` : `/?colors=${color_id}`;
      });

      if (wrapper?.styles?.length) wrapper?.styles?.forEach(style_id => {
        send__route += send__route.includes("/?") ? `&styles=${style_id}` : `/?styles=${style_id}`;
      });

      send__route +=
        wrapper?.limit
          ? (send__route?.includes("/?") ? `&limit=${wrapper?.limit}` : `/?limit=${wrapper?.limit}`)
          : (send__route?.includes("/?") ? `&limit=${modelsLimit}` : `/?limit=${modelsLimit}`);

      send__route +=
        wrapper?.orderBy
          ? (send__route?.includes("/?") ? `&orderBy=${wrapper?.orderBy}` : `/?orderBy=${wrapper?.orderBy}`)
          : "";

      send__route +=
        wrapper?.order
          ? (send__route?.includes("/?") ? `&order=${wrapper?.order}` : `/?order=${wrapper?.order}`)
          : "";

      send__route += !send__route.includes("/?") && wrapper?.page ? `/?page=${wrapper.page}` : wrapper?.page ? `&page=${wrapper.page}` : "";

      const response = await api.get(send__route)
      return response.data
    } catch (error) {
      console.log(error);
    }
  })

const get_all_models = createSlice({
  name: 'get_all_models',
  initialState,
  reducers: {
    resetAllModels() {
      return {
        ...initialState
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllModels.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getAllModels.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.status = 'succeeded'
        // Add any fetched posts to the array;
        state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getAllModels.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const { resetAllModels } = get_all_models.actions;
export const reducer = get_all_models.reducer;
export const selectAllModels = (state: any) => state?.get_all_models?.data[0]
export default get_all_models;