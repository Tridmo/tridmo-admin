"use client"

import React, { Suspense } from 'react';
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';
import { getAllModels, selectAllModels } from '@/data/get_all_models';
import ModelsPage from '@/components/screens/models';
import { getCategories, getModelChildCategories, selectModelChildCategories, selectModelChildCategories_status } from '../../data/categories';
import { getAllBrands } from '../../data/get_all_brands';
import { selectMyProfile } from '../../data/me';

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
  const getTOpModelStatus = useSelector((state: any) => state?.get_top_models?.status);

  // ---- filters selector ----- //
  const getModelCategoryFilter = useSelector((state: any) => state?.handle_filters?.categories)
  const getModelBrandFilter = useSelector((state: any) => state?.handle_filters?.model_brand)
  const getModelColorFilter = useSelector((state: any) => state?.handle_filters?.colors)
  const getModelStyleFilter = useSelector((state: any) => state?.handle_filters?.styles)
  const getModelPageFilter = useSelector((state: any) => state?.handle_filters?.page)
  const getModelNameFilter = useSelector((state: any) => state?.handle_filters?.model_name)
  const getModelOrderBy = useSelector((state: any) => state?.handle_filters?.model_orderby)
  const getModelOrder = useSelector((state: any) => state?.handle_filters?.model_order)
  const getCategoriesStatus = useSelector(selectModelChildCategories_status);
  const getBrandsStatus = useSelector((state: any) => state?.get_all_brands?.status);

  const profile = useSelector(selectMyProfile)

  React.useEffect(() => {
    if (getCategoriesStatus == 'idle') dispatch(getModelChildCategories())
    if (getBrandsStatus == 'idle') dispatch(getAllBrands({}))
  }, [getCategoriesStatus, getBrandsStatus])

  React.useEffect(() => {
    if (profile) {
      if (getModelStatus === "idle") {
        dispatch(getAllModels({
          categories: getModelCategoryFilter,
          colors: getModelColorFilter,
          styles: getModelStyleFilter,
          brand: getModelBrandFilter,
          name: getModelNameFilter,
          page: getModelPageFilter,
          orderBy: getModelOrderBy,
          order: getModelOrder,
        }))
      }
    }
  }, [
    profile,
    getModelStatus,
    getTOpModelStatus,
    getModelCategoryFilter,
    getModelColorFilter,
    getModelPageFilter,
    getModelStyleFilter,
    getModelNameFilter,
    getModelOrderBy,
    getModelOrder,
  ])



  return (
    <>
      <Suspense>
        <ModelsPage />
      </Suspense>
    </>
  )
}
