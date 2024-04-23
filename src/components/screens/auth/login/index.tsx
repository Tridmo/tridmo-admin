"use client"

import * as React from 'react';
import { Box, Button, Typography, Modal, keyframes, SxProps } from '@mui/material';
import { useDispatch, useSelector } from '@/store';
import LoadingBar from 'react-top-loading-bar';
import { LoginContext } from '../../../modals/context';
const style: SxProps = {
  minWidth: '440px',
  maxWidth: '440px',
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

export default function LoginScreen() {
  const [userEmail, setUserEmail] = React.useState('');
  const [progress, setProgress] = React.useState(0);

  const dispatch = useDispatch();

  return (
    <div>
      <LoadingBar
        color={"#ff0000"}
        progress={progress}
      />
      <Box className='login__modals--wrap' sx={style}>
        <LoginContext
          setUserEmail={(email: any) => { setUserEmail(email) }}
        />
      </Box>
    </div>
  );
}
