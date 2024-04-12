import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  progress: 0,
};
export const getAllMaterials = createAsyncThunk('/materials', async () => {
  const response = await api.get(`/materials`)
  return response.data
})

const get_all_materials = createSlice({
  name: 'get_all_materials',
  initialState,
  reducers: {
    resetAllMaterials() {
      return {
        ...initialState
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllMaterials.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getAllMaterials.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.status = 'succeeded'
        // Add any fetched posts to the array;
        state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getAllMaterials.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const { resetAllMaterials } = get_all_materials.actions;
export const reducer = get_all_materials.reducer;
export const selectAllMaterials = (state: any) => state?.get_all_materials?.data[0]
export default get_all_materials;