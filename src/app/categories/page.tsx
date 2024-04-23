"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getCategoriesWithModelCount } from '../../data/categories';
import CategoriesPage from '@/components/screens/categories';

declare global {
  interface Window {
    tc: any; // whatever type you want to give. (any,number,float etc)
  }
}

export default function Categories() {
  const dispatch = useDispatch<any>();

  const getCategoriesStatus = useSelector((state: any) => state?.categories?.with_model_count_status);

  React.useEffect(() => {
    if (getCategoriesStatus === "idle") {
      dispatch(getCategoriesWithModelCount())
    }
  }, [dispatch, getCategoriesStatus])

  return (
    <>
      <CategoriesPage />
    </>
  )
}
