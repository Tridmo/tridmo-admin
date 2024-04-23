"use client"

import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getModelCategories } from '../../../data/categories';
import AddCategory from '@/components/screens/categories/add_new';

export default function AddNewCategory() {
  const dispatch = useDispatch<any>()
  const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
  const categoriesData__status = useSelector((state: any) => state?.categories?.model_status);

  useEffect(() => {
    if (categoriesData__status == 'idle') {
      dispatch(getModelCategories())
    }
  }, [
    dispatch,
    categoriesData__status
  ])

  return (
    <>
      <AddCategory />
    </>
  );
}
