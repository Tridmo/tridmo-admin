import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { chatApi } from "../utils/axios";

const initialState = {
  selected_conversation: null,
  unread_data: [],
  notifications_data: [],
  unread_status: 'idle',
  notifications_status: 'idle',
  locales_configured: false,
  error: null,
}

export const getChatNotifications = createAsyncThunk('/chat/notifications',
  async (
    wrapper?:
      {
        count_only?: string;
        [x: string]: any;
      }
  ) => {
    const response = await chatApi.get(`/notifications/?count_only=${wrapper?.count_only || false}&unread=true&take=99`)
    return response.data
  })
export const getChatUnread = createAsyncThunk('/chat/unread',
  async () => {
    const response = await chatApi.get(`/conversations/badge`)
    return response.data
  })

const chat = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedConversation(state: any, action: PayloadAction<any>) {
      state.selected_conversation = action.payload;
    },
    setLocalesConfigured(state: any, action: PayloadAction<boolean>) {
      state.locales_configured = action.payload;
    },
    setChatNotifications(state: any, action: PayloadAction<any[]>) {
      state.notifications_data = action.payload;
    },
    pushChatNotification(state: any, action: PayloadAction<any>) {
      const exist = state.notifications_data?.find(e => e?.id == action.payload?.id)
      if (!exist) {
        state.notifications_data = [...state.notifications_data, action.payload];
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getChatNotifications.pending, (state?: any, action?: any) => {
        state.notifications_status = 'loading'
      })
      .addCase(getChatNotifications.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.notifications_status = 'succeeded'
        state.notifications_data = [];
        state.notifications_data = state.notifications_data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getChatNotifications.rejected, (state?: any, action?: any) => {
        state.notifications_status = 'failed'
        state.error = action.error.message
      })

      .addCase(getChatUnread.pending, (state?: any, action?: any) => {
        state.unread_status = 'loading'
      })
      .addCase(getChatUnread.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.unread_status = 'succeeded'
        state.unread_data = [];
        state.unread_data = state.unread_data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getChatUnread.rejected, (state?: any, action?: any) => {
        state.unread_status = 'failed'
        state.error = action.error.message
      })
  }
});

export const { setSelectedConversation, setLocalesConfigured, setChatNotifications, pushChatNotification } = chat.actions;
export const selectSelectedConversation = (state: any) => state?.chat?.selected_conversation;
export const selectLocalesConfigured = (state: any) => state?.chat?.locales_configured;
export const selectChatNotifications = (state: any) => state?.chat?.notifications_data?.[0];
export const selectChatUnread = (state: any) => state?.chat?.unread_data?.[0];
export const reducer = chat.reducer;
export default chat;