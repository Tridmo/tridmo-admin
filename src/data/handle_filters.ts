import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { brandOrderBy, modelOrderBy, order } from '../types/filters';
const initialState = {
  topListItemLimit: 3,
  topListTopic: {
    name: 'по кол-вo загрузок',
    value: 'downloads'
  },
  author: '',
  user_name: '',

  downloaded_model_brand: '',
  downloaded_model_name: '',
  downloaded_model_categories: [],
  downloaded_model_orderby: '',
  downloaded_model_order: 'desc',

  brand_models_top: undefined,
  brand_models_name: '',
  brand_models_categories: [],
  brand_models_orderby: '',
  brand_models_order: 'desc',

  author_interiors_categories: [],
  author_interiors_orderby: '',
  author_interiors_order: 'desc',

  model_interiors_categories: [],
  model_interiors_author: '',
  model_interiors_orderby: '',
  model_interiors_order: 'desc',

  models_page: 1,
  interiors_page: 1,
  model_interiors_page: 1,
  designer_downloads_page: 1,
  designer_interiors_page: 1,
  brand_models_page: 1,
  designers_page: 1,
  brands_page: 1,

  model_brand: '',
  model_name: '',
  model_top: undefined,
  model_orderby: '',
  model_order: 'desc',

  brand_styles: [],
  brand_name: '',
  brand_orderby: '',
  brand_order: 'desc',

  categories: [],
  interior_categories: [],
  selected_child: [],
  children_category: [],
  filter_categories: [],
  category_name: [],
  selected__category: null,

  colors: [],
  selected_colors: [],
  selected_colors__id: [],

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
    setTopListItemLimit: (state: any, action: PayloadAction<any>) => {
      state.topListItemLimit = action.payload;
    },
    setTopListTopic: (state: any, action: PayloadAction<any>) => {
      state.topListTopic = action.payload;
    },
    setCategoryFilter: (state: any, action: PayloadAction<any[]>) => {
      state.categories = action.payload;
    },
    setModelBrandFilter: (state: any, action: PayloadAction<string>) => {
      state.model_brand = action.payload;
    },
    setModelTopFilter: (state: any, action: PayloadAction<boolean | undefined>) => {
      state.model_top = action.payload;
    },
    setModelNameFilter: (state: any, action: PayloadAction<string>) => {
      state.model_name = action.payload;
    },
    setUserNameFilter: (state: any, action: PayloadAction<string>) => {
      state.user_name = action.payload;
    },
    setModelOrderBy: (state: any, action: PayloadAction<modelOrderBy>) => {
      state.model_orderby = action.payload;
    },
    setModelOrder: (state: any, action: PayloadAction<order>) => {
      state.model_order = action.payload;
    },
    setBrandNameFilter: (state: any, action: PayloadAction<string>) => {
      state.brand_name = action.payload;
    },
    setBrandOrderBy: (state: any, action: PayloadAction<brandOrderBy>) => {
      state.brand_orderby = action.payload;
    },
    setBrandOrder: (state: any, action: PayloadAction<order>) => {
      state.brand_order = action.payload;
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

    set_downloaded_model_brand: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.downloaded_model_brand = params.downloaded_model_brand;
    },
    set_downloaded_model_name: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.downloaded_model_name = params.downloaded_model_name;
    },
    set_downloaded_model_categories: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.downloaded_model_categories = params.downloaded_model_categories;
    },
    set_downloaded_model_orderby: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.downloaded_model_orderby = params.downloaded_model_orderby;
    },
    set_downloaded_model_order: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.downloaded_model_order = params.downloaded_model_order;
    },
    set_downloaded_model_page: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.downloaded_model_page = params.downloaded_model_page;
    },


    set_author_interiors_categories: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.author_interiors_categories = params.author_interiors_categories;
    },
    set_author_interiors_orderby: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.author_interiors_orderby = params.author_interiors_orderby;
    },
    set_author_interiors_order: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.author_interiors_order = params.author_interiors_order;
    },
    set_designer_interiors_page: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.designer_interiors_page = params.designer_interiors_page;
    },


    set_brand_models_categories: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.brand_models_categories = params.brand_models_categories;
    },
    set_brand_models_top: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.brand_models_top = params.brand_models_top;
    },
    set_brand_models_name: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.brand_models_name = params.brand_models_name;
    },
    set_brand_models_orderby: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.brand_models_orderby = params.brand_models_orderby;
    },
    set_brand_models_order: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.brand_models_order = params.brand_models_order;
    },


    set_model_interiors_categories: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.model_interiors_categories = params.model_interiors_categories;
    },
    set_model_interiors_author: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.model_interiors_author = params.model_interiors_author;
    },
    set_model_interiors_orderby: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.model_interiors_orderby = params.model_interiors_orderby;
    },
    set_model_interiors_order: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.model_interiors_order = params.model_interiors_order;
    },

    setPageFilter: (
      state: any,
      action: PayloadAction<{
        p:
        'models_page' |
        'interiors_page' |
        'designer_downloads_page' |
        'designer_interiors_page' |
        'model_interiors_page' |
        'brand_models_page' |
        'designers_page' |
        'brands_page';
        n: number;
      }>
    ) => {
      const { ...params } = action.payload;
      state[params.p] = params.n;
    },

    resetFilters: () => ({
      ...initialState
    }),
  },
  extraReducers: (builder) => {
  }

});

export const {
  setUserNameFilter,
  setTopListItemLimit,
  setTopListTopic,
  setAuthor,
  setCategoryFilter,
  setModelBrandFilter,
  setModelTopFilter,
  setModelNameFilter,
  setModelOrderBy,
  setModelOrder,
  setBrandNameFilter,
  setBrandOrderBy,
  setBrandOrder,
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
  setIs_free,

  set_downloaded_model_brand,
  set_downloaded_model_name,
  set_downloaded_model_categories,
  set_downloaded_model_orderby,
  set_downloaded_model_order,
  set_downloaded_model_page,

  set_author_interiors_categories,
  set_author_interiors_orderby,
  set_author_interiors_order,
  set_designer_interiors_page,

  set_model_interiors_categories,
  set_model_interiors_author,
  set_model_interiors_orderby,
  set_model_interiors_order,

  set_brand_models_top,
  set_brand_models_name,
  set_brand_models_categories,
  set_brand_models_orderby,
  set_brand_models_order,

} = handle_filters.actions;
export const reducer = handle_filters.reducer;
export const selectTopListItemLimit = (state: any) => state?.handle_filters?.topListItemLimit
export const selectTopListTopic = (state: any) => state?.handle_filters?.topListTopic
export default handle_filters;