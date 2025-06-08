"use client"

import CountriesList from "@/components/views/country/countries.list";
import { Box, Divider, Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRouteCrumbs } from "../../../data/route_crumbs";
import CategoriesList from "../../views/categories/list";
import ColorsList from "../../views/colors/list";
import MaterialsList from "../../views/materials/list";
import StylesList from "../../views/styles/list";

export default function OthersPage() {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(
      setRouteCrumbs([
        {
          title: "Другие компоненты",
          route: "/others",
        },
      ])
    );
  }, []);

  return (
    <Box
      sx={{
        width: "1268px",
        minHeight: 760,
        display: "block",
        margin: "0 auto",
      }}
    >
      <Grid
        gap={3}
        container
        sx={{ width: "100%", mt: "32px", mb: "64px", marginLeft: 0 }}
      >
        <Grid item xs={12}>
          <CountriesList />
        </Grid>

        <Divider sx={{ margin: "24px 0", width: "100%" }} />

        <Grid item xs={12}>
          <StylesList />
        </Grid>

        <Divider sx={{ margin: "24px 0", width: "100%" }} />

        <Grid item xs={12}>
          <CategoriesList />
        </Grid>

        <Divider sx={{ margin: "24px 0", width: "100%" }} />

        <Grid item xs={12}>
          <MaterialsList />
        </Grid>

        <Divider sx={{ margin: "24px 0", width: "100%" }} />

        <Grid item xs={12}>
          <ColorsList />
        </Grid>
      </Grid>
    </Box>
  );
}

