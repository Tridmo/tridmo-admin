"use client";

import {
  getAllCountries,
  selectAllCountries,
  selectAllCountries_status,
} from "@/data/get_all_countries";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Skeleton,
  styled,
  SxProps,
} from "@mui/material";
import Image from "next/image";
import { CSSProperties, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  ConfirmContextProps,
  resetConfirmData,
  resetConfirmProps,
  setConfirmProps,
  setConfirmState,
  setCountryFormState,
  setOpenModal,
} from "../../../data/modal_checker";
import { ThemeProps } from "../../../types/theme";
import instance from "../../../utils/axios";
import Buttons from "../../buttons";
import SimpleTypography from "../../typography";
import EmptyData from "../empty_data";

const fakeBrands = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const liHeaderTextSx = {
  fontSize: "11px",
  fontWeight: 700,
  lineHeight: "16px",
  letterSpacing: "0.05em",
  textAlign: "start",
  color: "#686868",
  textTransform: "uppercase",
};

const modelImageWrapperSx: SxProps = {
  backgroundColor: "#fff",
  // border: '1px solid #E0E0E0',
  // borderRadius: '8px',
  width: "36px",
  height: "36px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
};

const modelImageSx: CSSProperties = {
  width: "100% !important",
  height: "100% !important",
  // borderRadius: '8px',
  objectFit: "contain",
};

const liSx: SxProps = {
  justifyContent: "flex-start",
  padding: "0px 24px",
  backgroundColor: "#fcfcfc",
  transition: "0.4s all ease",
  marginBottom: "2px",

  "&:hover": {
    backgroundColor: "#fff",
    boxShadow: "0px 3px 4px 0px #00000014",
  },
  "&:hover .brand_name": {
    color: "#0646E6 !important",
  },
};

const liHeaderSx: SxProps = {
  display: "flex",
  backgroundColor: "#fff",
  padding: "10px 24px",
  marginBottom: "2px",
};

const listSx: SxProps = {
  width: "100%",
  backgroundColor: "#f5f5f5",
  // border: '1px solid #E0E0E0',
  borderRadius: "4px",
  padding: "0",
};

const widthControl = {
  "&:nth-of-type(1)": {
    minWidth: "30%",
    maxWidth: "30%",
  },
  "&:nth-of-type(2)": {
    minWidth: "30%",
    maxWidth: "30%",
  },
  "&:nth-of-type(3)": {
    minWidth: "30%",
    maxWidth: "30%",
  },
  "&:nth-of-type(4)": {
    minWidth: "10%",
    maxWidth: "10%",
    justifyContent: "center",
  },
};

const itemAsLink = {
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  height: "46px",
};

const DropDown = styled(Menu)(
  ({ theme }: ThemeProps) => `

  .MuiList-root{
    width:162px;
    border: 1px solid #E0E0E0;
    border-radius: 4px;
    padding: 4px 0;
  }

  .MuiPaper-root{
    border-radius:4px !important;
    box-shadow: 0px 8px 18px 0px #00000029;
  }
  `
);

export default function CountriesList() {
  const dispatch = useDispatch<any>();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const all__countries_status = useSelector(selectAllCountries_status);
  const countries = useSelector(selectAllCountries);

  const [selectedCountry, setSelectedCountry] = useState<any>(null);

  function handleClick(event: any, country: any) {
    setSelectedCountry(country);
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setSelectedCountry(null);
    setAnchorEl(null);
  }

  function handleOpenAddModal() {
    dispatch(setCountryFormState({ open: true, editing: false }));
    dispatch(setOpenModal(true));
    handleClose();
  }
  function handleOpenEditModal() {
    dispatch(
      setCountryFormState({
        open: true,
        editing: true,
        country: selectedCountry,
      })
    );
    dispatch(setOpenModal(true));
    handleClose();
  }

  function handleClickDelete() {
    const modalContent: ConfirmContextProps = {
      message: `Вы уверены, что хотите удалить страну «${selectedCountry?.name}»?`,
      actions: {
        on_click: {
          args: [selectedCountry?.id],
          func: async (checked: boolean, id: number) => {
            dispatch(setConfirmProps({ is_loading: true }));
            instance
              .delete(`countries/${id}`)
              .then((res) => {
                if (res?.data?.success) {
                  toast.success(res?.data?.message);
                  dispatch(
                    getAllCountries({
                      models_count: true,
                      brands_count: true,
                    })
                  );
                  dispatch(setConfirmState(false));
                  dispatch(setOpenModal(false));
                  dispatch(resetConfirmProps());
                  dispatch(resetConfirmData());
                } else {
                  toast.success(res?.data?.message);
                }
              })
              .catch((err) => {
                toast.error(err?.response?.data?.message);
              })
              .finally(() => {
                dispatch(setConfirmProps({ is_loading: false }));
                handleClose();
              });
          },
        },
      },
    };
    dispatch(resetConfirmProps());
    dispatch(setConfirmProps(modalContent));
    dispatch(setConfirmState(true));
    dispatch(setOpenModal(true));
  }

  return (
    <>
      <DropDown
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleOpenEditModal} sx={{ padding: "6px 12px" }}>
          <Image src="/icons/edit-pen.svg" alt="icon" width={17} height={17} />
          <SimpleTypography className="drow-down__text" text="Редактировать" />
        </MenuItem>

        <MenuItem onClick={handleClickDelete} sx={{ padding: "6px 12px" }}>
          <Image src="/icons/trash.svg" alt="icon" width={17} height={17} />
          <SimpleTypography className="drow-down__text" text="Удалить" />
        </MenuItem>
      </DropDown>

      <List sx={listSx}>
        <ListItem
          key={-3}
          sx={{
            ...liHeaderSx,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <SimpleTypography
            text="Страны"
            sx={{
              fontWeight: 500,
              fontSize: "20px",
              lineHeight: "24px",
              letterSpacing: "-0.02em",
            }}
          />
          <Buttons
            name="Добавить страну"
            onClick={handleOpenAddModal}
            childrenFirst={true}
            type="button"
            className="upload__btn"
            sx={{ height: "37px" }}
          >
            <Image
              alt="icon"
              src="/icons/list-plus.svg"
              width={20}
              height={20}
            />
          </Buttons>
        </ListItem>

        <ListItem alignItems="center" key={-2} sx={liHeaderSx}>
          <SimpleTypography
            text="Название"
            sx={{ ...liHeaderTextSx, ...widthControl }}
          />
          <SimpleTypography
            text="Количество брендов"
            sx={{ ...liHeaderTextSx, ...widthControl }}
          />
          <SimpleTypography
            text="Количество моделей"
            sx={{ ...liHeaderTextSx, ...widthControl }}
          />
          <SimpleTypography text="" sx={{ ...widthControl }} />
        </ListItem>
        {all__countries_status == "succeeded" ? (
          countries && countries?.data?.length != 0 ? (
            countries?.data?.map((country, index: any) => (
              <ListItem key={index} alignItems="center" sx={liSx}>
                <ListItemText sx={{ ...widthControl, ...itemAsLink }}>
                  <SimpleTypography
                    text={country?.name}
                    sx={{
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "26px",
                      letterSpacing: "-0.02em",
                      textAlign: "start",
                    }}
                  />
                </ListItemText>

                <ListItemText sx={{ ...widthControl, ...itemAsLink }}>
                  <SimpleTypography
                    text={`${country?.brands_count}`}
                    sx={{
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "26px",
                      letterSpacing: "-0.02em",
                    }}
                  />
                </ListItemText>

                <ListItemText sx={{ ...widthControl, ...itemAsLink }}>
                  <SimpleTypography
                    text={`${country?.models_count}`}
                    sx={{
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "26px",
                      letterSpacing: "-0.02em",
                    }}
                  />
                </ListItemText>

                <ListItemText
                  sx={{
                    ...widthControl,
                    "& span": {
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    },
                  }}
                >
                  <Buttons
                    name=""
                    onClick={(e) => handleClick(e, country)}
                    childrenFirst={true}
                    type="button"
                    className="options_menu__btn"
                    sx={{
                      ml: "12px",
                      minWidth: "20px",
                      width: "20px",
                      height: "20px",
                    }}
                  >
                    <img
                      alt="icon"
                      src="/icons/options-dots-vertical.svg"
                      width={20}
                      height={20}
                    />
                  </Buttons>
                </ListItemText>
              </ListItem>
            ))
          ) : (
            <EmptyData sx={{ marginTop: "8px" }} />
          )
        ) : (
          fakeBrands?.map((i) => (
            <Box key={i}>
              <ListItem key={i} alignItems="center" sx={liSx}>
                <ListItemText sx={{ ...widthControl }}>
                  <Skeleton variant="rectangular" width={100} height={20} />
                </ListItemText>

                <ListItemText sx={{ ...widthControl }}>
                  <Skeleton variant="rectangular" width={100} height={20} />
                </ListItemText>
                <ListItemText sx={{ ...widthControl }}>
                  <Skeleton variant="rectangular" width={30} height={30} />
                </ListItemText>
              </ListItem>
            </Box>
          ))
        )}
      </List>
    </>
  );
}
