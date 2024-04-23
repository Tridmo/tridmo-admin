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
import { getModelCategories } from '../../../../data/categories';
import { getAllBrands } from '../../../../data/get_all_brands';
import { getModelPlatforms } from '../../../../data/get_model_platforms';
import { getRenderPlatforms } from '../../../../data/get_render_platforms';
import { getAllColors } from '../../../../data/get_all_colors';
import { getAllMaterials } from '../../../../data/get_all_materials';
import { getOneModel } from '../../../../data/get_one_model';
import EditModel from '@/components/screens/models/edit';

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

export default function EditModelPage() {
  const dispatch = useDispatch<any>()
  const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
  const getModel__status = useSelector((state: any) => state?.get_one_model?.status)
  const stylesData__status = useSelector((state: any) => state?.get_all_styles.status);
  const categoriesData__status = useSelector((state: any) => state?.categories?.model_status)
  const brandsData__status = useSelector((state: any) => state?.get_all_brands?.status)
  const modelPlatformsData__status = useSelector((state: any) => state?.get_model_platforms?.status)
  const renderPlatformsData__status = useSelector((state: any) => state?.get_render_platforms?.status)
  const colorsData__status = useSelector((state: any) => state?.get_all_colors?.status)
  const materialsData__status = useSelector((state: any) => state?.get_all_materials?.status)
  const refreshModelOrderStatus = useSelector((state: any) => state?.handle_filters?.refreshModelOrder);
  const params = useParams<{ slug: string }>();

  React.useEffect(() => {
    dispatch(getOneModel(params.slug))
  }, [])

  React.useMemo(() => {
    if (stylesData__status == 'idle') {
      dispatch(getAllStyles())
    }
    if (categoriesData__status == 'idle') {
      dispatch(getModelCategories())
    }
    if (brandsData__status == 'idle') {
      dispatch(getAllBrands({}))
    }
    if (modelPlatformsData__status == 'idle') {
      dispatch(getModelPlatforms())
    }
    if (renderPlatformsData__status == 'idle') {
      dispatch(getRenderPlatforms())
    }
    if (colorsData__status == 'idle') {
      dispatch(getAllColors())
    }
    if (materialsData__status == 'idle') {
      dispatch(getAllMaterials())
    }
  }, [
    stylesData__status,
    categoriesData__status,
    brandsData__status,
    modelPlatformsData__status,
    renderPlatformsData__status,
    colorsData__status,
    materialsData__status
  ])
  3
  if (getModel__status === "succeeded") {
    return (
      <>
        <Box sx={{ background: "#fafafa" }}>
          <EditModel />
        </Box>''
      </>
    )
  } else if (getModel__status === "failed") {
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
