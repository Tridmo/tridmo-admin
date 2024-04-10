import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Box, styled, Paper, Avatar, Skeleton } from '@mui/material';
import Image from 'next/image';
import SimpleTypography from '../typography';
import Link from 'next/link';
import { ThemeProps } from '../../types/theme';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IMAGES_BASE_URL } from '../../utils/image_src';

type InputProps = {
    item?: object,
};

const CustomBoxWrapper = styled(Box)(
    ({ theme }) =>
        `
      img {
        margin: 0;
        padding: 12px;
        margin-bottom: 4px;
        objec-fit:cover;
      }
    `
);
type CustomCardProps = {
    type?: any,
    model?: any,
    link?: any,
    imgHeight?: any,
    tagText?: string,
    tagIcon?: string,
    withAuthor?: boolean,
}

export default function CustomCardSkeleton({ model, link, imgHeight, tagIcon, tagText, withAuthor }: CustomCardProps) {

    const Label = styled(Paper)(({ theme }: ThemeProps) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(0.5),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    }));


    return (
        <Box key={Math.random()} sx={{ margin: '0 0 15px 0', textDecoration: "none" }}>
            <Box sx={{
                height: "auto",
                width: "100%",
                border: " 1px solid #e0e0e0",
                background: "#fff",
                position: "relative",
                cursor: "pointer",
                transition: "all 0.4s ease",
                padding: "12px 12px 0 12px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
            }}>
                {/* <LazyLoadImage
                    src="/img/card-loader.jpg"
                    alt="Model image"
                    effect="blur"
                    width={"100%"}
                    placeholderSrc={"/img/card-loader.jpg"}
                    height={imgHeight || `208px`}
                    delayTime={500}
                    style={{ objectFit: "cover" }}
                    /> */}
                <Skeleton
                    variant="rectangular"
                    width={'100%'}
                    height={imgHeight || `208px`}
                />
                <Label
                    sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: 'center',
                        justifyContent: "space-between",
                        padding: "13px 0"
                    }}
                >
                    {
                        withAuthor
                            ? <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                <Skeleton
                                    variant="rounded"
                                    width={28}
                                    height={28}
                                    style={{ borderRadius: '50%' }}
                                />
                                <Skeleton
                                    variant="rectangular"
                                    width={70}
                                    height={20}
                                    style={{ marginLeft: '8px' }}
                                />
                            </Box>
                            : <Skeleton
                                variant="rectangular"
                                width={70}
                                height={20}
                            />
                    }
                    {
                        <Skeleton
                            variant="rectangular"
                            width={60}
                            height={21}
                        />
                    }
                </Label>
            </Box>
        </Box>
    )
}