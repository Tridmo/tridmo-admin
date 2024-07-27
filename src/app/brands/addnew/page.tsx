"use client"

import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStyles } from '../../../data/get_all_styles';
import AddBrand from '@/components/screens/brands/add_new';
import { selectMyProfile } from '../../../data/me';

export default function AddNewBrand() {
  const dispatch = useDispatch<any>()
  const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
  const stylesData__status = useSelector((state: any) => state?.get_all_styles.status);

  const profile = useSelector(selectMyProfile)

  useEffect(() => {
    if (profile) {
      if (stylesData__status == 'idle') {
        dispatch(getAllStyles())
      }
    }
  }, [
    profile,
    stylesData__status
  ])

  return (
    <>
      <AddBrand />
    </>
  );
}
