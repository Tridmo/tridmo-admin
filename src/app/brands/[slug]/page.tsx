"use client"

import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import ConnectionError from '@/components/site_info/connection_error';
import { Box, Grid } from '@mui/material';

import CircularProgress from '@mui/material/CircularProgress';
import { getOneBrand, selectOneBrand } from '../../../data/get_one_brand';
import { getBrandModels } from '../../../data/get_brand_models';
import OneBrand from '@/components/screens/brands/one';
import { getBrandCategories } from '../../../data/categories';
import { selectMyProfile } from '../../../data/me';

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
  const dispatch = useDispatch<any>()
  const params = useParams<{ slug: string }>()
  const brand = useSelector(selectOneBrand)
  const profile = useSelector(selectMyProfile)

  React.useEffect(() => {
    if (profile) dispatch(getOneBrand(params?.slug))
  }, [profile, params, dispatch])

  React.useEffect(() => {
    if (profile) {
      if (brand) {
        dispatch(getBrandModels({ brand: brand?.id }))
        dispatch(getBrandCategories(brand?.id))
      }
    }
  }, [profile, brand])

  if (getBrandStatus === "succeeded") {
    return (
      <>
        <Box sx={{ background: "#fafafa" }}>
          <OneBrand />
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
