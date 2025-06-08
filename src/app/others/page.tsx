"use client"

import {
  getAllCountries,
  selectAllCountries_status,
} from "@/data/get_all_countries";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import OthersPage from "../../components/screens/others";
import { getCategoriesWithModelCount } from "../../data/categories";
import {
  getAllColors,
  selectAllColors_status,
} from "../../data/get_all_colors";
import {
  getAllMaterials,
  selectAllMaterials_status,
} from "../../data/get_all_materials";
import {
  getAllStyles,
  selectAllStyles_status,
} from "../../data/get_all_styles";
import { selectMyProfile } from "../../data/me";

declare global {
  interface Window {
    tc: any; // whatever type you want to give. (any,number,float etc)
  }
}

export default function Others() {
  const dispatch = useDispatch<any>();

  const getCategoriesStatus = useSelector(
    (state: any) => state?.categories?.with_model_count_status
  );
  const getMaterialsStatus = useSelector(selectAllMaterials_status);
  const getCountriesStatus = useSelector(selectAllCountries_status);
  const getStylesStatus = useSelector(selectAllStyles_status);
  const getColorsStatus = useSelector(selectAllColors_status);
  const profile = useSelector(selectMyProfile);

  React.useEffect(() => {
    if (profile) {
      if (getCountriesStatus === "idle") {
        dispatch(getAllCountries({ models_count: true }));
      }
      if (getStylesStatus === "idle") {
        dispatch(getAllStyles());
      }
      if (getCategoriesStatus === "idle") {
        dispatch(getCategoriesWithModelCount());
      }
      if (getMaterialsStatus === "idle") {
        dispatch(getAllMaterials());
      }
      if (getColorsStatus === "idle") {
        dispatch(getAllColors());
      }
    }
  }, [
    profile,
    getCategoriesStatus,
    getMaterialsStatus,
    getStylesStatus,
    getColorsStatus,
  ]);

  return <OthersPage />;
}
