"use client"

import React, { CSSProperties, Suspense, useEffect, useState } from 'react'
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
import { getCategories, getInteriorCategories, getModelCategories, selectCategories, selectCategoriesWithModelCount } from '../../../data/categories'
import { selectAllBrands } from '../../../data/get_all_brands'
import { ThemeProps } from '../../../types/theme'
import instance from '../../../utils/axios'
import { toast } from 'react-toastify'
import { getTopModels, selectTopModels } from '../../../data/get_top_models'
import { ConfirmContextProps, resetConfirmData, resetConfirmProps, setConfirmProps, setConfirmState, setOpenModal } from '../../../data/modal_checker'
import { dropLastRouteCrumb, pushRouteCrumb, setRouteCrumbs } from '../../../data/route_crumbs'

const fakeBrands = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

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
    minWidth: '100px',
    maxWidth: '100px',
  },
  '&:nth-of-type(3)': {
    minWidth: '100px',
    maxWidth: '100px',
    textAlign: 'center',
    justifyContent: 'center',
  },
  '&:nth-of-type(4)': {
    minWidth: '180px',
    textAlign: 'center',
    justifyContent: 'center',
  },
  '&:nth-of-type(5)': {
    minWidth: '170px',
    textAlign: 'center',
    justifyContent: 'center',
  },
  '&:nth-of-type(6)': {
    minWidth: '50px',
  }
}

const itemAsLink = {
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  height: '46px',
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

function sumModelsCount(data) {
  let sum = 0;
  data.forEach(item => {
    if (item.models_count !== undefined && !isNaN(item.models_count)) {
      sum += Number(item.models_count);
    }
  });
  return sum;
}

export default function CategoriesPage() {

  const typeButtons = [
    {
      text: 'Все',
      value: 0,
      active: true,
      count: 0,
      on_click: handleAllClick,
    },
    {
      text: 'Модел',
      value: 1,
      active: false,
      count: 0,
      on_click: handleModelClick,
    },
    {
      text: 'Интерьер',
      value: 2,
      active: false,
      count: 0,
      on_click: handleInteriorClick,
    },
  ]


  const router = useRouter();
  const dispatch = useDispatch<any>();
  const matches = useMediaQuery('(max-width:600px)');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const all__categories_status = useSelector((state: any) => state?.categories?.with_model_count_status)
  const checkbox_checked = useSelector((state: any) => state?.modal_checker?.confirmation_data?.checkbox_checked)
  const all__categories = useSelector(selectCategoriesWithModelCount)

  // const keyword = searchParams.get('keyword') as string
  const [cascadeDelete, setCascadeDelete] = useState<boolean>(false)
  const [categories, setCategories] = useState<any[]>([])
  const [topButtons, setTopButtons] = useState<any[]>(typeButtons)
  const [selectedCategory, setSelectedCategory] = useState<any>(null)
  const [selectedMenuCategory, setSelectedMenuCategory] = useState<any>(null)
  // const [typeModelSelected, setTypeModelSelected] = useState<boolean>(false)
  // const [typeInteiriorSelected, setTypeInteiriorSelected] = useState<boolean>(false)

  useEffect(() => {
    dispatch(setRouteCrumbs(
      [{
        title: 'Категории',
        route: '/categories'
      }]
    ))
  }, [])

  useEffect(() => {
    if (all__categories_status == 'succeeded' && all__categories) {
      typeButtons[0].count = all__categories?.length
      typeButtons[1].count = all__categories?.reduce((n, e) => n + (e?.type === 'model'), 0)
      typeButtons[2].count = all__categories?.reduce((n, e) => n + (e?.type === 'interior'), 0)
      setTopButtons(typeButtons)
      setCategories(all__categories)
    }
  }, [all__categories_status])

  // useEffect(() => {
  //     setCascadeDelete(checkbox_checked)
  // }, [checkbox_checked])

  function navigateTo(link: string) {
    router.push(link)
  }

  function handleAllClick(event: any, index: number) {
    setCategories(all__categories)
    typeButtons[index].active = true
    typeButtons.forEach((e, i) => {
      if (index != i) typeButtons[i].active = false
    })
    setTopButtons(typeButtons)
  };
  function handleModelClick(event: any, index: number) {
    const typeModel = all__categories.filter((e) => e?.type === 'model')
    setCategories(typeModel)
    typeButtons[index].active = true
    typeButtons.forEach((e, i) => {
      if (index != i) typeButtons[i].active = false
    })
    setTopButtons(typeButtons)
  };
  function handleInteriorClick(event: any, index: number) {
    const typeModel = all__categories.filter((e) => e?.type === 'interior')
    setCategories(typeModel)
    typeButtons[index].active = true
    typeButtons.forEach((e, i) => {
      if (index != i) typeButtons[i].active = false
    })
    setTopButtons(typeButtons)
  };

  function handleClick(event: any, model: any) {
    setSelectedMenuCategory(model);
    setAnchorEl(event.currentTarget);
  };

  function handleClose() {
    setSelectedMenuCategory(null);
    setAnchorEl(null);
  };

  function handleSelectCategory(index: number) {
    if (categories[index] &&
      categories[index]?.type == 'model' &&
      categories[index]?.children &&
      categories[index]?.children?.length &&
      categories[index]?.children[0] != null
    ) {
      setCategories(categories[index]?.children)
      dispatch(setRouteCrumbs([
        {
          title: 'Категории',
          route: '/categories',
          onClick: () => {
            setCategories(all__categories)
            dispatch(dropLastRouteCrumb())
          }
        }, {
          title: categories[index]?.name,
          route: '#'
        }
      ]))
    }
  }

  function handleClickDelete() {
    const modalContent: ConfirmContextProps = {
      message: `Вы уверены, что хотите удалить категорию «${selectedMenuCategory?.name}»?`,
      actions: {
        on_click: {
          args: [selectedMenuCategory?.id],
          func: async (checked: boolean, id: number) => {
            dispatch(setConfirmProps({ is_loading: true }))
            instance.delete(`categories/${id}/?cascade=${!checked}`)
              .then(res => {
                if (res?.data?.success) {
                  toast.success(res?.data?.message)
                  dispatch(getCategories())
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
    if (
      selectedMenuCategory?.type == 'model' &&
      selectedMenuCategory?.children &&
      selectedMenuCategory?.children?.length &&
      selectedMenuCategory?.children[0] != null
    ) {
      modalContent.checkbox = {
        checkbox_label: 'Не удалять внутренние категории',
        checkbox_info: 'Если вы удалите только эту категорию, все внутренние категории станут категориями основного типа. В противном случае все они будут удалены.'
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
            href={`/categories/edit/${selectedMenuCategory?.id}`}
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

        {
          <List
            sx={listSx}
          >
            <ListItem alignItems="center"
              key={-3}
              sx={{
                ...liHeaderSx,
                padding: '0 24px 0 0',
                height: '56px'
              }}
            >
              <Grid width={'100%'} container alignItems={'center'} justifyContent={'space-between'}>
                <Grid item>
                  {
                    topButtons?.map((b, i) => (
                      <Buttons
                        key={i}
                        name={b.text}
                        onClick={(e) => b.on_click(e, i)}
                        type='button'
                        sx={{
                          color: b.active ? '#7210BE' : '#646464',
                          borderRadius: 0,
                          borderBottom: `2px solid ${b.active ? '#7210BE' : 'transparent'}`,
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
                            backgroundColor: b.active ? '#F3E5FF' : '#F8F8F8',
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
                              color: b.active ? '#7210BE' : '#A0A0A0',
                              fontSize: '12px',
                              fontWeight: 500,
                              lineHeight: '16px',
                            }}
                            text={`${b.count}`}
                          />
                        </Box>
                      </Buttons>
                    ))
                  }
                </Grid>

                <Grid item>
                  <Link href='/categories/addnew'>
                    <Buttons
                      name="Добавить категорию"
                      childrenFirst={true}
                      type='button'
                      className="upload__btn"
                      sx={{ height: '37px' }}
                    >
                      <Image
                        alt="icon"
                        src='/icons/list-plus.svg'
                        width={20}
                        height={20}
                      />
                    </Buttons>
                  </Link>
                </Grid>

              </Grid>
            </ListItem>

            <ListItem alignItems="center"
              key={-2}
              sx={liHeaderSx}
            >
              <SimpleTypography
                text='Название'
                sx={{ ...liHeaderTextSx, ...widthControl }}
              />
              <SimpleTypography
                text='Тип'
                sx={{ ...liHeaderTextSx, ...widthControl }}
              />
              <SimpleTypography
                text='ID'
                sx={{ ...liHeaderTextSx, ...widthControl, textAlign: 'center' }}
              />
              <SimpleTypography
                text='Внутренние категории'
                sx={{ ...liHeaderTextSx, ...widthControl, textAlign: 'center' }}
              />
              <SimpleTypography
                text='Модели'
                sx={{ ...liHeaderTextSx, ...widthControl, textAlign: 'center' }}
              />
              <SimpleTypography
                text=''
                sx={{ ...widthControl }}
              />
            </ListItem>
            {
              all__categories_status == 'succeeded' ?
                (
                  categories &&
                    categories?.length != 0

                    ? categories?.map((category, index: any) =>

                      <ListItem key={index} alignItems="center"
                        sx={liSx}
                      >

                        <ListItemText title='Нажмите, чтобы открыть'
                          onClick={() => handleSelectCategory(index)}
                          sx={{ ...widthControl, ...itemAsLink }}
                        >
                          <SimpleTypography
                            text={category?.name}
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
                          onClick={() => handleSelectCategory(index)}
                          sx={{ ...widthControl, ...itemAsLink }}
                        >
                          <SimpleTypography
                            text={category?.type}
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
                          onClick={() => handleSelectCategory(index)}
                          sx={{ ...widthControl, ...itemAsLink }}
                        >
                          <SimpleTypography
                            text={`#${category?.id}`}
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
                          sx={{ ...widthControl, ...itemAsLink, justifyContent: 'center' }}
                          onClick={(e) => handleSelectCategory(index)}
                        >
                          <SimpleTypography
                            text={category?.children ? category?.children?.length : 0}
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
                          sx={{ ...widthControl, ...itemAsLink, justifyContent: 'center' }}
                          onClick={(e) => handleSelectCategory(index)}
                        >
                          <SimpleTypography
                            text={
                              !category?.parent_id && category?.children
                                ? sumModelsCount(category.children)
                                : category?.models_count
                            }
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
                          <Buttons
                            name=""
                            onClick={(e) => handleClick(e, category)}
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
                )
                :
                fakeBrands?.map((i) =>
                  <Box key={i}>
                    <ListItem key={i} alignItems="center"
                      sx={liSx}
                    >

                      <ListItemText sx={{ maxWidth: 30, marginRight: '16px' }}>
                        <Skeleton
                          variant="rectangular"
                          width={20}
                          height={20}
                        />
                      </ListItemText>

                      <ListItemAvatar
                        sx={modelImageWrapperSx}
                      >
                        <Skeleton
                          variant="rectangular"
                          sx={modelImageSx}
                        />
                      </ListItemAvatar>


                      <ListItemText className='brand_name' sx={{ marginLeft: '24px', minWidth: '380px' }} >
                        <Skeleton
                          variant="rectangular"
                          width={100}
                          height={20}
                          sx={{ marginBottom: '5px' }}
                        />
                        <Skeleton
                          variant="rectangular"
                          width={80}
                          height={18}
                        />
                      </ListItemText>

                      <ListItemText sx={{ minWidth: '400px' }} >
                        <Skeleton
                          variant="rectangular"
                          width={56}
                          height={20}
                        />
                      </ListItemText>
                      <ListItemText sx={{ minWidth: '180px' }}>
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
          </List>

        }
      </Grid>
    </Box >
  )
}

