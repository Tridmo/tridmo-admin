"use client"

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Grid, Box, Divider } from '@mui/material'
import { setRouteCrumbs } from '../../../data/route_crumbs'
import CategoriesList from '../../views/categories/list'
import MaterialsList from '../../views/materials/list'
import SimpleTypography from '../../typography'
import StylesList from '../../views/styles/list'
import ColorsList from '../../views/colors/list'

export default function OthersPage() {

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(setRouteCrumbs(
      [{
        title: 'Другие компоненты',
        route: '/others'
      }]
    ))
  }, [])

  return (
    <Box sx={{ width: '1268px', minHeight: 760, display: "block", margin: "0 auto" }}>
      <Grid gap={3} container sx={{ width: '100%', mt: "32px", mb: '64px', marginLeft: 0 }} >

        <Grid item xs={12}>
          <StylesList />
        </Grid>

        <Grid item xs={12}> <Divider /> </Grid>

        <Grid item xs={12}>
          <CategoriesList />
        </Grid>

        <Grid item xs={12}> <Divider /> </Grid>

        <Grid item xs={12}>
          <MaterialsList />
        </Grid>

        <Grid item xs={12}> <Divider /> </Grid>

        <Grid item xs={12}>
          <ColorsList />
        </Grid>

      </Grid>
    </Box >
  )
}

