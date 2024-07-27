"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';
import { getAllBrands } from '../../data/get_all_brands';
import DesignersPage from '@/components/screens/designers';
import { getAllDesigners } from '../../data/get_all_designers';
import { getMyProfile, selectMyProfile } from '../../data/me';

declare global {
  interface Window {
    tc: any; // whatever type you want to give. (any,number,float etc)
  }
}

export default function Designers() {
  const dispatch = useDispatch<any>();
  const router = useRouter();

  const getDesignersStatus = useSelector((state: any) => state?.get_all_designers?.status);
  const getProfileStatus = useSelector((state: any) => state?.get_profile?.status);
  const profile = useSelector(selectMyProfile)

  React.useEffect(() => {
    if (profile) {
      if (getDesignersStatus === "idle") {
        dispatch(getAllDesigners({}))
      }
      if (getProfileStatus === "idle") {
        dispatch(getMyProfile())
      }
    }
  }, [profile, getDesignersStatus, getProfileStatus])

  return (
    <>
      <>
        <DesignersPage />
      </>
    </>
  )
}
