import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/axios'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  progress: 0,
};
export const getCategoriesStats = createAsyncThunk('/statistics/categories',
  async (wrapper?: {
    limit?: number;
    month?: any;
    year?: any;
    week?: any;
    topic?: any;
    [x: string]: any;
  }) => {
    let send__route = `/statistics/categories`

    send__route +=
      wrapper?.month
        ? (send__route?.includes("/?") ? `&month=${wrapper?.month}` : `/?month=${wrapper?.month}`)
        : "";

    send__route +=
      wrapper?.year
        ? (send__route?.includes("/?") ? `&year=${wrapper?.year}` : `/?year=${wrapper?.year}`)
        : "";

    send__route +=
      wrapper?.week
        ? (send__route?.includes("/?") ? `&week=${wrapper?.week}` : `/?week=${wrapper?.week}`)
        : "";

    send__route +=
      wrapper?.topic
        ? (send__route?.includes("/?") ? `&topic=${wrapper?.topic}` : `/?topic=${wrapper?.topic}`)
        : "";

    send__route +=
      wrapper?.limit
        ? (send__route?.includes("/?") ? `&limit=${wrapper?.limit}` : `/?limit=${wrapper?.limit}`)
        : (send__route?.includes("/?") ? `&limit=${3}` : `/?limit=${3}`);

    const response = await api.get(send__route)
    return response.data
  })

const get_categories_stats = createSlice({
  name: 'get_categories_stats',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCategoriesStats.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getCategoriesStats.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.status = 'succeeded'
        // Add any fetched posts to the array;
        state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getCategoriesStats.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const reducer = get_categories_stats.reducer;
export const selectCategoriesStats = (state: any) => state?.get_categories_stats?.data[0]?.data
export const selectCategoriesStatsStatus = (state: any) => state?.get_categories_stats?.status
export default get_categories_stats;