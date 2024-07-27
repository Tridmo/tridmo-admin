import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  selected_conversation: null,
  error: null,
}

const chat = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedConversation(state: any, action: PayloadAction<any>) {
      state.selected_conversation = action.payload;
    }
  }
});

export const { setSelectedConversation } = chat.actions;
export const selectSelectedConversation = (state: any) => state?.chat?.selected_conversation;
export const reducer = chat.reducer;
export default chat;