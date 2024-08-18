import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios'
import { order, tagsLimit, tagsOrderBy } from '../types/filters';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  progress: 0,
};
export const getAllTags = createAsyncThunk('/tags',
  async (wrapper?: {
    user_name?: string;
    model_name?: string;
    interior_name?: string;
    limit?: number;
    orderBy?: tagsOrderBy | string;
    order?: order;
    page?: number;
  }) => {
    let send__route = `/tags`

    if (wrapper?.user_name) {
      send__route += send__route.includes("/?") ? `&user_name=${wrapper?.user_name}` : `/?user_name=${wrapper?.user_name}`
    }

    if (wrapper?.model_name) {
      send__route += send__route.includes("/?") ? `&model_name=${wrapper?.model_name}` : `/?model_name=${wrapper?.model_name}`
    }

    if (wrapper?.interior_name) {
      send__route += send__route.includes("/?") ? `&interior_name=${wrapper?.interior_name}` : `/?interior_name=${wrapper?.interior_name}`
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

const get_all_tags = createSlice({
  name: 'get_all_tags',
  initialState,
  reducers: {
    resetAllTags() {
      return {
        ...initialState
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllTags.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getAllTags.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.status = 'succeeded'
        // Add any fetched posts to the array;
        state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getAllTags.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const { resetAllTags } = get_all_tags.actions;
export const reducer = get_all_tags.reducer;
export const selectAllTags = (state: any) => state?.get_all_tags?.data?.[0]?.data
export const selectAllTags_status = (state: any) => state?.get_all_tags?.status
export default get_all_tags;