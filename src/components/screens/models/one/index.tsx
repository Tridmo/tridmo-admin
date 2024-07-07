"use client"

import * as React from 'react'
import { Box, Divider, Grid } from '@mui/material';
import ProductSlider from '../../../views/model/slider';
import { useDispatch, useSelector } from 'react-redux';
import ProductInfo from '../../../views/model/info'
import ProductModal from '../../../views/model/model_modal';
import { concatRouteCrumb, setRouteCrumbs } from '../../../../data/route_crumbs';
import { selectOneModel } from '../../../../data/model_slider';
import { usePathname } from 'next/navigation';
import ModelDownloadsChartComponent from '../../../views/statistics/models/one_model_download_chart';
import ModelTagsChartComponent from '../../../views/statistics/models/one_model_tags_chart';
import ModelInteriorsList from '../../../views/model/model_interiors_list';


export default function OneModel() {
  const model = (useSelector(selectOneModel))?.data?.model;
  const dispatch = useDispatch()
  const pathname = usePathname()

  React.useEffect(() => {
    if (model) {
      dispatch(setRouteCrumbs(
        [{
          title: 'Модели',
          route: '/models'
        }, {
          title: model?.name,
          route: pathname
        }]
      ))
    }
  }, [model])

  return (
    <>
      <Box sx={{ background: "#fafafa" }} className="products">
        <Box className='products__container' sx={{ maxWidth: "1200px", width: "100%", margin: "0 auto !important", alignItems: "center", }}>
          <Grid
            className='products__grid'
            container
            sx={{
              marginTop: '6px',
              width: "100%",
              paddingBottom: "18px",
              justifyContent: 'space-between'
            }}
          >
            <ProductModal />
            <ProductSlider name="slider" />
            <ProductInfo />
          </Grid>

          <Grid container gap={2} mb={'64px'}>
            <Grid item xs={12} lg={12} sm={12}>
              <ModelDownloadsChartComponent />
            </Grid>

            <Grid item xs={12} lg={12} sm={12}>
              <ModelTagsChartComponent />
            </Grid>

            <Grid item xs={12} lg={12} sm={12}>
              <ModelInteriorsList />
            </Grid>
          </Grid>


        </Box>
      </Box>

    </>
  )
}
