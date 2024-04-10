"use client"

import * as React from 'react';
import type { NextPage } from 'next'
import { useDispatch, useSelector } from 'react-redux';
import { getOneInterior, selectOneInterior } from '@/data/get_one_interior';
import { useParams, useRouter } from 'next/navigation';
import IconBreadcrumbs from '@/components/breadcrumbs';
import ConnectionError from '@/components/site_info/connection_error';
import { Box, Grid } from '@mui/material';

import CircularProgress from '@mui/material/CircularProgress';
import { getBrandModels } from '@/data/get_brand_models';
import { getTopModels } from '@/data/get_top_models';
import OneInterior from '@/components/screens/interiors/one';
import { getComments } from '@/data/get_comments';
import Profile from '@/components/screens/profile';
import { selectMyProfile } from '@/data/me';
import { getAuthorInteriors, selectAuthorInteriors } from '@/data/get_author_interiors';
import { getProfile } from '@/data/get_profile';
import DesignerProfile from '../../../components/screens/designers/one';
import { getDesignerProfile } from '../../../data/get_designer';

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

export default function Designer() {
    const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
    const getProfileStatus = useSelector((state: any) => state?.get_designer?.status)
    const getAuthorInteriorsStatus = useSelector((state: any) => state?.get_author_interiors?.status)
    const profile = useSelector(selectMyProfile)
    const dispatch = useDispatch<any>()
    const router = useRouter()
    const interiors = useSelector(selectAuthorInteriors)
    const params = useParams<{ username: string }>()

    React.useEffect(() => {
        if (isAuthenticated && profile && params?.username == profile?.username) {
            router.push('/profile')
        } else {
            dispatch(getDesignerProfile(params?.username))
            dispatch(getAuthorInteriors({ author: params?.username }))
        }
    }, [dispatch, params, isAuthenticated, profile])

    if (getProfileStatus === "succeeded") {
        return (
            <>
                <Box sx={{ background: "#fafafa" }}>
                    <DesignerProfile />
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
