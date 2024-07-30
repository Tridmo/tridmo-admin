import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios'
import { interiorsOrderBy, order } from '../types/filters';

const initialState = {
  data: [],
  checked_data: [],
  unchecked_data: [],
  status: 'idle',
  checked_status: 'idle',
  unchecked_status: 'idle',
  error: null,
  progress: 0,
};
export const getAllInteriors = createAsyncThunk('/interiors',
  async (wrapper?: {
    categories?: any[];
    styles?: any[];
    name?: string;
    author?: string;
    page?: number;
    limit?: number;
    status?: string;
    order?: order;
    orderBy?: interiorsOrderBy;
  }) => {
    let send__route = `/interiors`

    wrapper?.categories?.forEach(category_id => {
      send__route += send__route.includes("/?") ? `&categories=${category_id}` : `/?categories=${category_id}`;
    });

    wrapper?.styles?.forEach(style_id => {
      send__route += !send__route.includes("/?") ? `/?styles=${style_id}` : `&styles=${style_id}`;
    });

    send__route +=
      !send__route.includes("/?") && wrapper?.author
        ? `/?author=${wrapper.author}`
        : wrapper?.author
          ? `&author=${wrapper.author}`
          : "";

    send__route +=
      wrapper?.name
        ? (send__route.includes("/?") ? `&name=${wrapper.name}` : `/?name=${wrapper.name}`)
        : "";

    send__route +=
      wrapper?.status
        ? (send__route.includes("/?") ? `&status=${wrapper.status}` : `/?status=${wrapper.status}`)
        : "";


    send__route +=
      wrapper?.page
        ? (send__route.includes("/?") ? `&page=${wrapper.page}` : `/?page=${wrapper.page}`)
        : "";

    send__route +=
      wrapper?.limit
        ? (send__route?.includes("/?") ? `&limit=${wrapper?.limit}` : `/?limit=${wrapper?.limit}`)
        : "";

    send__route +=
      wrapper?.orderBy
        ? (send__route?.includes("/?") ? `&orderBy=${wrapper?.orderBy}` : `/?orderBy=${wrapper?.orderBy}`)
        : "";

    const response = await api.get(send__route)
    return response.data
  })
export const getCheckedInteriors = createAsyncThunk('/interiors/checked',
  async (wrapper?: any) => {
    let send__route = `/interiors/?status=1`

    wrapper?.categories?.forEach(category_id => {
      send__route += send__route.includes("/?") ? `&categories=${category_id}` : `/?categories=${category_id}`;
    });

    wrapper?.styles?.forEach(style_id => {
      send__route += !send__route.includes("/?") ? `/?styles=${style_id}` : `&styles=${style_id}`;
    });

    send__route +=
      !send__route.includes("/?") && wrapper?.author
        ? `/?author=${wrapper.author}`
        : wrapper?.author
          ? `&author=${wrapper.author}`
          : "";

    send__route +=
      wrapper?.page
        ? (send__route.includes("/?") ? `&page=${wrapper.page}` : `/?page=${wrapper.page}`)
        : "";

    send__route +=
      wrapper?.limit
        ? (send__route?.includes("/?") ? `&limit=${wrapper?.limit}` : `/?limit=${wrapper?.limit}`)
        : "";

    send__route +=
      wrapper?.orderBy
        ? (send__route?.includes("/?") ? `&orderBy=${wrapper?.orderBy}` : `/?orderBy=${wrapper?.orderBy}`)
        : "";

    const response = await api.get(send__route)
    return response.data
  })
export const getUncheckedInteriors = createAsyncThunk('/interiors/unchecked',
  async (wrapper?: any) => {
    let send__route = `/interiors/?status=0`

    wrapper?.categories?.forEach(category_id => {
      send__route += send__route.includes("/?") ? `&categories=${category_id}` : `/?categories=${category_id}`;
    });

    wrapper?.styles?.forEach(style_id => {
      send__route += !send__route.includes("/?") ? `/?styles=${style_id}` : `&styles=${style_id}`;
    });

    send__route +=
      !send__route.includes("/?") && wrapper?.author
        ? `/?author=${wrapper.author}`
        : wrapper?.author
          ? `&author=${wrapper.author}`
          : "";

    send__route +=
      wrapper?.page
        ? (send__route.includes("/?") ? `&page=${wrapper.page}` : `/?page=${wrapper.page}`)
        : "";

    send__route +=
      wrapper?.limit
        ? (send__route?.includes("/?") ? `&limit=${wrapper?.limit}` : `/?limit=${wrapper?.limit}`)
        : "";

    send__route +=
      wrapper?.orderBy
        ? (send__route?.includes("/?") ? `&orderBy=${wrapper?.orderBy}` : `/?orderBy=${wrapper?.orderBy}`)
        : "";

    const response = await api.get(send__route)
    return response.data
  })

const get_all_interiors = createSlice({
  name: 'get_all_interiors',
  initialState,
  reducers: {
    resetAllInteriors() {
      return {
        ...initialState
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllInteriors.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getAllInteriors.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.status = 'succeeded'
        // Add any fetched posts to the array;
        state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getAllInteriors.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      .addCase(getCheckedInteriors.pending, (state?: any, action?: any) => {
        state.checked_status = 'loading'
      })
      .addCase(getCheckedInteriors.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.checked_status = 'succeeded'
        // Add any fetched posts to the array;
        state.checked_data = [];
        state.checked_data = state.checked_data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getCheckedInteriors.rejected, (state?: any, action?: any) => {
        state.checked_status = 'failed'
        state.error = action.error.message
      })

      .addCase(getUncheckedInteriors.pending, (state?: any, action?: any) => {
        state.unchecked_status = 'loading'
      })
      .addCase(getUncheckedInteriors.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.unchecked_status = 'succeeded'
        // Add any fetched posts to the array;
        state.unchecked_data = [];
        state.unchecked_data = state.unchecked_data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getUncheckedInteriors.rejected, (state?: any, action?: any) => {
        state.unchecked_status = 'failed'
        state.error = action.error.message
      })
  }
});

export const { resetAllInteriors } = get_all_interiors.actions;
export const reducer = get_all_interiors.reducer;
export const selectAllInteriors = (state: any) => state?.get_all_interiors?.data?.[0]
export const selectCheckedInteriors = (state: any) => state?.get_all_interiors?.checked_data?.[0]
export const selectUncheckedInteriors = (state: any) => state?.get_all_interiors?.unchecked_data?.[0]
export const selectAllInteriorsStatus = (state: any) => state?.get_all_interiors?.status
export const selectCheckedInteriorsStatus = (state: any) => state?.get_all_interiors?.checked_status
export const selectUncheckedInteriorsStatus = (state: any) => state?.get_all_interiors?.unchecked_status
export default get_all_interiors;