"use client"

import React, { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import Link from 'next/link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import SimpleTypography from '../../typography';
import { ThemeProps } from '@/types/theme';
import { styled } from '@mui/material';

export default function Footer() {
    const Item = styled(Paper)(({ theme }: ThemeProps) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const footerList = [
        {
            text: "О нас",
            url: "about-us"
        },
        {
            text: "Условия",
            url: "terms-condications"
        },
        {
            text: "Компания",
            url: "company"
        },
        {
            text: "Блог",
            url: "blog"
        },
        {
            text: "Сообщество",
            url: "community"
        },
        {
            text: "Карьера",
            url: "careers"
        },
    ]

    const socialMedia = [
        {
            icon: "/icons/instagram-icon.svg",
            url: "/",
            margin: true
        },
        {
            icon: "/icons/telegram-icon.svg",
            url: "/",
            margin: true
        },
        {
            icon: "/icons/facebook-icon.svg",
            url: "/",
            margin: true
        },
        {
            icon: "/icons/twitter-icon.svg",
            url: "/",
            margin: false
        }
    ]

    return (
        <footer style={{ marginTop: "auto" }}>
            <Box sx={{ width: "100%", flexGrow: 1, borderBottom: "1px solid #e0e0e0", paddingTop: "48px", background: "#fff" }}>
                <Grid container spacing={2} sx={{ maxWidth: "1200px", margin: "0 auto" }}>
                    <Grid item xs={3} sx={{ padding: "0 !important", display: "flex", justifyContent: "flex-start" }}>
                        <Item sx={{ padding: "0", display: "flex", flexDirection: "column", alignItems: "start" }}>
                            <Link href="/">
                                <Image
                                    width="110"
                                    height="24"
                                    alt="demod svg"
                                    src="/img/demod.svg"
                                />
                            </Link>
                        </Item>
                    </Grid>
                    <Grid item xs={3} sx={{ padding: "0 !important", display: "flex", justifyContent: "center" }} >
                        <Item sx={{ padding: "0" }}>
                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', padding: "0" }}>
                                {
                                    footerList.slice(0, 3).map((item, i) => (
                                        <ListItem
                                            key={i}
                                            sx={{ padding: "0" }}
                                        >
                                            <Link href={item.url}>

                                                <SimpleTypography text={item.text} className='footer__link'></SimpleTypography>

                                            </Link>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </Item>
                    </Grid>
                    <Grid item xs={3} sx={{ padding: "0 !important", display: "flex", justifyContent: "center" }} >
                        <Item sx={{ padding: "0" }}>
                            <List sx={{ width: '100%', bgcolor: 'background.paper', padding: "0" }}>
                                {
                                    footerList.slice(3, 6).map((item, i) => (
                                        <ListItem
                                            key={i}
                                            sx={{ padding: "0" }}
                                        >
                                            <Link href={item.url}>

                                                <SimpleTypography text={item.text} className='footer__link'></SimpleTypography>

                                            </Link>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </Item>
                    </Grid>
                    <Grid item xs={3} sx={{ padding: "0 !important", display: "flex", justifyContent: "flex-end" }} >
                        <Item sx={{ padding: "0" }}>
                            <SimpleTypography text="Свяжитесь с нами" className='footer__title'></SimpleTypography>
                            <List sx={{ width: '100%', display: "flex", bgcolor: 'background.paper', padding: "0" }}>
                                {
                                    socialMedia.map((item, i) => (
                                        <ListItem
                                            key={i}
                                            sx={{ padding: "0", marginRight: `${item.margin ? "36px" : "0"}` }}
                                        >
                                            <Link href={item.url} target='_blank'>

                                                <Image
                                                    width={20}
                                                    height={20}
                                                    alt="icon"
                                                    src={item.icon}
                                                />

                                            </Link>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </Item>
                    </Grid>
                    <SimpleTypography text="© 2022 Demod Inc. Ташкент, Узбекистан." className='footer__desc'></SimpleTypography>
                </Grid>
            </Box>
        </footer>
    )
}