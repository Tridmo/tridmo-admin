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
import { getModelDownloadsStats } from '../../../data/statistics/get_downloads_stats';
import { currentDate } from '../../../utils/format_date';
import { getModelTagsStats } from '../../../data/statistics/get_tags_stats';
import { getModelInteriors } from '../../../data/get_model_interiors';
import { getModelTagsCategories } from '../../../data/categories';

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
  const model = useSelector(selectOneModel)
  const getOneModel__status = useSelector((state: any) => state?.get_one_model?.status);
  const getTopModelsStatus = useSelector((state: any) => state?.get_top_models.status);
  const refreshModelOrderStatus = useSelector((state: any) => state?.handle_filters?.refreshModelOrder);

  const params = useParams<{ slug: string }>();
  const { year, month, week } = currentDate()

  React.useEffect(() => {
    dispatch(getOneModel(params.slug))
  }, [params])

  React.useMemo(() => {
    if (!!model) {
      dispatch(getModelDownloadsStats({ month, year, model_id: model?.id }))
      dispatch(getModelTagsStats({ month, year, model_id: model?.id }))
      dispatch(getModelInteriors({ model_id: model?.id }))
      dispatch(getModelTagsCategories(model?.id))
    }
  }, [model, getOneModel__status])

  if (getOneModel__status === "succeeded") {
    return (
      <>
        <Box sx={{ background: "#fafafa" }}>
          <OneModel />
        </Box>
      </>
    )
  } else if (getOneModel__status === "failed") {
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
