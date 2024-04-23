import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { BooleanLiteral } from "typescript";
import { RouteCrumb } from "@/types/interfaces";

interface IntialState {
  crumbs: RouteCrumb[]
}

const initialState: IntialState = {
  crumbs: [{
    title: '',
    route: '/',
    onClick: () => { },
  }],
};
const RouteCrumbs = createSlice({
  name: 'route_crumbs',
  initialState,
  reducers: {
    setRouteCrumbs: (state, actions: PayloadAction<RouteCrumb[]>) => {
      state.crumbs = actions.payload
    },
    pushRouteCrumb: (state, actions: PayloadAction<RouteCrumb>) => {
      state.crumbs.push(actions.payload)
    },
    concatRouteCrumb: (state, actions: PayloadAction<RouteCrumb[]>) => {
      state.crumbs = state.crumbs.concat(actions.payload)
    },
    dropLastRouteCrumb: (state) => {
      state.crumbs.pop();
    },
    resetRouteCrumbs: (state) => {
      state.crumbs = initialState.crumbs;
    }
  },
});

export const { setRouteCrumbs, dropLastRouteCrumb, pushRouteCrumb, concatRouteCrumb, resetRouteCrumbs } = RouteCrumbs.actions;
export const reducer = RouteCrumbs.reducer;
export const selectRouteCrubms = (state: any): RouteCrumb[] => state?.route_crumbs?.crumbs
export default RouteCrumbs;