import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
const initialState = {
  author: '',
  categories: [],
  interior_categories: [],
  selected_child: [],
  children_category: [],
  filter_categories: [],
  category_name: [],
  colors: [],
  selected_colors: [],
  selected_colors__id: [],
  selected__category: null,
  is_free: false,
  refreshModelOrder: false,
  styles: [],
  selected_styles: [],
  selected_styles_id: [],
  page: 1,
  error: null,
  progress: 0,
};

const handle_filters = createSlice({
  name: 'handle_filters',
  initialState,
  reducers: {
    setAuthor: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.author = params.author;
    },
    setCategoryFilter: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.categories = params.knex;
    },
    setInteriorCategoryFilter: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.interior_categories = params.knex;
    },
    setCategoryId: (state: any, action: PayloadAction<any>) => {
      const { ...id } = action.payload;
      state.selected__category = id
    },
    setChildrenCategory: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.children_category = params.children;
    },
    setChildrenCategoriesForFilters: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.filter_categories.push(params.all_data);
    },
    removeChildrenCategoryForFilters: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.filter_categories = params.filtered;
    },
    refreshModel: (state: any, action: PayloadAction<any>) => {
      state.refreshModelOrder = action.payload;
    },
    setCategoryNameFilter: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.category_name = params.knnex;
    },
    setCategorySelectedChild: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.selected_child.push(params.selected);
    },
    removeCategorySelectedChild: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.selected_child = params.selected;
    },
    setColorFilter: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.colors = params.cnex;
    },
    setSelectedColors: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.selected_colors.push(params.selected);
    },
    removeSelectedColors: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.selected_colors = params.selected;
    },
    setSelectedColorsId: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.selected_colors__id.push(params.id)
    },
    removeSelectedColorsId: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.selected_colors__id = params.id
    },
    setStyleFilter: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.styles = params.snex;
    },
    setSelectedStyles: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.selected_styles.push(params.styles)
    },
    setSelectedStylesId: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.selected_styles_id.push(params.id);
    },
    removeSelectedStyles: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.selected_styles = params.styles;
    },
    removeSelectedStylesId: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.selected_styles_id = params.id
    },
    setPageFilter: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.page = params.page;
    },
    setLimitFilter: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.limit = params.limit;
    },
    setOrderByFilter: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.orderBy = params.by;
    },
    setIs_free: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.is_free = params.is_free;
    },
    resetFilters: () => ({
      ...initialState
    })
    ,
  },
  extraReducers: (builder) => {
  }

});

export const {
  setAuthor,
  setCategoryFilter,
  setInteriorCategoryFilter,
  setCategorySelectedChild,
  setCategoryId,
  setChildrenCategory,
  refreshModel,
  removeCategorySelectedChild,
  removeChildrenCategoryForFilters,
  setChildrenCategoriesForFilters,
  setSelectedColorsId,
  removeSelectedColorsId,
  setCategoryNameFilter,
  setColorFilter,
  setSelectedColors,
  removeSelectedColors,
  setStyleFilter,
  setSelectedStyles,
  setSelectedStylesId,
  removeSelectedStyles,
  removeSelectedStylesId,
  setPageFilter,
  setLimitFilter,
  setOrderByFilter,
  resetFilters,
  setIs_free
} = handle_filters.actions;
export const reducer = handle_filters.reducer;
export default handle_filters;