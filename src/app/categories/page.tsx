"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getCategoriesWithModelCount } from '../../data/categories';
import CategoriesPage from '@/components/screens/categories';
import { selectMyProfile } from '../../data/me';

declare global {
  interface Window {
    tc: any; // whatever type you want to give. (any,number,float etc)
  }
}

export default function Categories() {
  const dispatch = useDispatch<any>();

  const getCategoriesStatus = useSelector((state: any) => state?.categories?.with_model_count_status);
  const profile = useSelector(selectMyProfile)

  React.useEffect(() => {
    if (profile) {
      if (getCategoriesStatus === "idle") {
        dispatch(getCategoriesWithModelCount())
      }
    }
  }, [profile, getCategoriesStatus])

  return (
    <>
      <CategoriesPage />
    </>
  )
}
