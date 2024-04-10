import React, { useState } from 'react'
import { Box } from '@mui/system'
import { useSelector, useDispatch } from 'react-redux'
import Buttons from '../../buttons'
import SimpleTypography from '../../typography'
import { selectAllColors } from '../../../data/get_all_colors'
import Skeleton from '@mui/material/Skeleton';
import { getAllModels } from '../../../data/get_all_models'
import { setCategoryFilter, setColorFilter } from '../../../data/handle_filters'
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import { useRouter, useSearchParams } from 'next/navigation'

interface colorProps {
  id: string,
  created_at: string,
  hex_value: string,
  name: string,
  updated_at: string,
}

function ColorsFilter() {
  const AllColors = useSelector(selectAllColors)
  const dispatch = useDispatch<any>();
  const ColorsStatus = useSelector((state: any) => state?.get_all_colors?.status)
  const router = useRouter();
  // const searchParams = useSearchParams();
  const [custom__colors, setCustom__colors] = React.useState<any>([]);

  // ---- filters selector ----- //

  const getModelCategoryFilter = useSelector((state: any) => state?.handle_filters?.categories)
  const getModelCategoryNameFilter = useSelector((state: any) => state?.handle_filters?.category_name)
  const getModelColorFilter = useSelector((state: any) => state?.handle_filters?.colors)
  const getModelStyleFilter = useSelector((state: any) => state?.handle_filters?.styles)
  const getModelPageFilter = useSelector((state: any) => state?.handle_filters?.page)

  React.useEffect(() => {
    if (ColorsStatus === "succeeded") {
      if (router) {
        let arr = new Array();
        AllColors[0]?.data?.forEach((color: colorProps) => {
          if (getModelColorFilter?.includes(color.id) || getModelColorFilter?.includes((color.id)?.toString()) || getModelColorFilter == color?.id) {
            arr.push({
              id: color?.id,
              created_at: color?.created_at,
              hex_value: color?.hex_value,
              name: color?.name,
              updated_at: color?.updated_at,
              is__Selected: true,
            })
          } else {
            arr.push({
              id: color?.id,
              created_at: color?.created_at,
              hex_value: color?.hex_value,
              name: color?.name,
              updated_at: color?.updated_at,
              is__Selected: false,
            })
          }
        })
        setCustom__colors(arr);
        // setIsInitialized(true);
      }
    }
  }, [AllColors, ColorsStatus, router, getModelColorFilter]);

  const SkletonData = ['', '', '', '', '', '', '', '', '', '', '', '', '', '']

  const handleChange = (event: any, id: string) => {
    let arr = [...custom__colors];
    let count = 0;
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
    dispatch(setColorFilter({ cnex: res }))
    dispatch(getAllModels({
      category_id: getModelCategoryFilter,
      color_id: res,
      style_id: getModelStyleFilter,
      page: getModelPageFilter,
    }))
    if (getModelCategoryNameFilter) {
      router.push(`/?page=${getModelPageFilter}&colors=${res}&styles=${getModelStyleFilter}&category_name=${getModelCategoryNameFilter}&category=${getModelCategoryFilter}`);
    } else {
      router.push(`/?page=${getModelPageFilter}&colors=${res}&styles=${getModelStyleFilter}&category=${getModelCategoryFilter}`);
    }
    for (let i = 0; i < arr?.length; i++) {
      if (arr[i].is__Selected) {
        count++;
      }
    }

    setCustom__colors(arr);
  };

  if (ColorsStatus === "succeeded") {
    return (
      <Box sx={{ padding: "0 0 0 18px", marginTop: "15px", marginBottom: "10px" }}>

        <Box sx={{ borderBottom: "1px solid #E0E0E0" }}>
          <SimpleTypography className='section__title' text="Цвета"></SimpleTypography>
          {
            custom__colors?.map((color: any, index: any) => (
              <Buttons
                bgColor={color.hex_value}
                key={index}
                name=""
                className={`colors__btn ${color?.is__Selected ? "colors__active--btn" : ""}`}
                onClick={(e) => { handleChange(e, color?.id) }}
              >
                <DoneRoundedIcon sx={color?.name?.toLowerCase() === "white" ? { color: "#000" } : { color: "#fff" }} className='btn__check' />
              </Buttons>
            ))
          }
        </Box>

      </Box>
    )
  }
  else {
    return (
      <Box sx={{ padding: "0 0 0 18px", marginTop: "15px", marginBottom: "10px" }}>
        <Box sx={{ borderBottom: "1px solid #E0E0E0" }}>
          <SimpleTypography className='section__title' text="Цвета"></SimpleTypography>
          <Box sx={{ display: "flex", flexFlow: "wrap" }}>
            {
              SkletonData.map((item, index): any => (
                <Skeleton
                  key={index}
                  style={{ marginRight: "13px", marginBottom: "13px" }}
                  variant="circular"
                  width={26}
                  height={26}
                />
                // <SkeletonElement key={index} type="avatar" />
              ))
            }
          </Box>

        </Box>

      </Box>
    )
  }


}

export default ColorsFilter
