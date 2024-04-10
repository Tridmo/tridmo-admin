"use client"

import React, { useState } from 'react'
import { Box, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { sampleUser } from '@/data/samples';
import { AddInteriorForm } from '@/components/views/interior/add_interior_form';
import { AddInteriorRequirements } from '@/components/views/interior/requirements';
import { notFound } from 'next/navigation';


export default function AddInterior() {

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
        <Box sx={{ background: "#fafafa" }} className="products" >
            <Box className='products__container' sx={{ maxWidth: "1200px", width: "100%", margin: "0 auto !important", alignItems: "center", }}>
                <Grid
                    container
                    display={'flex'}
                    alignItems={'flex-start'}
                    justifyContent={'space-between'}
                    m={'32px 0'}
                >
                    <Grid item width={'760px'}>
                        <AddInteriorForm />
                    </Grid>
                    <Grid item width={'400px'}>
                        <AddInteriorRequirements />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}