"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getCategoriesWithModelCount } from '../../data/categories';
import { selectMyProfile } from '../../data/me';
import OthersPage from '../../components/screens/others';
import { getAllMaterials, selectAllMaterials_status } from '../../data/get_all_materials';
import { getAllStyles, selectAllStyles_status } from '../../data/get_all_styles';
import { getAllColors, selectAllColors_status } from '../../data/get_all_colors';

declare global {
  interface Window {
    tc: any; // whatever type you want to give. (any,number,float etc)
  }
}

export default function Others() {
  const dispatch = useDispatch<any>();

  const getCategoriesStatus = useSelector((state: any) => state?.categories?.with_model_count_status);
  const getMaterialsStatus = useSelector(selectAllMaterials_status);
  const getStylesStatus = useSelector(selectAllStyles_status);
  const getColorsStatus = useSelector(selectAllColors_status);
  const profile = useSelector(selectMyProfile)

  React.useEffect(() => {
    if (profile) {
      if (getStylesStatus === "idle") {
        dispatch(getAllStyles())
      }
      if (getCategoriesStatus === "idle") {
        dispatch(getCategoriesWithModelCount())
      }
      if (getMaterialsStatus === "idle") {
        dispatch(getAllMaterials())
      }
      if (getColorsStatus === "idle") {
        dispatch(getAllColors())
      }
    }
  }, [profile, getCategoriesStatus, getMaterialsStatus, getStylesStatus, getColorsStatus])

  return (
    <>
      <OthersPage />
    </>
  )
}
