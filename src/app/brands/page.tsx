"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';
import InteriorsPage from '@/components/screens/interiors';
import { getAllBrands } from '../../data/get_all_brands';
import BrandsPage from '@/components/screens/brands';
import { getAllStyles } from '../../data/get_all_styles';
import { setBrandOrderBy } from '../../data/handle_filters';

declare global {
  interface Window {
    tc: any; // whatever type you want to give. (any,number,float etc)
  }
}

export default function Brands() {
  const dispatch = useDispatch<any>();
  const router = useRouter();

  const getBrandsStatus = useSelector((state: any) => state?.get_all_brands?.status);
  const getBrandNameFilter = useSelector((state: any) => state?.handle_filters?.brand_name)
  const getBrandOrderBy = useSelector((state: any) => state?.handle_filters?.brand_orderby)
  const getBrandOrder = useSelector((state: any) => state?.handle_filters?.brand_order)
  // const getStylesStatus = useSelector((state: any) => state?.get_all_styles?.status);
  dispatch(setBrandOrderBy('models_count'))

  React.useEffect(() => {
    if (getBrandsStatus === "idle") {
      console.log('HEHEHE');

      dispatch(getAllBrands({
        name: getBrandNameFilter,
        orderBy: getBrandOrderBy,
        order: getBrandOrder,
        page: 1,
      }))
    }
    // if (getStylesStatus === "idle") {
    //   dispatch(getAllStyles())
    // }
  }, [
    dispatch,
    getBrandsStatus,
    getBrandNameFilter,
    getBrandOrderBy,
    getBrandOrder,
    // getStylesStatus
  ])

  return (
    <>
      <BrandsPage />
    </>
  )
}
