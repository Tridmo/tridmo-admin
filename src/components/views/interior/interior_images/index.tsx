// components/ImageComponent.js
import { Box } from '@mui/system';
import axios from 'axios';
import { useState, useEffect, CSSProperties } from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { readFile } from '@/components/inputs/file_input';
import { useDispatch, useSelector } from 'react-redux';
import { selectOneInterior } from '@/data/get_one_interior';
import { IMAGES_BASE_URL } from '@/utils/image_src';
import { setShowInteriorImagesModal } from '@/data/loader';
import Image from 'next/image';


export default function InteriorImages() {
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const interior = useSelector(selectOneInterior)
    const dispatch = useDispatch()

    // useEffect(() => {
    //     const getImageSize = () => {
    //         const img = new Image();
    //         img.src = imageUrl;
    //         img.onload = () => {
    //             setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
    //         };
    //     };

    //     getImageSize();
    // }, [imageUrl]);

    const imageStyle: CSSProperties = {
        verticalAlign: 'top',
        overflowClipMargin: 'content-box',
        overflow: 'clip',
        objectFit: 'cover',
        width: '100%',
        height: '100%'
    }

    return (

        interior?.images?.map((img, n) => (
            <Box key={n}
                sx={{ marginBottom: '20px', cursor: 'pointer' }}
                onClick={(e) => {
                    dispatch(setShowInteriorImagesModal(true, n))
                }}
            >
                <Box
                    sx={{
                        width: '1200px',
                        height: '1200px',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                    <Image
                        unoptimized
                        src={`${IMAGES_BASE_URL}/${img?.image_src}`}
                        alt="Diesign image"
                        width={0}
                        height={0}
                        style={imageStyle}
                    />
                </Box>
            </Box>
        ))
    );
};