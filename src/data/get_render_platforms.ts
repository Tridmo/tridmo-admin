import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  progress: 0,
};


export const getRenderPlatforms = createAsyncThunk('/platforms/render', async () => {
  const response = await api.get(`/platforms/render`)
  return response.data
})

const get_render_platforms = createSlice({
  name: 'get_render_platforms',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getRenderPlatforms.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getRenderPlatforms.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.status = 'succeeded'
        state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getRenderPlatforms.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const reducer = get_render_platforms.reducer;
export const selectRenderPlatforms = (state: any) => state?.get_render_platforms?.data[0]?.data
export default get_render_platforms;