"use client";

import React, { CSSProperties, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrands, selectAllBrands } from "../../../data/get_all_brands";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Box,
  Grid,
  SxProps,
  Skeleton,
  FormControl,
  MenuItem,
  styled,
  Menu,
} from "@mui/material";
import Image from "next/image";
import SimpleTypography from "@/components/typography";
import BasicPagination from "@/components/pagination/pagination";
import Link from "next/link";
import { IMAGES_BASE_URL } from "../../../utils/image_src";
import EmptyData from "../../views/empty_data";
import SearchInput from "../../inputs/search";
import SimpleSelect from "../../inputs/simple_select";
import Buttons from "../../buttons";
import { selectAllStyles } from "../../../data/get_all_styles";
import { toast } from "react-toastify";
import instance from "../../../utils/axios";
import { ThemeProps } from "../../../types/theme";
import { useRouter } from "next/navigation";
import { setBrandNameFilter } from "../../../data/handle_filters";
import { ConfirmContextProps, resetConfirmData, resetConfirmProps, setConfirmProps, setConfirmState, setOpenModal } from "../../../data/modal_checker";
import { setRouteCrumbs } from "../../../data/route_crumbs";

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

const liHeaderTextSx = {
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "22px",
  letterSpacing: "0em",
  textAlign: "center",
  color: "#686868",
};

const brandImageWrapperSx: SxProps = {
  backgroundColor: "#fff",
  border: "1px solid #E0E0E0",
  borderRadius: "8px",
  minWidth: "50px",
  width: "50px",
  height: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const brandImageSx: CSSProperties = {
  width: "100% !important",
  height: "100% !important",
  borderRadius: "7px",
  objectFit: "contain",
};

const liSx: SxProps = {
  justifyContent: "flex-start",
  padding: "0px 24px",
  transition: "0.4s all ease",

  "&:hover": {
    backgroundColor: "#FAFAFA",
  },
  "&:hover .brand_name": {
    color: "#0646E6 !important",
  },
};

const liHeaderSx: SxProps = {
  backgroundColor: "#F5F5F5",
  justifyContent: "flex-start",
  padding: "12px 24px",
  borderTopLeftRadius: "4px",
  borderTopRightRadius: "4px",
};

const listSx: SxProps = {
  width: "100%",
  maxWidth: 1200,
  bgcolor: "background.paper",
  border: "1px solid #E0E0E0",
  borderRadius: "4px",
  padding: 0,
};

const itemAsLink = {
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  height: "70px",
};

const widthControl = {
  "&:nth-of-type(1)": {
    minWidth: "56px",
    maxWidth: "56px",
    marginRight: "16px",
  },
  "&:nth-of-type(2)": {
    minWidth: "490px",
  },
  "&:nth-of-type(3)": {
    minWidth: "300px",
  },
  "&:nth-of-type(4)": {
    minWidth: "180px",
  },
  "&:nth-of-type(5)": {
    minWidth: "50px",
  },
};

export default function BrandsPage() {
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const getAllBrandStatus = useSelector(
    (state: any) => state?.get_all_brands?.status
  );
  const getBrandNameFilter = useSelector(
    (state: any) => state?.handle_filters?.brand_name
  );
  const getBrandOrderBy = useSelector(
    (state: any) => state?.handle_filters?.brand_orderby
  );
  const getBrandOrder = useSelector(
    (state: any) => state?.handle_filters?.brand_order
  );
  const getPage = useSelector((state: any) => state?.handle_filters?.page);
  const all__brands = useSelector(selectAllBrands);
  // const styles = useSelector(selectAllStyles)

  const [selectedBrand, setSelectedBrand] = useState<any>(null);
  const [styleId, setStyleId] = useState<number>(-1);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const fakeBrands = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    dispatch(setRouteCrumbs([{
      title: 'Бренды',
      route: '/brands'
    }]))
  }, [])

  function navigateTo(link: string) {
    router.push(link);
  }

  function handleClick(event: any, model: any) {
    setSelectedBrand(model);
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setSelectedBrand(null);
    setAnchorEl(null);
  }

  function handleSearch(searchValue) {
    dispatch(
      getAllBrands({
        name: searchValue,
        page: getPage,
        orderBy: getBrandOrderBy,
        order: getBrandOrder,
      })
    );
    dispatch(setBrandNameFilter(searchValue));
  }

  function handleClickDelete() {
    const modalContent: ConfirmContextProps = {
      message: `Вы уверены, что хотите удалить бренд «${selectedBrand?.name}»?`,
      actions: {
        on_click: {
          args: [selectedBrand?.id],
          func: async () => {
            dispatch(setConfirmProps({ is_loading: true }))
            instance
              .delete(`brands/${selectedBrand?.id}`)
              .then((res) => {
                if (res?.data?.success) {
                  toast.success(res?.data?.message);
                  dispatch(
                    getAllBrands({
                      name: getBrandNameFilter,
                      page: getPage,
                      orderBy: getBrandOrderBy,
                      order: getBrandOrder,
                    })
                  );
                  dispatch(setConfirmState(false))
                  dispatch(setOpenModal(false))
                  dispatch(resetConfirmProps())
                  dispatch(resetConfirmData())
                } else {
                  toast.success(res?.data?.message);
                }
              })
              .catch((err) => {
                toast.error(err?.response?.data?.message);
              })
              .finally(() => {
                dispatch(setConfirmProps({ is_loading: false }))
                handleClose();
              });
          }
        }
      }
    }
    dispatch(resetConfirmProps())
    dispatch(setConfirmProps(modalContent))
    dispatch(setConfirmState(true))
    dispatch(setOpenModal(true))
  }


  return (
    <Box
      sx={{
        width: "1200px",
        minHeight: 829,
        display: "block",
        margin: "32px auto",
      }}
    >
      <DropDown
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose} sx={{ padding: "6px 12px" }}>
          <Link
            href={`/brands/edit/${selectedBrand?.slug}`}
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Image
              src="/icons/edit-pen.svg"
              alt="icon"
              width={17}
              height={17}
            />
            <SimpleTypography
              className="drow-down__text"
              text="Редактировать"
            />
          </Link>
        </MenuItem>

        <MenuItem onClick={handleClickDelete} sx={{ padding: "6px 12px" }}>
          <Image src="/icons/trash.svg" alt="icon" width={17} height={17} />
          <SimpleTypography className="drow-down__text" text="Удалить" />
        </MenuItem>
      </DropDown>

      <List sx={listSx}>
        <ListItem
          alignItems="center"
          key={-2}
          sx={{ ...liHeaderSx, backgroundColor: "#fff" }}
        >
          <Grid width={"100%"} container justifyContent={"space-between"}>
            <Grid item>
              <FormControl>
                <SearchInput
                  placeHolder="Поиск по название"
                  startIcon
                  value={getBrandNameFilter}
                  search={(s) => handleSearch(s)}
                  sx={{
                    borderColor: "#B8B8B8",
                    padding: "6px 12px",
                    backgroundColor: "#fff",
                    width: "auto",
                  }}
                />
              </FormControl>

              {/* <FormControl sx={{ ml: '12px' }}>
                                                        <SimpleSelect
                                                            sx={{
                                                                borderColor: '#B8B8B8',
                                                                backgroundColor: '#fff',
                                                                minWidth: '200px'
                                                            }}
                                                            onChange={(e) => { setStyleId(Number(e.target.value)) }}
                                                            paddingX={12}
                                                            paddingY={6}
                                                            variant='outlined'
                                                            value={styleId}
                                                        >
                                                            <MenuItem selected content='option' key={-2} value={-1}>Все стили</MenuItem>
                                                            {
                                                                styles?.data?.map(
                                                                    (c, i) => (
                                                                        <MenuItem key={i} value={c.id}>{c.name}</MenuItem>
                                                                    )
                                                                )
                                                            }
                                                        </SimpleSelect>
                                                    </FormControl> */}
            </Grid>

            <Grid item>
              <Link href="/brands/addnew">
                <Buttons
                  name="Добавить бренд"
                  childrenFirst={true}
                  type="button"
                  className="upload__btn"
                  sx={{ ml: "12px", height: "37px" }}
                >
                  <Image
                    alt="icon"
                    src="/icons/plus-round-white.svg"
                    width={20}
                    height={20}
                  />
                </Buttons>
              </Link>
            </Grid>
          </Grid>
        </ListItem>

        <ListItem alignItems="center" key={-1} sx={liHeaderSx}>
          <SimpleTypography
            text="№"
            sx={{ ...widthControl, ...liHeaderTextSx }}
          />
          <SimpleTypography
            text="Бренд"
            sx={{ ...widthControl, ...liHeaderTextSx, textAlign: "start" }}
          />
          <SimpleTypography
            text="Стиль"
            sx={{ ...widthControl, ...liHeaderTextSx, textAlign: "start" }}
          />
          <SimpleTypography
            text="Количество моделей"
            sx={{ ...widthControl, ...liHeaderTextSx }}
          />
          <SimpleTypography
            text=""
            sx={{ ...widthControl, ...liHeaderTextSx }}
          />
        </ListItem>
        {getAllBrandStatus == "succeeded" ? (
          all__brands?.data?.brands &&
            all__brands?.data?.brands?.length != 0 ? (
            all__brands?.data?.brands?.map((brand, index: any) => (
              <>
                <ListItem key={index} alignItems="center" sx={liSx}>
                  <ListItemText
                    sx={{
                      ...widthControl,
                      ...itemAsLink,
                      justifyContent: "center",
                    }}
                    onClick={() => navigateTo(`/brands/${brand?.slug}`)}
                  >
                    <SimpleTypography
                      text={index + 1}
                      sx={{
                        textAlign: "center",
                        color: "#B3B3B3",
                        fontWeight: 500,
                        fontSize: "22px",
                        lineHeight: "26px",
                        letterSpacing: "0em",
                      }}
                    />
                  </ListItemText>

                  <ListItemText
                    onClick={() => navigateTo(`/brands/${brand?.slug}`)}
                    sx={{
                      ...widthControl,
                      ...itemAsLink,
                      "& > span:first-of-type": {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      },
                    }}
                  >
                    <Box sx={brandImageWrapperSx}>
                      <Image
                        src={
                          brand?.image_src
                            ? `${IMAGES_BASE_URL}/${brand?.image_src}`
                            : ""
                        }
                        alt="Landing image"
                        width={48}
                        height={48}
                        style={brandImageSx}
                      />
                    </Box>

                    <ListItemText
                      className="brand_name"
                      sx={{ marginLeft: "24px" }}
                    >
                      <SimpleTypography
                        text={brand?.name}
                        sx={{
                          fontSize: "18px",
                          fontWeight: 400,
                          lineHeight: "26px",
                          letterSpacing: "-0.02em",
                          textAlign: "start",
                          color: "#141414",
                        }}
                      />
                      <SimpleTypography
                        text={`${brand?.site_link.includes("https://") ||
                          brand?.site_link.includes("http://")
                          ? brand?.site_link
                            .split("://")[1]
                            .replaceAll("/", "")
                          : brand?.site_link
                          }`}
                        sx={{
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: "24px",
                          letterSpacing: "-0.01em",
                          textAlign: "start",
                          color: "#848484",
                        }}
                      />
                    </ListItemText>
                  </ListItemText>

                  <ListItemText
                    sx={{ ...widthControl, ...itemAsLink }}
                    onClick={() => navigateTo(`/brands/${brand?.slug}`)}
                  >
                    <SimpleTypography
                      text=""
                      sx={{
                        fontSize: "18px",
                        fontWeight: 400,
                        lineHeight: "26px",
                        letterSpacing: "-0.02em",
                        textAlign: "start",
                      }}
                    >
                      {brand?.styles[0]
                        ? brand?.styles?.map(
                          (s, i) =>
                            `${s?.name}${i != brand?.styles?.length - 1 ? ", " : ""
                            }`
                        )
                        : null}
                    </SimpleTypography>
                  </ListItemText>
                  <ListItemText
                    sx={{
                      ...widthControl,
                      ...itemAsLink,
                      justifyContent: "center",
                    }}
                    onClick={() => navigateTo(`/brands/${brand?.slug}`)}
                  >
                    <SimpleTypography
                      text={brand?.models_count}
                      sx={{
                        fontSize: "18px",
                        fontWeight: 400,
                        lineHeight: "26px",
                        letterSpacing: "-0.02em",
                        textAlign: "center",
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
                      onClick={(e) => handleClick(e, brand)}
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
                      <Image
                        alt="icon"
                        src="/icons/options-dots-vertical.svg"
                        width={20}
                        height={20}
                      />
                    </Buttons>
                  </ListItemText>
                </ListItem>
                {all__brands?.data?.brands?.length &&
                  index != all__brands?.data?.brands?.length - 1 ? (
                  <Divider sx={{ margin: 0 }} variant="inset" component="li" />
                ) : null}
              </>
            ))
          ) : (
            <EmptyData sx={{ marginTop: "8px" }} />
          )
        ) : (
          fakeBrands?.map((i) => (
            <Box key={i}>
              <ListItem key={i} alignItems="center" sx={liSx}>
                <ListItemText sx={{ maxWidth: 30, marginRight: "16px" }}>
                  <Skeleton variant="rectangular" width={20} height={20} />
                </ListItemText>

                <ListItemAvatar sx={brandImageWrapperSx}>
                  <Skeleton variant="rectangular" sx={brandImageSx} />
                </ListItemAvatar>

                <ListItemText
                  className="brand_name"
                  sx={{ marginLeft: "24px", minWidth: "380px" }}
                >
                  <Skeleton
                    variant="rectangular"
                    width={100}
                    height={20}
                    sx={{ marginBottom: "5px" }}
                  />
                  <Skeleton variant="rectangular" width={80} height={18} />
                </ListItemText>

                <ListItemText sx={{ minWidth: "400px" }}>
                  <Skeleton variant="rectangular" width={56} height={20} />
                </ListItemText>
                <ListItemText sx={{ minWidth: "180px" }}>
                  <Skeleton variant="rectangular" width={56} height={20} />
                </ListItemText>
              </ListItem>
            </Box>
          ))
        )}
      </List>

      <Grid
        spacing={2}
        container
        sx={{ width: "100%", margin: "0 auto", padding: "17px 0 32px 0" }}
      >
        <Grid
          sx={{
            padding: "0 0 0 0 !important",
            display: "flex",
            alignItems: "baseline",
          }}
          item
          xs={6}
        >
          <SimpleTypography
            text={`Показаны ${all__brands?.data?.pagination?.current + 1}–${all__brands?.data?.pagination?.limit
              } из`}
            className="pagenation__desc"
          />

          <SimpleTypography
            text={`${all__brands?.data?.pagination?.data_count} товаров`}
            className="pagenation__desc--bold"
          />
        </Grid>

        <Grid
          item
          xs={6}
          sx={{
            padding: "0 !important",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <BasicPagination
            dataSource='brands'
            count={all__brands?.data?.pagination?.pages}
            page={parseInt(all__brands?.data?.pagination?.current) + 1}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
