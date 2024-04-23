"use client"

import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import ConnectionError from '@/components/site_info/connection_error';
import { Box, Grid } from '@mui/material';

import CircularProgress from '@mui/material/CircularProgress';
import { getOneBrand, selectOneBrand } from '@/data/get_one_brand';
import { getAllStyles } from '../../../../data/get_all_styles';
import { getModelCategories, getOneCategory } from '../../../../data/categories';
import EditCategory from '@/components/screens/categories/edit';

const LoaderStyle = {
  // width: "100px !important",
  // height: "100px !important",
  zIndex: "10",
  position: "relative"
}
const ContainerStyle = {
  display: "flex",
  justifyContent: "center",
  maxWidth: "1200px",
  height: "697px",
  margin: "0 auto",
  alignItems: "center",
}
const BgBlur = {
  position: "absolute",
  left: "0",
  top: "0",
  width: "100%",
  height: "100%",
  background: "#fff",
  filter: "blur(10px)"
}

export default function EditCategoryPage() {
  const getCategoryStatus = useSelector((state: any) => state?.categories?.one_status)
  const categoriesData__status = useSelector((state: any) => state?.categories?.model_status);
  const dispatch = useDispatch<any>()
  const params = useParams<{ id: string }>()

  React.useMemo(() => {
    dispatch(getOneCategory(params?.id))
  }, [params.id])

  React.useMemo(() => {
    if (categoriesData__status == 'idle') {
      dispatch(getModelCategories())
    }
  }, [
    dispatch,
    categoriesData__status
  ])

  if (getCategoryStatus === "succeeded") {
    return (
      <>
        <Box sx={{ background: "#fafafa" }}>
          <EditCategory />
        </Box>
      </>
    )
  } else if (getCategoryStatus === "failed") {
    return (
      <>
        <Box sx={{ background: "#fafafa" }}>
          <ConnectionError />
        </Box>
      </>
    )
  } else {
    return (
      <>
        <Box sx={{ background: "#fafafa", position: "relative" }}>
          <Box sx={BgBlur} />
          <Box>
            <Box sx={ContainerStyle}>
              <CircularProgress sx={LoaderStyle} />
            </Box>
          </Box>
        </Box>
      </>
    )
  }
}
