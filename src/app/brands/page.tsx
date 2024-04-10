"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';
import InteriorsPage from '../../components/screens/interiors';
import { getAllBrands } from '../../data/get_all_brands';
import BrandsPage from '../../components/screens/brands';

declare global {
  interface Window {
    tc: any; // whatever type you want to give. (any,number,float etc)
  }
}

export default function Brands() {
  const dispatch = useDispatch<any>();
  const router = useRouter();

  const getBrandsStatus = useSelector((state: any) => state?.get_all_brands?.status);

  React.useEffect(() => {
    if (getBrandsStatus === "idle") {
      dispatch(getAllBrands({}))
    }
  }, [dispatch, router, getBrandsStatus])

  return (
    <>
      <>
        <BrandsPage />
      </>
    </>
  )
}
