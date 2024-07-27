import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { setChatToken } from "../utils/axios";
import Cookies from 'js-cookie'

export interface TokenType {
  token: string;
  data: any,
  status: string,
  error: null
}

const initialState: TokenType = {
  token: '',
  data: [],
  status: 'idle',
  error: null
};

export const getChatToken = createAsyncThunk('/chat/token', async () => {

  const response = await axios.get('/chat/token')
  Cookies.set(
    'chatToken',
    response?.data?.access_token,
    { expires: response?.data?.expires_in }
  )
  setChatToken(response?.data?.access_token)
  return response.data
})

const chatToken = createSlice({
  name: 'get_chat_token',
  initialState,
  reducers: {

    // Action to set the authentication status
    setLoginState(state, action: PayloadAction<string>) {
      state.token = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getChatToken.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getChatToken.fulfilled, (state?: any, action?: any) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array;
        state.data = [];
        state.data = state.data.concat(action.payload)
      })
      .addCase(getChatToken.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const selectChatToken = (state: any) => state?.get_chat_token?.data[0]?.access_token
export const reducer = chatToken.reducer;