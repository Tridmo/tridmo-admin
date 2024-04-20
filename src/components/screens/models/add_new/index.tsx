"use client"

import React, { Suspense, useState } from 'react'
import { Box, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { sampleUser } from '@/data/samples';
import { AddModelForm } from '@/components/views/model/add_model_form';
import { notFound } from 'next/navigation';


export default function AddModel() {

    const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
    const currentUser = sampleUser;

    // if (!isAuthenticated) {
    //     notFound()
    // }

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
                  <Suspense>
                    <AddModelForm />
                  </Suspense>
                </Grid>
            </Grid>
        </Box>
    )
}