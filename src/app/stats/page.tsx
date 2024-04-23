"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getCategoriesWithModelCount } from '../../data/categories';
import CategoriesPage from '../../components/screens/categories';
import NotFoundPage from '../../components/site_info/not_found';

declare global {
  interface Window {
    tc: any; // whatever type you want to give. (any,number,float etc)
  }
}

export default function StatsPage() {
  return (
    <>
      <NotFoundPage />
    </>
  )
}
