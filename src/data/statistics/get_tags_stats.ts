import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/axios'

const initialState = {
  data: [],
  status: 'idle',
  model_stats_data: [],
  model_stats_status: 'idle',
  error: null,
  progress: 0,
};
export const getTagsStats = createAsyncThunk('/statistics/tags',
  async (wrapper: {
    month: any;
    year: any;
  }) => {
    let send__route = `/statistics/tags`

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

export const getModelTagsStats = createAsyncThunk('/statistics/tags/model',
  async (wrapper: {
    month: any;
    year: any;
    model_id: string;
  }) => {
    let send__route = `/statistics/tags/?model_id=${wrapper.model_id}`

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
      .addCase(getTagsStats.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getTagsStats.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.status = 'succeeded'
        // Add any fetched posts to the array;
        state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getTagsStats.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
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
export const selectTagsStats = (state: any) => state?.get_tags_stats?.data[0]?.data
export const selectTagsStatsStatus = (state: any) => state?.get_tags_stats?.status

export const selectModelTagsStats = (state: any) => state?.get_tags_stats?.model_stats_data[0]?.data
export const selectModelTagsStatsStatus = (state: any) => state?.get_tags_stats?.model_stats_status

export default get_tags_stats;