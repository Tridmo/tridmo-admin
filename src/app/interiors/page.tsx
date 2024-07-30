"use client"

import React, { Suspense } from 'react';
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';
import { getAllStyles } from '@/data/get_all_styles';
import { getAllInteriors, getCheckedInteriors, getUncheckedInteriors, selectAllInteriors, selectAllInteriorsStatus, selectCheckedInteriorsStatus, selectUncheckedInteriorsStatus } from '@/data/get_all_interiors';
import InteriorsPage from '@/components/screens/interiors';
import { selectMyProfile } from '../../data/me';
import { getInteriorCategories } from '../../data/categories';

declare global {
  interface Window {
    tc: any; // whatever type you want to give. (any,number,float etc)
  }
}

export default function Interiors() {
  const dispatch = useDispatch<any>();
  const router = useRouter();

  const getInteriorsStatus = useSelector(selectAllInteriorsStatus);
  const interiorsCategoriesStatus = useSelector((state: any) => state?.categories?.interior_status)

  const getInteriorsCategoryFilter = useSelector((state: any) => state?.handle_filters?.interiors_categories)
  const getInteriorsPageFilter = useSelector((state: any) => state?.handle_filters?.interiors_page)
  const getInteriorsNameFilter = useSelector((state: any) => state?.handle_filters?.interiors_name)
  const getInteriorsOrderBy = useSelector((state: any) => state?.handle_filters?.interiors_orderby)
  const getInteriorsOrder = useSelector((state: any) => state?.handle_filters?.interiors_order)

  const profile = useSelector(selectMyProfile)

  React.useEffect(() => {
    if (profile) {
      if (getInteriorsStatus === "idle") {
        dispatch(getAllInteriors())
      }
      if (interiorsCategoriesStatus == 'idle') {
        dispatch(getInteriorCategories())
      }
    }
  }, [
    profile,
    interiorsCategoriesStatus,
  ])

  return (
    <>
      <InteriorsPage />
    </>
  )
}
