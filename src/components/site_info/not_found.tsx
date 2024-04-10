"use client"

import { Box, Grid } from '@mui/material'
import Image from "next/image"
import Link from 'next/link'
import Buttons from '../buttons'
import SimpleTypography from '../typography'
import Header from '../views/navbar'

export default function NotFoundPage() {
    return (
        <Box>
            <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
                <Grid sx={{ margin: "52px auto", alignItems: "center" }} container spacing={2}>
                    <Grid sx={{ display: "flex", justifyContent: "end" }} item xs={6}>
                        <Image src="/img/notFound.svg" alt="404 not found" width={500} height={500} />
                    </Grid>
                    <Grid sx={{ paddingLeft: "56px !important" }} item xs={6}>
                        <SimpleTypography className="not-found__title" text="Страница не найдена" />
                        <SimpleTypography className="not-found__text" text="Страница, которую вы ищете, больше не существует. Вы можете вернуться на домашнюю страницу сайта и посмотреть, сможете ли вы найти то, что ищете." />
                        <Link href="/">
                            <Buttons childrenFirst={true} className="not-found__btn" name="Домашняя страница">
                                <Box sx={{
                                    width: '22px',
                                    height: '22px',
                                    marginRight: '4px',
                                }} >
                                    <Image alt="To home page" src="/icons/rotate-arrow.svg" width={11} height={11} />
                                </Box>
                            </Buttons>
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
