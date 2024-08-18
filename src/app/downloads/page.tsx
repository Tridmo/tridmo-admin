"use client"

import * as React from 'react';
import NotFoundPage from '@/components/site_info/not_found';
import UsersPage from '../../components/screens/users';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDesigners, getDownloaders, selectAllDesignersStatus, selectDownloaders, selectDownloadersStatus } from '../../data/get_all_designers';
import { selectMyProfile } from '../../data/me';
import DownloadsPage from '../../components/screens/downloads';
import { getAllDownloads, selectAllDownloads_status } from '../../data/get_all_downloads';

declare global {
  interface Window {
    tc: any; // whatever type you want to give. (any,number,float etc)
  }
}

export default function Downloads() {

  const dispatch = useDispatch<any>()

  const downloads_status = useSelector(selectAllDownloads_status)
  const getUserNameFilter = useSelector((state: any) => state?.handle_filters?.downloaders_name)
  const getModelNameFilter = useSelector((state: any) => state?.handle_filters?.downloaders_model_name)
  const getUsersOrderBy = useSelector((state: any) => state?.handle_filters?.downloaders_orderby)
  const getUsersOrder = useSelector((state: any) => state?.handle_filters?.downloaders_order)
  const profile = useSelector(selectMyProfile)

  React.useEffect(() => {
    if (profile && downloads_status == 'idle') {
      dispatch(getAllDownloads({
        user_name: getUserNameFilter,
        model_name: getModelNameFilter,
        orderBy: getUsersOrderBy,
        order: getUsersOrder,
      }))
    }
  }, [
    profile, downloads_status
  ])

  return (
    <>
      <DownloadsPage />
    </>
  )
}
