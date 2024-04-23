"use client"

import React from 'react';
import { Suspense, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStyles } from '../../../data/get_all_styles';
import { getCategories, getInteriorCategories, getModelCategories } from '../../../data/categories';
import { notFound } from 'next/navigation';
import AddModel from '@/components/screens/models/add_new';
import { getAllBrands } from '../../../data/get_all_brands';
import { getModelPlatforms } from '../../../data/get_model_platforms';
import { getRenderPlatforms } from '../../../data/get_render_platforms';
import { getAllColors } from '../../../data/get_all_colors';
import { getAllMaterials } from '../../../data/get_all_materials';

export default function AddNewModel() {
  const dispatch = useDispatch<any>()
  const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
  const stylesData__status = useSelector((state: any) => state?.get_all_styles.status);
  const categoriesData__status = useSelector((state: any) => state?.categories?.model_status)
  const brandsData__status = useSelector((state: any) => state?.get_all_brands?.status)
  const modelPlatformsData__status = useSelector((state: any) => state?.get_model_platforms?.status)
  const renderPlatformsData__status = useSelector((state: any) => state?.get_render_platforms?.status)
  const colorsData__status = useSelector((state: any) => state?.get_all_colors?.status)
  const materialsData__status = useSelector((state: any) => state?.get_all_materials?.status)

  useMemo(() => {
    if (stylesData__status == 'idle') {
      dispatch(getAllStyles())
    }
    if (categoriesData__status == 'idle') {
      dispatch(getModelCategories())
    }
    if (brandsData__status == 'idle') {
      dispatch(getAllBrands({}))
    }
    if (modelPlatformsData__status == 'idle') {
      dispatch(getModelPlatforms())
    }
    if (renderPlatformsData__status == 'idle') {
      dispatch(getRenderPlatforms())
    }
    if (colorsData__status == 'idle') {
      dispatch(getAllColors())
    }
    if (materialsData__status == 'idle') {
      dispatch(getAllMaterials())
    }
  }, [
    dispatch,
    stylesData__status,
    categoriesData__status,
    brandsData__status,
    modelPlatformsData__status,
    renderPlatformsData__status,
    colorsData__status,
    materialsData__status
  ])

  return (
    <>
      <Suspense>
        <AddModel />
      </Suspense>
    </>
  );
}
