import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios'
import { designersLimit, modelDownloadersLimit, order, usersOrderBy } from '../types/filters';

const initialState = {
  data: [],
  status: 'idle',
  model_downloaders_data: [],
  model_downloaders_status: 'idle',
  downloaders_data: [],
  downloaders_status: 'idle',
  error: null,
  progress: 0,
};
export const getAllDesigners = createAsyncThunk('/users/designers',
  async (wrapper?: any) => {
    let send__route = `/users/?role_id=3`

    send__route +=
      wrapper?.key
        ? (send__route?.includes("/?") ? `&key=${wrapper?.key}` : `/?key=${wrapper?.key}`)
        : "";

    send__route +=
      wrapper?.limit
        ? (send__route?.includes("/?") ? `&limit=${wrapper?.limit}` : `/?limit=${wrapper?.limit}`)
        : (send__route?.includes("/?") ? `&limit=${designersLimit}` : `/?limit=${designersLimit}`)

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

export const getDownloaders = createAsyncThunk('/users/downloaders',
  async (wrapper?: {
    brand_id?: string;
    model_name?: string;
    orderBy?: usersOrderBy | string;
    order?: order;
    [x: string]: any;
  }) => {
    let send__route = `/users/?role_id=3&as_download=true`

    send__route +=
      wrapper?.key
        ? (send__route?.includes("/?") ? `&key=${wrapper?.key}` : `/?key=${wrapper?.key}`)
        : "";

    send__route +=
      wrapper?.brand_id
        ? (send__route?.includes("/?") ? `&downloads_from_brand=${wrapper?.brand_id}` : `/?downloads_from_brand=${wrapper?.brand_id}`)
        : "";

    send__route +=
      wrapper?.model_name
        ? (send__route?.includes("/?") ? `&model_name=${wrapper?.model_name}` : `/?model_name=${wrapper?.model_name}`)
        : "";

    send__route +=
      wrapper?.limit
        ? (send__route?.includes("/?") ? `&limit=${wrapper?.limit}` : `/?limit=${wrapper?.limit}`)
        : (send__route?.includes("/?") ? `&limit=${designersLimit}` : `/?limit=${designersLimit}`);

    send__route +=
      wrapper?.orderBy
        ? (send__route?.includes("/?") ? `&orderBy=${wrapper?.orderBy}` : `/?orderBy=${wrapper?.orderBy}`)
        : (send__route?.includes("/?") ? `&orderBy=downloaded_at` : `/?orderBy=downloaded_at`);


    send__route +=
      wrapper?.order
        ? (send__route?.includes("/?") ? `&order=${wrapper?.order}` : `/?order=${wrapper?.order}`)
        : "";

    send__route += !send__route.includes("/?") && wrapper?.page ? `/?page=${wrapper.page}` : wrapper?.page ? `&page=${wrapper.page}` : "";

    const response = await api.get(send__route)
    return response.data

  })

export const getModelDownloaders = createAsyncThunk('/users/designers/model',
  async (wrapper?: {
    model_id: string;
    orderBy?: usersOrderBy | string;
    order?: order;
    [x: string]: any;
  }) => {
    let send__route = `/users/?role_id=3`

    send__route +=
      wrapper?.key
        ? (send__route?.includes("/?") ? `&key=${wrapper?.key}` : `/?key=${wrapper?.key}`)
        : "";

    send__route +=
      wrapper?.model_id
        ? (send__route?.includes("/?") ? `&downloaded_model=${wrapper?.model_id}` : `/?downloaded_model=${wrapper?.model_id}`)
        : "";

    send__route +=
      wrapper?.limit
        ? (send__route?.includes("/?") ? `&limit=${wrapper?.limit}` : `/?limit=${wrapper?.limit}`)
        : (send__route?.includes("/?") ? `&limit=${modelDownloadersLimit}` : `/?limit=${modelDownloadersLimit}`);

    send__route +=
      wrapper?.orderBy
        ? (send__route?.includes("/?") ? `&orderBy=${wrapper?.orderBy}` : `/?orderBy=${wrapper?.orderBy}`)
        : (send__route?.includes("/?") ? `&orderBy=downloaded_at` : `/?orderBy=downloaded_at`);

    send__route +=
      wrapper?.order
        ? (send__route?.includes("/?") ? `&order=${wrapper?.order}` : `/?order=${wrapper?.order}`)
        : "";

    send__route += !send__route.includes("/?") && wrapper?.page ? `/?page=${wrapper.page}` : wrapper?.page ? `&page=${wrapper.page}` : "";

    const response = await api.get(send__route)
    return response.data

  })

const get_all_designers = createSlice({
  name: 'get_all_designers',
  initialState,
  reducers: {
    resetAllDesigners() {
      return {
        ...initialState
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllDesigners.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getAllDesigners.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.status = 'succeeded'
        // Add any fetched posts to the array;
        state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getAllDesigners.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      .addCase(getModelDownloaders.pending, (state?: any, action?: any) => {
        state.model_downloaders_status = 'loading'
      })
      .addCase(getModelDownloaders.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.model_downloaders_status = 'succeeded'
        // Add any fetched posts to the array;
        state.model_downloaders_data = [];
        state.model_downloaders_data = state.model_downloaders_data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getModelDownloaders.rejected, (state?: any, action?: any) => {
        state.model_downloaders_status = 'failed'
        state.error = action.error.message
      })

      .addCase(getDownloaders.pending, (state?: any, action?: any) => {
        state.downloaders_status = 'loading'
      })
      .addCase(getDownloaders.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.downloaders_status = 'succeeded'
        // Add any fetched posts to the array;
        state.downloaders_data = [];
        state.downloaders_data = state.downloaders_data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getDownloaders.rejected, (state?: any, action?: any) => {
        state.downloaders_status = 'failed'
        state.error = action.error.message
      })
  }
});

export const { resetAllDesigners } = get_all_designers.actions;
export const reducer = get_all_designers.reducer;

export const selectAllDesigners = (state: any) => state?.get_all_designers?.data[0]?.data?.users
export const selectAllDesignersPagination = (state: any) => state?.get_all_designers?.data[0]?.data?.pagination
export const selectAllDesignersStatus = (state: any) => state?.get_all_designers?.status

export const selectModelDownloaders = (state: any) => state?.get_all_designers?.model_downloaders_data?.[0]?.data
export const selectModelDownloadersStatus = (state: any) => state?.get_all_designers?.model_downloaders_status

export const selectDownloaders = (state: any) => state?.get_all_designers?.downloaders_data?.[0]?.data
export const selectDownloadersStatus = (state: any) => state?.get_all_designers?.downloaders_status

export default get_all_designers;