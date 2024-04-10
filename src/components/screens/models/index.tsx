"use client"

import React, { CSSProperties, Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Box, useMediaQuery, SxProps, List, ListItem, ListItemText, ListItemAvatar, Divider, Skeleton, Input, TextField, FormControl, MenuItem } from '@mui/material'
import SimpleCard from '../../simple_card'
import SimpleTypography from '../../typography'
import Pagination from '../../pagination/pagination'
import Categories from '../../views/categories/model_categories'
import { selectAllModels } from '../../../data/get_all_models';
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
    justifyContent: 'center'
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

const typeButtons = [
    {
        text: 'Все',
        value: 0,
        active: true,
        count: 0,
    },
    {
        text: 'Топ',
        value: 1,
        active: false,
        count: 0,
    }
]

export default function ModelsPage() {
    const router = useRouter();
    const dispatch = useDispatch<any>();
    const searchParams = useSearchParams();
    const IsFilterOpen = useSelector((state: any) => state?.modal_checker?.isFilterModal)
    const searchedModels = useSelector((state: any) => state?.search_models?.data)
    const all__models_status = useSelector((state: any) => state?.get_all_models?.status)
    const matches = useMediaQuery('(max-width:600px)');

    const all__models = useSelector(selectAllModels)
    const all__categories = useSelector(selectCategories)
    const all__brands = useSelector(selectAllBrands)

    const keyword = searchParams.get('keyword') as string
    const [categories, setCategories] = useState<any[]>([])
    const [topButtons, setTopButtons] = useState<any[]>(typeButtons)
    const [category, setCategoryId] = useState<number>(-1)
    const [brand, setBrandId] = useState<string>('all')

    useEffect(() => {
        typeButtons[0].count = all__models?.data?.pagination?.data_count
        typeButtons[1].count = 0

        setTopButtons(typeButtons)
    }, [all__models])

    useEffect(() => {
        if (all__categories) {
            let arr: any[] = []
            const cats: any[] = Array.from(all__categories)
            cats.map(c => arr = arr.concat(c['children']))
            setCategories(arr)
        }
    }, [all__categories])

    function navigateTo(link: string) {
        router.push(link)
    }

    return (
        <Box sx={{ width: '1268px', minHeight: 760, display: "block", margin: "0 auto" }}>

            <Grid spacing={2} container sx={{ width: '100%', marginTop: "32px", marginLeft: 0 }} >

                {
                    all__models_status == 'succeeded' ?
                        <>
                            {
                                all__models?.data?.models && all__models?.data?.models?.length != 0
                                    ?
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
                                            {
                                                typeButtons?.map((b, i) => (
                                                    <Buttons
                                                        key={i}
                                                        name={b.text}
                                                        onClick={(e) => console.log(b.value)}
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
                                                                onChange={(e) => { setCategoryId(Number(e.target.value)) }}
                                                                paddingX={12}
                                                                paddingY={6}
                                                                variant='outlined'
                                                                value={category}
                                                            >
                                                                <MenuItem selected content='option' key={-2} value={-1}>Все категории</MenuItem>
                                                                {
                                                                    categories?.map(
                                                                        (c, i) => (
                                                                            <MenuItem key={i} value={c.id}>{c.name}</MenuItem>
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
                                                                onChange={(e) => { setBrandId(e.target.value) }}
                                                                paddingX={12}
                                                                paddingY={6}
                                                                variant='outlined'
                                                                value={brand}
                                                            >
                                                                <MenuItem selected content='option' key={-2} value={'all'}>Все бренды</MenuItem>
                                                                {
                                                                    all__brands?.data?.brands?.map(
                                                                        (c, i) => (
                                                                            <MenuItem key={i} value={c.id}>{c.name}</MenuItem>
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
                                            all__models?.data?.models && all__models?.data?.models?.length != 0
                                                ? all__models?.data?.models?.map((model, index: any) =>

                                                    <ListItem key={index} alignItems="center"
                                                        sx={liSx}
                                                    >

                                                        <ListItemText onClick={() => navigateTo(`/models/${model?.slug}`)}
                                                            title='Нажмите, чтобы открыть'
                                                            sx={{
                                                                ...widthControl, ...itemAsLink,
                                                                '& > span:first-of-type': {
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'flex-start'
                                                                }
                                                            }}
                                                        >
                                                            <ListItemAvatar
                                                                sx={modelImageWrapperSx}
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
                                                            </ListItemAvatar>


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
                                                : null
                                        }
                                    </List>

                                    : <EmptyData sx={{ marginTop: '8px' }} />
                            }
                            <Grid spacing={2} container sx={{ width: '100%', margin: "0 auto", padding: "17px 0 32px 0" }}>
                                <Grid
                                    sx={{ padding: "0 0 0 0  !important", display: "flex", alignItems: "baseline" }}
                                    item
                                    xs={6}
                                >
                                    <SimpleTypography
                                        text={`Показаны ${all__models?.data?.pagination?.current + 1}–${all__models?.data?.pagination?.limit} из`}
                                        className='pagenation__desc'
                                    />

                                    <SimpleTypography
                                        text={`${all__models?.data?.pagination?.data_count} товаров`}
                                        className='pagenation__desc--bold' />
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                    sx={{ padding: "0 !important", display: "flex", justifyContent: "flex-end" }}
                                >
                                    <Pagination
                                        count={all__models?.data?.pagination?.pages}
                                        page={parseInt(all__models?.data?.pagination?.current) + 1}
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
                        </>
                }
            </Grid>
        </Box >
    )
}
