import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllModels } from '../../data/get_all_models';
import { styled, Pagination } from '@mui/material';
import { ThemeProps } from '../../types/theme'
import { setPageFilter } from '../../data/handle_filters'
import { getAllInteriors } from '../../data/get_all_interiors';
import { getBrandModels } from '../../data/get_brand_models';
import { getAllBrands } from '../../data/get_all_brands';
import { getAllDesigners } from '../../data/get_all_designers';
import { getAuthorInteriors } from '../../data/get_author_interiors';
import { current } from '@reduxjs/toolkit';
import { getDesignerDownloads } from '../../data/get_designer_downloads';
import { getModelInteriors } from '../../data/get_model_interiors';

const SimplePagination = styled(Pagination)(
  ({ theme }: ThemeProps) =>
    ` 
    .Mui-disabled{
      background: ${theme.colors.gray[50]};
      border: 1.7px solid ${theme.colors.gray[100]};
      
      &.MuiPaginationItem-previousNext svg{
        fill:${theme.colors.gray[400]}
      }
    }

    .MuiPaginationItem-previousNext{
      border-radius:4px;
      min-width:40px;
      width:40px;
      height:40px;
      padding:0;
      margin:0;
      border: 1.7px solid transparent;
    }

    .MuiPaginationItem-previousNext svg{
      width:24px;
      height:24px;
    }

    .css-wjh20t-MuiPagination-ul li:last-child button{
      background:${theme.colors.primary[500]};
      border-color: ${theme.colors.primary[500]};
      margin-left: 4px;

      &.MuiPaginationItem-previousNext svg{
        fill:#fff
      }

      &:hover{
        background:${theme.colors.primary[400]};
        border-color: ${theme.colors.primary[400]};
      }
    }

    .css-wjh20t-MuiPagination-ul li:last-child .Mui-disabled{
      background: ${theme.colors.gray[100]};
      border-color: ${theme.colors.gray[100]};
      opacity: 1 !important;

      &.MuiPaginationItem-previousNext svg{
        fill:${theme.colors.gray[500]};
      }
    }

    .css-wjh20t-MuiPagination-ul li:nth-of-type(1) button{
      background: transparent;
      border-color: ${theme.colors.gray[300]};
      margin-right: 4px;

      &.MuiPaginationItem-previousNext svg{
        fill:${theme.colors.gray[700]};
      }
    }

    .css-wjh20t-MuiPagination-ul li{
      min-width:40px;
      width:40px;
      height:40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .MuiPaginationItem-page{
      margin: 0;
      width: 100%;
      height: 100%;
      font-weight: 500;
      font-size: 16px;
      line-height: 140%;
      color: ${theme.colors.gray[600]};
      border-radius: 0px;
    }

    .Mui-selected{
      background-color: rgba(0,0,0,0);
      height: calc(40px - 1.7px);
      border-bottom: 1.7px solid #141414;
      border-radius:0px;
      color: #141414;
      font-weight: 500;
      font-size: 16px;
      line-height: 140%;
    }
    `
)

interface PaginationProps {
  dataSource:
  'models' |
  'interiors' |
  'brand_models' |
  'brands' |
  'designers' |
  'designer_downloads' |
  'designer_interiors' |
  'model_interiors';

  dataId?: any;
  count?: number,
  page?: number,
  onChange?(name: string): number;
};

export default function BasicPagination({ dataSource, dataId, count, page, ...props }: PaginationProps) {
  const dispatch = useDispatch<any>();

  // ---- model filters selector ----- //
  const getModelCategoryFilter = useSelector((state: any) => state?.handle_filters?.categories)
  const getModelBrandFilter = useSelector((state: any) => state?.handle_filters?.model_brand)
  const getModelCategoryNameFilter = useSelector((state: any) => state?.handle_filters?.category_name)
  const getModelColorFilter = useSelector((state: any) => state?.handle_filters?.colors)
  const getModelStyleFilter = useSelector((state: any) => state?.handle_filters?.styles)
  const getModelTopFilter = useSelector((state: any) => state?.handle_filters?.model_top)
  const getModelNameFilter = useSelector((state: any) => state?.handle_filters?.model_name)
  const getModelOrderBy = useSelector((state: any) => state?.handle_filters?.model_orderby)
  const getModelOrder = useSelector((state: any) => state?.handle_filters?.model_order)

  // ---- brand-models filters selector ----- //
  const getBrandModelsCategory = useSelector((state: any) => state?.handle_filters?.brand_models_category)

  // ---- user-downloaded-models filters selector ----- //
  const get_downloaded_model_brand = useSelector((state: any) => state?.handle_filters?.downloaded_model_brand)
  const get_downloaded_model_name = useSelector((state: any) => state?.handle_filters?.downloaded_model_name)
  const get_downloaded_model_categories = useSelector((state: any) => state?.handle_filters?.downloaded_model_categories)
  const get_downloaded_model_orderby = useSelector((state: any) => state?.handle_filters?.downloaded_model_orderby)
  const get_downloaded_model_order = useSelector((state: any) => state?.handle_filters?.downloaded_model_order)
  const get_downloaded_model_page = useSelector((state: any) => state?.handle_filters?.downloaded_model_page)

  // ---- user-interiors filters selector ----- //
  const get_author_interiors_categories = useSelector((state: any) => state?.handle_filters?.author_interiors_categories)
  const get_author_interiors_orderby = useSelector((state: any) => state?.handle_filters?.author_interiors_orderby)
  const get_author_interiors_order = useSelector((state: any) => state?.handle_filters?.author_interiors_order)
  const get_designer_interiors_page = useSelector((state: any) => state?.handle_filters?.designer_interiors_page)

  // ---- model-interiors filters selector ----- //
  const get_model_interiors_categories = useSelector((state: any) => state?.handle_filters?.model_interiors_categories)
  const get_model_interiors_orderby = useSelector((state: any) => state?.handle_filters?.model_interiors_orderby)
  const get_model_interiors_order = useSelector((state: any) => state?.handle_filters?.model_interiors_order)
  const get_model_interiors_page = useSelector((state: any) => state?.handle_filters?.model_interiors_page)

  // ---- pages ---- //
  // const getModelsPageFilter = useSelector((state: any) => state?.handle_filters?.models_page)
  // const getInteriorsPageFilter = useSelector((state: any) => state?.handle_filters?.interiors_page)
  // const getMyInteriorsPageFilter = useSelector((state: any) => state?.handle_filters?.my_interiors_page)
  // const getProjectsPageFilter = useSelector((state: any) => state?.handle_filters?.projects_page)
  // const getSavedModelsPageFilter = useSelector((state: any) => state?.handle_filters?.saved_models_page)
  // const getDesignersPageFilter = useSelector((state: any) => state?.handle_filters?.designers_page)
  // const getBrandsPageFilter = useSelector((state: any) => state?.handle_filters?.brands_page)


  const handleChange = (e: any, page: any) => {

    if (dataSource == 'models') {
      dispatch(setPageFilter({ p: 'models_page', n: page }))
      dispatch(getAllModels({
        brand: getModelBrandFilter,
        categories: getModelCategoryFilter,
        colors: getModelColorFilter,
        styles: getModelStyleFilter,
        name: getModelNameFilter,
        top: getModelTopFilter,
        page: page,
        orderBy: getModelOrderBy,
        order: getModelOrder,
      }))
    }
    if (dataSource == 'interiors') {
      dispatch(setPageFilter({ p: 'interiors_page', n: page }))
      dispatch(getAllInteriors({
        categories: getModelCategoryFilter,
        colors: getModelColorFilter,
        styles: getModelStyleFilter,
        page: page,
      }))
    }
    if (dataSource == 'brand_models') {
      dispatch(setPageFilter({ p: 'brand_models_page', n: page }))
      dispatch(getBrandModels({
        brand_id: dataId,
        page: page,
        ...(!!getBrandModelsCategory ? { categories: getBrandModelsCategory } : {})
      }))
    }
    if (dataSource == 'brands') {
      dispatch(setPageFilter({ p: 'brands_page', n: page }))
      dispatch(getAllBrands({ orderBy: 'models_count', page: page }))
    }
    if (dataSource == 'designers') {
      dispatch(setPageFilter({ p: 'designers_page', n: page }))
      dispatch(getAllDesigners({ page }))
    }
    if (dataSource == 'designer_downloads') {
      dispatch(setPageFilter({ p: 'designer_downloads_page', n: page }))
      dispatch(getDesignerDownloads({
        username: dataId,
        page: page,
        categories: get_downloaded_model_categories,
        brand: get_downloaded_model_brand,
        name: get_downloaded_model_name,
        orderBy: get_downloaded_model_orderby,
        order: get_downloaded_model_order,
      }))
    }
    if (dataSource == 'designer_interiors') {
      dispatch(setPageFilter({ p: 'designer_interiors_page', n: page }))
      dispatch(getAuthorInteriors({
        author: dataId,
        page: page,
        categories: get_author_interiors_categories,
        orderBy: get_author_interiors_orderby,
        order: get_author_interiors_order,
      }))
    }
    if (dataSource == 'model_interiors') {
      dispatch(setPageFilter({ p: 'model_interiors_page', n: page }))
      dispatch(getModelInteriors({
        model_id: dataId,
        page: page,
        categories: get_model_interiors_categories,
        orderBy: get_model_interiors_orderby,
        order: get_model_interiors_order,
      }))
    }
  }



  return (
    <SimplePagination
      count={count}
      page={page || 1}
      onChange={(e, page) => { handleChange(e, page) }}
    />
  );
}

