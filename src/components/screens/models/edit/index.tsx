"use client"

import React, { Suspense, useState } from 'react'
import { Box, Grid } from '@mui/material';
import { AddModelForm } from '@/components/views/model/add_model_form';

export default function EditModel() {
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
          <AddModelForm editing />
        </Grid>
      </Grid>
    </Box>
  )
}