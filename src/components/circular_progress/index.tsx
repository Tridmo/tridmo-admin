"use client"

import { Button, CircularProgress } from '@mui/material';
import React, { CSSProperties } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { styled } from '@mui/material';
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';
interface Props {
    size?: string;
    color?: string;
    style?: CSSProperties;
}

function CustomCircularProgress(props: Props) {
    const StyledProgress = styled(CircularProgress)`
        &.MuiCircularProgress-root {
            color: ${props?.color || '#434343'} !important;
        }
    `;
    return (
        <StyledProgress
            size={props?.size || '1rem'}
            style={props?.style || {}}
        />
    );
}
export default CustomCircularProgress;