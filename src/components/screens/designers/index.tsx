"use client"

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllModels } from '../../../data/get_all_models';
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Box, Grid, SxProps, Skeleton } from '@mui/material'
import Image from 'next/image';
import SimpleTypography from '@/components/typography';
import BasicPagination from '@/components/pagination/pagination';
import Link from 'next/link';
import { selectAllDesigners } from '../../../data/get_all_designers';
import EmptyData from '../../views/empty_data';
import { selectMyProfile } from '../../../data/me';
import { IMAGES_BASE_URL } from '../../../utils/image_src';


export default function DesignersPage() {
  const dispatch = useDispatch<any>();
  const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
  const getDesignersStatus = useSelector((state: any) => state?.get_all_designers?.status);
  const all__designers = useSelector(selectAllDesigners)
  const profile = useSelector(selectMyProfile)

  const fakeDesigners = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const liHeaderTextSx = {
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '22px',
    letterSpacing: '0em',
    textAlign: 'center',
    color: '#686868'
  }

  const listSx: SxProps = {
    width: '100%',
    maxWidth: 1200,
    bgcolor: 'background.paper',
    border: '1px solid #E0E0E0',
    borderRadius: '4px',
    padding: 0,
  }

  const liHeaderSx: SxProps = {
    backgroundColor: '#F5F5F5',
    justifyContent: 'flex-start',
    padding: '12px 24px',
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
  }

  const liSx: SxProps = {
    justifyContent: 'flex-start',
    padding: '12px 24px',
    transition: '0.4s all ease',

    '&:hover': {
      backgroundColor: '#FAFAFA',
    },
    '&:hover .username': {
      color: '#0646E6 !important',
    }
  }

  const liAvatarWrapper: SxProps = {
    backgroundColor: '#fff',
    width: '80px',
    height: '80px',
    border: '1px solid #E0E0E0',
    borderRadius: '50%',
    margin: '0 16px 0 0'
  }

  const liAvatarSx: SxProps = {
    width: '100%',
    height: '100%',
    borderRadius: '50%'
  }

  return (
    <Box sx={{ width: '1200px', minHeight: 829, display: "block", margin: "0 auto" }}>
      <SimpleTypography text='Дизайнеры' className='section__title' sx={{ margin: '32px auto !important' }} />
      {
        getDesignersStatus == 'succeeded' ?
          <>
            <List
              sx={listSx}
            >
              <ListItem alignItems="center"
                key={-1}
                sx={liHeaderSx}
              >
                <SimpleTypography
                  text='№'
                  sx={{ ...liHeaderTextSx, minWidth: '56px', marginRight: '16px' }}
                />
                <SimpleTypography
                  text='Профиль'
                  sx={{ ...liHeaderTextSx, minWidth: '480px', textAlign: 'start !important', }}
                />
                <SimpleTypography
                  text='Галерея'
                  sx={{ ...liHeaderTextSx, minWidth: '400px', }}
                />
                <SimpleTypography
                  text='Репутация'
                  sx={{ ...liHeaderTextSx, minWidth: '180px', }}
                />
              </ListItem>
              {
                all__designers?.data?.designers && all__designers?.data?.designers?.length != 0
                  ? all__designers?.data?.designers?.map((user, index: any) =>
                    <Link key={index} href={profile?.user_id == user.id && isAuthenticated ? '/profile' : `/designers/${user?.username}`}>

                      <ListItem key={user?.id} alignItems="center"
                        sx={liSx}
                      >
                        <ListItemText sx={{ maxWidth: 56, marginRight: '16px' }}>

                          <SimpleTypography
                            text={index + 1}
                            sx={{
                              textAlign: 'center',
                              color: '#B3B3B3',
                              fontWeight: 500,
                              fontSize: '22px',
                              lineHeight: '26px',
                              letterSpacing: '-0.02em'
                            }}
                          />
                        </ListItemText>

                        <ListItemAvatar sx={liAvatarWrapper}>
                          <Avatar
                            src={user?.image_src ? `${IMAGES_BASE_URL}/${user?.image_src}` : '/img/avatar.png'}
                            alt='User image'
                            sx={liAvatarSx}
                          />
                        </ListItemAvatar>
                        <ListItemText className='username' sx={{ margin: '0 8px', minWidth: '380px' }}>

                          <SimpleTypography
                            text={user?.username}
                            sx={{
                              fontSize: '22px',
                              fontWeight: 400,
                              lineHeight: '26px',
                              letterSpacing: '-0.02em',
                              textAlign: 'start',
                              color: '#141414'
                            }}
                          />

                          <SimpleTypography
                            text={user?.full_name}
                            sx={{
                              fontSize: '18px',
                              fontWeight: 400,
                              lineHeight: '24px',
                              letterSpacing: '-0.01em',
                              textAlign: 'start',
                              color: '#848484'
                            }}
                          />

                        </ListItemText>
                        <ListItemText sx={{ minWidth: '380px' }}>
                          <SimpleTypography
                            text={user?.designs_count}
                            sx={{
                              fontSize: '22px',
                              fontWeight: 400,
                              lineHeight: '26px',
                              letterSpacing: '-0.02em',
                              textAlign: 'center',
                            }}
                          />
                        </ListItemText>

                        <ListItemText sx={{ minWidth: '180px' }}>
                          <SimpleTypography
                            text={user?.designs_count}
                            sx={{
                              fontSize: '22px',
                              fontWeight: 400,
                              lineHeight: '26px',
                              letterSpacing: '-0.02em',
                              textAlign: 'center',
                            }}
                          />
                        </ListItemText>

                      </ListItem>
                      {
                        all__designers?.data?.designers?.length && index != all__designers?.data?.designers?.length - 1 ?
                          <Divider sx={{ margin: 0 }} variant="inset" component="li" />
                          : null
                      }
                    </Link>
                  )
                  : null
              }
            </List>
            {
              !all__designers?.data?.designers || all__designers?.data?.designers?.length == 0
                ? <EmptyData sx={{ marginTop: '8px' }} />
                : null
            }
            {
              all__designers?.data?.pagination?.pages > 1
                ? <Grid spacing={2} container sx={{ width: '100%', margin: "0 auto", padding: "17px 0 32px 0" }}>
                  <Grid
                    item
                    xs={12}
                    sx={{ padding: "0 !important", display: "flex", justifyContent: "center" }}
                  >
                    <BasicPagination
                      dataSource='designers'
                      count={all__designers?.data?.pagination?.pages}
                      page={parseInt(all__designers?.data?.pagination?.current) + 1}
                    // page={page}
                    // pageArray={pageArray}
                    // pagesCount={pagesCount}
                    // increment={(e, data) => {
                    //   props.setPage(page + 1);
                    // }}
                    // changePage={(e, data) => {
                    //   setPage(data);
                    // }}
                    // decrement={(e, data) => {
                    //   setPage(page - 1);
                    // }}
                    // const handleChange = (event, value) => {
                    //   props.changePage(event,value)
                    // };
                    // count={props.pagesCount} page={+props.page} onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                : null
            }
          </>
          :
          <>
            <List
              sx={{ ...listSx, marginBottom: '32px' }}
            >
              <ListItem alignItems="center"
                key={-1}
                sx={liHeaderSx}
              >
                <Box
                  sx={{ ...liHeaderTextSx, textAlign: 'center !important', minWidth: '30px', marginRight: '16px' }}
                >
                  <Skeleton
                    variant="rectangular"
                    width={20}
                    height={20}
                  />
                </Box>
                <Box
                  sx={{ ...liHeaderTextSx, minWidth: '590px', }}
                >
                  <Skeleton
                    variant="rectangular"
                    width={56}
                    height={20}
                  />
                </Box>
                <Box
                  sx={{ ...liHeaderTextSx, minWidth: '300px', }}

                >
                  <Skeleton
                    variant="rectangular"
                    width={56}
                    height={20}
                  />
                </Box>
                <Box
                  sx={{ ...liHeaderTextSx, minWidth: '180px', }}
                >
                  <Skeleton
                    variant="rectangular"
                    width={56}
                    height={20}
                  />
                </Box>
              </ListItem>
              {
                fakeDesigners?.map((i) =>
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
                        sx={liAvatarWrapper}
                      >
                        <Skeleton
                          variant="rounded"
                          sx={liAvatarSx}
                        />
                      </ListItemAvatar>


                      <ListItemText className='brand_name' sx={{ marginLeft: '24px', minWidth: '470px' }} >
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

                      <ListItemText sx={{ minWidth: '300px' }} >
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
          </>
      }
    </Box>
  )
}
