"use client"

import * as React from 'react'
import { Box, Divider, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SimpleTypography from '../../../typography';
import ProfileInfo from '@/components/views/profile/info';
import BasicPagination from '@/components/pagination/pagination';
import { getAuthorInteriors, selectAuthorInteriors } from '../../../../data/get_author_interiors';
import SimpleCard from '../../../simple_card';


export default function UserProfile() {

  return (
    <>
      <Box sx={{ background: "#fafafa" }} className="products">
        <Box className='products__container' sx={{ maxWidth: "1200px", width: "100%", margin: "0 auto 32px auto !important", alignItems: "center", }}>
          <Grid container sx={{ marginTop: "32px", marginLeft: 0 }} >

            <Grid item xs={12}>
              <ProfileInfo of='designer' />
            </Grid >

          </Grid>
        </Box>
      </Box>

    </>
  )
}
