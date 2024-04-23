"use client"

import React from 'react';
import AddInterior from "@/components/screens/interiors/add_new";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStyles } from '../../../data/get_all_styles';
import { getInteriorCategories } from '../../../data/categories';
import { notFound } from 'next/navigation';

export default function Interiors() {
  const dispatch = useDispatch<any>()
  const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
  const stylesData__status = useSelector((state: any) => state?.get_all_styles.status);
  const categoriesDate__status = useSelector((state: any) => state?.categories?.interior_status)

  useEffect(() => {
    if (stylesData__status == 'idle') {
      dispatch(getAllStyles())
    }
    if (categoriesDate__status == 'idle') {
      dispatch(getInteriorCategories())
    }
  }, [stylesData__status, categoriesDate__status, dispatch])

  return (
    <>
      <AddInterior />
    </>
  );
}
