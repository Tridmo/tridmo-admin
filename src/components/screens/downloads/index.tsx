"use client"

import React, { CSSProperties, Suspense, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Box, useMediaQuery, SxProps, List, ListItem, ListItemText, ListItemAvatar, Divider, Skeleton, Input, TextField, FormControl, MenuItem, styled, Menu } from '@mui/material'
import SimpleCard from '../../simple_card'
import SimpleTypography from '../../typography'
import Pagination from '../../pagination/pagination'
import Categories from '../../views/categories/model_categories'
import { getAllModels, selectAllModels } from '../../../data/get_all_models';
import Style from '../../views/styles/model_styles'
import { useRouter, useSearchParams } from 'next/navigation'
import { searchModels, setSearchVal } from '../../../data/search_model'
import { Close } from '@mui/icons-material'
import Buttons from '../../buttons'
import Sorts from '../../views/sorts'
import ModelCrumb from '../../breadcrumbs/model_crumb'
import Link from 'next/link'
import Image from 'next/image'
import { IMAGES_BASE_URL } from '../../../utils/env_vars'
import EmptyData from '../../views/empty_data'
import BasicPagination from '../../pagination/pagination'
import formatDate from '../../../utils/format_date'
import SimpleInp from '../../inputs/simple_input'
import SearchInput from '../../inputs/search'
import SimpleSelect from '../../inputs/simple_select'
import { selectCategories } from '../../../data/categories'
import { selectAllBrands } from '../../../data/get_all_brands'
import { ThemeProps } from '../../../types/theme'
import instance from '../../../utils/axios'
import { toast } from 'react-toastify'
import { getTopModels, selectTopModels } from '../../../data/get_top_models'
import { set_downloaders_model_name, set_downloaders_name, setCategoryFilter, setModelBrandFilter, setModelNameFilter, setModelTopFilter, setUserNameFilter } from '../../../data/handle_filters'
import { ConfirmContextProps, resetConfirmData, resetConfirmProps, setConfirmProps, setConfirmState, setOpenModal } from '../../../data/modal_checker'
import { setTimeout } from 'timers'
import { selectRouteCrubms, setRouteCrumbs } from '../../../data/route_crumbs'
import { RouteCrumb } from '../../../types/interfaces'
import { getAllDesigners, getDownloaders, selectAllDesigners, selectDownloaders } from '../../../data/get_all_designers'
import { selectMyProfile } from '../../../data/me'

const fake = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const liHeaderTextSx = {
  fontSize: '11px',
  fontWeight: 700,
  lineHeight: '16px',
  letterSpacing: '0.05em',
  textAlign: 'start',
  color: '#686868',
  textTransform: 'uppercase'
}

const modelImageWrapperSx: SxProps = {
  backgroundColor: '#fff',
  // border: '1px solid #E0E0E0',
  // borderRadius: '8px',
  width: '36px',
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
}

const modelImageSx: CSSProperties = {
  width: '100% !important',
  height: '100% !important',
  // borderRadius: '8px',
  objectFit: 'contain'
}

const liSx: SxProps = {
  justifyContent: 'flex-start',
  padding: '0px 24px',
  backgroundColor: '#fcfcfc',
  transition: '0.4s all ease',
  marginBottom: '2px',

  '&:hover': {
    backgroundColor: '#fff',
    boxShadow: '0px 3px 4px 0px #00000014',
  },
  '&:hover .brand_name': {
    color: '#0646E6 !important',
  },
}

const liHeaderSx: SxProps = {
  display: 'flex',
  backgroundColor: '#fff',
  padding: '10px 24px',
  marginBottom: '2px',
}

const listSx: SxProps = {
  width: '100%',
  backgroundColor: '#f5f5f5',
  // border: '1px solid #E0E0E0',
  borderRadius: '4px',
  padding: '0',
}


const widthControl = {

  '&:nth-of-type(1)': {
    minWidth: '40%',
    maxWidth: '40%',
  },
  '&:nth-of-type(2)': {
    minWidth: '40%',
    maxWidth: '40%',
  },
  '&:nth-of-type(3)': {
    minWidth: '10%',
    maxWidth: '10%',
  },
  // '&:nth-of-type(4)': {
  //   minWidth: '100px',
  //   maxWidth: '100px',
  // },
  // '&:nth-of-type(5)': {
  //   minWidth: '100px',
  //   maxWidth: '100px',
  // },
  // '&:nth-of-type(6)': {
  //   minWidth: '100px',
  //   maxWidth: '100px',
  // },
}

const itemAsLink = {
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  height: '66px',
}

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

export default function DownloadsPage() {

  const router = useRouter();
  const dispatch = useDispatch<any>();

  const profile = useSelector(selectMyProfile)

  const users_status = useSelector((state: any) => state?.get_all_designers?.downloaders_status)
  const getUsersNameFilter = useSelector((state: any) => state?.handle_filters?.downloaders_name)
  const getModelNameFilter = useSelector((state: any) => state?.handle_filters?.downloaders_model_name)
  const getUsersOrderBy = useSelector((state: any) => state?.handle_filters?.downloaders_orderby)
  const getUsersOrder = useSelector((state: any) => state?.handle_filters?.downloaders_order)

  const matches = useMediaQuery('(max-width:600px)');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const users = useSelector(selectDownloaders)
  const route_crumbs = useSelector(selectRouteCrubms)

  const [activeTopButton, setActiveTopButton] = useState<0 | 1>(0)
  const [usersCount, setUsersCount] = useState<number>(0)
  const [selectedModel, setSelectedModel] = useState<any>(null)

  useEffect(() => {
    dispatch(setRouteCrumbs([{
      title: 'Загрузки',
      route: '/downloads'
    }]))
  }, [])

  useMemo(() => {
    setUsersCount(users?.pagination?.data_count || 0)
  }, [users, users_status])

  function navigateTo(link: string) {
    router.push(link)
  }

  function handleClick(event: any, model: any) {
    setSelectedModel(model);
    setAnchorEl(event.currentTarget);
  };

  function handleClose() {
    setSelectedModel(null);
    setAnchorEl(null);
  };

  function handleUserSearch(searchValue) {
    dispatch(getDownloaders({
      key: searchValue,
      model_name: getModelNameFilter,
      orderBy: getUsersOrderBy,
      order: getUsersOrder,
    }))
    dispatch(set_downloaders_name(searchValue))
  }

  function handleModelSearch(searchValue) {
    dispatch(getDownloaders({
      key: getUsersNameFilter,
      model_name: searchValue,
      orderBy: getUsersOrderBy,
      order: getUsersOrder,
    }))
    dispatch(set_downloaders_model_name(searchValue))
  }

  return (
    <Box sx={{ width: '1268px', minHeight: 760, display: "block", margin: "0 auto" }}>

      <DropDown
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >

        <MenuItem
          onClick={handleClose}
          sx={{ padding: "6px 12px" }}
        >
          <Link
            href={`/models/edit/${selectedModel?.slug}`}
            style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
          >

            <Image
              src="/icons/edit-pen.svg"
              alt="icon"
              width={17}
              height={17}
            />
            <SimpleTypography className='drow-down__text' text='Редактировать' />

          </Link>
        </MenuItem>

      </DropDown>

      <Grid spacing={2} container sx={{ width: '100%', marginTop: "32px", marginLeft: 0 }} >

        <>
          {
            <List
              sx={listSx}
            >
              {/* <ListItem alignItems="center"
                key={-3}
                sx={{
                  ...liHeaderSx,
                  padding: '0',
                  height: '56px'
                }}
              >
                <Buttons
                  name='Все'
                  type='button'
                  sx={{
                    color: activeTopButton == 0 ? '#7210BE' : '#646464',
                    borderRadius: 0,
                    borderBottom: `2px solid ${activeTopButton == 0 ? '#7210BE' : 'transparent'}`,
                    height: '60px',
                    paddingX: '24px',
                    '&:hover': {
                      background: 'transparent',
                      color: '#7210BE'
                    },
                    '&:hover div': {
                      backgroundColor: '#F3E5FF'
                    },
                    '&:hover div p': {
                      color: '#7210BE'
                    }
                  }}
                >
                  <Box
                    sx={{
                      padding: '1px 6px 2px 6px',
                      backgroundColor: activeTopButton == 0 ? '#F3E5FF' : '#F8F8F8',
                      borderRadius: '9px',
                      marginLeft: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.4s ease',
                    }}
                  >
                    <SimpleTypography
                      sx={{
                        color: activeTopButton == 0 ? '#7210BE' : '#A0A0A0',
                        fontSize: '12px',
                        fontWeight: 500,
                        lineHeight: '16px',
                      }}
                      text={`${usersCount}`}
                    />
                  </Box>
                </Buttons>
              </ListItem> */}
              <ListItem alignItems="center"
                key={-2}
                sx={liHeaderSx}
              >
                <form style={{ width: '100%' }}>
                  <Grid width={'100%'} container justifyContent={'space-between'}>
                    <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                      <FormControl sx={{ mr: '8px' }}>
                        <SearchInput
                          placeHolder='Поиск по пользователю'
                          startIcon
                          value={getUsersNameFilter}
                          search={(s) => handleUserSearch(s)}
                          sx={{
                            borderColor: '#B8B8B8',
                            padding: '6px 12px',
                            backgroundColor: '#fff',
                            width: 'auto'
                          }}
                        />
                      </FormControl>
                      <FormControl>
                        <SearchInput
                          placeHolder='Поиск по модели'
                          startIcon
                          value={getModelNameFilter}
                          search={(s) => handleModelSearch(s)}
                          sx={{
                            borderColor: '#B8B8B8',
                            padding: '6px 12px',
                            backgroundColor: '#fff',
                            width: 'auto'
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </form>
              </ListItem>

              <ListItem alignItems="center"
                key={-1}
                sx={liHeaderSx}
              >
                <SimpleTypography
                  text='Пользователь'
                  sx={{ ...liHeaderTextSx, ...widthControl }}
                />
                <SimpleTypography
                  text='Скачанная модель'
                  sx={{ ...liHeaderTextSx, ...widthControl }}
                />
                <SimpleTypography
                  text='Дата'
                  sx={{ ...liHeaderTextSx, ...widthControl }}
                />
                {/* <SimpleTypography
                  text='Интерьеры'
                  sx={{ ...liHeaderTextSx, ...widthControl, textAlign: 'center' }}
                />
                <SimpleTypography
                  text='Бирки'
                  sx={{ ...liHeaderTextSx, ...widthControl, textAlign: 'center' }}
                />
                <SimpleTypography
                  text='Загрузки'
                  sx={{ ...liHeaderTextSx, ...widthControl, textAlign: 'center' }}
                /> */}
              </ListItem>
              {
                users_status == 'succeeded' ?
                  users && users?.users?.length != 0
                    ? users?.users?.map((user, index: any) =>

                      <ListItem key={index} alignItems="center"
                        sx={liSx}
                      >

                        <ListItemText onClick={() => navigateTo(`/users/${user?.username}`)}
                          // title='Нажмите, чтобы открыть'
                          sx={{
                            ...widthControl, ...itemAsLink,
                            '& > span:first-of-type': {
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'flex-start'
                            }
                          }}
                        >
                          <Box
                            sx={{
                              ...modelImageWrapperSx,
                              '&:hover:after': {
                                opacity: '1'
                              },
                              '&::after': {
                                backgroundImage: user?.image_src ? `url(${IMAGES_BASE_URL}/${user?.image_src})` : `url('/img/avatar.png')`,
                                bgcolor: '#fff',
                                transition: 'opacity 0.3s ease',
                                zIndex: 3000,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                content: '""',
                                display: 'flex',
                                pointerEvents: 'none',
                                opacity: '0',
                                border: '1px solid #B8B8B8',
                                borderRadius: '4px',
                                width: '320px',
                                height: '320px',
                                position: 'absolute',
                                top: '-160',
                                left: '100%',
                              }
                            }}
                          >
                            <Image
                              src={user?.image_src ? `${IMAGES_BASE_URL}/${user?.image_src}` : `/img/avatar.png`}
                              alt='image'
                              width={36}
                              height={36}
                              style={modelImageSx}
                            />
                          </Box>


                          <ListItemText onClick={() => navigateTo(`/users/${user?.username}`)} className='brand_name' sx={{ marginLeft: '24px', }} >
                            <SimpleTypography
                              text={user.full_name}
                              sx={{
                                fontSize: '16px',
                                fontWeight: 400,
                                lineHeight: '26px',
                                letterSpacing: '-0.02em',
                                textAlign: 'start',
                                color: '#141414'
                              }}
                            />
                            <SimpleTypography
                              text={`@${user?.username}`}
                              sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                                lineHeight: '24px',
                                letterSpacing: '-0.01em',
                                textAlign: 'start',
                                color: '#848484'
                              }}
                            />
                          </ListItemText>
                        </ListItemText>

                        <ListItemText onClick={() => navigateTo(`/models/${user?.model_slug}`)}
                          sx={{
                            ...widthControl, ...itemAsLink,
                            '& > span:first-of-type': {
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'flex-start'
                            }
                          }}
                        >
                          <Box
                            sx={{
                              ...modelImageWrapperSx,
                              '&:hover:after': {
                                opacity: '1'
                              },
                              '&::after': {
                                backgroundImage: user?.model_cover ? `url(${IMAGES_BASE_URL}/${user?.model_cover})` : `url(/img/cube.jpg)`,
                                bgcolor: '#fff',
                                transition: 'opacity 0.3s ease',
                                zIndex: 3000,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                content: '""',
                                display: 'flex',
                                pointerEvents: 'none',
                                opacity: '0',
                                border: '1px solid #B8B8B8',
                                borderRadius: '4px',
                                width: '320px',
                                height: '320px',
                                position: 'absolute',
                                top: '-160',
                                left: '100%',
                              }
                            }}
                          >
                            <Image
                              src={user?.model_cover ? `${IMAGES_BASE_URL}/${user?.model_cover}` : `/img/cube.jpg`}
                              alt='image'
                              width={36}
                              height={36}
                              style={modelImageSx}
                            />
                          </Box>


                          <ListItemText onClick={() => navigateTo(`/models/${user?.model_slug}`)} className='brand_name' sx={{ marginLeft: '24px', }} >
                            <SimpleTypography
                              text={user.model_name}
                              sx={{
                                fontSize: '16px',
                                fontWeight: 400,
                                lineHeight: '26px',
                                letterSpacing: '-0.02em',
                                textAlign: 'start',
                                color: '#141414'
                              }}
                            />
                            <SimpleTypography
                              text={`#${user?.model_id}`}
                              sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                                lineHeight: '24px',
                                letterSpacing: '-0.01em',
                                textAlign: 'start',
                                color: '#848484'
                              }}
                            />
                          </ListItemText>
                        </ListItemText>

                        <ListItemText title='Нажмите, чтобы открыть'
                          onClick={() => navigateTo(`/models/${user?.username}`)}
                          sx={{ ...widthControl, ...itemAsLink }}
                        >
                          <SimpleTypography
                            text={formatDate(user?.downloaded_at, true)}
                            sx={{
                              fontSize: '14px',
                              fontWeight: 400,
                              lineHeight: '26px',
                              letterSpacing: '-0.02em',
                              textAlign: 'start',
                            }}
                          />
                        </ListItemText>

                        {/* <ListItemText
                          sx={{ ...widthControl }}
                        >
                          <SimpleTypography
                            text={user?.designs_count || 0}
                            sx={{
                              fontSize: '14px',
                              fontWeight: 400,
                              lineHeight: '26px',
                              letterSpacing: '-0.02em',
                              textAlign: 'center',
                            }}
                          />
                        </ListItemText>

                        <ListItemText
                          sx={{ ...widthControl }}
                        >
                          <SimpleTypography
                            text={user?.tags_count || 0}
                            sx={{
                              fontSize: '14px',
                              fontWeight: 400,
                              lineHeight: '26px',
                              letterSpacing: '-0.02em',
                              textAlign: 'center',
                            }}
                          />
                        </ListItemText>

                        <ListItemText
                          sx={{ ...widthControl }}
                        >
                          <SimpleTypography
                            text={user?.downloads_count || 0}
                            sx={{
                              fontSize: '14px',
                              fontWeight: 400,
                              lineHeight: '26px',
                              letterSpacing: '-0.02em',
                              textAlign: 'center',
                            }}
                          />
                        </ListItemText> */}

                      </ListItem>

                    )
                    : <EmptyData sx={{ marginTop: '8px' }} />
                  :
                  <>
                    {
                      fake?.map((i) =>
                        <Box key={i}>
                          <ListItem key={i} alignItems="center"
                            sx={liSx}
                          >

                            <ListItemText sx={{
                              ...widthControl,
                              '& > span:first-of-type': {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start'
                              }
                            }}>
                              <Skeleton
                                variant="rectangular"
                                width={36}
                                height={36}
                              />
                              <Box sx={{ marginLeft: '24px' }}>
                                <Skeleton
                                  variant="rectangular"
                                  width={100}
                                  height={16}
                                  sx={{ marginBottom: '5px' }}
                                />
                                <Skeleton
                                  variant="rectangular"
                                  width={80}
                                  height={14}
                                />
                              </Box>
                            </ListItemText>

                            <ListItemText sx={{
                              ...widthControl,
                              '& > span:first-of-type': {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start'
                              }
                            }}>
                              <Skeleton
                                variant="rectangular"
                                width={36}
                                height={36}
                              />
                              <Box sx={{ marginLeft: '24px' }}>
                                <Skeleton
                                  variant="rectangular"
                                  width={100}
                                  height={16}
                                  sx={{ marginBottom: '5px' }}
                                />
                                <Skeleton
                                  variant="rectangular"
                                  width={80}
                                  height={14}
                                />
                              </Box>
                            </ListItemText>

                            <ListItemText sx={{ ...widthControl }}>
                              <Skeleton
                                variant="rectangular"
                                width={56}
                                height={20}
                              />
                            </ListItemText>
                          </ListItem>
                        </Box>
                      )
                    }
                  </>
              }
            </List>
          }
          <Grid container sx={{ width: '100%', margin: "0 auto", padding: "17px 0 32px 0" }}>
            <Grid
              item
              xs={12}
              sx={{ padding: "0 !important", display: "flex", justifyContent: "center" }}
            >
              <Pagination
                dataSource='designers'
                count={users?.pagination?.pages}
                page={parseInt(users?.pagination?.current) + 1}
              />
            </Grid>
          </Grid>
        </>

      </Grid>
    </Box >
  )
}
