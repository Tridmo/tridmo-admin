"use client"
import React, { useState, useMemo, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginState, setSignupState, setVerifyState, setOpenModal, ConfirmContextProps, setConfirmProps, setConfirmState, resetConfirmProps, resetConfirmData } from '@/data/modal_checker';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Buttons from '../../buttons';
import { selectMyProfile } from '@/data/me'
import { CircularProgress, Divider, IconButton } from '@mui/material';
import SearchInput from '../../inputs/search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import { searchModels } from 'src/data/search_model';
import SimpleTypography from '../../typography';
import { ThemeProps } from '@/types/theme';
import Link from 'next/link';
import BasicModal from '@/components/modals/modal';
import { switch_on } from '../../../data/toggle_cart';
import { setAuthState } from '../../../data/login';
import Cookies from 'js-cookie'
import { IMAGES_BASE_URL } from '../../../utils/image_src';
import RouteCrumbs from './route_crumbs';
import { ChatOutlined } from '@mui/icons-material';
import { selectChatUnread } from '../../../data/chat';
import { selectNotificationCounts, selectNotificationCountsStatus } from '../../../data/get_notifications';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: 'none'
}));

const DropDown = styled(Menu)(
  ({ theme }: ThemeProps) => `

  .MuiList-root{
    width:162px;
    border: 1px solid #E0E0E0;
    border-radius: 4px;
    padding: 4px 0;
    // margin:10px 12px;
    
  }

  .MuiPaper-root{
    border-radius:0 !important;
    // box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.18);
    box-shadow: 0px 8px 18px 0px #00000029;
  }
  `
);


export default function NavbarTop() {

  const chatUnread = useSelector(selectChatUnread)
  const [searchVal, setSearchVal] = useState("")
  const notificationCountsStatus = useSelector(selectNotificationCountsStatus);
  const notificationCounts = useSelector(selectNotificationCounts);

  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch<any>();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    dispatch(setAuthState(false))
    router.push('/login')
    setAnchorEl(null);
  }

  function SearchModel(e: any) {
    e.preventDefault()
    router.push(`/models?keyword=${searchVal}`)
    // dispatch(searchModels(val))
  }

  const openRightBar = () => {
    dispatch(switch_on(true))
  }

  function handleClickLogout() {
    const modalContent: ConfirmContextProps = {
      message: `Вы уверены, что хотите выйти из аккаунта?`,
      actions: {
        on_click: {
          args: [],
          func: async () => {
            dispatch(setConfirmProps({ is_loading: true }))
            handleLogout()
            handleClose();
            router.refresh()
            router.push('/login')
            dispatch(setConfirmState(false))
            dispatch(setOpenModal(false))
            dispatch(resetConfirmProps())
            dispatch(resetConfirmData())
          }
        }
      }
    }
    dispatch(resetConfirmProps())
    dispatch(setConfirmProps(modalContent))
    dispatch(setConfirmState(true))
    dispatch(setOpenModal(true))
  }

  return (
    <>
      {/* <BasicModal /> */}

      <Box sx={{
        position: 'relative',
      }}>
        <DropDown
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >

          <MenuItem
            onClick={handleClickLogout}
            sx={{ padding: "6px 12px" }}
          >
            <Image
              src="/icons/logout-circle-r-line.svg"
              alt="icon"
              width={17}
              height={17}
            />
            <SimpleTypography sx={{ color: '#E03838 !important' }} className='drow-down__text' text='Выйти' />

          </MenuItem>

        </DropDown>
        <Box
          sx={{
            position: 'fixed',
            padding: '16px 48px 16px calc(76px + 48px)',
            zIndex: 1299,
            display: 'flex',
            width: '100%',
            height: '76px',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: "#fff",
            boxShadow: '0px 3px 4px 0px #00000014',
            marginBottom: 0
          }}
        >
          <Grid container spacing={2}
            sx={{
              width: "100%",
              margin: "0 auto",
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: "center",
              position: "relative"
            }}
          >

            <Grid
              item
              sx={{
                display: "flex",
                padding: "0 !important",
                alignItems: "center",
                justifyContent: 'flex-start'
              }}
              className="header__actions"
            >
              <Box>
                <RouteCrumbs />
              </Box>

            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                padding: "0 !important",
                alignItems: "center",
                justifyContent: "center"
              }}
              className="header__actions"
            >
              <IconButton
                onClick={openRightBar}
                aria-label="menu"
                sx={{ marginRight: "16px", backgroundColor: false ? 'rgba(0, 0, 0, 0.04)' : 'transparent' }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    padding: '4px 6px',
                    borderRadius: '12px',
                    bgcolor: '#7210BE',
                    top: 0,
                    right: 0,
                  }}
                >
                  <SimpleTypography
                    text={
                      notificationCountsStatus === 'succeeded' ?
                        notificationCounts?.data?.unread_count || '0'
                        : '0'
                    }
                    sx={{
                      color: '#fff',
                      lineHeight: '11px',
                      fontWeight: 400,
                      fontSize: '12px',
                    }}
                  />
                </Box>
                <Image
                  src="/icons/bell-icon.svg"
                  alt='Bell'
                  width={21}
                  height={21}
                ></Image>
              </IconButton>

              <Link href={'/chat'}>
                <IconButton
                  sx={{ position: 'relative', marginRight: "16px", }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      padding: '4px 6px',
                      borderRadius: '12px',
                      bgcolor: '#7210BE',
                      top: 0,
                      right: 0,
                    }}
                  >
                    <SimpleTypography
                      text={String(Number(chatUnread?.private || 0) + Number(chatUnread?.rooms || 0)) || '0'}
                      sx={{
                        color: '#fff',
                        lineHeight: '11px',
                        fontWeight: 400,
                        fontSize: '12px',
                      }}
                    />
                  </Box>
                  <ChatOutlined htmlColor='#424242' />
                </IconButton>
              </Link>

              <Box
                onClick={handleClick}
                sx={{
                  display: "flex",
                  flexDirection: 'column',
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: 'pointer',
                }}
              >

                <Image
                  alt='image'
                  src={`/img/avatar.png`}
                  width={40}
                  height={40}
                  style={{
                    borderRadius: '20px',
                  }}
                />

              </Box>

            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}




// <DropDown
//     id="basic-menu"
//     anchorEl={anchorEl}
//     open={open}
//     onClose={handleClose}
//     MenuListProps={{
//         'aria-labelledby': 'basic-button',
//     }}
// >

//     <MenuItem
//         onClick={handleClose}
//         sx={{ padding: "6px 12px" }}
//     >
//         <Link
//             href='/profile'
//             style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
//         >

//             <Image
//                 src="/icons/user-line.svg"
//                 alt="user icon"
//                 width={17}
//                 height={17}
//             />
//             <SimpleTypography className='drow-down__text' text='Мой профайл' />

//         </Link>
//     </MenuItem>

//     <MenuItem
//         onClick={handleClose}
//         sx={{ padding: "6px 12px" }}
//     >
//         <Link
//             href='/interiors/addnew'
//             style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
//         >

//             <Image
//                 src="/icons/plus-round.svg"
//                 alt="heart icon"
//                 width={17}
//                 height={17}
//             />
//             <SimpleTypography className='drow-down__text' text='Новый проект' />

//         </Link>
//     </MenuItem>


//     <Divider
//         sx={{
//             my: "0 !important",
//             width: "100%",
//         }}
//     />

//     <MenuItem sx={{ padding: "6px 12px" }} onClick={handleLogout}>
//         <Image
//             src="/icons/logout-circle-r-line.svg"
//             alt='logout icon'
//             width={17}
//             height={17}
//         />
//         <SimpleTypography sx={{ color: '#BC2020 !important' }} className='drow-down__text' text='Выйти' />
//     </MenuItem>

// </DropDown>
