"use client"

import React, { Suspense } from 'react';
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';
import { getAllStyles } from '@/data/get_all_styles';
import { getAllInteriors } from '@/data/get_all_interiors';
import LandingPage from '../components/screens/landing';
import { getAllModels } from '../data/get_all_models';
import { getAllDesigners } from '../data/get_all_designers';
import { getAllBrands } from '../data/get_all_brands';
import ModelsPage from '../components/screens/models';
import { getCategories } from '../data/categories';
import Models from './models/page';

declare global {
  interface Window {
    tc: any; // whatever type you want to give. (any,number,float etc)
  }
}

export default function Home() {
  const dispatch = useDispatch<any>();
  const router = useRouter();

  // ---- intial staters ---- //

  return (
    <>
      <Models />
    </>
  )
}
