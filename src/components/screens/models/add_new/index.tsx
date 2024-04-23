"use client"

import React, { Suspense, useEffect, useState } from 'react'
import { Box, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { sampleUser } from '@/data/samples';
import { AddModelForm } from '@/components/views/model/add_model_form';
import { notFound, usePathname, useSearchParams } from 'next/navigation';
import { getOneBrand, selectOneBrand } from '../../../../data/get_one_brand';
import { setRouteCrumbs } from '../../../../data/route_crumbs';


export default function AddModel() {
  const brand = useSelector(selectOneBrand);
  const dispatch = useDispatch<any>()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const brandSlug = searchParams.get('brand')

  React.useEffect(() => {
    if (brandSlug && !brand) {
      dispatch(getOneBrand(brandSlug!))
    }
  }, [])

  if (brandSlug) {
    useEffect(() => {
      if (brand)
        dispatch(setRouteCrumbs(
          [{
            title: 'Бренды',
            route: '/brands'
          }, {
            title: brand?.name || 'Brand',
            route: `/brands/${brandSlug}`
          }, {
            title: 'Добавить модель',
            route: pathname + `/?brand=${brandSlug}`
          }]
        ))
    }, [brand])
  } else {
    useEffect(() => {
      dispatch(setRouteCrumbs(
        [{
          title: 'Модели',
          route: '/models'
        }, {
          title: 'Добавить модель',
          route: pathname
        }]
      ))
    }, [])
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

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
          <AddModelForm selectedBrand={brandSlug} />
        </Grid>
      </Grid>
    </Box>
  )
}