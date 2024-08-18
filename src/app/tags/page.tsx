"use client"

import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMyProfile } from '../../data/me';
import { getAllTags, selectAllTags_status } from '../../data/get_all_tags';
import TagsPage from '../../components/screens/tags';

declare global {
  interface Window {
    tc: any; // whatever type you want to give. (any,number,float etc)
  }
}

export default function Tags() {

  const dispatch = useDispatch<any>()

  const tags_status = useSelector(selectAllTags_status)
  const getTagsUserNameFilter = useSelector((state: any) => state?.handle_filters?.tags_user_name)
  const getTagsModelNameFilter = useSelector((state: any) => state?.handle_filters?.tags_model_name)
  const getTagsInteriorNameFilter = useSelector((state: any) => state?.handle_filters?.tags_interior_name)
  const getTagsOrderBy = useSelector((state: any) => state?.handle_filters?.tags_orderby)
  const getTagsOrder = useSelector((state: any) => state?.handle_filters?.tags_order)
  const profile = useSelector(selectMyProfile)

  React.useEffect(() => {
    if (profile && tags_status == 'idle') {
      dispatch(getAllTags({
        user_name: getTagsUserNameFilter,
        model_name: getTagsModelNameFilter,
        interior_name: getTagsInteriorNameFilter,
        orderBy: getTagsOrderBy,
        order: getTagsOrder,
      }))
    }
  }, [
    profile, tags_status
  ])

  return (
    <>
      <TagsPage />
    </>
  )
}
