import { Box, Modal, styled, ListItem } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';;
import SimpleSlider from '../slider';
import { setShowModelsModal } from '../../../../data/loader'

export default function ModelModal() {
    const dispatch = useDispatch<any>()
    const show = useSelector((state: any) => state?.loader?.show_models_modal)

    const style = {
        zIndex: 9100, 
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
            onClose={() => { dispatch(setShowModelsModal(false)) }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <SimpleSlider name="modal-slider" />
            </Box>
        </Modal>
    )
}