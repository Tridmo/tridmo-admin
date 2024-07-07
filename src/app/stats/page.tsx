"use client"

import * as React from 'react';
import NotFoundPage from '@/components/site_info/not_found';
import Stats from '../../components/screens/stats';
import { useSelector } from 'react-redux';
import { getRegistrationsStats, selectRegStats, selectRegStatsStatus } from '../../data/statistics/get_registrations_stats';
import { useDispatch } from 'react-redux';
import { getDownloadsStats, selectDownloadsStats, selectDownloadsStatsStatus } from '../../data/statistics/get_downloads_stats';
import { getModelsStats, selectModelsStats, selectModelsStatsStatus } from '../../data/statistics/get_models_stats';
import { getBrandsStats, selectBrandsStats, selectBrandsStatsStatus } from '../../data/statistics/get_brands_stats';
import { getCategoriesStats, selectCategoriesStats, selectCategoriesStatsStatus } from '../../data/statistics/get_categories_stats';
import { currentDate } from '../../utils/format_date';
import { selectTopListItemLimit } from '../../data/handle_filters';
import { getInteriorsStats, selectInteriorsStats, selectInteriorsStatsStatus } from '../../data/statistics/get_interiors_stats';
import { getTagsStats, selectTagsStats, selectTagsStatsStatus } from '../../data/statistics/get_tags_stats';

declare global {
  interface Window {
    tc: any; // whatever type you want to give. (any,number,float etc)
  }
}

export default function StatsPage() {

  const dispatch = useDispatch<any>()
  const topListItemLimit = useSelector(selectTopListItemLimit)

  const regStats = useSelector(selectRegStats)
  const downloadsStats = useSelector(selectDownloadsStats)
  const modelsStats = useSelector(selectModelsStats)
  const brandsStats = useSelector(selectBrandsStats)
  const categoriesStats = useSelector(selectCategoriesStats)
  const interiorsStats = useSelector(selectInteriorsStats)
  const tagsStats = useSelector(selectTagsStats)

  const regStatsStatus = useSelector(selectRegStatsStatus)
  const downloadsStatsStatus = useSelector(selectDownloadsStatsStatus)
  const modelsStatsStatus = useSelector(selectModelsStatsStatus)
  const brandsStatsStatus = useSelector(selectBrandsStatsStatus)
  const categoriesStatsStatus = useSelector(selectCategoriesStatsStatus)
  const interiorsStatsStatus = useSelector(selectInteriorsStatsStatus)
  const tagsStatsStatus = useSelector(selectTagsStatsStatus)

  const { year, month, week } = currentDate()

  React.useEffect(() => {
    if (regStatsStatus == 'idle') {
      dispatch(getRegistrationsStats({ month, year }))
    }
    if (downloadsStatsStatus == 'idle') {
      dispatch(getDownloadsStats({ month, year }))
    }
    if (interiorsStatsStatus == 'idle') {
      dispatch(getInteriorsStats({ month, year }))
    }
    if (tagsStatsStatus == 'idle') {
      dispatch(getTagsStats({ month, year }))
    }
    if (modelsStatsStatus == 'idle') {
      dispatch(getModelsStats({ limit: topListItemLimit }))
    }
    if (brandsStatsStatus == 'idle') {
      dispatch(getBrandsStats({ limit: topListItemLimit }))
    }
    if (categoriesStatsStatus == 'idle') {
      dispatch(getCategoriesStats({ limit: topListItemLimit }))
    }
  }, [
    regStats, regStatsStatus,
    downloadsStats, downloadsStatsStatus,
    modelsStats, modelsStatsStatus,
    brandsStats, brandsStatsStatus,
    categoriesStats, categoriesStatsStatus,
    interiorsStats, interiorsStatsStatus,
    tagsStats, tagsStatsStatus,
  ])

  return (
    <>
      <Stats />
    </>
  )
}
