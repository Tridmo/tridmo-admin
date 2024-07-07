"use client";

import * as React from "react";
import { Box, Divider, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import SimpleTypography from "../../../typography";
import CustomCard from "../../../custom_card";
import BrandInfo from "@/components/views/brand/info";
import Image from "next/image";
import { selectOneBrand } from "../../../../data/get_one_brand";
import { selectBrandModels } from "../../../../data/get_brand_models";
import { IMAGES_BASE_URL } from "../../../../utils/image_src";
import Link from "next/link";
import Buttons from "../../../buttons";
import { setRouteCrumbs } from "../../../../data/route_crumbs";
import BrandModels from "../../../views/brand/brand_models";

export default function OneBrand() {
  const isAuthenticated = useSelector(
    (state: any) => state?.auth_slicer?.authState
  );
  const dispatch = useDispatch()
  const brand = useSelector(selectOneBrand);
  const brandModels = useSelector(selectBrandModels);

  React.useEffect(() => {
    dispatch(setRouteCrumbs(
      [{
        title: 'Бренды',
        route: '/brands'
      }, {
        title: brand?.name,
        route: `/brands/${brand?.slug}`
      }]
    ))
  }, [])

  return (
    <>
      <Box sx={{ background: "#fafafa" }} className="products">
        <Box
          className="products__container"
          sx={{
            maxWidth: "1200px",
            width: "100%",
            margin: "0 auto !important",
            alignItems: "center",
          }}
        >

          <BrandInfo />

          <Divider sx={{ marginBottom: "32px" }} />

          <Grid spacing={2}>
            <Grid sx={{ mb: brandModels?.length > 0 ? "32px" : "76px" }}>
              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
                container
                spacing={2}
                className="texts__wrap"
              >
                <Grid item mb={1}>
                  <SimpleTypography
                    text={`Продукция бренда (${brandModels?.length || 0})`}
                    className="section__title"
                    variant="h2"
                  />
                </Grid>
              </Grid>

              <BrandModels />

            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
