import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { BooleanLiteral } from "typescript";

const initialState = {
  hidden: true,
  progress: 0,
  show_models_modal: false,
  show_image_viewer: false,
  show_interior_images_modal: false,
  selected_interior_image: 0,
  color: "#7210BE",
};
const Loader = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setHidden: state => {
      state.hidden = !state.hidden
    },
    setProgress: (state, data: any) => {
      state.progress = data.progress
    },
    setShowModelsModal(state, action) {
      state.show_models_modal = action.payload;
    },
    setShowInteriorImagesModal: {
      prepare(...args) {
        return {
          payload: args,
          meta: {},
          error: null
        }
      },
      reducer(state, action) {
        state.show_interior_images_modal = action.payload[0];
        state.selected_interior_image = action.payload[1];
      },
    },
    setShowImageViewer(state, action) {
      state.show_image_viewer = action.payload;
    },
  },
});

export const { setHidden, setProgress, setShowModelsModal, setShowImageViewer, setShowInteriorImagesModal } = Loader.actions;
export const reducer = Loader.reducer;
export default Loader;