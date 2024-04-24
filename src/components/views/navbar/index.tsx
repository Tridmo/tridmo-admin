"use client"
import React, { useState, useMemo, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginState, setSignupState, setVerifyState, setOpenModal } from '@/data/modal_checker';
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
import NavbarTop from './top';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
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

function navItemsData(pathname: string) {
  return [
    {
      id: 1,
      text: "Статистика",
      link: "/stats",
      active: pathname.startsWith('/stats'),
      icon_src: '/icons/stat-bars.svg',
      icon: (
        <svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 11.6667H6.9V21H0V11.6667ZM16.1 5.83333H23V21H16.1V5.83333ZM8.05 0H14.95V21H8.05V0ZM2.3 14V18.6667H4.6V14H2.3ZM10.35 2.33333V18.6667H12.65V2.33333H10.35ZM18.4 8.16667V18.6667H20.7V8.16667H18.4Z" fill="#B8B8B8" />
        </svg>
      ),
    },
    {
      id: 2,
      text: "Модели",
      link: "/models",
      active: pathname == '/' || pathname.startsWith('/models'),
      icon_src: '/icons/layers.svg',
      icon: (
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.4302 16.7341L22.8325 17.5753C22.919 17.6271 22.9906 17.7004 23.0403 17.7881C23.0901 17.8758 23.1162 17.9749 23.1162 18.0758C23.1162 18.1766 23.0901 18.2757 23.0403 18.3634C22.9906 18.4511 22.919 18.5245 22.8325 18.5763L12.6008 24.7153C12.4194 24.8243 12.2117 24.8819 12 24.8819C11.7883 24.8819 11.5806 24.8243 11.3992 24.7153L1.16749 18.5763C1.08098 18.5245 1.00937 18.4511 0.959647 18.3634C0.909925 18.2757 0.883789 18.1766 0.883789 18.0758C0.883789 17.9749 0.909925 17.8758 0.959647 17.7881C1.00937 17.7004 1.08098 17.6271 1.16749 17.5753L2.56983 16.7341L12 22.3924L21.4302 16.7341ZM21.4302 11.2508L22.8325 12.0919C22.919 12.1437 22.9906 12.2171 23.0403 12.3048C23.0901 12.3925 23.1162 12.4916 23.1162 12.5924C23.1162 12.6933 23.0901 12.7924 23.0403 12.8801C22.9906 12.9678 22.919 13.0411 22.8325 13.0929L12 19.5924L1.16749 13.0929C1.08098 13.0411 1.00937 12.9678 0.959647 12.8801C0.909925 12.7924 0.883789 12.6933 0.883789 12.5924C0.883789 12.4916 0.909925 12.3925 0.959647 12.3048C1.00937 12.2171 1.08098 12.1437 1.16749 12.0919L2.56983 11.2508L12 16.9091L21.4302 11.2508ZM12.5997 0.52794L22.8325 6.66694C22.919 6.71873 22.9906 6.79206 23.0403 6.87978C23.0901 6.9675 23.1162 7.06661 23.1162 7.16744C23.1162 7.26827 23.0901 7.36738 23.0403 7.4551C22.9906 7.54282 22.919 7.61615 22.8325 7.66794L12 14.1674L1.16749 7.66794C1.08098 7.61615 1.00937 7.54282 0.959647 7.4551C0.909925 7.36738 0.883789 7.26827 0.883789 7.16744C0.883789 7.06661 0.909925 6.9675 0.959647 6.87978C1.00937 6.79206 1.08098 6.71873 1.16749 6.66694L11.3992 0.52794C11.5806 0.418922 11.7883 0.361328 12 0.361328C12.2117 0.361328 12.4194 0.418922 12.6008 0.52794H12.5997ZM12 2.88811L4.86816 7.16744L12 11.4468L19.1318 7.16744L12 2.88811Z" fill="#B8B8B8" />
        </svg>
      ),
    },
    {
      id: 3,
      text: "Пользователи",
      link: "/users",
      active: pathname.startsWith('/users'),
      icon_src: '/icons/users.svg',
      icon: (
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 25C0 22.4741 0.963263 20.0517 2.67788 18.2656C4.3925 16.4796 6.71802 15.4762 9.14286 15.4762C11.5677 15.4762 13.8932 16.4796 15.6078 18.2656C17.3225 20.0517 18.2857 22.4741 18.2857 25H16C16 23.1056 15.2776 21.2888 13.9916 19.9492C12.7056 18.6097 10.9615 17.8571 9.14286 17.8571C7.32423 17.8571 5.58009 18.6097 4.29413 19.9492C3.00816 21.2888 2.28571 23.1056 2.28571 25H0ZM9.14286 14.2857C5.35429 14.2857 2.28571 11.0893 2.28571 7.14286C2.28571 3.19643 5.35429 0 9.14286 0C12.9314 0 16 3.19643 16 7.14286C16 11.0893 12.9314 14.2857 9.14286 14.2857ZM9.14286 11.9048C11.6686 11.9048 13.7143 9.77381 13.7143 7.14286C13.7143 4.5119 11.6686 2.38095 9.14286 2.38095C6.61714 2.38095 4.57143 4.5119 4.57143 7.14286C4.57143 9.77381 6.61714 11.9048 9.14286 11.9048ZM18.6103 16.3131C20.2164 17.0666 21.5794 18.2872 22.5355 19.8282C23.4916 21.3693 24.0002 23.1651 24 25H21.7143C21.7145 23.6238 21.3332 22.2768 20.6161 21.1209C19.899 19.9651 18.8767 19.0496 17.672 18.4845L18.6091 16.3131H18.6103ZM17.824 2.87262C18.9755 3.36702 19.96 4.20659 20.6526 5.2848C21.3452 6.363 21.7148 7.63124 21.7143 8.92857C21.7148 10.5623 21.1288 12.1372 20.0715 13.3438C19.0142 14.5505 17.5619 15.3017 16 15.45V13.0536C16.8468 12.9272 17.6324 12.5215 18.2415 11.8958C18.8506 11.2701 19.2511 10.4575 19.3842 9.5773C19.5173 8.69708 19.376 7.79559 18.981 7.00518C18.586 6.21477 17.9582 5.57708 17.1897 5.18571L17.824 2.87262Z" fill="#B8B8B8" />
        </svg>
      ),
    },
    {
      id: 4,
      text: "Бренды",
      link: "/brands",
      active: pathname.startsWith('/brands'),
      icon_src: '/icons/list.svg',
      icon: (
        <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.33333 0.667318H21.5V3.00065H6.33333V0.667318ZM0.5 0.0839844H4V3.58398H0.5V0.0839844ZM0.5 8.25065H4V11.7507H0.5V8.25065ZM0.5 16.4173H4V19.9173H0.5V16.4173ZM6.33333 8.83399H21.5V11.1673H6.33333V8.83399ZM6.33333 17.0007H21.5V19.334H6.33333V17.0007Z" fill="#B8B8B8" />
        </svg>
      ),
    },
    {
      id: 5,
      text: "Категории",
      link: "/categories",
      active: pathname.startsWith('/categories'),
      icon_src: '/icons/list-settings.svg',
      icon: (
        <svg width="25" height="21" viewBox="0 0 25 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.333496 16.9993H8.50016V19.3327H0.333496V16.9993ZM0.333496 8.83268H10.8335V11.166H0.333496V8.83268ZM0.333496 0.666016H23.6668V2.99935H0.333496V0.666016ZM22.1198 11.1952L23.4685 10.739L24.6352 12.7597L23.5665 13.6988C23.701 14.3366 23.701 14.9954 23.5665 15.6332L24.6352 16.5724L23.4685 18.593L22.1198 18.1369C21.6415 18.5685 21.0722 18.901 20.4457 19.1052L20.1668 20.4993H17.8335L17.5535 19.104C16.9343 18.9017 16.3644 18.5718 15.8805 18.1357L14.5318 18.593L13.3652 16.5724L14.4338 15.6332C14.2993 14.9954 14.2993 14.3366 14.4338 13.6988L13.3652 12.7597L14.5318 10.739L15.8805 11.1952C16.3588 10.7635 16.9282 10.431 17.5547 10.2268L17.8335 8.83268H20.1668L20.4468 10.228C21.0722 10.431 21.6415 10.7647 22.1198 11.1964V11.1952ZM19.0002 16.9993C19.619 16.9993 20.2125 16.7535 20.6501 16.3159C21.0877 15.8783 21.3335 15.2849 21.3335 14.666C21.3335 14.0472 21.0877 13.4537 20.6501 13.0161C20.2125 12.5785 19.619 12.3327 19.0002 12.3327C18.3813 12.3327 17.7878 12.5785 17.3502 13.0161C16.9127 13.4537 16.6668 14.0472 16.6668 14.666C16.6668 15.2849 16.9127 15.8783 17.3502 16.3159C17.7878 16.7535 18.3813 16.9993 19.0002 16.9993Z" fill="#B8B8B8" />
        </svg>
      ),
    },
  ]
}

export default function Navbar() {

  const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
  const userData = useSelector(selectMyProfile)
  const [searchClicked, setSearchClicked] = useState(false)
  const [searchVal, setSearchVal] = useState("")
  const [navbarItems, setnavbarItems] = useState<any[]>([]);

  const router = useRouter();
  const pathname = usePathname();


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch<any>();

  const navData = navItemsData(pathname)

  useEffect(() => {
    setnavbarItems(navData);
  }, [pathname]);

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
    router.push(pathname)
    router.refresh();
    setAnchorEl(null);
  }

  function SearchModel(e: any) {
    e.preventDefault()
    router.push(`/models?keyword=${searchVal}`)
    // dispatch(searchModels(val))
  }

  const openRightBar = () => {
    dispatch(switch_on(true))

    // if (router.pathname === '/models' || router.pathname === '/interiors') {
    //     router.push({
    //         query: {
    //             page: getModelPageFilter,
    //             isOpen: true,
    //             colors: getModelColorFilter,
    //             styles: getModelStyleFilter,
    //             category_name: getModelCategoryNameFilter,
    //             category: getModelCategoryFilter,
    //         },
    //     });
    // }
  }

  return (
    <>
      {/* <BasicModal /> */}
      <NavbarTop />
      <Box sx={{
        position: 'relative',
      }}>
        <Box
          sx={{
            position: 'fixed',
            zIndex: 1300,
            display: 'flex',
            flexDirection: 'column',
            width: '76px',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 1,
            background: "#fff",
            marginBottom: 0,
            boxShadow: '0px 3px 4px 0px #00000014',
          }}
        >
          <Box
            className='header__logo--wrapper'
            sx={{ padding: "20px 18px !important", display: "flex", justifyContent: "start", position: 'absolute', top: 0 }}>
            <Link href="/">
              <Item sx={{ padding: "0 !important", height: "27px" }}>
                <Image className='header__logo' alt="logo" priority={true} src="/img/tridmo-logo.svg" width={40} height={30} />
              </Item>
            </Link>

          </Box>
          <Grid container spacing={2}
            sx={{
              width: "100%",
              maxWidth: '100% !important',
              margin: "0 auto",
              flexDirection: 'column',
              alignItems: "center",
              position: "relative"
            }}
          >

            <Grid
              item
              sx={{
                width: '100% !important',
                maxWidth: '100% !important',
                display: "flex",
                padding: "0 !important",
                alignItems: "center",
                justifyContent: "center"
              }}
              className="header__actions"
            >
              <Box className='header__nav' component={"nav"} sx={{ width: '100%' }}>
                <Box component={"ul"}
                  sx={{
                    width: '100%',
                    display: "flex",
                    flexDirection: 'column',
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0",
                    padding: "0"
                  }}>
                  {
                    navbarItems.map(item => (
                      <Link
                        key={item.id}
                        href={item.link}
                        style={{
                          textDecoration: "none",
                          width: '100%',
                          display: 'flex',
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Box component={"li"}
                          sx={{
                            width: '100%',
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: "center",
                            listStyle: "none",
                            padding: '18px 24px',
                            transition: 'all 0.4s ease',
                            backgroundColor: item.active ? '#F3E5FF' : '#fff',
                            borderRightStyle: 'solid',
                            borderRightWidth: '2px',
                            borderRightColor: item.active ? '#7210BE' : 'transparent',
                            '&:hover': {
                              backgroundColor: '#F3E5FF'
                            },
                            '&:hover svg path': {
                              fill: '#7210BE'
                            }
                          }}
                        >
                          <Box sx={{
                            width: '28px',
                            height: '28px',
                            '& svg path': {
                              transition: 'all 0.4s ease',
                              fill: item.active ? '#7210BE' : '#B8B8B8',
                            }
                          }}>
                            {item.icon}
                          </Box>

                        </Box>
                      </Link>
                    ))
                  }

                </Box>
              </Box>

            </Grid>
          </Grid>
        </Box>
      </Box >
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
