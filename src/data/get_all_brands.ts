import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios'
import { brandOrderBy, order } from '../types/filters';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  progress: 0,
};
export const getAllBrands = createAsyncThunk('/brands',
  async (wrapper?: {
    name?: string;
    limit?: number;
    orderBy?: brandOrderBy;
    order?: order;
    page?: number;
  }) => {
    let send__route = `/brands`

    if (wrapper?.name) {
      send__route += `/?name=${wrapper?.name}`
    }

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

const get_all_brands = createSlice({
  name: 'get_all_brands',
  initialState,
  reducers: {
    resetAllBrands() {
      return {
        ...initialState
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllBrands.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getAllBrands.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.status = 'succeeded'
        // Add any fetched posts to the array;
        state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getAllBrands.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const { resetAllBrands } = get_all_brands.actions;
export const reducer = get_all_brands.reducer;
export const selectAllBrands = (state: any) => state?.get_all_brands?.data[0]
export default get_all_brands;