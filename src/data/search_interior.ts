import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../utils/axios'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  progress: 0,
  key: ""
};
export const searchInteriors = createAsyncThunk('interiors?name=interior', async (wrapper: any) => {

  let send__route = `interiors/?name=${wrapper.keyword}`

  for (let i = 0; i < wrapper?.colors?.length; i++) {
    if (!send__route?.includes("/?")) {
      send__route += `/?colors=${wrapper?.colors[i]}`
    } else {
      send__route += `&colors=${wrapper?.colors[i]}`
    }
  }

  for (let i = 0; i < wrapper?.styles?.length; i++) {
    if (!send__route?.includes("/?")) {
      send__route += `/?styles=${wrapper?.styles[i]}`
    } else {
      send__route += `&styles=${wrapper?.styles[i]}`
    }

  }

  if (!send__route?.includes("/?") && wrapper?.top) {
    send__route += `/?top=${wrapper?.top}`
  } else if (wrapper?.top) {
    send__route += `&top=${wrapper?.top}`
  }

  for (let i = 0; i < wrapper?.categoryies?.length; i++) {
    if (!send__route?.includes("/?")) {
      send__route += `/?categories=${wrapper?.categories[i]}`
    } else {
      send__route += `&categories=${wrapper?.categories[i]}`
    }
  }


  if (wrapper.name !== undefined && wrapper.name !== "") {
    const response = await api.get(send__route)
    return response.data
  }


})

const search_interiors = createSlice({
  name: 'search_interiors',
  initialState,
  reducers: {
    setSearchVal(state: any, action: PayloadAction<any>) {
      state.key = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(searchInteriors.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(searchInteriors.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.status = 'succeeded'
        // Add any fetched posts to the array;
        state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(searchInteriors.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const { setSearchVal } = search_interiors.actions;
export const reducer = search_interiors.reducer;
export const selectSearchedModels = (state: any) => state?.search_interiors?.data[0]
export default search_interiors;