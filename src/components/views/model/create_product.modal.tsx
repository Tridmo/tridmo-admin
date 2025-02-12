"use client"

import * as React from 'react';
import { Box, Modal, SxProps } from '@mui/material';
import { CreateProductFromModelForm } from './create_product.form';

const baseStyle: SxProps = {
  zIndex: 9001,
  minWidth: '440px',
  width: '440px',
  overflow: "hidden",
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  innerHeight: "226px",
  bgcolor: '#ffff',
  border: '1px solid #fff',
  boxShadow: 24,
  p: "24px",
};

export default function CreateProductFromModelModal(
  { styles, isOpen, handleClose, model, onSuccess }:
    { model: any, isOpen: boolean, handleClose: Function, onSuccess: Function, styles?: SxProps }
) {

  const style = {
    ...baseStyle,
    ...styles
  }

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={() => handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateProductFromModelForm model={model} handleClose={handleClose} onSuccess={onSuccess} />
        </Box>
      </Modal>
    </div>
  );
}
