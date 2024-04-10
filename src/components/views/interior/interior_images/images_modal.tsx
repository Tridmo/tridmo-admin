import { Box, Modal, styled, ListItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SimpleSlider from '../slider';
import { setShowInteriorImagesModal } from '@/data/loader';

export default function InteriorImagesModal({ mainImageWidth, selectedSlide }: { mainImageWidth: number; selectedSlide?: number }) {
    const dispatch = useDispatch<any>()
    const show = useSelector((state: any) => state?.loader?.show_interior_images_modal)

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: `${mainImageWidth}px`,
        maxWidth: `${mainImageWidth}px`,
        outline: "none",
        overflow: "hidden"
    }

    return (
        <Modal
            open={show}
            onClose={() => { dispatch(setShowInteriorImagesModal(false)) }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <SimpleSlider mainWidth={mainImageWidth} />
            </Box>
        </Modal>
    )
}