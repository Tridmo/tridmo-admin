import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios'
import Cookies from 'js-cookie'
import { modelOrderBy, order } from '../types/filters';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  progress: 0,
};
export const getDesignerDownloads = createAsyncThunk('/users/:username/downloads',
  async (wrapper: {
    username: string;
    name?: string;
    brand?: string;
    top?: boolean;
    categories?: any[];
    limit?: number;
    orderBy?: modelOrderBy | string;
    order?: order;
    page?: number;
  }) => {

    let send__route = `users/${wrapper?.username}/downloads`
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

    send__route +=
      wrapper?.limit
        ? (send__route?.includes("/?") ? `&limit=${wrapper?.limit}` : `/?limit=${wrapper?.limit}`)
        : "";

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

const get_designer_downloads = createSlice({
  name: 'get_designer_downloads',
  initialState,
  reducers: {
    resetMyProfile() {
      return {
        ...initialState
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getDesignerDownloads.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getDesignerDownloads.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.status = 'succeeded'
        // Add any fetched posts to the array;
        state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getDesignerDownloads.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const { resetMyProfile } = get_designer_downloads.actions;
export const reducer = get_designer_downloads.reducer;
export const selectDesignerDownloads = (state: any) => state?.get_designer_downloads?.data[0]
export default get_designer_downloads