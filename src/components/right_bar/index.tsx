"use client"
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Grid, keyframes } from '@mui/material';
import CheckoutBar from './checkout_bar';
import { selectToggleCardActionStatus, switch_on } from '../../data/toggle_cart';
import { getNotifications, selectNotificationsStatus } from '../../data/get_notifications';
import { selectMyProfile } from '../../data/me';

const modalSlider = keyframes`
from{
  transform:translateX(100%)
  /* opacity: 0 */
}
to{
  transform:translateX(0)
  /* opacity: 1 */
}
`

const LeftSidemodalSlider = keyframes`
from{
opacity: 0
}
to{
opacity: 1
}
`
const modalStyle: React.CSSProperties = {
  overflow: 'hidden',
  backgroundColor: "white",
  position: "fixed",
  right: 0,
  top: 0,
  height: "100dvh",
  zIndex: 11110,
  width: "500px",
  animation: `${modalSlider}  0.2s linear forwards`
}

const LeftSideModalStyle: React.CSSProperties = {
  overflow: 'hidden',
  position: "fixed",
  width: "100%",
  height: "100dvh",
  zIndex: 11100,
  top: 0,
  backgroundColor: "rgba(20, 20, 20, 0.25)",
  animation: `${LeftSidemodalSlider}  0.7s linear forwards`
}

const RightBar: React.FC = () => {
  const get_cart_status = useSelector(selectToggleCardActionStatus);
  const router = useRouter();
  const dispatch = useDispatch<any>();

  const openRightBar = () => {
    dispatch(switch_on(false))
  }

  if (get_cart_status) {
    return (
      <Grid container aria-hidden={true}>

        <Grid
          sx={LeftSideModalStyle}
          item
          onClick={openRightBar}
        >
        </Grid>
        <Grid
          sx={
            modalStyle
          }
          item
        >
          <CheckoutBar />
        </Grid>
      </Grid>
    )
  } else {
    return null;
  }
}

export default RightBar;