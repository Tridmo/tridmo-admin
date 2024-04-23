"use client"

import * as React from 'react';
import type { NextPage } from 'next'
import { useDispatch, useSelector } from 'react-redux';
import { getOneInterior, selectOneInterior } from '@/data/get_one_interior';
import { useParams } from 'next/navigation';
import IconBreadcrumbs from '@/components/breadcrumbs';
import ConnectionError from '@/components/site_info/connection_error';
import { Box, Grid } from '@mui/material';

import CircularProgress from '@mui/material/CircularProgress';
import { getBrandModels } from '../../../data/get_brand_models';
import { getTopModels } from '../../../data/get_top_models';
import OneInterior from '@/components/screens/interiors/one';
import { getComments } from '../../../data/get_comments';

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

export default function OneProduct() {

  const dispatch = useDispatch<any>();
  const getOneInterior__status = useSelector((state: any) => state?.get_one_interior?.status);
  const getTopModelsStatus = useSelector((state: any) => state?.get_top_models.status);
  const refreshModelOrderStatus = useSelector((state: any) => state?.handle_filters?.refreshModelOrder);
  const selectedInterior = useSelector(selectOneInterior)
  const params = useParams<{ slug: string }>();

  React.useEffect(() => {
    dispatch(getOneInterior(params.slug))
  }, [params, dispatch, refreshModelOrderStatus])

  React.useEffect(() => {
    if (selectedInterior) {
      dispatch(getComments({ entity_id: selectedInterior?.id }))
    }
  }, [selectedInterior])

  if (getOneInterior__status === "succeeded") {
    return (
      <>
        <Box sx={{ background: "#fafafa" }}>
          <OneInterior />
        </Box>
      </>
    )
  } else if (getOneInterior__status === "failed") {
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
