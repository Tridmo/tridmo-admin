import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios'
import { notificationsLimit } from '../types/filters';

const initialState = {
  data: [],
  counts_data: [],
  status: 'idle',
  counts_status: 'idle',
  error: null,
  progress: 0,
};
export const getNotifications = createAsyncThunk('/notifications',
  async (wrapper?: {
    limit?: number;
    page?: number;
    [x: string]: any;
  }) => {
    let send__route = `/notifications`
    send__route +=
      wrapper?.limit
        ? (send__route?.includes("/?") ? `&limit=${wrapper?.limit}` : `/?limit=${wrapper?.limit}`)
        : (send__route?.includes("/?") ? `&limit=${notificationsLimit}` : `/?limit=${notificationsLimit}`);
    send__route +=
      wrapper?.page
        ? (send__route?.includes("/?") ? `&page=${wrapper?.page}` : `/?page=${wrapper?.page}`)
        : '';
    const response = await api.get(send__route)
    return response.data
  }
)

export const getNotificationCounts = createAsyncThunk('/notifications/counts',
  async () => {
    let send__route = `/notifications/counts`
    const response = await api.get(send__route)
    return response.data
  }
)

const get_notifications = createSlice({
  name: 'get_notifications',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getNotifications.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getNotifications.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.status = 'succeeded'
        // Add any fetched posts to the array;
        state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getNotifications.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })

    builder
      .addCase(getNotificationCounts.pending, (state?: any, action?: any) => {
        state.counts_status = 'loading'
      })
      .addCase(getNotificationCounts.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.counts_status = 'succeeded'
        // Add any fetched posts to the array;
        state.counts_data = [];
        state.counts_data = state.counts_data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getNotificationCounts.rejected, (state?: any, action?: any) => {
        state.counts_status = 'failed'
        state.error = action.error.message
      })
  }
});

export const reducer = get_notifications.reducer;
export const selectNotifications = (state: any) => state?.get_notifications?.data?.[0]
export const selectNotificationsStatus = (state: any) => state?.get_notifications?.status
export const selectNotificationCounts = (state: any) => state?.get_notifications?.counts_data?.[0]
export const selectNotificationCountsStatus = (state: any) => state?.get_notifications?.counts_status
export default get_notifications;