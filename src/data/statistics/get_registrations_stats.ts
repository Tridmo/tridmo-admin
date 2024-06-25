import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/axios'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  progress: 0,
};
export const getRegistrationsStats = createAsyncThunk('/statistics/registrations',
  async (wrapper: {
    month: any;
    year: any;
  }) => {
    let send__route = `/statistics/registrations`

    send__route +=
      wrapper?.month
        ? (send__route?.includes("/?") ? `&month=${wrapper?.month}` : `/?month=${wrapper?.month}`)
        : "";

    send__route +=
      wrapper?.year
        ? (send__route?.includes("/?") ? `&year=${wrapper?.year}` : `/?year=${wrapper?.year}`)
        : "";

    const response = await api.get(send__route)
    return response.data
  })

const get_registrations_stats = createSlice({
  name: 'get_registrations_stats',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getRegistrationsStats.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getRegistrationsStats.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.status = 'succeeded'
        // Add any fetched posts to the array;
        state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getRegistrationsStats.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const reducer = get_registrations_stats.reducer;
export const selectRegStats = (state: any) => state?.get_registrations_stats?.data[0]?.data
export const selectRegStatsStatus = (state: any) => state?.get_registrations_stats?.status
export default get_registrations_stats;