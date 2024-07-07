"use client"

import * as React from 'react';
import type { NextPage } from 'next'
import { useDispatch, useSelector } from 'react-redux';
import { getOneModel, selectOneModel } from '@/data/get_one_model';
import { useParams } from 'next/navigation';
import IconBreadcrumbs from '@/components/breadcrumbs';
import ConnectionError from '@/components/site_info/connection_error';
import { Box, Grid } from '@mui/material';
import OneModel from "@/components/screens/models/one";

import CircularProgress from '@mui/material/CircularProgress';
import { getAllModels } from '../../../data/get_all_models';
import { getBrandModels } from '../../../data/get_brand_models';
import { getTopModels } from '../../../data/get_top_models';
import { getDesignerProfile } from '../../../data/get_designer';
import { getDesignerDownloads } from '../../../data/get_designer_downloads';
import UserProfile from '../../../components/screens/users/one';
import { getAuthorInteriors } from '../../../data/get_author_interiors';
import { getCategoriesByUserDownloads, getCategoriesByUserInteriors } from '../../../data/categories';
import { getAllBrandsByUserDownloads } from '../../../data/get_brands_by_user_downloads';

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
  const user = useSelector((state: any) => state?.get_designer);
  const getUser__status = useSelector((state: any) => state?.get_designer?.status);

  const params = useParams<{ username: string }>();

  React.useEffect(() => {
    dispatch(getDesignerProfile(params.username))
    dispatch(getDesignerDownloads({ username: params.username }))
    dispatch(getCategoriesByUserDownloads(params.username))
    dispatch(getCategoriesByUserInteriors(params.username))
    dispatch(getAllBrandsByUserDownloads({ username: params.username }))
    dispatch(getAuthorInteriors({ author: params.username }))
  }, [])

  if (getUser__status === "succeeded") {
    return (
      <>
        <Box sx={{ background: "#fafafa" }}>
          <UserProfile />
        </Box>
      </>
    )
  } else if (getUser__status === "failed") {
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
