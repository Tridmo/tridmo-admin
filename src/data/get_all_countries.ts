import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../utils/axios';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  progress: 0,
};

type Wrapper = {
  models_count?: boolean;
  brands_count?: boolean;
  name?: string;
}

export const getAllCountries = createAsyncThunk(
  "/countries",
  async (wrapper?: Wrapper) => {

  const params: Wrapper = {
    models_count: false,
    brands_count: false
  }

  if (wrapper?.models_count) {
    params.models_count = wrapper.models_count
  }
  if (wrapper?.brands_count) {
    params.brands_count = wrapper.brands_count
  }
  if (wrapper?.name) {
    params.name = wrapper.name
  }

  const response = await api.get(`/countries`, { params });
  return response.data;
});

const get_all_countries = createSlice({
  name: 'get_all_countries',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllCountries.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getAllCountries.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.status = 'succeeded'
        // Add any fetched posts to the array;
        state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getAllCountries.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const reducer = get_all_countries.reducer;
export const selectAllCountries = (state: any) => state?.get_all_countries?.data[0]
export const selectAllCountries_status = (state: any) => state?.get_all_countries?.status
export default get_all_countries;