import { createSlice } from "@reduxjs/toolkit";
// Type for our state
export interface AuthState {
  isLogin: boolean;
  isSignup: boolean;
  isVerify: boolean;
  isModalOpen: boolean;
  isProfileEdit: boolean;
  order_id: string | null,
  isOrderModal: boolean;
  isFilterModal: boolean;
}

// Initial state
const initialState: AuthState = {
  isLogin: false,
  isSignup: false,
  isVerify: false,
  isProfileEdit: false,
  isModalOpen: false,
  order_id: null,
  isOrderModal: false,
  isFilterModal: false
};

// Actual Slice
const modalChecker = createSlice({
  name: "modal_checker",
  initialState,
  reducers: {

    // Action to set the authentication status
    setLoginState(state, action) {
      state.isLogin = action.payload;
    },
    setSignupState(state, action) {
      state.isSignup = action.payload;
    },
    setVerifyState(state, action) {
      state.isVerify = action.payload;
    },
    setFiltersModal(state, action) {
      state.isFilterModal = action.payload
    },
    setOpenModal(state, action) {
      state.isModalOpen = action.payload;
    },

    setProfileEditState(state, action) {
      state.isProfileEdit = action.payload;
    },
    setOpenOrderModal(state, action) {
      const { isOpen, order_id } = action.payload
      state.isOrderModal = isOpen
      state.order_id = order_id
    }

  },
});

export const { setLoginState, setSignupState, setProfileEditState, setVerifyState, setOpenModal, setOpenOrderModal, setFiltersModal } = modalChecker.actions;

export const reducer = modalChecker.reducer;