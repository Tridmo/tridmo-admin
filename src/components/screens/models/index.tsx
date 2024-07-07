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
import { IMAGES_BASE_URL } from '../../../utils/image_src'
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
import { setCategoryFilter, setModelBrandFilter, setModelNameFilter, setModelTopFilter } from '../../../data/handle_filters'
import { ConfirmContextProps, resetConfirmData, resetConfirmProps, setConfirmProps, setConfirmState, setOpenModal } from '../../../data/modal_checker'
import { setTimeout } from 'timers'
import { selectRouteCrubms, setRouteCrumbs } from '../../../data/route_crumbs'
import { RouteCrumb } from '../../../types/interfaces'

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
    minWidth: '517px',
  },
  '&:nth-of-type(2)': {
    minWidth: '180px',
  },
  '&:nth-of-type(3)': {
    minWidth: '180px',
  },
  '&:nth-of-type(4)': {
    minWidth: '170px',
  },
  '&:nth-of-type(5)': {
    minWidth: '100px',
  },
  '&:nth-of-type(6)': {
    minWidth: '50px',
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

export default function ModelsPage() {

  const router = useRouter();
  const dispatch = useDispatch<any>();
  // const searchParams = useSearchParams();
  const IsFilterOpen = useSelector((state: any) => state?.modal_checker?.isFilterModal)
  const searchedModels = useSelector((state: any) => state?.search_models?.data)
  const all__models_status = useSelector((state: any) => state?.get_all_models?.status)
  const top__models_status = useSelector((state: any) => state?.get_top_models?.status)
  const getModelCategoryFilter = useSelector((state: any) => state?.handle_filters?.categories)
  const getModelBrandFilter = useSelector((state: any) => state?.handle_filters?.model_brand)
  const getModelCategoryNameFilter = useSelector((state: any) => state?.handle_filters?.category_name)
  const getModelColorFilter = useSelector((state: any) => state?.handle_filters?.colors)
  const getModelStyleFilter = useSelector((state: any) => state?.handle_filters?.styles)
  const getModelPageFilter = useSelector((state: any) => state?.handle_filters?.page)
  const getModelTopFilter = useSelector((state: any) => state?.handle_filters?.model_top)
  const getModelNameFilter = useSelector((state: any) => state?.handle_filters?.model_name)
  const getModelOrderBy = useSelector((state: any) => state?.handle_filters?.model_orderby)
  const getModelOrder = useSelector((state: any) => state?.handle_filters?.model_order)

  const matches = useMediaQuery('(max-width:600px)');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const all__models = useSelector(selectAllModels)
  const all__categories = useSelector(selectCategories)
  const all__brands = useSelector(selectAllBrands)
  const route_crumbs = useSelector(selectRouteCrubms)

  // const keyword = searchParams.get('keyword') as string
  const [categories, setCategories] = useState<any[]>([])
  const [activeTopButton, setActiveTopButton] = useState<0 | 1>(0)
  const [allModelsCount, setAllModelsCount] = useState<number>(0)
  const [topModelsCount, setTopModelsCount] = useState<number>(0)
  const [category, setCategoryId] = useState<number>(-1)
  const [brand, setBrandId] = useState<any>(-1)
  const [selectedModel, setSelectedModel] = useState<any>(null)

  useEffect(() => {
    dispatch(setRouteCrumbs([{
      title: 'Модели',
      route: '/models'
    }]))
  }, [])

  useMemo(() => {
    instance.get('/models/counts/?all=true&top=true').then(res => {
      setAllModelsCount(res?.data?.data?.counts?.all)
      setTopModelsCount(res?.data?.data?.counts?.top)
    })
  }, [all__models, all__models_status])
  useMemo(() => {
    if (getModelTopFilter == true) {
      setTopModelsCount(all__models?.data?.pagination?.data_count)
    } else {
      setAllModelsCount(all__models?.data?.pagination?.data_count)
    }
  }, [all__models, all__models_status, getModelTopFilter])

  useMemo(() => {
    if (all__categories) {
      let arr: any[] = []
      const cats: any[] = Array.from(all__categories)
      cats.map(c => arr = arr.concat(c['children'] && c['children'][0] ? c['children'] : []))
      setCategories(arr)
    }
  }, [all__categories])

  function navigateTo(link: string) {
    router.push(link)
  }
  // function setActiveTopButton(index: number) {
  //     topButtons[index].active = true
  //     topButtons.forEach((e, i) => {
  //         if (index != i) topButtons[i].active = false
  //     })
  //     setTopButtons(topButtons)
  // }

  function handleAllClick(event) {
    console.log(getModelNameFilter, 'state.model_name');
    dispatch(getAllModels({
      categories: getModelCategoryFilter,
      colors: getModelColorFilter,
      styles: getModelStyleFilter,
      brand: getModelBrandFilter,
      top: undefined,
      name: getModelNameFilter,
      page: getModelPageFilter,
      orderBy: getModelOrderBy,
      order: getModelOrder,
    }))
    dispatch(setModelTopFilter(undefined))
    setActiveTopButton(0)
  };

  function handleTopClick(event) {
    dispatch(getAllModels({
      categories: getModelCategoryFilter,
      colors: getModelColorFilter,
      styles: getModelStyleFilter,
      brand: getModelBrandFilter,
      top: true,
      name: getModelNameFilter,
      page: getModelPageFilter,
      orderBy: getModelOrderBy,
      order: getModelOrder,
    }))
    dispatch(setModelTopFilter(true))
    setActiveTopButton(1)
  };

  function handleClick(event: any, model: any) {
    setSelectedModel(model);
    setAnchorEl(event.currentTarget);
  };

  function handleClose() {
    setSelectedModel(null);
    setAnchorEl(null);
  };

  function handleCategoryChange(e) {
    setCategoryId(Number(e.target.value))
    const filter = e.target.value == -1 ? [] : [e.target.value];
    dispatch(getAllModels({
      categories: filter,
      colors: getModelColorFilter,
      styles: getModelStyleFilter,
      brand: getModelBrandFilter,
      top: getModelTopFilter,
      name: getModelNameFilter,
      page: getModelPageFilter,
      orderBy: getModelOrderBy,
      order: getModelOrder,
    }))
    dispatch(setCategoryFilter(filter))
  }

  function handleBrandChange(e) {
    setBrandId(e.target.value)
    const filter = e.target.value == -1 ? '' : e.target.value;
    dispatch(getAllModels({
      brand: filter,
      categories: getModelCategoryFilter,
      colors: getModelColorFilter,
      styles: getModelStyleFilter,
      top: getModelTopFilter,
      name: getModelNameFilter,
      page: getModelPageFilter,
      orderBy: getModelOrderBy,
      order: getModelOrder,
    }))
    dispatch(setModelBrandFilter(filter))
  }

  function handleSearch(searchValue) {
    dispatch(getAllModels({
      brand: getModelBrandFilter,
      categories: getModelCategoryFilter,
      colors: getModelColorFilter,
      styles: getModelStyleFilter,
      name: searchValue,
      top: getModelTopFilter,
      page: getModelPageFilter,
      orderBy: getModelOrderBy,
      order: getModelOrder,
    }))
    dispatch(setModelNameFilter(searchValue))
  }

  function handleChangeTop() {
    instance.put(`models/${selectedModel?.id}`, {
      top: !selectedModel?.top
    }).then(res => {
      if (res?.data?.success) {
        toast.success(res?.data?.message)
        dispatch(getAllModels({}))
      }
      else {
        toast.success(res?.data?.message)
      }
    }).catch(err => {
      toast.error(err?.response?.data?.message)
    }).finally(() => {
      handleClose();
    })
  };

  function handleClickDelete() {
    const modalContent: ConfirmContextProps = {
      message: `Вы уверены, что хотите удалить модель «${selectedModel?.name}»?`,
      actions: {
        on_click: {
          args: [selectedModel?.id],
          func: async (checked: boolean, id: number) => {
            dispatch(setConfirmProps({ is_loading: true }))
            instance.delete(`models/${id}`)
              .then(res => {
                if (res?.data?.success) {
                  toast.success(res?.data?.message)
                  dispatch(getAllModels({}))
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

        <MenuItem
          onClick={handleChangeTop}
          sx={{ padding: "6px 12px" }}
        >
          <Image
            src={selectedModel?.top ? '/icons/star-purple.svg' : '/icons/star-line-purple.svg'}
            alt="icon"
            width={17}
            height={17}
          />
          <SimpleTypography className='drow-down__text' text={selectedModel?.top ? 'Удалить из ТОПа' : 'Поднять в ТОП'} />
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
                      text={`${allModelsCount}`}
                    />
                  </Box>
                </Buttons>
                <Buttons
                  name='Топ'
                  onClick={handleTopClick}
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
                      text={`${topModelsCount}`}
                    />
                  </Box>
                </Buttons>
                {/* {
                                    topButtons?.map((b, i) => (
                                    ))
                                } */}
              </ListItem>

              <ListItem alignItems="center"
                key={-2}
                sx={liHeaderSx}
              >
                <form style={{ width: '100%' }}>
                  <Grid width={'100%'} container justifyContent={'space-between'}>
                    <Grid item>
                      <FormControl>
                        <SearchInput
                          placeHolder='Поиск по название'
                          startIcon
                          value={getModelNameFilter}
                          search={(s) => handleSearch(s)}
                          sx={{
                            borderColor: '#B8B8B8',
                            padding: '6px 12px',
                            backgroundColor: '#fff',
                            width: 'auto'
                          }}
                        />
                      </FormControl>
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

                      <FormControl sx={{ ml: '12px' }}>
                        <SimpleSelect
                          sx={{
                            borderColor: '#B8B8B8',
                            backgroundColor: '#fff',
                            minWidth: '200px'
                          }}
                          onChange={handleBrandChange}
                          paddingX={12}
                          paddingY={6}
                          variant='outlined'
                          value={brand}
                        >
                          <MenuItem selected content='option' key={-2} value={-1}>Все бренды</MenuItem>
                          {
                            all__brands?.data?.brands?.map(
                              (c, i) => (
                                <MenuItem key={i} value={c?.id}>{c?.name}</MenuItem>
                              )
                            )
                          }
                        </SimpleSelect>
                      </FormControl>

                      <Link href='/models/addnew'>
                        <Buttons
                          name="Добавить модель"
                          childrenFirst={true}
                          type='button'
                          className="upload__btn"
                          sx={{ ml: '12px', height: '37px' }}
                        >
                          <Image
                            alt="icon"
                            src='/icons/plus-round-white.svg'
                            width={20}
                            height={20}
                          />
                        </Buttons>
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </ListItem>

              <ListItem alignItems="center"
                key={-1}
                sx={liHeaderSx}
              >
                <SimpleTypography
                  text='Модель'
                  sx={{ ...liHeaderTextSx, ...widthControl }}
                />
                <SimpleTypography
                  text='Бренд'
                  sx={{ ...liHeaderTextSx, ...widthControl }}
                />
                <SimpleTypography
                  text='Категория'
                  sx={{ ...liHeaderTextSx, ...widthControl }}
                />
                <SimpleTypography
                  text='Дата'
                  sx={{ ...liHeaderTextSx, ...widthControl }}
                />
                <SimpleTypography
                  text='Скачано'
                  sx={{ ...liHeaderTextSx, ...widthControl, textAlign: 'center' }}
                />
                <SimpleTypography
                  text=''
                  sx={{ ...widthControl }}
                />
              </ListItem>
              {
                all__models_status == 'succeeded' ?
                  all__models?.data?.models &&
                    all__models?.data?.models?.length != 0

                    ? all__models?.data?.models?.map((model, index: any) =>

                      <ListItem key={index} alignItems="center"
                        sx={liSx}
                      >

                        <ListItemText onClick={() => navigateTo(`/models/${model?.slug}`)}
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
                                backgroundImage: `url(${IMAGES_BASE_URL}/${model?.cover[0]?.image_src})`,
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
                              src={model?.cover ? (
                                model?.cover[0]?.image_src ? (
                                  `${IMAGES_BASE_URL}/${model?.cover[0]?.image_src}`
                                ) : ''
                              ) : ''}
                              alt='Landing image'
                              width={36}
                              height={36}
                              style={modelImageSx}
                            />
                          </Box>


                          <ListItemText onClick={() => navigateTo(`/models/${model?.slug}`)} className='brand_name' sx={{ marginLeft: '24px', }} >
                            <SimpleTypography
                              text={model?.name}
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
                              text={`#${model?.id}`}
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
                          onClick={() => navigateTo(`/models/${model?.slug}`)}
                          sx={{ ...widthControl, ...itemAsLink }}
                        >
                          <SimpleTypography
                            text={model?.brand?.name}
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
                          onClick={() => navigateTo(`/models/${model?.slug}`)}
                          sx={{ ...widthControl, ...itemAsLink }}
                        >
                          <SimpleTypography
                            text={model?.category?.name || 'Category'}
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
                          onClick={() => navigateTo(`/models/${model?.slug}`)}
                          sx={{ ...widthControl, ...itemAsLink }}
                        >
                          <SimpleTypography
                            text={formatDate(model?.created_at, true)}
                            sx={{
                              fontSize: '14px',
                              fontWeight: 400,
                              lineHeight: '26px',
                              letterSpacing: '-0.02em',
                              textAlign: 'start',
                            }}
                          />
                        </ListItemText>

                        <ListItemText
                          sx={{ ...widthControl }}
                        >
                          <SimpleTypography
                            text={model?.downloads_count || 0}
                            sx={{
                              fontSize: '14px',
                              fontWeight: 400,
                              lineHeight: '26px',
                              letterSpacing: '-0.02em',
                              textAlign: 'center',
                            }}
                          />
                        </ListItemText>

                        <ListItemText sx={{
                          ...widthControl,
                          '& span': {
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                          }
                        }}>
                          {
                            model?.top ?
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: '24px',
                                  height: '24px',
                                  borderRadius: '4px',
                                  backgroundColor: '#F3E5FF'
                                }}
                              >
                                <Image
                                  alt='icon'
                                  src='/icons/star-purple.svg'
                                  width={14}
                                  height={14}
                                />
                              </Box>
                              : null
                          }
                          <Buttons
                            name=""
                            onClick={(e) => handleClick(e, model)}
                            childrenFirst={true}
                            type='button'
                            className="options_menu__btn"
                            sx={{ ml: '12px', minWidth: '20px', width: '20px', height: '20px' }}
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

                            <ListItemText sx={{ ...widthControl }} >
                              <Skeleton
                                variant="rectangular"
                                width={56}
                                height={20}
                              />
                            </ListItemText>
                            <ListItemText sx={{ ...widthControl }}>
                              <Skeleton
                                variant="rectangular"
                                width={56}
                                height={20}
                              />
                            </ListItemText>
                            <ListItemText sx={{ ...widthControl }}>
                              <Skeleton
                                variant="rectangular"
                                width={56}
                                height={20}
                              />
                            </ListItemText>
                            <ListItemText sx={{
                              ...widthControl,
                              '& > span:first-of-type': {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }
                            }}>
                              <Skeleton
                                variant="rectangular"
                                width={56}
                                height={20}
                              />
                            </ListItemText>
                            <ListItemText sx={{
                              ...widthControl,
                              '& > span:first-of-type': {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end'
                              }
                            }}>
                              <Skeleton
                                variant="rectangular"
                                width={20}
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
                dataSource='models'
                count={all__models?.data?.pagination?.pages}
                page={parseInt(all__models?.data?.pagination?.current) + 1}
              />
            </Grid>
          </Grid>
        </>

      </Grid>
    </Box >
  )
}
