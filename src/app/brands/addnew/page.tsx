"use client"

import AddBrand from "@/components/screens/brands/add_new";
import {
  getAllCountries,
  selectAllCountries_status,
} from "@/data/get_all_countries";
import { getAllStyles, selectAllStyles_status } from "@/data/get_all_styles";
import { selectMyProfile } from "@/data/me";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AddNewBrand() {
  const dispatch = useDispatch<any>();
  const stylesData__status = useSelector(selectAllStyles_status);
  const countriesData__status = useSelector(selectAllCountries_status);

  const profile = useSelector(selectMyProfile);

  useEffect(() => {
    if (profile) {
      if (stylesData__status == "idle") {
        dispatch(getAllStyles());
      }
      if (countriesData__status == "idle") {
        dispatch(getAllCountries());
      }
    }
  }, [profile, stylesData__status, countriesData__status]);

  return (
    <>
      <AddBrand />
    </>
  );
}
