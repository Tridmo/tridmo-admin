"use client"

import ConnectionError from "@/components/site_info/connection_error";
import { Box } from "@mui/material";
import { useParams } from "next/navigation";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import EditBrand from "@/components/screens/brands/edit";
import {
  getAllCountries,
  selectAllCountries_status,
} from "@/data/get_all_countries";
import { getAllStyles, selectAllStyles_status } from "@/data/get_all_styles";
import { getOneBrand } from "@/data/get_one_brand";
import { selectMyProfile } from "@/data/me";
import CircularProgress from "@mui/material/CircularProgress";

const LoaderStyle = {
  // width: "100px !important",
  // height: "100px !important",
  zIndex: "10",
  position: "relative",
};
const ContainerStyle = {
  display: "flex",
  justifyContent: "center",
  maxWidth: "1200px",
  height: "697px",
  margin: "0 auto",
  alignItems: "center",
};
const BgBlur = {
  position: "absolute",
  left: "0",
  top: "0",
  width: "100%",
  height: "100%",
  background: "#fff",
  filter: "blur(10px)",
};

export default function EditBrandPage() {
  const getBrandStatus = useSelector(
    (state: any) => state?.get_one_brand?.status
  );
  const stylesData__status = useSelector(selectAllStyles_status);
  const countriesData__status = useSelector(selectAllCountries_status);
  const dispatch = useDispatch<any>();
  const profile = useSelector(selectMyProfile);

  const params = useParams<{ slug: string }>();

  React.useMemo(() => {
    if (profile) dispatch(getOneBrand(params?.slug));
  }, [profile, params.slug]);
  React.useMemo(() => {
    if (profile) {
      if (stylesData__status == "idle") {
        dispatch(getAllStyles());
      }
      if (countriesData__status == "idle") {
        dispatch(getAllCountries());
      }
    }
  }, [profile, stylesData__status]);

  if (getBrandStatus === "succeeded") {
    return (
      <>
        <Box sx={{ background: "#fafafa" }}>
          <EditBrand />
        </Box>
      </>
    );
  } else if (getBrandStatus === "failed") {
    return (
      <>
        <Box sx={{ background: "#fafafa" }}>
          <ConnectionError />
        </Box>
      </>
    );
  } else {
    return (
      <>
        <Box sx={{ background: "#fafafa", position: "relative" }}>
          <Box sx={BgBlur} />
          <Box>
            <Box sx={ContainerStyle}>
              <CircularProgress sx={LoaderStyle} />
            </Box>
          </Box>
        </Box>
      </>
    );
  }
}
