"use client"

import React, { Suspense, useState } from 'react'
import { Box, Grid } from '@mui/material';
import { AddModelForm } from '@/components/views/model/add_model_form';
import { useSelector } from 'react-redux';
import { selectOneModel } from '../../../../data/get_one_model';

export default function EditModel() {
  const model = useSelector(selectOneModel);

  return (
    <Box className='products__container' sx={{ maxWidth: "1268px", width: "100%", margin: "0 auto !important", alignItems: "center", }}>
      <Grid
        container
        display={'flex'}
        alignItems={'flex-start'}
        justifyContent={'center'}
        width={'100%'}
        m={'32px 0'}
      >
        <Grid item width={'100%'}>
          <AddModelForm editing model={model} />
        </Grid>
      </Grid>
    </Box>
  )
}