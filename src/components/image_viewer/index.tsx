import { Box, Modal, styled, ListItem } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { setShowImageViewer } from '../../data/loader'
import { IMAGES_BASE_URL } from '../../utils/image_src';

const SimpleImage = styled(Image)(
    ({ theme }) => `
            position: absolute;
            inset: 0px;
            box-sizing: border-box;
            padding: 0px;
            border: none;
            margin: auto;
            display: block;
            width: 0px;
            height: 0px;
            min-width: 100%;
            max-width: 100%;
            min-height: 100%;
            max-height: 100%;
            object-fit: contain;
    `
)

export default function ImageViewer(image) {
    const dispatch = useDispatch<any>()
    const show = useSelector((state: any) => state?.loader?.show_image_viewer)

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: "720px",
        maxWidth: "720px",
        outline: "none",
        overflow: "hidden"
    }

    return (
        <Modal
            open={show}
            onClose={() => { dispatch(setShowImageViewer(false)) }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <SimpleImage
                    alt=''
                    layout='fill'
                    sx={{ objectFit: 'contain' }}
                    src={`${IMAGES_BASE_URL}/${image?.image_src}`}
                    priority={true}
                />
            </Box>
        </Modal>
    )
}