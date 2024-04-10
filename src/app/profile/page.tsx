"use client"

import * as React from 'react';
import type { NextPage } from 'next'
import { useDispatch, useSelector } from 'react-redux';
import { getOneInterior, selectOneInterior } from '@/data/get_one_interior';
import { notFound, useParams, useRouter } from 'next/navigation';
import IconBreadcrumbs from '@/components/breadcrumbs';
import ConnectionError from '@/components/site_info/connection_error';
import { Box, Grid } from '@mui/material';

import CircularProgress from '@mui/material/CircularProgress';
import { getBrandModels } from '@/data/get_brand_models';
import { getTopModels } from '@/data/get_top_models';
import OneInterior from '@/components/screens/interiors/one';
import { getComments } from '@/data/get_comments';
import Profile from '../../components/screens/profile';
import { selectMyProfile } from '../../data/me';
import { getAuthorInteriors, selectAuthorInteriors } from '../../data/get_author_interiors';
import { getProfile } from '../../data/get_profile';
import { setLoginState } from '../../data/modal_checker';

const LoaderStyle = {
    // width: "100px !important",
    // height: "100px !important",
    zIndex: "10",
    position: "relative"
}
const ContainerStyle = {
    display: "flex",
    justifyContent: "center",
    maxWidth: "1200px",
    height: "697px",
    margin: "0 auto",
    alignItems: "center",
}
const BgBlur = {
    position: "absolute",
    left: "0",
    top: "0",
    width: "100%",
    height: "100%",
    background: "#fff",
    filter: "blur(10px)"
}

export default function UserProfile() {
    const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
    const getProfileStatus = useSelector((state: any) => state?.get_profile?.status)
    const getAuthorInteriorsStatus = useSelector((state: any) => state?.get_author_interiors?.status)
    const dispatch = useDispatch<any>()
    const router = useRouter()
    const profile = useSelector(selectMyProfile)
    const interiors = useSelector(selectAuthorInteriors)

    React.useEffect(() => {
        if (getProfileStatus === 'idle') {
            dispatch(getProfile())
        }
    }, [dispatch, isAuthenticated, getProfileStatus])

    React.useEffect(() => {
        if (profile) {
            dispatch(getAuthorInteriors({ author: profile?.username }))
        }
    }, [profile])

    if (getProfileStatus === "succeeded") {
        return (
            <>
                <Box sx={{ background: "#fafafa" }}>
                    <Profile />
                </Box>
            </>
        )
    } else if (getProfileStatus === "failed") {
        return (
            <>
                <Box sx={{ background: "#fafafa" }}>
                    <ConnectionError />
                </Box>
            </>
        )
    } else {
        return (
            <>
                <Box sx={{ background: "#fafafa", position: "relative" }}>
                    <Box sx={BgBlur} />
                    <Box>
                        <Box sx={ContainerStyle}>
                            <CircularProgress sx={LoaderStyle} />
                        </Box>
                    </Box>
                </Box>
            </>
        )
    }
}
