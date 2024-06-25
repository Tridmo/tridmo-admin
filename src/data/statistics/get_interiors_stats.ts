import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/axios'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  progress: 0,
};
export const getInteriorsStats = createAsyncThunk('/statistics/interiors',
  async (wrapper: {
    month: any;
    year: any;
  }) => {
    let send__route = `/statistics/interiors`

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

const get_interiors_stats = createSlice({
  name: 'get_interiors_stats',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getInteriorsStats.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getInteriorsStats.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.status = 'succeeded'
        // Add any fetched posts to the array;
        state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getInteriorsStats.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const reducer = get_interiors_stats.reducer;
export const selectInteriorsStats = (state: any) => state?.get_interiors_stats?.data[0]?.data
export const selectInteriorsStatsStatus = (state: any) => state?.get_interiors_stats?.status
export default get_interiors_stats;