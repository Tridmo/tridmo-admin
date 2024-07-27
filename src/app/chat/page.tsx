"use client"

import * as React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getMyProfile, selectMyProfile } from '../../data/me';
import { getChatToken } from '../../data/get_chat_token';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import { Box, CircularProgress } from '@mui/material';
import ConnectionError from '../../components/site_info/connection_error';
import { BgBlur, ContainerStyle, LoaderStyle } from '../../styles/styles';
const Chat = dynamic(() => import('../../components/screens/chat'), { ssr: false });

declare global {
  interface Window {
    tc: any; // whatever type you want to give. (any,number,float etc)
  }
}

export default function StatsPage() {

  const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
  const getProfileStatus = useSelector((state: any) => state?.get_profile?.status)
  const tokenStatus = useSelector((state: any) => state?.get_chat_token?.status)
  const dispatch = useDispatch<any>()
  const profile = useSelector(selectMyProfile)

  React.useEffect(() => {
    if (!profile) {
      dispatch(getMyProfile())
    }
  }, [profile, getProfileStatus])

  React.useEffect(() => {
    if (profile) {
      if (tokenStatus == 'idle') {
        dispatch(getChatToken())
      }
    }
  }, [profile, Cookies, tokenStatus])

  if (getProfileStatus === "succeeded" && tokenStatus === "succeeded") {
    return (
      <>
        <Box sx={{ background: "#fafafa" }}>
          <Chat />
        </Box>
      </>
    )
  } else if (getProfileStatus === "failed" || getProfileStatus === "failed") {
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
