"use client"

import React, { useEffect, useState } from 'react'
import { Box, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { sampleUser } from '@/data/samples';
import { AddCategoryForm } from '../../../views/category/add_category_form';
import { setRouteCrumbs } from '../../../../data/route_crumbs';


export default function AddCategory() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setRouteCrumbs(
      [{
        title: 'Категории',
        route: '/categories'
      }, {
        title: 'Добавить категорию',
        route: '/categories/addnew'
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
        width={'900px'}
        m={'32px 0'}
      >
        <Grid item width={'100%'}>
          <AddCategoryForm />
        </Grid>
      </Grid>
    </Box>
  )
}