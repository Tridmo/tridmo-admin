import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  progress: 0,
};
export const getAllInteriors = createAsyncThunk('/interiors',
  async (wrapper?: any) => {
    let send__route = `/interiors`

    wrapper?.categories?.forEach(category_id => {
      send__route += send__route.includes("/?") ? `&categories=${category_id}` : `/?categories=${category_id}`;
    });

    wrapper?.styles?.forEach(style_id => {
      send__route += !send__route.includes("/?") ? `/?styles=${style_id}` : `&styles=${style_id}`;
    });

    send__route +=
      !send__route.includes("/?") && wrapper?.author
        ? `/?author=${wrapper.author}`
        : wrapper?.author
          ? `&author=${wrapper.author}`
          : "";

    send__route +=
      wrapper?.page
        ? (send__route.includes("/?") ? `&page=${wrapper.page}` : `/?page=${wrapper.page}`)
        : "";

    send__route +=
      wrapper?.limit
        ? (send__route?.includes("/?") ? `&limit=${wrapper?.limit}` : `/?limit=${wrapper?.limit}`)
        : "";

    send__route +=
      wrapper?.orderBy
        ? (send__route?.includes("/?") ? `&orderBy=${wrapper?.orderBy}` : `/?orderBy=${wrapper?.orderBy}`)
        : "";

    const response = await api.get(send__route)
    return response.data
  })

const get_all_interiors = createSlice({
  name: 'get_all_interiors',
  initialState,
  reducers: {
    resetAllInteriors() {
      return {
        ...initialState
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllInteriors.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getAllInteriors.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.status = 'succeeded'
        // Add any fetched posts to the array;
        state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getAllInteriors.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const { resetAllInteriors } = get_all_interiors.actions;
export const reducer = get_all_interiors.reducer;
export const selectAllInteriors = (state: any) => state?.get_all_interiors?.data[0]
export default get_all_interiors;