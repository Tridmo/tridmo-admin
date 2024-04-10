"use client"

import * as React from 'react'
import { Box, Divider, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SimpleTypography from '../../../typography';
import CustomCard from '../../../custom_card';
import BrandInfo from '@/components/views/brand/info';
import Image from 'next/image';
import { selectOneBrand } from '../../../../data/get_one_brand';
import { selectBrandModels } from '../../../../data/get_brand_models';
import { IMAGES_BASE_URL } from '../../../../utils/image_src';


export default function OneBrand() {
    const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
    const brand = useSelector(selectOneBrand);
    const brandModels = useSelector(selectBrandModels)

    console.log(brandModels);


    return (
        <>
            <Box sx={{ background: "#fafafa" }} className="products">
                <Box className='products__container' sx={{ maxWidth: "1200px", width: "100%", margin: "0 auto !important", alignItems: "center", }}>
                    <Grid
                        className='products__grid'
                        container
                        spacing={2}
                        sx={{ width: "100%", marginBottom: '32px' }}
                    >
                        <Grid
                            className='products__info' item
                            xs={12} md={4}
                            sx={{ marginTop: "20px" }}
                        >
                            <Image
                                width={400}
                                height={400}
                                alt="Brand image"
                                style={{ objectFit: "cover" }}
                                src={`${IMAGES_BASE_URL}/${brand?.image_src}`}
                            />
                        </Grid>
                        <BrandInfo />
                    </Grid>

                    <Divider sx={{ marginBottom: '32px' }} />

                    <Grid spacing={2}>

                        <Grid sx={{ mb: brandModels?.length > 0 ? "32px" : "76px" }}>
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
                                        text={`Продукция бренда (${brandModels?.length || 0})`}
                                        className="section__title"
                                        variant="h2"
                                    />
                                </Grid>
                            </Grid>
                            {
                                brandModels?.length > 0 ?
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
                                    : null
                            }
                        </Grid>

                    </Grid>


                </Box>
            </Box>

        </>
    )
}
