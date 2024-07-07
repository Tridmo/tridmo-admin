import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios'
import { brandOrderBy, order } from '../types/filters';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  progress: 0,
};
export const getAllBrandsByUserDownloads = createAsyncThunk('/brands/user/:username',
  async (wrapper?: {
    username: string;
    name?: string;
    limit?: number;
    orderBy?: brandOrderBy;
    order?: order;
    page?: number;
  }) => {
    let send__route = `/brands/user/${wrapper?.username}`

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

const get_brands_by_user_downloads = createSlice({
  name: 'get_brands_by_user_downloads',
  initialState,
  reducers: {
    resetAllBrandsByUserDownloads() {
      return {
        ...initialState
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllBrandsByUserDownloads.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getAllBrandsByUserDownloads.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.status = 'succeeded'
        // Add any fetched posts to the array;
        state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getAllBrandsByUserDownloads.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const { resetAllBrandsByUserDownloads } = get_brands_by_user_downloads.actions;
export const reducer = get_brands_by_user_downloads.reducer;
export const selectAllBrandsByUserDownloads = (state: any) => state?.get_brands_by_user_downloads?.data[0]
export default get_brands_by_user_downloads;