import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/axios'

const initialState = {
  count_data: [],
  count_status: 'idle',
  chart_data: [],
  chart_status: 'idle',
  model_stats_data: [],
  model_stats_status: 'idle',
  error: null,
  progress: 0,
};
export const getDownloadsCount = createAsyncThunk('/statistics/downloads/count',
  async (wrapper: {
    month: any;
    year: any;
    [s: string]: any;
  }) => {
    let send__route = `/statistics/downloads/count`

    send__route +=
      wrapper?.month
        ? (send__route?.includes("/?") ? `&month=${wrapper?.month}` : `/?month=${wrapper?.month}`)
        : "";

    send__route +=
      wrapper?.year
        ? (send__route?.includes("/?") ? `&year=${wrapper?.year}` : `/?year=${wrapper?.year}`)
        : "";

    send__route +=
      wrapper?.brand_id
        ? (send__route?.includes("/?") ? `&brand_id=${wrapper?.brand_id}` : `/?brand_id=${wrapper?.brand_id}`)
        : "";

    const response = await api.get(send__route)
    return response.data
  })
export const getDownloadsChart = createAsyncThunk('/statistics/downloads/chart',
  async (wrapper: {
    month: any;
    year: any;
    [s: string]: any;

  }) => {
    let send__route = `/statistics/downloads/chart`

    send__route +=
      wrapper?.month
        ? (send__route?.includes("/?") ? `&month=${wrapper?.month}` : `/?month=${wrapper?.month}`)
        : "";

    send__route +=
      wrapper?.year
        ? (send__route?.includes("/?") ? `&year=${wrapper?.year}` : `/?year=${wrapper?.year}`)
        : "";

    send__route +=
      wrapper?.brand_id
        ? (send__route?.includes("/?") ? `&brand_id=${wrapper?.brand_id}` : `/?brand_id=${wrapper?.brand_id}`)
        : "";

    const response = await api.get(send__route)
    return response.data
  })

export const getModelDownloadsStats = createAsyncThunk('/statistics/downloads/model',
  async (wrapper: {
    month: any;
    year: any;
    model_id: string;
    brand_id?: string;
  }) => {
    let send__route = `/statistics/downloads/chart/?model_id=${wrapper.model_id}`

    send__route +=
      wrapper?.brand_id
        ? (send__route?.includes("/?") ? `&brand_id=${wrapper?.brand_id}` : `/?brand_id=${wrapper?.brand_id}`)
        : "";

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

const get_downloads_stats = createSlice({
  name: 'get_downloads_stats',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getDownloadsCount.pending, (state?: any, action?: any) => {
        state.count_status = 'loading'
      })
      .addCase(getDownloadsCount.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.count_status = 'succeeded'
        // Add any fetched posts to the array;
        state.count_data = [];
        state.count_data = state.count_data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getDownloadsCount.rejected, (state?: any, action?: any) => {
        state.count_status = 'failed'
        state.error = action.error.message
      })


      .addCase(getDownloadsChart.pending, (state?: any, action?: any) => {
        state.chart_status = 'loading'
      })
      .addCase(getDownloadsChart.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.chart_status = 'succeeded'
        // Add any fetched posts to the array;
        state.chart_data = [];
        state.chart_data = state.chart_data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getDownloadsChart.rejected, (state?: any, action?: any) => {
        state.chart_status = 'failed'
        state.error = action.error.message
      })


      .addCase(getModelDownloadsStats.pending, (state?: any, action?: any) => {
        state.model_stats_status = 'loading'
      })
      .addCase(getModelDownloadsStats.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.model_stats_status = 'succeeded'
        // Add any fetched posts to the array;
        state.model_stats_data = [];
        state.model_stats_data = state.model_stats_data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getModelDownloadsStats.rejected, (state?: any, action?: any) => {
        state.model_stats_status = 'failed'
        state.error = action.error.message
      })
  }
});

export const reducer = get_downloads_stats.reducer;
export const selectDownloadsCount = (state: any) => state?.get_downloads_stats?.count_data?.[0]?.data
export const selectDownloadsCountStatus = (state: any) => state?.get_downloads_stats?.count_status

export const selectDownloadsChart = (state: any) => state?.get_downloads_stats?.chart_data?.[0]?.data
export const selectDownloadsChartStatus = (state: any) => state?.get_downloads_stats?.chart_status

export const selectModelDownloadsStats = (state: any) => state?.get_downloads_stats?.model_stats_data?.[0]?.data
export const selectModelDownloadsStatsStatus = (state: any) => state?.get_downloads_stats?.model_stats_status

export default get_downloads_stats;