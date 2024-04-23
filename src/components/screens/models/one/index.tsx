"use client"

import * as React from 'react'
import { Box, Divider, Grid } from '@mui/material';
import ProductSlider from '../../../views/model/slider';
import { useDispatch, useSelector } from 'react-redux';
import ProductInfo from '../../../views/model/info'
import ProductModal from '../../../views/model/model_modal';
import { concatRouteCrumb, setRouteCrumbs } from '../../../../data/route_crumbs';
import { selectOneModel } from '../../../../data/model_slider';
import { usePathname } from 'next/navigation';


export default function OneModel() {
  const model = (useSelector(selectOneModel))?.data?.model;
  const dispatch = useDispatch()
  const pathname = usePathname()

  React.useEffect(() => {
    if (model) {
      dispatch(setRouteCrumbs(
        [{
          title: 'Модели',
          route: '/models'
        }, {
          title: model?.name,
          route: pathname
        }]
      ))
    }
  }, [model])

  return (
    <>
      <Box sx={{ background: "#fafafa" }} className="products">
        <Box className='products__container' sx={{ maxWidth: "1200px", width: "100%", margin: "0 auto !important", alignItems: "center", }}>
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

          {/* {model?.used_interiors?.length > 0 && model?.used_interiors[0] != null ? (
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
                    ) : (null)} */}
        </Box>
      </Box>

    </>
  )
}
