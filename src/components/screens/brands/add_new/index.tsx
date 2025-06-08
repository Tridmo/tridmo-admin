"use client"

import { Box, Grid } from '@mui/material';
import React from "react";
import { useDispatch } from "react-redux";
import { setRouteCrumbs } from "../../../../data/route_crumbs";
import { AddBrandForm } from "../../../views/brand/add_brand_form";


export default function AddBrand() {

  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(setRouteCrumbs(
      [{
        title: 'Бренды',
        route: '/brands'
      }, {
        title: 'Добавить бренд',
        route: `/brands/addnew`
      }]
    ))
  }, [])

  return (
    <Box className='products__container' sx={{ maxWidth: "1268px", width: "100%", margin: "0 auto !important", alignItems: "center", }}>
      <Grid
        container
        display={'flex'}
        alignItems={'flex-start'}
        justifyContent={'center'}
        width={'608px'}
        m={'32px 0'}
      >
        <Grid item width={'100%'}>
          <AddBrandForm />
        </Grid>
      </Grid>
    </Box>
  )
}