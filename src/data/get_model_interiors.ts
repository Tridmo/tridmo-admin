import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  progress: 0,
};
export const getModelInteriors = createAsyncThunk('/interiors/model',
  async (wrapper: {
    model_id: string;
    [x: string]: any
  }) => {
    let send__route = `/tags/model/${wrapper.model_id}/interiors`

    wrapper?.style_id?.forEach(style_id => {
      send__route += !send__route.includes("/?") ? `/?styles=${style_id}` : `&styles=${style_id}`;
    });

    if (wrapper?.categories?.length) wrapper?.categories?.forEach(category_id => {
      send__route += send__route.includes("/?") ? `&categories=${category_id}` : `/?categories=${category_id}`;
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

const get_model_interiors = createSlice({
  name: 'get_model_interiors',
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
      .addCase(getModelInteriors.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getModelInteriors.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.status = 'succeeded'
        // Add any fetched posts to the array;
        state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getModelInteriors.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const { resetAllInteriors } = get_model_interiors.actions;
export const reducer = get_model_interiors.reducer;
export const selectModelInteriors = (state: any) => state?.get_model_interiors?.data[0]
export default get_model_interiors;