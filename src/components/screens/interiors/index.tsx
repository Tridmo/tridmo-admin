"use client"

import React, { CSSProperties, Suspense, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Box, useMediaQuery, styled, Menu, SxProps, MenuItem, List, ListItem, FormControl, ListItemText, Skeleton } from '@mui/material'
import SimpleCard from '../../simple_card'
import SimpleTypography from '../../typography'
import Pagination from '../../pagination/pagination'
import { getAllInteriors, getCheckedInteriors, getUncheckedInteriors, selectAllInteriors } from '../../../data/get_all_interiors';
import { useRouter, useSearchParams } from 'next/navigation'
import { searchInteriors, setSearchVal } from '../../../data/search_interior'
import Sorts from '../../views/sorts'
import InteriorCategories from '../../views/categories/interior_categories'
import InteriorStyles from '../../views/styles/interior_styles'
import { ThemeProps } from '../../../types/theme'
import { setRouteCrumbs } from '../../../data/route_crumbs'
import Link from 'next/link'
import Image from 'next/image'
import { ConfirmContextProps, resetConfirmData, resetConfirmProps, setConfirmProps, setConfirmState, setInteriorStatusChangeState, setOpenModal, setSelectedInterior } from '../../../data/modal_checker'
import instance from '../../../utils/axios'
import { toast } from 'react-toastify'
import Buttons from '../../buttons'
import { set_interiors_categories, set_interiors_name, set_interiors_status } from '../../../data/handle_filters'
import SearchInput from '../../inputs/search'
import SimpleSelect from '../../inputs/simple_select'
import { selectInteriorCategories } from '../../../data/categories'
import { IMAGES_BASE_URL } from '../../../utils/env_vars'
import formatDate from '../../../utils/format_date'
import EmptyData from '../../views/empty_data'
import { interiorStatuses } from '../../../types/variables'

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
    minWidth: '15%',
    maxWidth: '15%',
  },
  '&:nth-of-type(3)': {
    minWidth: '8%',
    maxWidth: '8%',
  },
  '&:nth-of-type(4)': {
    minWidth: '8%',
    maxWidth: '8%',
  },
  '&:nth-of-type(5)': {
    minWidth: '8%',
    maxWidth: '8%',
  },
  '&:nth-of-type(6)': {
    minWidth: '10%',
    maxWidth: '10%',
  },
  '&:nth-of-type(7)': {
    minWidth: '100px',
    maxWidth: '100px',
  },
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

export default function InteriorsPage() {
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const all__interiors = useSelector(selectAllInteriors)
  const all__interiors_status = useSelector((state: any) => state?.get_all_interiors?.status)
  const categories = useSelector(selectInteriorCategories)
  const [selectedInterior, setCurrentInterior] = useState<any>(null)
  const keyword = searchParams.get('name') as string
  const [activeTopButton, setActiveTopButton] = useState<0 | 1 | 2>(0)
  const [allInteriorsCount, setAllInteriorsCount] = useState<number>(0)
  const [uncheckedInteriorsCount, setUncheckedInteriorsCount] = useState<number>(0)
  const [checkedInteriorsCount, setCheckedInteriorsCount] = useState<number>(0)
  const [category, setCategoryId] = useState<number>(-1)


  const getInteriorsCategoryFilter = useSelector((state: any) => state?.handle_filters?.interiors_categories)
  const getInteriorsPageFilter = useSelector((state: any) => state?.handle_filters?.interiors_page)
  const getInteriorsNameFilter = useSelector((state: any) => state?.handle_filters?.interiors_name)
  const getInteriorsStatusFilter = useSelector((state: any) => state?.handle_filters?.interiors_status)
  const getInteriorsOrderBy = useSelector((state: any) => state?.handle_filters?.interiors_orderby)
  const getInteriorsOrder = useSelector((state: any) => state?.handle_filters?.interiors_order)

  useEffect(() => {
    dispatch(setRouteCrumbs([{
      title: 'Интерьеры',
      route: '/interiors'
    }]))
  }, [])


  useEffect(() => {
    const query = {}
    Object.keys(searchParams.keys()).forEach(k => query[k] = searchParams.get(k))

    dispatch(searchInteriors(query))
    dispatch(setSearchVal(keyword))

  }, [keyword])

  useMemo(() => {
    if (all__interiors) getCounts()
  }, [all__interiors])

  function getCounts() {
    instance.get('/interiors/counts').then(res => {
      setAllInteriorsCount(res?.data?.data?.all)
      setCheckedInteriorsCount(res?.data?.data?.checked)
      setUncheckedInteriorsCount(res?.data?.data?.unchecked)
    })
  }

  function handleClick(event: any, model: any) {
    setCurrentInterior(model);
    setAnchorEl(event.currentTarget);
  };

  function handleClose() {
    setCurrentInterior(null);
    setAnchorEl(null);
  };

  function handleStatusClick() {
    dispatch(setSelectedInterior(selectedInterior))
    dispatch(setInteriorStatusChangeState(true))
    dispatch(setOpenModal(true))
    handleClose();
  };

  function navigateTo(link: string) {
    router.refresh()
    router.push(link)
  }

  function handleAllClick() {
    dispatch(getAllInteriors({
      categories: getInteriorsCategoryFilter,
      name: getInteriorsNameFilter,
      status: getInteriorsStatusFilter,
      page: getInteriorsPageFilter,
      orderBy: getInteriorsOrderBy,
      order: getInteriorsOrder,
    }))
    dispatch(set_interiors_status(''))
    setActiveTopButton(0)
  };

  function handleCheckedClick() {
    dispatch(getAllInteriors({
      categories: getInteriorsCategoryFilter,
      name: getInteriorsNameFilter,
      status: '1',
      page: getInteriorsPageFilter,
      orderBy: getInteriorsOrderBy,
      order: getInteriorsOrder,
    }))
    dispatch(set_interiors_status('1'))
    setActiveTopButton(1)
  };

  function handleUncheckedClick() {
    dispatch(getAllInteriors({
      categories: getInteriorsCategoryFilter,
      name: getInteriorsNameFilter,
      status: '0',
      page: getInteriorsPageFilter,
      orderBy: getInteriorsOrderBy,
      order: getInteriorsOrder,
    }))
    dispatch(set_interiors_status('0'))
    setActiveTopButton(2)
  };

  function handleCategoryChange(e) {
    setCategoryId(Number(e.target.value))
    const filter = e.target.value == -1 ? [] : [e.target.value];
    dispatch(getAllInteriors({
      categories: filter,
      name: getInteriorsNameFilter,
      status: getInteriorsStatusFilter,
      page: getInteriorsPageFilter,
      orderBy: getInteriorsOrderBy,
      order: getInteriorsOrder,
    }))
    dispatch(set_interiors_categories(filter))
  };

  function handleSearch(searchValue) {
    dispatch(getAllInteriors({
      categories: getInteriorsCategoryFilter,
      name: searchValue,
      status: getInteriorsStatusFilter,
      page: getInteriorsPageFilter,
      orderBy: getInteriorsOrderBy,
      order: getInteriorsOrder,
    }))
    dispatch(set_interiors_name(searchValue))
  };

  function handleClickDelete() {
    const modalContent: ConfirmContextProps = {
      message: `Вы уверены, что хотите удалить интерьер «${selectedInterior?.name}»?`,
      actions: {
        on_click: {
          args: [selectedInterior?.id],
          func: async (checked: boolean, id: number) => {
            dispatch(setConfirmProps({ is_loading: true }))
            instance.delete(`interiors/${id}`)
              .then(res => {
                if (res?.data?.success) {
                  toast.success(res?.data?.message)
                  dispatch(getAllInteriors({
                    categories: getInteriorsCategoryFilter,
                    name: getInteriorsNameFilter,
                    status: getInteriorsStatusFilter,
                    page: getInteriorsPageFilter,
                    orderBy: getInteriorsOrderBy,
                    order: getInteriorsOrder,
                  }))
                  dispatch(setConfirmState(false))
                  dispatch(setOpenModal(false))
                  dispatch(resetConfirmProps())
                  dispatch(resetConfirmData())
                }
                else {
                  toast.success(res?.data?.message)
                }
              }).catch(err => {
                toast.error(err?.response?.data?.message)
              }).finally(() => {
                dispatch(setConfirmProps({ is_loading: false }))
                handleClose();
              })
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
    <Box sx={{ width: '1200px', minHeight: 829, display: "block", margin: "0 auto" }}>
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
          onClick={handleStatusClick}
          sx={{ padding: "6px 12px" }}
        >
          <Image
            src="/icons/edit-pen.svg"
            alt="icon"
            width={17}
            height={17}
          />
          <SimpleTypography className='drow-down__text' text='Изменить статус' />
        </MenuItem>

        <MenuItem
          onClick={handleClickDelete}
          sx={{ padding: "6px 12px" }}
        >
          <Image
            src="/icons/trash.svg"
            alt="icon"
            width={17}
            height={17}
          />
          <SimpleTypography className='drow-down__text' text='Удалить' />

        </MenuItem>

      </DropDown>

      <Grid spacing={2} container sx={{ width: '100%', marginTop: "32px", marginLeft: 0 }} >

        <>
          {
            <List
              sx={listSx}
            >
              <ListItem alignItems="center"
                key={-3}
                sx={{
                  ...liHeaderSx,
                  padding: '0',
                  height: '56px'
                }}
              >
                <Buttons
                  name='Все'
                  onClick={handleAllClick}
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
                      text={`${allInteriorsCount}`}
                    />
                  </Box>
                </Buttons>

                <Buttons
                  name='Проверено'
                  onClick={handleCheckedClick}
                  type='button'
                  sx={{
                    color: activeTopButton == 1 ? '#7210BE' : '#646464',
                    borderRadius: 0,
                    borderBottom: `2px solid ${activeTopButton == 1 ? '#7210BE' : 'transparent'}`,
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
                      backgroundColor: activeTopButton == 1 ? '#F3E5FF' : '#F8F8F8',
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
                        color: activeTopButton == 1 ? '#7210BE' : '#A0A0A0',
                        fontSize: '12px',
                        fontWeight: 500,
                        lineHeight: '16px',
                      }}
                      text={`${checkedInteriorsCount}`}
                    />
                  </Box>
                </Buttons>

                <Buttons
                  name='Непроверено'
                  onClick={handleUncheckedClick}
                  type='button'
                  sx={{
                    color: activeTopButton == 2 ? '#7210BE' : '#646464',
                    borderRadius: 0,
                    borderBottom: `2px solid ${activeTopButton == 2 ? '#7210BE' : 'transparent'}`,
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
                      backgroundColor: activeTopButton == 2 ? '#F3E5FF' : '#F8F8F8',
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
                        color: activeTopButton == 2 ? '#7210BE' : '#A0A0A0',
                        fontSize: '12px',
                        fontWeight: 500,
                        lineHeight: '16px',
                      }}
                      text={`${uncheckedInteriorsCount}`}
                    />
                  </Box>
                </Buttons>

              </ListItem>

              <ListItem alignItems="center"
                key={-2}
                sx={liHeaderSx}
              >
                <form style={{ width: '100%' }}>
                  <Grid width={'100%'} container justifyContent={'space-between'}>
                    <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                      <FormControl sx={{ mr: '8px' }}>
                        <SearchInput
                          placeHolder='Поиск по название'
                          startIcon
                          value={getInteriorsNameFilter}
                          search={(s) => handleSearch(s)}
                          sx={{
                            borderColor: '#B8B8B8',
                            padding: '6px 12px',
                            backgroundColor: '#fff',
                            width: 'auto'
                          }}
                        />
                      </FormControl>
                      {
                        !!getInteriorsNameFilter?.length && (
                          <SimpleTypography
                            text={`Найдено ${all__interiors?.data?.pagination?.data_count || 0} совпадений`}
                            sx={{
                              fontWeight: '400',
                              fontSize: '16px'
                            }}
                          />
                        )
                      }
                    </Grid>

                    <Grid item>
                      <FormControl>
                        <SimpleSelect
                          sx={{
                            borderColor: '#B8B8B8',
                            backgroundColor: '#fff',
                            minWidth: '200px'
                          }}
                          onChange={handleCategoryChange}
                          paddingX={12}
                          paddingY={6}
                          variant='outlined'
                          value={category}
                        >
                          <MenuItem selected content='option' key={-2} value={-1}>Все категории</MenuItem>
                          {
                            categories?.map(
                              (c, i) => (
                                <MenuItem key={i} value={c?.id}>{c?.name}</MenuItem>
                              )
                            )
                          }
                        </SimpleSelect>
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
                  text='Название'
                  sx={{ ...liHeaderTextSx, ...widthControl }}
                />
                <SimpleTypography
                  text='Категория'
                  sx={{ ...liHeaderTextSx, ...widthControl }}
                />
                <SimpleTypography
                  text='Бирки'
                  sx={{ ...liHeaderTextSx, ...widthControl, textAlign: 'center' }}
                />
                <SimpleTypography
                  text='Просмотры'
                  sx={{ ...liHeaderTextSx, ...widthControl, textAlign: 'center' }}
                />
                <SimpleTypography
                  text='Лайки'
                  sx={{ ...liHeaderTextSx, ...widthControl, textAlign: 'center' }}
                />
                <SimpleTypography
                  text='Cтатус'
                  sx={{ ...liHeaderTextSx, ...widthControl, textAlign: 'center' }}
                />
                <SimpleTypography
                  text='Действия'
                  sx={{ ...liHeaderTextSx, ...widthControl, textAlign: 'center' }}
                />
              </ListItem>
              {
                all__interiors_status == 'succeeded' ?
                  all__interiors?.data?.interiors &&
                    all__interiors?.data?.interiors?.length != 0

                    ? all__interiors?.data?.interiors?.map((interior, index: any) =>

                      <ListItem key={index} alignItems="center"
                        sx={liSx}
                      >

                        <ListItemText onClick={() => navigateTo(`/interiors/${interior?.slug}`)}
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
                                backgroundImage: `url(${IMAGES_BASE_URL}/${interior?.cover[0]?.image_src})`,
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
                              src={interior?.cover ? (
                                interior?.cover[0]?.image_src ? (
                                  `${IMAGES_BASE_URL}/${interior?.cover[0]?.image_src}`
                                ) : ''
                              ) : ''}
                              alt='Landing image'
                              width={36}
                              height={36}
                              style={modelImageSx}
                            />
                          </Box>


                          <ListItemText onClick={() => navigateTo(`/interiors/${interior?.slug}`)} className='brand_name' sx={{ marginLeft: '24px', }} >
                            <SimpleTypography
                              text={interior?.name}
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
                              text={`by ${interior?.author?.full_name}`}
                              sx={{
                                fontSize: '14px',
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
                          onClick={() => navigateTo(`/interiors/${interior?.slug}`)}
                          sx={{ ...widthControl, ...itemAsLink }}
                        >
                          <SimpleTypography
                            text={interior?.category?.name || 'Category'}
                            sx={{
                              fontSize: '14px',
                              fontWeight: 400,
                              lineHeight: '26px',
                              letterSpacing: '-0.02em',
                              textAlign: 'start',
                            }}
                          />
                        </ListItemText>

                        <ListItemText title='Нажмите, чтобы открыть'
                          onClick={() => navigateTo(`/interiors/${interior?.slug}`)}
                          sx={{ ...widthControl, ...itemAsLink, justifyContent: 'center' }}
                        >
                          <SimpleTypography
                            text={interior?.tags_count || 0}
                            sx={{
                              fontSize: '14px',
                              fontWeight: 400,
                              lineHeight: '26px',
                              letterSpacing: '-0.02em',
                              textAlign: 'center',
                            }}
                          />
                        </ListItemText>

                        <ListItemText title='Нажмите, чтобы открыть'
                          onClick={() => navigateTo(`/interiors/${interior?.slug}`)}
                          sx={{ ...widthControl, ...itemAsLink, justifyContent: 'center' }}>
                          <SimpleTypography
                            text={interior?.views || 0}
                            sx={{
                              fontSize: '14px',
                              fontWeight: 400,
                              lineHeight: '26px',
                              letterSpacing: '-0.02em',
                              textAlign: 'center',
                            }}
                          />
                        </ListItemText>

                        <ListItemText title='Нажмите, чтобы открыть'
                          sx={{ ...widthControl, ...itemAsLink, justifyContent: 'center' }}>
                          <SimpleTypography
                            text={interior?.likes || 0}
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
                          sx={{
                            ...widthControl, justifyContent: 'center',
                            '& span': { display: 'flex', justifyContent: 'center' }
                          }}
                        >
                          <Box
                            sx={{
                              padding: '2px 8px',
                              borderRadius: '8px',
                              bgcolor: interiorStatuses?.[interior?.status]?.bgcolor,
                            }}
                          >
                            <SimpleTypography
                              text={interiorStatuses?.[interior?.status]?.text}
                              sx={{
                                color: interiorStatuses?.[interior?.status]?.color,
                                fontSize: '14px',
                                fontWeight: 400,
                                lineHeight: '14px',
                                textAlign: 'center',
                              }}
                            />
                          </Box>
                        </ListItemText>

                        <ListItemText
                          sx={{
                            ...widthControl, justifyContent: 'center',
                            '& span': { display: 'flex', justifyContent: 'center' }
                          }}
                        >
                          <Buttons
                            name=""
                            onClick={(e) => handleClick(e, interior)}
                            childrenFirst={true}
                            type='button'
                            className="options_menu__btn"
                            sx={{ minWidth: '20px', width: '20px', height: '20px' }}
                          >
                            <Image
                              alt="icon"
                              src='/icons/options-dots-vertical.svg'
                              width={20}
                              height={20}
                            />
                          </Buttons>
                        </ListItemText>

                      </ListItem>

                    )
                    : <EmptyData sx={{ marginTop: '8px' }} />
                  :
                  <>
                    {
                      fake?.map((i) =>
                        <Box key={i}>
                          <ListItem key={i} alignItems="center"
                            sx={{
                              ...liSx,
                              '& > .centered': {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }
                            }}
                          >

                            <Box sx={{
                              ...widthControl,
                              padding: '20px 24px',
                              '&:first-of-type': {
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
                            </Box>

                            <Box sx={{ ...widthControl }} >
                              <Skeleton
                                variant="rectangular"
                                width={56}
                                height={20}
                              />
                            </Box>
                            <Box className='centered' sx={{ ...widthControl }}>
                              <Skeleton
                                variant="rectangular"
                                width={56}
                                height={20}
                              />
                            </Box>
                            <Box className='centered' sx={{ ...widthControl }}>
                              <Skeleton
                                variant="rectangular"
                                width={56}
                                height={20}
                              />
                            </Box>
                            <Box className='centered' sx={{ ...widthControl }}>
                              <Skeleton
                                variant="rectangular"
                                width={56}
                                height={20}
                              />
                            </Box>
                            <Box className='centered' sx={{ ...widthControl }}>
                              <Skeleton
                                variant="rectangular"
                                width={76}
                                height={20}
                              />
                            </Box>
                            <Box className='centered' sx={{ ...widthControl }}>
                              <Skeleton
                                variant="rectangular"
                                width={20}
                                height={20}
                              />
                            </Box>
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
                dataSource='models'
                count={all__interiors?.data?.pagination?.pages}
                page={parseInt(all__interiors?.data?.pagination?.current) + 1}
              />
            </Grid>
          </Grid>
        </>

      </Grid>
    </Box>
  )
}
