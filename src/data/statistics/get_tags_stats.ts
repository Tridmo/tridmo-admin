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
export const getTagsCount = createAsyncThunk('/statistics/tags/count',
  async (wrapper: {
    month: any;
    year: any;
    [s: string]: any;

  }) => {
    let send__route = `/statistics/tags/count`

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

export const getTagsChart = createAsyncThunk('/statistics/tags/chart',
  async (wrapper: {
    month: any;
    year: any;
    [s: string]: any;

  }) => {
    let send__route = `/statistics/tags/chart`

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

export const getModelTagsStats = createAsyncThunk('/statistics/tags/model',
  async (wrapper: {
    month: any;
    year: any;
    model_id: string;
    brand_id?: string;
  }) => {
    let send__route = `/statistics/tags/chart/?model_id=${wrapper.model_id}`

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

const get_tags_stats = createSlice({
  name: 'get_tags_stats',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTagsCount.pending, (state?: any, action?: any) => {
        state.count_status = 'loading'
      })
      .addCase(getTagsCount.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.count_status = 'succeeded'
        // Add any fetched posts to the array;
        state.count_data = [];
        state.count_data = state.count_data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getTagsCount.rejected, (state?: any, action?: any) => {
        state.count_status = 'failed'
        state.error = action.error.message
      })


      .addCase(getTagsChart.pending, (state?: any, action?: any) => {
        state.chart_status = 'loading'
      })
      .addCase(getTagsChart.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.chart_status = 'succeeded'
        // Add any fetched posts to the array;
        state.chart_data = [];
        state.chart_data = state.chart_data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getTagsChart.rejected, (state?: any, action?: any) => {
        state.chart_status = 'failed'
        state.error = action.error.message
      })

      .addCase(getModelTagsStats.pending, (state?: any, action?: any) => {
        state.model_stats_status = 'loading'
      })
      .addCase(getModelTagsStats.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.model_stats_status = 'succeeded'
        // Add any fetched posts to the array;
        state.model_stats_data = [];
        state.model_stats_data = state.model_stats_data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getModelTagsStats.rejected, (state?: any, action?: any) => {
        state.model_stats_status = 'failed'
        state.error = action.error.message
      })
  }
});

export const reducer = get_tags_stats.reducer;
export const selectTagsCount = (state: any) => state?.get_tags_stats?.count_data?.[0]?.data
export const selectTagsCountStatus = (state: any) => state?.get_tags_stats?.count_status

export const selectTagsChart = (state: any) => state?.get_tags_stats?.chart_data?.[0]?.data
export const selectTagsChartStatus = (state: any) => state?.get_tags_stats?.chart_status

export const selectModelTagsStats = (state: any) => state?.get_tags_stats?.model_stats_data?.[0]?.data
export const selectModelTagsStatsStatus = (state: any) => state?.get_tags_stats?.model_stats_status

export default get_tags_stats;