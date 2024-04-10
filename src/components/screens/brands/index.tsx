"use client"

import React, { CSSProperties } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllBrands } from '../../../data/get_all_brands';
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Box, Grid, SxProps, Skeleton } from '@mui/material'
import Image from 'next/image';
import SimpleTypography from '@/components/typography';
import BasicPagination from '@/components/pagination/pagination';
import Link from 'next/link';
import { IMAGES_BASE_URL } from '../../../utils/image_src';
import EmptyData from '../../views/empty_data';



export default function BrandsPage() {
    const dispatch = useDispatch<any>();
    const getAllBrandStatus = useSelector((state: any) => state?.get_all_brands?.status)
    const all__brands = useSelector(selectAllBrands)

    const fakeBrands = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const liHeaderTextSx = {
        fontSize: '16px',
        fontWeight: 500,
        lineHeight: '22px',
        letterSpacing: '0em',
        textAlign: 'center',
        color: '#686868'

    }

    const brandImageWrapperSx: SxProps = {
        backgroundColor: '#fff',
        border: '1px solid #E0E0E0',
        borderRadius: '8px',
        width: '80px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

    const brandImageSx: CSSProperties = {
        width: '100% !important',
        height: '100% !important',
        borderRadius: '8px',
        objectFit: 'contain'
    }

    const liSx: SxProps = {
        justifyContent: 'flex-start',
        padding: '12px 24px',
        transition: '0.4s all ease',

        '&:hover': {
            backgroundColor: '#FAFAFA',
        },
        '&:hover .brand_name': {
            color: '#0646E6 !important',
        }
    }

    const liHeaderSx: SxProps = {
        backgroundColor: '#F5F5F5',
        justifyContent: 'flex-start',
        padding: '12px 24px',
        borderTopLeftRadius: '4px',
        borderTopRightRadius: '4px',
    }

    const listSx: SxProps = {
        width: '100%',
        maxWidth: 1200,
        bgcolor: 'background.paper',
        border: '1px solid #E0E0E0',
        borderRadius: '4px',
        padding: 0,
    }

    return (
        <Box sx={{ width: '1200px', minHeight: 829, display: "block", margin: "0 auto" }}>
            <SimpleTypography text='Бренды' className='section__title' sx={{ margin: '32px auto !important' }} />
            {
                getAllBrandStatus == 'succeeded' ?
                    <>
                        {
                            all__brands?.data?.brands && all__brands?.data?.brands?.length != 0
                                ? <List
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
                                            text='Бренд'
                                            sx={{ ...liHeaderTextSx, textAlign: 'start !important', minWidth: '490px', }}
                                        />
                                        <SimpleTypography
                                            text='Стиль'
                                            sx={{ ...liHeaderTextSx, textAlign: 'start !important', minWidth: '400px', }}
                                        />
                                        <SimpleTypography
                                            text='Количество моделей'
                                            sx={{ ...liHeaderTextSx, minWidth: '180px', }}
                                        />
                                    </ListItem>
                                    {
                                        all__brands?.data?.brands && all__brands?.data?.brands?.length != 0
                                            ? all__brands?.data?.brands?.map((brand, index: any) =>
                                                <Link key={index} href={`/brands/${brand?.slug}`}>
                                                    <ListItem key={index} alignItems="center"
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

                                                        <ListItemAvatar
                                                            sx={brandImageWrapperSx}
                                                        >
                                                            <Image
                                                                src={brand?.image_src ? `${IMAGES_BASE_URL}/${brand?.image_src}` : ''}
                                                                alt='Landing image'
                                                                width={78}
                                                                height={78}
                                                                style={brandImageSx}
                                                            />
                                                        </ListItemAvatar>


                                                        <ListItemText className='brand_name' sx={{ marginLeft: '24px', minWidth: '385px' }} >
                                                            <SimpleTypography
                                                                text={brand?.name}
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
                                                                text={
                                                                    `${brand?.site_link.includes('https://') || brand?.site_link.includes('http://')
                                                                        ? brand?.site_link.split('://')[1].replaceAll('/', '')
                                                                        : brand?.site_link
                                                                    }`
                                                                }
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

                                                        <ListItemText sx={{ minWidth: '400px' }} >
                                                            <SimpleTypography
                                                                text=''
                                                                sx={{
                                                                    fontSize: '22px',
                                                                    fontWeight: 400,
                                                                    lineHeight: '26px',
                                                                    letterSpacing: '-0.02em',
                                                                    textAlign: 'start',
                                                                }}
                                                            >
                                                                {
                                                                    brand?.styles?.map((s, i) => `${s?.name}${i != brand?.styles?.length - 1 ? ', ' : ''}`)
                                                                }
                                                            </SimpleTypography>

                                                        </ListItemText>
                                                        <ListItemText sx={{ minWidth: '180px' }}>
                                                            <SimpleTypography
                                                                text={brand?.models_count}
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
                                                        all__brands?.data?.brands?.length && index != all__brands?.data?.brands?.length - 1 ?
                                                            <Divider sx={{ margin: 0 }} variant="inset" component="li" />
                                                            : null
                                                    }
                                                </Link>
                                            )
                                            : null
                                    }
                                </List>
                                : <EmptyData sx={{ marginTop: '8px' }} />
                        }
                        {
                            all__brands?.data?.pagination?.pages > 1
                                ? <Grid spacing={2} container sx={{ width: '100%', margin: "0 auto", padding: "17px 0 32px 0" }}>
                                    <Grid
                                        item
                                        xs={12}
                                        sx={{ padding: "0 !important", display: "flex", justifyContent: "center" }}
                                    >
                                        <BasicPagination
                                            count={all__brands?.data?.pagination?.pages}
                                            page={parseInt(all__brands?.data?.pagination?.current) + 1}
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
                                    sx={{ ...liHeaderTextSx, minWidth: '490px', }}
                                >
                                    <Skeleton
                                        variant="rectangular"
                                        width={56}
                                        height={20}
                                    />
                                </Box>
                                <Box
                                    sx={{ ...liHeaderTextSx, minWidth: '400px', }}

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
                                                sx={brandImageWrapperSx}
                                            >
                                                <Skeleton
                                                    variant="rectangular"
                                                    sx={brandImageSx}
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
                    </>
            }
        </Box >
    )
}
