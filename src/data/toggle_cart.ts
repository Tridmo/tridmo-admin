import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
   toggle_card_action_status: false,
   cart_items_count: 0,
   status: 'idle',
   error: null,
}

const toggle_card_status = createSlice({
   name: "toggle_card_status",
   initialState,
   reducers: {
      switch_on(state: any, action: PayloadAction<boolean>) {
         state.toggle_card_action_status = null;
         state.toggle_card_action_status = action.payload;
      },
   },
   extraReducers(builder) {

   }
});

export const { switch_on } = toggle_card_status.actions;
export const reducer = toggle_card_status.reducer;
export default toggle_card_status;