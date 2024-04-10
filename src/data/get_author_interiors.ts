import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  progress: 0,
};
export const getAuthorInteriors = createAsyncThunk('/interiors/:author',
  async (wrapper?: {
    author: string;
    [x: string]: any
  }) => {
    let send__route = `/interiors`

    wrapper?.style_id?.forEach(style_id => {
      send__route += !send__route.includes("/?") ? `/?styles=${style_id}` : `&styles=${style_id}`;
    });
    send__route +=
      !send__route.includes("/?") && wrapper?.author
        ? `/?author=${wrapper.author}`
        : wrapper?.author
          ? `&author=${wrapper.author}`
          : "";
    send__route += !send__route.includes("/?") && wrapper?.page ? `/?page=${wrapper.page}` : wrapper?.page ? `&page=${wrapper.page}` : "";

    const response = await api.get(send__route)
    return response.data
  })

const get_author_interiors = createSlice({
  name: 'get_author_interiors',
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
      .addCase(getAuthorInteriors.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getAuthorInteriors.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.status = 'succeeded'
        // Add any fetched posts to the array;
        state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getAuthorInteriors.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const { resetAllInteriors } = get_author_interiors.actions;
export const reducer = get_author_interiors.reducer;
export const selectAuthorInteriors = (state: any) => state?.get_author_interiors?.data[0]
export default get_author_interiors;