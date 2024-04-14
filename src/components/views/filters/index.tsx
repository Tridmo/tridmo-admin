"use client"

import { Box, Grid, styled } from '@mui/material'
import { ThemeProps } from '../../../types/theme';
import SimpleTypography from '../../typography'
import List, { listClasses } from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Buttons from '../../buttons';
import Image from "next/image";
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useCallback, useEffect, useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectCategories } from '../../../data/categories';
import { selectAllColors } from '../../../data/get_all_colors';
import { selectAllStyles } from '../../../data/get_all_styles';
import { flatten } from "lodash";
import { useDispatch } from 'react-redux';
import { setCategoryFilter, setColorFilter, setStyleFilter } from '../../../data/handle_filters'
import { getAllModels } from '../../../data/get_all_models';
const FiltersItem = styled(Box)(
  ({ theme }: ThemeProps) => `
        background: #FFFFFF;
        border: 1px solid #E0E0E0;
        border-radius: 21px;
        padding: 2px 2px 2px 8px;
        display:flex;
        align-items: center;
        cursor:pointer;
        transition: all 0.4s ease;

        &:not(:last-child){
            margin-right:8px
        }
        &:hover{
            button{
                background: #F5F5F5;

                svg{
                    color:#000;
                }
            }
        }
    
  `
);

function Filters() {
  const [value, setValue] = useState(0);
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  // apply filters
  const [category_filter, setCategory_filter] = useState<any>([]);
  const [color_filter, setColor_filter] = useState<any>([]);
  const [styles_filter, setStyles_filter] = useState<any>([]);

  // filters data from redux store;
  const categoryData = useSelector(selectCategories);
  const allColors = useSelector(selectAllColors);
  const stylesData = useSelector(selectAllStyles);

  // the status of filters' datas
  const categoriesData__status = useSelector((state: any) => state?.categories.status);
  const colorsData__status = useSelector((state: any) => state?.get_all_colors.status);
  const stylesData__status = useSelector((state: any) => state?.get_all_styles.status);

  const getModelCategoryFilter = useSelector((state: any) => state?.handle_filters?.categories)
  const getModelCategoryNameFilter = useSelector((state: any) => state?.handle_filters?.category_name)
  const getModelColorFilter = useSelector((state: any) => state?.handle_filters?.colors)
  const getModelStyleFilter = useSelector((state: any) => state?.handle_filters?.styles)
  const getModelPageFilter = useSelector((state: any) => state?.handle_filters?.page)

  const createQueryString = useCallback(
    (name: string, value: any) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  useEffect(() => {
    if (router) {
      let res = [];
      if (!searchParams.has('category')) {
        setCategory_filter([]);
      }
      if (!searchParams.has('colors')) {
        setColor_filter([]);
      }
      if (!searchParams.has('styles')) {
        setStyles_filter([]);
      }
      if (getModelCategoryFilter && categoriesData__status === "succeeded") {
        let rtCt = getModelCategoryFilter;
        let ctCollecter: any[] = [];
        for (let category of categoryData) {
          for (let chldCt of category?.children) {
            for (let rt of rtCt) {
              if (rt == chldCt?.id) {
                ctCollecter.push(chldCt);
              }
            }
          }
        }
        setCategory_filter(ctCollecter);
      }

      if (getModelColorFilter && colorsData__status === "succeeded") {
        let rtCt = getModelColorFilter;
        let ctCollecter: any[] = [];
        for (let color of allColors[0]?.data) {
          for (let rt of rtCt) {
            if (rt == color.id) {
              ctCollecter.push(color);
            }
          }
        }
        setColor_filter(ctCollecter);
      }

      if (getModelStyleFilter && stylesData__status === "succeeded") {
        let rtCt = getModelStyleFilter;
        let ctCollecter: any[] = [];
        for (let style of stylesData?.data) {
          for (let rt of rtCt) {
            if (rt == style.id) {
              ctCollecter.push(style);
            }
          }
        }
        setStyles_filter(ctCollecter);
      }
    }
  }, [router, categoryData, allColors, stylesData, categoriesData__status, colorsData__status, stylesData__status, getModelStyleFilter, getModelColorFilter, getModelCategoryFilter])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const filtersWrapStyle = {
    width: "100%",
    borderStyle: "solid",
    borderColor: "#E0E0E0",
    padding: "10px 8px",
    borderWidth: "1px 0",
    marginBottom: "20px"
  }

  const dispatch = useDispatch<any>()

  const CategoryFilter = (item: any) => {

    let ctRt = getModelCategoryFilter;
    let arr: any[] = [];
    if (ctRt) {
      for (let i = 0; i < ctRt?.length; i++) {
        if (ctRt[i] != item.id) {
          arr.push(ctRt[i])
        }
      }
    }

    // router.push(`/?page=${getModelPageFilter}&styles=${getModelStyleFilter}&category_name=${getModelCategoryNameFilter}&category=${arr}`);

    createQueryString('page', getModelPageFilter)

    if (getModelStyleFilter && getModelStyleFilter?.length) {
      createQueryString('styles', getModelStyleFilter)
    }
    if (getModelCategoryNameFilter && getModelCategoryNameFilter?.length) {
      createQueryString('category_name', getModelCategoryNameFilter)
    }

    createQueryString('category', arr)

    dispatch(getAllModels({
      categories: arr,
      colors: getModelColorFilter,
      styles: getModelStyleFilter,
      page: getModelPageFilter,
    }))

    dispatch(setCategoryFilter(arr))
  }

  // const ColorFilter = (item: any) => {
  //   let ctRt = getModelColorFilter;
  //   let arr: any[] = [];
  //   if (ctRt) {
  //     for (let i = 0; i < ctRt.length; i++) {
  //       if (ctRt[i] != item.id) {
  //         arr.push(ctRt[i])
  //       }
  //     }
  //   }
  //   if (getModelCategoryNameFilter) {
  //     router.push(`/?page=${getModelPageFilter}&colors=${arr}&styles=${getModelStyleFilter}&category_name=${getModelCategoryNameFilter}&category=${getModelCategoryFilter}`);
  //   } else {
  //     router.push(`/?page=${getModelPageFilter}&colors=${arr}&styles=${getModelStyleFilter}&category=${getModelCategoryFilter}`);
  //   }

  //   dispatch(getAllModels({
  //     category_id: getModelCategoryFilter,
  //     color_id: arr,
  //     style_id: getModelStyleFilter,
  //     page: getModelPageFilter,
  //   }))

  //   dispatch(setColorFilter({ cnex: arr }))
  // }

  const StyleFilter = (item: any) => {

    let ctRt = getModelStyleFilter;
    let arr: any[] = [];

    if (ctRt) {
      for (let i = 0; i < ctRt.length; i++) {
        if (ctRt[i] != item.id) {
          arr.push(ctRt[i])
        }
      }
    }

    // if (getModelCategoryNameFilter) {
    //   router.push(`/?page=${getModelPageFilter}&styles=${arr}&category_name=${getModelCategoryNameFilter}&category=${getModelCategoryFilter}`);
    // } else {
    //   router.push(`/?page=${getModelPageFilter}&styles=${arr}&category=${getModelCategoryFilter}`);
    // }

    router.push(` ${pathname}/?page=${getModelPageFilter}`
      + getModelStyleFilter?.length ? `&styles=${arr}` : ''
        + getModelCategoryNameFilter?.length ? `&category_name=${getModelCategoryNameFilter}` : ''
          + getModelCategoryFilter?.length ? `&category=${getModelCategoryFilter}` : ''
    );

    dispatch(getAllModels({
      categories: getModelCategoryFilter,
      colors: getModelColorFilter,
      styles: arr,
      page: getModelPageFilter,
    }))

    dispatch(setStyleFilter({ snex: arr }))
  }

  const ClearFilters = (item: any) => {

    router.push(`${pathname}/?page=${1}`);

    dispatch(getAllModels({
      categories: [],
      colors: [],
      styles: [],
      page: 1,
    }))

    dispatch(setStyleFilter({ snex: [] }))
    dispatch(setStyleFilter({ snex: [] }))
    dispatch(setColorFilter({ cnex: [] }))
    dispatch(setCategoryFilter([]))

  }

  return (
    <Box sx={filtersWrapStyle}>
      <Grid spacing={2} container sx={{ margin: 0 }}>
        <Grid item xs={10} sx={{ display: "flex", alignItems: 'center' }}>
          <SimpleTypography className='filters__title' text="Фильтры:" />
          <Box
            sx={{
              maxWidth: { xs: 320, sm: 540 },
              bgcolor: 'background.paper',
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
              sx={{
                [`& .${tabsClasses.indicator}`]: {
                  display: "none"
                },
                [`& .${tabsClasses.scrollButtons}`]: {
                  '&.Mui-disabled': { opacity: 0.3 },
                  width: "32px",
                  height: "32px",
                  boxShadow: "inset -12px 0px 4px #FAFAFA"
                },
                minHeight: "auto",
                background: "#fafafa"
              }}
            >
              {
                category_filter?.map((item: any, index: any) => (
                  <FiltersItem key={index}>
                    <SimpleTypography className='filters__item--text' text={item.name} />
                    <Buttons name="" onClick={() => CategoryFilter(item)} className="filters__item--close">
                      <CloseOutlinedIcon />
                    </Buttons>
                  </FiltersItem>
                ))
              }
              {
                color_filter?.map((item: any, index: any) => (
                  <FiltersItem key={index}>
                    {
                      <Box
                        sx={{
                          width: "18px",
                          height: "18px",
                          background: `${item?.hex_value}`,
                          borderRadius: "50%",
                          marginRight: "4px"
                        }}
                      />
                    }

                    <SimpleTypography className='filters__item--text' text={item.name} />
                    <Buttons name="" onClick={() => color_filter(item)} className="filters__item--close">
                      <CloseOutlinedIcon />
                    </Buttons>
                  </FiltersItem>
                ))
              }
              {
                styles_filter?.map((item: any, index: any) => (
                  <FiltersItem key={index}>
                    <SimpleTypography className='filters__item--text' text={item.name} />
                    <Buttons name="" onClick={() => StyleFilter(item)} className="filters__item--close">
                      <CloseOutlinedIcon />
                    </Buttons>
                  </FiltersItem>
                ))
              }
            </Tabs>
          </Box>
          {styles_filter?.length == 0 && color_filter?.length == 0 && category_filter?.length == 0 ?
            (
              <SimpleTypography
                className='filters__text--text'
                text="Нет фильтров"
              />
            )
            :
            (
              <Buttons
                className="filters__clear--btn"
                name=""
                onClick={ClearFilters}
              >
                <Image
                  src="/icons/clear-filters.svg"
                  alt="Clear filters"
                  width={12}
                  height={14}
                />
                <SimpleTypography
                  className='filters__clear--text'
                  text="Очистить все"
                />
              </Buttons>
            )
          }
        </Grid>
        {/* <Grid xs={2} >
        </Grid> */}
      </Grid>
    </Box>
  )
}

export default Filters