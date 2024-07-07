"use client"

import React, { CSSProperties, Suspense, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Box, useMediaQuery, SxProps, List, ListItem, ListItemText, ListItemAvatar, Divider, Skeleton, Input, TextField, FormControl, MenuItem, styled, Menu } from '@mui/material'
import SimpleTypography from '../../typography'
import Pagination from '../../pagination/pagination'
import { useRouter, useSearchParams } from 'next/navigation'
import Buttons from '../../buttons'
import Link from 'next/link'
import Image from 'next/image'
import { IMAGES_BASE_URL } from '../../../utils/image_src'
import EmptyData from '../empty_data'
import BasicPagination from '../../pagination/pagination'
import formatDate from '../../../utils/format_date'
import SearchInput from '../../inputs/search'
import SimpleSelect from '../../inputs/simple_select'
import { selectCategories, selectCategoriesByUserDownloads, selectCategoriesByUserInteriors } from '../../../data/categories'
import { selectAllBrands } from '../../../data/get_all_brands'
import { ThemeProps } from '../../../types/theme'
import { toast } from 'react-toastify'
import { setCategoryFilter, setModelBrandFilter, setModelNameFilter, setModelTopFilter, set_author_interiors_categories, set_downloaded_model_brand, set_downloaded_model_categories, set_downloaded_model_name } from '../../../data/handle_filters'
import { ConfirmContextProps, resetConfirmData, resetConfirmProps, setConfirmProps, setConfirmState, setOpenModal } from '../../../data/modal_checker'
import { selectAllBrandsByUserDownloads } from '../../../data/get_brands_by_user_downloads'
import { getDesignerDownloads, selectDesignerDownloads } from '../../../data/get_designer_downloads'
import { selectDesignerProfile } from '../../../data/get_designer'
import { getAuthorInteriors, selectAuthorInteriors } from '../../../data/get_author_interiors'

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
  padding: '0px',
  backgroundColor: '#fff',
  transition: '0.4s all ease',
  borderBottom: '2px solid #f5f5f5',

  '&:hover': {
    zIndex: '10',
    backgroundColor: '#fff',
    boxShadow: '0px 3px 4px 0px #00000014',
    borderColor: 'transparent',
  },
  '&:hover .brand_name': {
    color: '#0646E6 !important',
  },
}

const liHeaderSx: SxProps = {
  display: 'flex',
  backgroundColor: '#fff',
  padding: '10px 0px',
  borderBottom: '2px solid #f5f5f5',
}

const listSx: SxProps = {
  width: '100%',
  // backgroundColor: '#f5f5f5',
  backgroundColor: '#fff',
  boxShadow: '0px 3px 4px 0px #00000014',
  borderRadius: '4px',
  padding: '24px',
}


const widthControl = {

  '&:nth-of-type(1)': {
    minWidth: '300px',
    maxWidth: '300px',
  },
  '&:nth-of-type(2)': {
    minWidth: '200px',
    maxWidth: '200px',
  },
  '&:nth-of-type(3)': {
    minWidth: '100px',
    maxWidth: '100px',
  },
  '&:nth-of-type(4)': {
    minWidth: '100px',
    maxWidth: '100px',
  },
  '&:nth-of-type(5)': {
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


export default function UserInteriorsList() {

  const router = useRouter();
  const dispatch = useDispatch<any>();

  const profileInfo = useSelector(selectDesignerProfile)
  const all__interiors_status = useSelector((state: any) => state?.get_author_interiors?.status)
  const all__interiors = useSelector(selectAuthorInteriors)
  const all__categories = useSelector(selectCategoriesByUserInteriors)

  const get_author_interiors_categories = useSelector((state: any) => state?.handle_filters?.author_interiors_categories)
  const get_author_interiors_orderby = useSelector((state: any) => state?.handle_filters?.author_interiors_orderby)
  const get_author_interiors_order = useSelector((state: any) => state?.handle_filters?.author_interiors_order)
  const get_designer_interiors_page = useSelector((state: any) => state?.handle_filters?.designer_interiors_page)

  const [category, setCategoryId] = useState<number>(-1)

  function handleCategoryChange(e) {
    setCategoryId(Number(e.target.value))
    const filter = e.target.value == -1 ? [] : [e.target.value];
    dispatch(getAuthorInteriors({
      author: profileInfo?.username,
      categories: filter,
      page: get_designer_interiors_page,
      orderBy: get_author_interiors_orderby,
      order: get_author_interiors_order,
    }))
    dispatch(set_author_interiors_categories(filter))
  }

  return (
    <Grid spacing={2} container sx={{ width: '100%', marginTop: "32px", marginLeft: 0 }} >

      <>
        {
          <List
            sx={listSx}
          >
            <ListItem alignItems="center"
              key={-3}
              sx={{ ...liHeaderSx, borderRadius: '4px' }}
            >
              <h3 style={{ margin: 0 }}>Интерьеры</h3>
            </ListItem>

            <ListItem alignItems="center"
              key={-2}
              sx={liHeaderSx}
            >
              <Grid width={'100%'} container justifyContent={'flex-end'}>
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
                        all__categories?.map(
                          (c, i) => (
                            <MenuItem key={i} value={c?.id}>{c?.name}</MenuItem>
                          )
                        )
                      }
                    </SimpleSelect>
                  </FormControl>
                </Grid>
              </Grid>
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
            </ListItem>
            {
              all__interiors_status == 'succeeded' ?
                all__interiors?.data?.interiors &&
                  all__interiors?.data?.interiors?.length != 0 ?
                  <>
                    {
                      all__interiors?.data?.interiors?.map((interior, index: any) =>
                        <Link href={`/interiors/${interior?.slug}`}>
                          <ListItem key={index} alignItems="center"
                            sx={liSx}
                          >

                            <ListItemText
                              sx={{
                                ...widthControl,
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

                              <ListItemText className='brand_name' sx={{ marginLeft: '24px', }} >
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
                                {/* <SimpleTypography
             text={`#${interior?.id}`}
             sx={{
               fontSize: '12px',
               fontWeight: 400,
               lineHeight: '24px',
               letterSpacing: '-0.01em',
               textAlign: 'start',
               color: '#848484'
             }}
           /> */}
                              </ListItemText>
                            </ListItemText>


                            <ListItemText
                              sx={{ ...widthControl }}
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

                            <ListItemText
                              sx={{ ...widthControl }}
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

                            <ListItemText
                              sx={{ ...widthControl }}
                            >
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

                            <ListItemText
                              sx={{ ...widthControl }}
                            >
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

                          </ListItem>
                        </Link>
                      )
                    }
                    <Box sx={{
                      ...liHeaderSx,
                      justifyContent: 'center',
                      border: 'none',
                      borderBottomLeftRadius: '4px',
                      borderBottomRightRadius: '4px',
                    }}>
                      <Pagination
                        dataSource='designer_interiors'
                        dataId={profileInfo?.username}
                        count={all__interiors?.data?.pagination?.pages}
                        page={parseInt(all__interiors?.data?.pagination?.current) + 1}
                      />
                    </Box>
                  </>
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
      </>

    </Grid>
  )
}
