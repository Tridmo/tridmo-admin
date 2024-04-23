"use client"

import React, { useState } from 'react'
import { Box, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { sampleUser } from '@/data/samples';
import { AddBrandForm } from '../../../views/brand/add_brand_form';
import { setRouteCrumbs } from '../../../../data/route_crumbs';


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