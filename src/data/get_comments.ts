import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  progress: 0,
};
export const getComments = createAsyncThunk('/comments',
  async (wrapper: {
    entity_id: string;
    limit?: number;
    [x: string]: any;
  }) => {
    let send__route = `/comments/?entity_id=${wrapper.entity_id}`

    send__route += wrapper.limit ? `&limit=${wrapper.limit}` : '';

    const response = await api.get(send__route)
    return response.data
  }
)

const get_comments = createSlice({
  name: 'get_comments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getComments.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getComments.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.status = 'succeeded'
        // Add any fetched posts to the array;
        state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getComments.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const reducer = get_comments.reducer;
export const selectComments = (state: any) => state?.get_comments?.data[0]?.data?.comments
export default get_comments;