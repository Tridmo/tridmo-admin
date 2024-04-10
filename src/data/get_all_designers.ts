import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  progress: 0,
};
export const getAllDesigners = createAsyncThunk('/users/designers',
  async (wrapper?: any) => {
    let send__route = `/users/designers`

    if (wrapper?.name) {
      send__route += `/?full_name=${wrapper?.name}`
    }

    send__route +=
      wrapper?.limit
        ? (send__route?.includes("/?") ? `&limit=${wrapper?.limit}` : `/?limit=${wrapper?.limit}`)
        : "";

    send__route +=
      wrapper?.orderBy
        ? (send__route?.includes("/?") ? `&orderBy=${wrapper?.orderBy}` : `/?orderBy=${wrapper?.orderBy}`)
        : "";

    send__route += !send__route.includes("/?") && wrapper?.page ? `/?page=${wrapper.page}` : wrapper?.page ? `&page=${wrapper.page}` : "";

    const response = await api.get(send__route)
    return response.data

  })

const get_all_designers = createSlice({
  name: 'get_all_designers',
  initialState,
  reducers: {
    resetAllDesigners() {
      return {
        ...initialState
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllDesigners.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getAllDesigners.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.status = 'succeeded'
        // Add any fetched posts to the array;
        state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getAllDesigners.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const { resetAllDesigners } = get_all_designers.actions;
export const reducer = get_all_designers.reducer;
export const selectAllDesigners = (state: any) => state?.get_all_designers?.data[0]
export default get_all_designers;