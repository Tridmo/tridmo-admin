"use client"

import React, { Suspense } from 'react';
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';
import { getAllStyles } from '@/data/get_all_styles';
import { getAllInteriors } from '@/data/get_all_interiors';
import InteriorsPage from '@/components/screens/interiors';

declare global {
  interface Window {
    tc: any; // whatever type you want to give. (any,number,float etc)
  }
}

export default function Interiors() {
  const dispatch = useDispatch<any>();
  const router = useRouter();

  // ---- intial staters ---- //

  const getModelStatus = useSelector((state: any) => state?.get_all_models?.status);
  const getColorStatus = useSelector((state: any) => state?.get_all_colors?.status);
  const StyleStatus = useSelector((state: any) => state?.get_all_styles?.status)
  const getInteriorsStatus = useSelector((state: any) => state?.get_all_interiors?.status);

  // ---- filters selector ----- //

  const getModelCategoryFilter = useSelector((state: any) => state?.handle_filters?.categories)
  const getModelColorFilter = useSelector((state: any) => state?.handle_filters?.colors)
  const getModelStyleFilter = useSelector((state: any) => state?.handle_filters?.styles)
  const getModelPageFilter = useSelector((state: any) => state?.handle_filters?.page)
  const getModelIsFree = useSelector((state: any) => state?.handle_filters?.is_free)

  React.useEffect(() => {
    if (getInteriorsStatus === "idle") {
      dispatch(getAllInteriors({
        categories: getModelCategoryFilter,
        colors: getModelColorFilter,
        styles: getModelStyleFilter,
        page: getModelPageFilter,
      }))
    }
    if (StyleStatus === "idle") {
      dispatch(getAllStyles());
    }
  }, [getModelStatus, dispatch, getColorStatus, getModelColorFilter, getModelIsFree, getModelPageFilter, getModelStyleFilter, getModelCategoryFilter, StyleStatus, router, getInteriorsStatus])

  return (
    <>
      <Suspense>
        <InteriorsPage />
      </Suspense>
    </>
  )
}
