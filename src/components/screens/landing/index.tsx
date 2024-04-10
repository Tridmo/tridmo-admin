"use client"

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Box, styled, IconButton } from '@mui/material'
import SimpleCard from '../../simple_card'
import SimpleTypography from '../../typography'
import Image from 'next/image'
import SearchInput from '@/components/inputs/search'
import { useRouter } from 'next/navigation'
import { ThemeProps } from '@/types/theme'
import Link from 'next/link'
import Buttons from '@/components/buttons'
import { searchModels } from '../../../data/search_model'

const MorePages = [
    {
        path: '/designers',
        title: 'Дизайнеры',
        desc: 'Откройте безграничные возможности с нашими 3D-моделями.',
        imageRounded: true,
        preview: [
            { image_src: '/img/person1.jpg' },
            { image_src: '/img/person2.jpg' },
            { image_src: '/img/person3.jpg' },
        ]
    },
    {
        path: '/brands',
        title: 'Бренды',
        desc: 'Преобразите свое пространство с помощью нашей подобранной коллекции продуктов.',
        imageRounded: false,
        preview: [
            { image_src: '/img/brand1.jpg' },
            { image_src: '/img/brand2.jpg' },
            { image_src: '/img/brand3.png' },
        ]
    }
]

const WhyUsDatas = [
    {
        id: 1,
        title: "Качественная продукция",
        desc: "Широкий выбор тщательно проработанных, точных и качественных 3D-моделей и интерьеров.",
        icon: "/icons/why-us-check.svg"
    },
    {
        id: 2,
        title: "Низкие цены",
        desc: "Качественные 3D модели и интерьеры по доступным ценам.",
        icon: "/icons/why-us-label.svg"
    },
    {
        id: 3,
        title: "Удобный",
        desc: "Веб-сайт с простой навигацией для беспроблемного совершения покупок.",
        icon: "/icons/why-us-cursor.svg"
    },
    {
        id: 4,
        title: "Экспертная команда",
        desc: "Опытная команда экспертов доступна для поддержки клиентов и помощи.",
        icon: "/icons/why-us-message.svg"
    },
]

export default function LandingPage() {

    const router = useRouter();
    const dispatch = useDispatch<any>();
    const [searchClicked, setSearchClicked] = useState(false)
    const [searchVal, setSearchVal] = useState("")

    function SearchModel(e: any) {
        e.preventDefault()
        router.push(`/models?keyword=${searchVal}`)
        dispatch(searchModels(searchVal))
    }

    return (
        <>
            <Box sx={{ width: '100%', backgroundColor: '#fff' }}>
                <Box
                    sx={{
                        width: '1200px',
                        minHeight: 507,
                        display: "flex",
                        margin: "0 auto",
                        alignItems: 'center'
                    }}
                >
                    <Grid spacing={2} container
                        sx={{
                            marginLeft: 0,
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Grid>
                            <Box sx={{ width: '590px' }}>
                                <SimpleTypography
                                    text='Lorem ipsum dolor sit amet, consectetur elit.'
                                    className='hero__title'
                                    variant={'h1'}
                                />
                                <SimpleTypography
                                    text='Lorem ipsum dolor sit amet, consectetur elit. Lorem ipsum dolor sit amet, consectetur elit.Lorem ipsum dolor sit '
                                    className='hero__desc'
                                />
                                <Grid>
                                    <Box>
                                        <form onSubmit={(e) => SearchModel(e)}>
                                            <SearchInput
                                                startIcon={false}
                                                withButton={true}
                                                className='search__input--models'
                                                search={SearchModel}
                                                onChange={setSearchVal}
                                                clic={setSearchClicked}
                                                placeHolder="Поиск..."
                                            />
                                        </form>
                                    </Box>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid>
                            <Image
                                src={'/img/landing_main_img.png'}
                                alt='Landing image'
                                width={442}
                                height={396}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box sx={{ width: '100%' }}>
                <Box
                    sx={{
                        width: '1200px',
                        display: "flex",
                        margin: "0 auto",
                        alignItems: 'flex-start'
                    }}
                >
                    <Grid container
                        sx={{
                            marginLeft: 0,
                            marginTop: '40px',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                    >
                        {
                            MorePages.map((item, index) =>
                                <Link key={index} href={item?.path}>
                                    <Grid sx={{
                                        backgroundColor: '#fff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        flexDirection: 'row',
                                        padding: '20px',
                                        width: '590px',
                                        border: '1px solid transparent',
                                        borderRadius: '4px',
                                        boxShadow: '0px 2px 8px 0px #0000000D',

                                        '&:hover': {
                                            borderColor: '#E0E0E0',
                                            boxShadow: '0px 6px 10px 0px #0000000F',
                                        },
                                        '&:hover .landing_section_text .landing_section_name': {
                                            color: '#7210BE !important',
                                        },
                                        '&:hover .preview_images .arrow_button': {
                                            backgroundColor: '#7210BE'
                                        },
                                        '&:hover .preview_images .arrow_button svg path': {
                                            fill: '#fff'
                                        }
                                    }}>
                                        <Box className='landing_section_text' sx={{ maxWidth: 310 }}>
                                            <SimpleTypography
                                                text={item?.title}
                                                className='landing_section_name'
                                                variant={'h2'}
                                            />
                                            <SimpleTypography
                                                text={item?.desc}
                                                className='landing_section_desc'
                                            />
                                        </Box>
                                        <Box
                                            className='preview_images'
                                            sx={{
                                                height: 64,
                                                width: ((64 * 3) - (64 - 50)),
                                                display: 'flex',
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                                position: 'relative'
                                            }}
                                        >
                                            {
                                                item?.preview.map((model, index) =>

                                                    <Box
                                                        key={index}
                                                        sx={{
                                                            backgroundColor: '#fff',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            width: '64px',
                                                            height: '64px',
                                                            padding: item?.imageRounded ? '0px' : '6px',
                                                            border: item?.imageRounded ? '' : '1px solid #E0E0E0',
                                                            borderRadius: item?.imageRounded ? '50%' : '5px',
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: `${index * 50}px`,
                                                            zIndex: index + 1,
                                                        }}
                                                    >
                                                        <Image
                                                            src={model.image_src}
                                                            alt='Landing image'
                                                            width={item?.imageRounded ? 64 : 52}
                                                            height={item?.imageRounded ? 64 : 52}
                                                            style={{
                                                                borderRadius: item?.imageRounded ? '50%' : '5px',
                                                                border: item?.imageRounded ? '1px solid #fff' : '',
                                                            }}
                                                        />
                                                    </Box>
                                                )
                                            }
                                            <IconButton
                                                className='arrow_button'
                                                aria-label="menu"
                                                sx={{
                                                    marginRight: "16px",
                                                    backgroundColor: '#F3E5FF',
                                                    border: '2px solid #fff',
                                                    zIndex: 5,
                                                    position: 'absolute',
                                                    right: '-12%',
                                                }}>
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.9766 9.99962L6.85156 5.87462L8.0299 4.69629L13.3332 9.99962L8.0299 15.303L6.85156 14.1246L10.9766 9.99962Z" fill="#7210BE" />
                                                </svg>

                                            </IconButton>
                                        </Box>
                                    </Grid>
                                </Link>
                            )
                        }
                    </Grid>
                </Box>
                {/* Models */}
                <Box
                    sx={{
                        maxWidth: "1200px",
                        display: "block",
                        margin: "0 auto",
                        alignItems: 'flex-start',
                        marginTop: '64px'
                    }}
                >
                    <Grid container>
                        {/* 3D MODELS */}

                        <Grid
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                            container
                            spacing={2}
                            className="texts__wrap"
                        >
                            <Grid item xs={10}>
                                <SimpleTypography
                                    text="3D модели"
                                    className="section__title"
                                    variant="h2"
                                />
                            </Grid>

                            <Grid
                                item
                                xs={2}
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    marginBottom: "12px",
                                }}
                            >
                                <Link href={`models`}>
                                    <Buttons
                                        name={"Узнайте больше"}
                                        endIcon={"right"}
                                        className={`bordered__btn--explore`}
                                    />
                                </Link>
                            </Grid>
                        </Grid>

                        {/* 3D MODELS MAP */}

                        <SimpleCard cols={5} route={"models"} sliced={15} />

                    </Grid>
                </Box>
                {/* Why Us */}
                <Box
                    sx={{
                        width: '1200px',
                        display: "flex",
                        margin: "0 auto",
                        alignItems: 'flex-start',
                        marginTop: '64px',
                    }}
                >
                    <Grid container>
                        <Grid
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                            container
                            spacing={2}
                            className="texts__wrap"
                        >
                            <Grid item xs={10}>
                                <SimpleTypography
                                    text="Почему мы?"
                                    className="section__title"
                                    variant="h2"
                                />
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            spacing={2}
                            className="why-us__wrapper"
                            sx={{ marginTop: "4px", marginBottom: "40px" }}
                        >
                            {WhyUsDatas.map((item) => (
                                <Grid key={item.id} item md={3} xs={12}>
                                    <Box
                                        sx={{ background: "#fff", padding: "16px", height: "221px" }}
                                        className="why-us__card"
                                    >
                                        <Box
                                            sx={{
                                                background: "#F3E5FF",
                                                borderRadius: "8px",
                                                width: "48px",
                                                height: "48px",
                                                marginBottom: "13px",
                                                backgroundImage: `url(${item.icon})`,
                                                backgroundRepeat: "no-repeat",
                                                backgroundPosition: "center center",
                                            }}
                                        ></Box>
                                        <SimpleTypography
                                            text={item.title}
                                            className="why-us__title"
                                            variant="h2"
                                        />
                                        <SimpleTypography
                                            text={item.desc}
                                            className="why-us__desc"
                                            variant="p"
                                        />
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Box>
                {/* Inter */}
                <Box
                    sx={{
                        width: '1200px',
                        display: "flex",
                        margin: "0 auto",
                        alignItems: 'flex-start',
                        marginTop: '64px',
                    }}
                >
                    <Grid container>

                        {/* INTERIORS */}

                        <Grid
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                            container
                            spacing={2}
                            className="texts__wrap"
                        >
                            <Grid item xs={10}>
                                <SimpleTypography
                                    text="Интерьеры"
                                    className="section__title"
                                    variant="h2"
                                />
                            </Grid>

                            <Grid
                                item
                                xs={2}
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    marginBottom: "12px",
                                }}
                            >
                                <Link href={`interiors`}>
                                    <Buttons
                                        name={"Узнайте больше"}
                                        endIcon={"right"}
                                        className={`bordered__btn--explore`}
                                    />
                                </Link>
                            </Grid>
                        </Grid>

                        {/* INTERIORS MAP */}

                        <SimpleCard cols={4} route={"interiors"} sliced={8} />

                    </Grid>
                </Box>
            </Box>
        </>
    )
}