import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios'
import { order, tagsLimit, tagsOrderBy } from '../types/filters';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  progress: 0,
};
export const getAllDownloads = createAsyncThunk('/downloads',
  async (wrapper?: {
    user_name?: string;
    model_name?: string;
    limit?: number;
    orderBy?: tagsOrderBy | string;
    order?: order;
    page?: number;
  }) => {
    let send__route = `/downloads`

    if (wrapper?.user_name) {
      send__route += send__route.includes("/?") ? `&user_name=${wrapper?.user_name}` : `/?user_name=${wrapper?.user_name}`
    }

    if (wrapper?.model_name) {
      send__route += send__route.includes("/?") ? `&model_name=${wrapper?.model_name}` : `/?model_name=${wrapper?.model_name}`
    }

    send__route +=
      wrapper?.limit
        ? (send__route?.includes("/?") ? `&limit=${wrapper?.limit}` : `/?limit=${wrapper?.limit}`)
        : (send__route?.includes("/?") ? `&limit=${tagsLimit}` : `/?limit=${tagsLimit}`);

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
  })

const get_all_downloads = createSlice({
  name: 'get_all_downloads',
  initialState,
  reducers: {
    resetAllDownloads() {
      return {
        ...initialState
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllDownloads.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getAllDownloads.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.status = 'succeeded'
        // Add any fetched posts to the array;
        state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getAllDownloads.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const { resetAllDownloads } = get_all_downloads.actions;
export const reducer = get_all_downloads.reducer;
export const selectAllDownloads = (state: any) => state?.get_all_downloads?.data?.[0]?.data
export const selectAllDownloads_status = (state: any) => state?.get_all_downloads?.status
export default get_all_downloads;