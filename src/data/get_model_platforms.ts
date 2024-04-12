import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  progress: 0,
};

export const getModelPlatforms = createAsyncThunk('/platforms/model', async () => {
  const response = await api.get(`/platforms/model`)
  return response.data
})

const get_model_platforms = createSlice({
  name: 'get_model_platforms',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getModelPlatforms.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getModelPlatforms.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.status = 'succeeded'
        state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getModelPlatforms.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const reducer = get_model_platforms.reducer;
export const selectModelPlatforms = (state: any) => state?.get_model_platforms?.data[0]?.data
export default get_model_platforms;