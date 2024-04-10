"use client"
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import SimpleTypography from '../../typography'
import { Box, keyframes } from '@mui/system'
import { Checkbox, FormControlLabel } from '@mui/material';
import styled from '@emotion/styled';
import { getCategories, selectCategories } from '../../../data/categories'
import Skeleton from '@mui/material/Skeleton';
import { getAllModels } from '../../../data/get_all_models'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { resetFilters, setCategoryFilter, setCategoryNameFilter, setCategorySelectedChild } from '../../../data/handle_filters'

const CustomCategoryItem = styled(Accordion)(
  ({ theme }) =>
    `
    background:transparent;
    transition: all 0.4s ease;
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;

    &:not(:last-child) {
      border-bottom: 1px solid #E0E0E0 !important;
    }
    
    &:hover{
      background: #F5F5F5;
    }

    .MuiCheckbox-colorPrimary{
      color:#7210BE !important
    }

    &.MuiPaper-accardion__active{   
      background: #fff;
      margin:0
    }


  `
);
interface categoryProps {
  id?: any,
  created_at?: string,
  description?: string,
  name?: string,
  parent_id?: string,
}

const Categories = () => {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useDispatch<any>()
  const categoryData = useSelector(selectCategories)
  const categoryStatus = useSelector((state: any) => state?.categories?.status)
  const [childrenCategoryData, setChildrenCategoryData] = useState<any[]>([])
  const [isAccardionOpen, setIsAccardionOpen] = useState(false);
  const [expanded, setExpanded] = React.useState<string | false | string[]>(false);

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

  const handleCloseAccordion = (item: any) => (event: React.SyntheticEvent, isExpanded: boolean) => {

    setExpanded(isExpanded ? item?.name : false);
    setIsAccardionOpen(!isAccardionOpen)

    if (isExpanded) {
      setChildrenCategoryData([])
      dispatch(setCategoryNameFilter({ knnex: item?.name }))
      // router.push(` ${pathname}/?page=${getModelPageFilter}`
      //   + getModelStyleFilter?.length ? `&styles=${getModelStyleFilter}` : ''
      //     + item?.name && item?.name?.length ? `&category_name=${item.name}` : ''
      //       + getModelCategoryFilter?.length ? `&category=${getModelCategoryFilter}` : ''
      // );

      let res = (categoryData as any[]).find((c) => c.name === item?.name);
      // for (let i = 0; i < categoryData?.length; i++) {
      //   if (categoryData[i].name === item?.name) {
      //     res = categoryData[i];
      //     break
      //   }
      // }

      let arr: any[] = [];
      res?.children?.forEach((category: categoryProps) => {
        arr.push({
          id: category?.id,
          name: category?.name,
          parent_id: category?.parent_id,
          is__Selected: searchParams.get('category')?.includes((category.id).toString()) ? true : false,
        })
      })
      setChildrenCategoryData(arr)
    }
    if (!isExpanded) {
      setChildrenCategoryData([])
      dispatch(setCategoryFilter({ knex: [] }))
      dispatch(setCategoryNameFilter({ knnex: null }))
      createQueryString('category', []);
      createQueryString('category_name', []);
      // router.query.category_name = [];
      // router.push(`${pathname}/?page=${getModelPageFilter}`
      //   + getModelStyleFilter?.length ? `&styles=${getModelStyleFilter}` : ''
      // );
    }
  };

  useEffect(() => {
    if (categoryStatus == 'idle') {
      dispatch(getCategories())

    }
  }, [categoryData, categoryStatus, dispatch])

  const SkletonData = ['', '', '', '', '', '']


  useMemo(() => {
    const setChildrenData = () => {

      let res = (categoryData as any[]).find((c) => c.name === getModelCategoryNameFilter);

      // for (let i = 0; i < categoryData?.length; i++) {
      //   if (categoryData[i].name === getModelCategoryNameFilter) {
      //     res = categoryData[i];
      //     break
      //   }
      // }

      let arr: any[] = [];

      res?.children?.forEach((category: categoryProps) => {
        arr.push({
          id: category?.id,
          name: category?.name,
          parent_id: category?.parent_id,
          is__Selected: getModelCategoryFilter == category?.id || getModelCategoryFilter?.includes((category?.id)) || getModelCategoryFilter?.includes((category.id)?.toString()) ? true : false,
        })
      })
      setChildrenCategoryData(arr)
      if (getModelCategoryNameFilter) {
        setExpanded(getModelCategoryNameFilter);
      }
    }
    if (router && getModelCategoryNameFilter && categoryStatus === "succeeded") {
      setChildrenData();
    }
  }, [router, categoryData, categoryStatus, getModelCategoryFilter, getModelCategoryNameFilter])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    let arr = childrenCategoryData;

    let res: any[] = [];

    for (let i = 0; i < arr?.length; i++) {
      if (arr[i].id === id && !arr[i].is__Selected) {
        arr[i].is__Selected = true;
      } else if (arr[i].id === id) {
        arr[i].is__Selected = false;
      }
    }

    for (let i = 0; i < arr?.length; i++) {
      if (arr[i].is__Selected) {
        res.push(arr[i]?.id)
      }
    }

    dispatch(getAllModels({
      categories: res,
      // colors: getModelColorFilter,
      styles: getModelStyleFilter,
      page: getModelPageFilter,
    }))

    dispatch(setCategoryFilter({ knex: res }))

    setChildrenCategoryData(arr);
  };

  if (categoryStatus === "succeeded") {
    return (
      <Box >
        <SimpleTypography className='section__title' text="Категории"></SimpleTypography>

        <Box sx={{ paddingBottom: '18px', display: "flex", flexDirection: "column", borderBottom: "1px solid #E0E0E0" }}>
          {
            categoryData?.map((item: any, index: any) => (
              item?.children?.length > 0 && item?.children[0]
                ? <CustomCategoryItem
                  expanded={expanded === item?.name}
                  className={`${expanded === item?.name ? "MuiPaper-accardion__active" : ""}`}
                  onChange={handleCloseAccordion(item)}
                  key={index}
                >

                  {/* ACCORDION TEXT */}

                  <AccordionSummary
                    sx={{
                      '&.Mui-expanded': {
                        minHeight: '48px'
                      },
                      '&-content.Mui-expanded': {
                        margin: '15px 0'
                      }
                    }}
                    expandIcon={<ExpandMoreIcon />}
                    // onClick={() => {
                    //   CategoryItemHandler(item, isAccardionOpen)
                    //   }
                    // }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <SimpleTypography
                      text={item?.name}
                      className="category__text"
                    />
                  </AccordionSummary>

                  {/* ACCORDION TEXT */}
                  {/* 
              { category_name === item?.name && !(sub_category_status === "loading" && sub_category_status !== "idle") ?  */}
                  <AccordionDetails>
                    {/* <FormControlLabel 
                  label="All"
                  control={
                    <Checkbox
                      checked={isAll__Chechbox__Selected}
                      indeterminate={false}
                      onClick={(e) => {handleSelectAll(isAll__Chechbox__Selected)}}
                    />
                  }
                /> */}
                    {
                      childrenCategoryData?.map((child__Category: any, index: number) => (
                        <FormControlLabel
                          key={index}
                          sx={{ minWidth: "100%" }}
                          label={`${child__Category?.name}`}
                          control={
                            <Checkbox
                              checked={child__Category?.is__Selected}
                              onClick={(event: any) => {
                                handleChange(event, child__Category?.id)
                              }
                              }
                            />
                          }
                        />
                      ))}
                  </AccordionDetails>
                  {/* : 
                  [1, 2, 3, 4].map((child__Category : any, index: number) => (
                    <Skeleton 
                    key={index} 
                    variant="rectangular"
                    width={210} 
                    height={24} 
                    style={{margin:"10px 0 10px"}}
                    />
                    ))
                  } */}
                </CustomCategoryItem>

                : null
            ))
          }
        </Box>
      </Box>
    )
  }
  else {
    return (
      <Box>
        <SimpleTypography className='section__title' text="Категории"></SimpleTypography>
        <Box sx={{
          overflow: "hidden",
        }}>
          <Box sx={{ paddingBottom: '18px', borderBottom: "1px solid #E0E0E0" }}>
            {
              SkletonData.map((item, index): any => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  width={'100%'}
                  height={24}
                  style={{ margin: "10px 0" }}
                />
                // <SkeletonElement type="text" key={index} />
                // <SkeletonProfile key={index} />
              ))
            }
          </Box>
        </Box>
      </Box>
    )
  }
}

export default Categories