"use client"

import React, { Suspense } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';
import { getAllModels, selectAllModels } from '@/data/get_all_models';
import { getAllColors, selectAllColors } from '@/data/get_all_colors';
import { getAllStyles } from '@/data/get_all_styles';
import ProductCrumb from '@/components/breadcrumbs/model_crumb';
import { searchModels } from '@/data/search_model';
import ModelsPage from '@/components/screens/models';

declare global {
  interface Window {
    tc: any; // whatever type you want to give. (any,number,float etc)
  }
}

export default function Models() {
  const dispatch = useDispatch<any>();
  const router = useRouter();

  // ---- intial staters ---- //

  const getModelStatus = useSelector((state: any) => state?.get_all_models?.status);
  const getColorStatus = useSelector((state: any) => state?.get_all_colors?.status);
  const StyleStatus = useSelector((state: any) => state?.get_all_styles?.status)

  // ---- filters selector ----- //

  const getModelCategoryFilter = useSelector((state: any) => state?.handle_filters?.categories)
  const getModelColorFilter = useSelector((state: any) => state?.handle_filters?.colors)
  const getModelStyleFilter = useSelector((state: any) => state?.handle_filters?.styles)
  const getModelPageFilter = useSelector((state: any) => state?.handle_filters?.page)
  const getModelIsFree = useSelector((state: any) => state?.handle_filters?.is_free)
  const keywords = useSelector((state: any) => state?.search_models?.key)
  const searched__models__status = useSelector((state: any) => state?.search_models?.status)


  React.useEffect(() => {
    if (getModelStatus === "idle") {
      dispatch(getAllModels({
        category_id: getModelCategoryFilter,
        color_id: getModelColorFilter,
        style_id: getModelStyleFilter,
        page: getModelPageFilter,
        is_free: getModelIsFree,
      }))
    }
    if (searched__models__status === "idle") {
      dispatch(searchModels({
        category_id: getModelCategoryFilter,
        color_id: getModelColorFilter,
        style_id: getModelStyleFilter,
        page: getModelPageFilter,
        is_free: getModelIsFree,
        keyword: keywords
      }))
    }
    if (StyleStatus === "idle") {
      dispatch(getAllStyles());
    }

  }, [getModelStatus, dispatch, StyleStatus, router, getModelCategoryFilter, getModelColorFilter, getModelIsFree, getModelPageFilter, getModelStyleFilter])



  return (
    <>
      <>
        <Suspense>
          <ModelsPage />
        </Suspense>
      </>
    </>
  )
}
