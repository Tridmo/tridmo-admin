"use client"

import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStyles } from '../../../data/get_all_styles';
import AddBrand from '@/components/screens/brands/add_new';

export default function AddNewBrand() {
  const dispatch = useDispatch<any>()
  const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
  const stylesData__status = useSelector((state: any) => state?.get_all_styles.status);

  useEffect(() => {
    if (stylesData__status == 'idle') {
      dispatch(getAllStyles())
    }
  }, [
    dispatch,
    stylesData__status
  ])

  return (
    <>
      <AddBrand />
    </>
  );
}
