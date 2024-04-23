"use client"

import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import ConnectionError from '@/components/site_info/connection_error';
import { Box, Grid } from '@mui/material';

import CircularProgress from '@mui/material/CircularProgress';
import { getOneBrand, selectOneBrand } from '@/data/get_one_brand';
import { getAllStyles } from '../../../../data/get_all_styles';
import EditBrand from '@/components/screens/brands/edit';

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

export default function UserProfile() {
  const getBrandStatus = useSelector((state: any) => state?.get_one_brand?.status)
  const stylesData__status = useSelector((state: any) => state?.get_all_styles.status);
  const dispatch = useDispatch<any>()
  const params = useParams<{ slug: string }>()

  React.useMemo(() => {
    dispatch(getOneBrand(params?.slug))
  }, [params.slug])
  React.useMemo(() => {
    if (stylesData__status == 'idle') {
      dispatch(getAllStyles())
    }
  }, [stylesData__status])

  if (getBrandStatus === "succeeded") {
    return (
      <>
        <Box sx={{ background: "#fafafa" }}>
          <EditBrand />
        </Box>
      </>
    )
  } else if (getBrandStatus === "failed") {
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
