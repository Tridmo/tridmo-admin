"use client"

import * as React from 'react'
import { Box, Divider, Grid } from '@mui/material';
import ProductSlider from '../../../views/model/slider';
import { useDispatch, useSelector } from 'react-redux';
import ProductInfo from '../../../views/model/info'
import ProductModal from '../../../views/model/model_modal';
import SimpleTypography from '../../../typography';
import CustomCard from '../../../custom_card';
import { sampleModel } from '@/data/samples';
import Link from 'next/link';
import Buttons from '@/components/buttons';
import { selectOneModel } from '../../../../data/get_one_model';
import IconBreadcrumbs from '../../../breadcrumbs';
import { selectBrandModels } from '../../../../data/get_brand_models';
import { selectTopModels } from '../../../../data/get_top_models';


export default function OneModel() {
    const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
    const model = useSelector(selectOneModel);
    const brandModels = useSelector(selectBrandModels)
    const topModels = useSelector(selectTopModels)

    console.log(brandModels, "BB");
    console.log(topModels, "TT");


    return (
        <>
            <Box sx={{ background: "#fafafa" }} className="products">
                <Box className='products__container' sx={{ maxWidth: "1200px", width: "100%", margin: "0 auto !important", alignItems: "center", }}>
                    <Box sx={{ marginTop: '32px' }}>
                        <IconBreadcrumbs route={"/models"} breadCrumbsData={model} />
                    </Box>

                    <Grid
                        className='products__grid'
                        container
                        sx={{
                            marginTop: '6px',
                            width: "100%",
                            paddingBottom: "18px",
                            justifyContent: 'space-between'
                        }}
                    >
                        <ProductModal />
                        <ProductSlider name="slider" />
                        <ProductInfo />
                    </Grid>

                    {model?.used_interiors?.length > 0 && model?.used_interiors[0] != null ? (
                        <>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    paddingTop: "37px"
                                }}
                            >
                                <SimpleTypography
                                    text="Использованные интерьеры"
                                    className='section__title products__used--title'
                                    variant="h2"
                                />
                            </Box>
                            <Grid className="models__card--wrap" container spacing={3} sx={{ width: "100%", margin: "0 0 24px 0" }}>
                                {model?.used_interiors?.map((model: any, index: any) => (
                                    <Grid
                                        className='models__card'
                                        sx={{
                                            [`&:not(:nth-of-type(4n))`]: {
                                                padding: "0 9.5px 0 0 !important",
                                            },
                                            [`&:nth-of-type(4n)`]: {
                                                padding: "0 0 0 0 !important",
                                            },
                                            marginBottom: "10px"
                                        }}
                                        key={index}
                                        md={12 / 4}
                                        sm={4}
                                        xs={6}
                                        item
                                    >
                                        <CustomCard
                                            type={'interiors'}
                                            link={`/interiors/${model?.slug}`}
                                            key={index}
                                            model={model}
                                            imgHeight={'268px'}
                                            withAuthor={true}
                                        />
                                    </Grid>
                                ))
                                }
                            </Grid >
                        </>
                    ) : (null)}

                    {
                        brandModels?.length > 0 ?
                            <Divider sx={{ marginBottom: '32px' }} />
                            : null
                    }

                    {/* BRAND MODELS */}
                    {brandModels?.length > 0 ? (
                        <Grid>
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
                                        text="Больше товаров бренда"
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
                                    <Link href={`/brands/${model?.brand?.slug}`}>
                                        <Buttons
                                            name={"Смотреть все"}
                                            endIcon={"right"}
                                            className={`bordered__btn--explore`}
                                        />
                                    </Link>
                                </Grid>
                            </Grid>

                            {/* 3D MODELS MAP */}

                            <Grid sx={{ mb: "32px" }}>
                                <Grid className="models__card--wrap" container spacing={3} sx={{ width: "100%", margin: "0" }}>
                                    {brandModels?.map((model: any, index: any) => (
                                        <Grid
                                            className='models__card'
                                            sx={{
                                                [`&:not(:nth-of-type(5n))`]: {
                                                    padding: "0 9.5px 0 0 !important",
                                                },
                                                [`&:nth-of-type(5n)`]: {
                                                    padding: "0 0 0 0 !important",
                                                },
                                                marginBottom: "10px"
                                            }}
                                            key={index}
                                            md={12 / 5}
                                            sm={4}
                                            xs={6}
                                            item
                                        >
                                            <CustomCard
                                                type={'/models'}
                                                link={`/models/${model?.slug}`}
                                                key={index}
                                                model={model}
                                                imgHeight={'208px'}
                                                tagIcon={model?.top ? '/icons/star.svg' : ''}
                                            />
                                        </Grid>
                                    ))
                                    }
                                </Grid >
                            </Grid>

                        </Grid>
                    ) : (null)}

                    {
                        !(brandModels?.length > 0) && topModels?.length > 0 ?
                            <Divider sx={{ marginBottom: '32px' }} />
                            : null
                    }

                    {/* TOP MODELS */}
                    {topModels?.length > 0 ? (

                        <Grid>
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
                                        text="Лучшие 3D модели"
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
                                    <Link href={`/models`}>
                                        <Buttons
                                            name={"Смотреть все"}
                                            endIcon={"right"}
                                            className={`bordered__btn--explore`}
                                        />
                                    </Link>
                                </Grid>
                            </Grid>

                            {/* 3D MODELS MAP */}

                            <Grid sx={{ mb: "32px" }}>
                                <Grid className="models__card--wrap" container spacing={3} sx={{ width: "100%", margin: "0" }}>
                                    {topModels?.map((model: any, index: any) => (
                                        <Grid
                                            className='models__card'
                                            sx={{
                                                [`&:not(:nth-of-type(5n))`]: {
                                                    padding: "0 9.5px 0 0 !important",
                                                },
                                                [`&:nth-of-type(5n)`]: {
                                                    padding: "0 0 0 0 !important",
                                                },
                                                marginBottom: "10px"
                                            }}
                                            key={index}
                                            md={12 / 5}
                                            sm={4}
                                            xs={6}
                                            item
                                        >
                                            <CustomCard
                                                type={'/models'}
                                                link={`/models/${model?.slug}`}
                                                key={index}
                                                model={model}
                                                imgHeight={'208px'}
                                                tagIcon={model?.top ? '/icons/star.svg' : ''}
                                            />
                                        </Grid>
                                    ))
                                    }
                                </Grid >
                            </Grid>

                        </Grid>
                    ) : (null)}
                </Box>
            </Box>

        </>
    )
}
