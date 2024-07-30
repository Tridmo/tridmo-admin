import { Grid, Table, TableBody, TableCell, TableContainer, Box, TableRow, Paper, Skeleton, SxProps } from '@mui/material';
import SimpleTypography from '../../../typography';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

import Link from 'next/link';
import Buttons from '../../../buttons';
import { useRouter } from 'next/navigation';
import { sampleUser } from '@/data/samples';
import { getDesignerProfile, selectDesignerProfile } from '../../../../data/get_designer';
import { selectMyProfile } from '../../../../data/me';
import { IMAGES_BASE_URL } from '../../../../utils/image_src';
import { setProfileEditState, setOpenModal, ConfirmContextProps, setConfirmProps, setConfirmState, resetConfirmProps, resetConfirmData, setEditingProfile } from '../../../../data/modal_checker';
import formatDate from '../../../../utils/format_date';
import CountsGrid from '../../statistics/counts_component';
import BrickDataGrid from '../../../bricks_grid';
import UserDownloadsList from '../downloads_list';
import UserInteriorsList from '../interiors_list';
import { selectCategoriesByUserDownloads } from '../../../../data/categories';
import SimpleCountsList from '../simple_counts_list';
import { selectAllBrandsByUserDownloads } from '../../../../data/get_brands_by_user_downloads';
import { Block, DeleteForever, Launch, LockOpen, LockOutlined, ModeEdit, RateReview, SmsOutlined } from '@mui/icons-material';
import { selectChatToken } from '../../../../data/get_chat_token';
import Cookies from 'js-cookie';
import instance, { chatApi, setChatToken } from '../../../../utils/axios';
import { setSelectedConversation } from '../../../../data/chat';
import { toast } from 'react-toastify';
import { getAllDesigners } from '../../../../data/get_all_designers';

const tableWrapperSx: SxProps = {
  boxShadow: '0px 3px 4px 0px #00000014',
  backgroundColor: '#fff',
  display: 'flex',
  flexDirection: 'column',
  padding: '32px 24px',
  width: '100%',
  marginBottom: '16px',
  borderRadius: '4px',
}

const tbodySx: SxProps = {
  borderTop: "1px solid #F5F5F5",
  borderBottom: "1px solid #F5F5F5",

  '& tr th': { padding: '12px 8px' }
}

const tContainerSx: SxProps = {
  borderRadius: "0",
  marginBottom: "18px",
  overflowX: 'hidden'
}

const tRowSx: SxProps = { '&:last-child td, &:last-child th': { border: 0 }, }

const tCellSx: SxProps = { borderColor: "#F5F5F5" }


interface ProfileProps {
  of: 'designer' | 'own'
}

export default function ProfileInfo(props: ProfileProps) {
  const router = useRouter()
  const dispatch = useDispatch<any>()
  const getProfileStatus = useSelector((state: any) => props?.of == 'designer' ? state?.get_designer?.status : state?.get_profile?.status)
  const profileInfo = useSelector(props?.of == 'designer' ? selectDesignerProfile : selectMyProfile)
  const all__categories = useSelector(selectCategoriesByUserDownloads)
  const all__brands = useSelector(selectAllBrandsByUserDownloads)
  const chatToken = useSelector(selectChatToken)

  const getUserNameFilter = useSelector((state: any) => state?.handle_filters?.users_name)
  const getUsersOrderBy = useSelector((state: any) => state?.handle_filters?.users_orderby)
  const getUsersOrder = useSelector((state: any) => state?.handle_filters?.users_order)

  async function handleCreateConversation() {

    setChatToken(Cookies.get('chatToken') || chatToken)

    chatApi.post(`/conversations`, {
      members: [profileInfo?.user_id]
    })
      .then(res => {
        dispatch(setSelectedConversation(res?.data?.id))
        router.push('/chat')
      })
  }

  function handleClickEdit() {
    dispatch(setEditingProfile(profileInfo))
    dispatch(setProfileEditState(true))
    dispatch(setOpenModal(true))
  }

  function handleClickBan() {
    const modalContent: ConfirmContextProps = {
      message: `Вы уверены, что хотите ${profileInfo?.is_banned ? 'разблокировать' : 'заблокировать'} ${profileInfo?.full_name}?`,
      actions: {
        on_click: {
          args: [profileInfo?.user_id],
          func: async (checked: boolean, id: number) => {
            dispatch(setConfirmProps({ is_loading: true }))
            instance.post(`users/${profileInfo?.is_banned ? 'unban' : 'ban'}/${id}`, { permanent: true })
              .then(res => {
                if (res?.data?.success) {
                  toast.success(res?.data?.message)
                  dispatch(getDesignerProfile(profileInfo?.username))
                  dispatch(getAllDesigners({
                    key: getUserNameFilter,
                    orderBy: getUsersOrderBy,
                    order: getUsersOrder,
                  }))
                  dispatch(setConfirmState(false))
                  dispatch(setOpenModal(false))
                  dispatch(resetConfirmProps())
                  dispatch(resetConfirmData())
                }
                else {
                  toast.success(res?.data?.message)
                  dispatch(setConfirmProps({ is_loading: false }))
                }
              }).catch(err => {
                toast.error(err?.response?.data?.message)
                dispatch(setConfirmProps({ is_loading: false }))
              }).finally(() => {
                dispatch(setConfirmProps({ is_loading: false }))
              })
          }
        }
      }
    }
    dispatch(resetConfirmProps())
    dispatch(setConfirmProps(modalContent))
    dispatch(setConfirmState(true))
    dispatch(setOpenModal(true))
  }

  function handleClickDelete() {
    const modalContent: ConfirmContextProps = {
      message: `Вы уверены, что хотите удалить ${profileInfo?.full_name}?`,
      use_word_match: true,
      word_match: `Удалить ${profileInfo?.full_name}`,
      confirm_button_text: 'Да, удалить',
      actions: {
        on_click: {
          args: [profileInfo?.user_id],
          func: async (checked: boolean, id: number) => {
            dispatch(setConfirmProps({ is_loading: true }))
            instance.delete(`users/${id}`)
              .then(res => {
                if (res?.data?.success) {
                  toast.success(res?.data?.message)
                  dispatch(getAllDesigners({
                    key: getUserNameFilter,
                    orderBy: getUsersOrderBy,
                    order: getUsersOrder,
                  }))
                  dispatch(setConfirmState(false))
                  dispatch(setOpenModal(false))
                  dispatch(resetConfirmProps())
                  dispatch(resetConfirmData())
                  router.refresh()
                  router.push('/users')
                }
                else {
                  toast.success(res?.data?.message)
                  dispatch(setConfirmProps({ is_loading: false }))
                }
              }).catch(err => {
                toast.error(err?.response?.data?.message)
                dispatch(setConfirmProps({ is_loading: false }))
              }).finally(() => {
                dispatch(setConfirmProps({ is_loading: false }))
              })
          }
        }
      }
    }
    dispatch(resetConfirmProps())
    dispatch(setConfirmProps(modalContent))
    dispatch(setConfirmState(true))
    dispatch(setOpenModal(true))
  }

  if (getProfileStatus == 'succeeded') {
    return (
      <Grid container
        sx={{ width: '100%' }}
        gap={2}
      >
        <Grid item xs={9.5}>
          <Grid container>
            <Grid item xs={12}
              sx={tableWrapperSx}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Image
                      width={80}
                      height={80}
                      alt="avatar"
                      style={{ objectFit: "cover", margin: '0 auto', borderRadius: '50%' }}
                      src={profileInfo?.image_src ? `${IMAGES_BASE_URL}/${profileInfo?.image_src}` : '/img/avatar.png'}
                    />
                  </Box>
                  <Box ml={'8px'}>
                    <SimpleTypography sx={{
                      fontSize: '22px',
                      fontWeight: '400',
                      lineHeight: '28px',
                    }} text={profileInfo?.full_name} />
                    <SimpleTypography sx={{
                      color: '#888',
                      fontSize: '20px',
                      fontWeight: '400',
                      lineHeight: '28px',
                    }} text={profileInfo?.username} />
                  </Box>
                </Box>

                <Grid container gap={1}
                  sx={{
                    width: '50%',
                    '& > div .btn': {
                      width: '100%',
                    },
                    '.btn > button': {
                      width: '100%'
                    }
                  }}
                >
                  <Grid item xs={5.8} md={5.8} sm={5.8}>
                    <Buttons
                      onClick={handleClickEdit}
                      sx={{ padding: '10px !important' }}
                      className='bookmark__btn btn'
                      name="Редактировать"
                      childrenFirst={true}
                    >
                      <ModeEdit sx={{ width: '19px', height: '19px', mr: '8px' }} />
                    </Buttons>
                  </Grid>
                  <Grid item xs={5.8} md={5.8} sm={5.8}>
                    <Buttons
                      onClick={() => handleCreateConversation()}
                      sx={{ padding: '10px !important', m: '0 !important' }}
                      className='signIn__btn btn'
                      name="Написать"
                      childrenFirst={true}
                    >
                      <RateReview sx={{ width: '20px', height: '20px', mr: '8px' }} />
                    </Buttons>
                  </Grid>
                  <Grid item xs={5.8} md={5.8} sm={5.8}>
                    <Buttons
                      onClick={handleClickBan}
                      sx={{ padding: '10px !important' }}
                      className='warning_outlined__btn btn'
                      name={profileInfo?.is_banned ? "Разблокировать" : "Блокировать"}
                      childrenFirst={true}
                    >
                      {
                        profileInfo?.is_banned ?
                          <LockOpen sx={{ width: '20px', height: '20px', mr: '8px' }} />
                          : <LockOutlined sx={{ width: '20px', height: '20px', mr: '8px' }} />
                      }
                    </Buttons>
                  </Grid>
                  <Grid item xs={5.8} md={5.8} sm={5.8}>
                    <Buttons
                      onClick={handleClickDelete}
                      sx={{ padding: '10px !important' }}
                      className='red_outlined__btn btn'
                      name="Удалить"
                      childrenFirst={true}
                    >
                      <DeleteForever sx={{ width: '20px', height: '20px', mr: '8px' }} />
                    </Buttons>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <BrickDataGrid
                fill
                loading={!profileInfo}
                data={[
                  {
                    name: 'Дата регистрации',
                    main_text: formatDate(profileInfo?.created_at)
                  },
                  {
                    name: 'Email',
                    main_text: profileInfo?.email
                  },
                  {
                    name: 'Название компании',
                    main_text: profileInfo?.company_name
                  },
                  {
                    name: 'Адрес',
                    main_text: profileInfo?.address
                  },
                  {
                    name: 'Номер',
                    main_text: profileInfo?.phone
                  },
                  {
                    name: 'Телеграм',
                    main_text: profileInfo?.telegram
                  },
                  {
                    name: 'Сайт',
                    main_text: profileInfo?.portfolio_link
                  },
                ]}
              />
            </Grid>

            <Grid item xs={12}>
              <UserDownloadsList />
            </Grid>

            <Grid item xs={12}>
              <UserInteriorsList />
            </Grid>

          </Grid>
        </Grid>

        <Grid item xs={2.2}>
          <Grid container gap={2}>
            <CountsGrid
              fullWidth
              loading={!profileInfo}
              mainColor='#7210BE'
              data={[
                {
                  name: 'Интерьеры',
                  count: profileInfo?.designs_count || 0
                },
                {
                  name: 'Бирки',
                  count: profileInfo?.tags_count || 0
                },
                {
                  name: 'Загрузки',
                  count: profileInfo?.downloads_count || 0
                },
              ]}
            />

            <SimpleCountsList
              header='Кол-во загрузок по брендам'
              data={all__brands?.data?.brands?.map(e => { return { name: e?.name, count: e?.downloads_count } })}
            />

            <SimpleCountsList
              header='Кол-во загрузок по категориям'
              data={all__categories?.map(e => { return { name: e?.name, count: e?.downloads_count } })}
            />
          </Grid>
        </Grid>

      </Grid>
    )
  }
  else {
    return (

      <Box
        sx={tableWrapperSx}
      >
        <Box mb={'18px'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <Box mb={'18px'} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Skeleton
              variant='rounded'
              width={152}
              height={152}
              style={{ margin: '0 auto', borderRadius: '50%' }}
            />
          </Box>
          <Skeleton
            variant="rectangular"
            width={120}
            height={24}
          />
          <Skeleton
            variant="rectangular"
            width={100}
            height={20}
            style={{ marginTop: '5px' }}
          />
        </Box>

        <TableContainer
          sx={tContainerSx}
          component={Paper}
        >
          <Table size="small" aria-label="a dense table">
            <TableBody
              sx={tbodySx}
            >
              {/* {rows.map((row, index) => ( */}
              <TableRow
                // key={index}
                sx={tRowSx}
              >
                <TableCell sx={tCellSx} component="th" scope="row">
                  <Skeleton
                    variant="rectangular"
                    width={120}
                    height={24}
                  />
                </TableCell>
                <TableCell sx={tCellSx} align="right">
                  <Skeleton
                    variant="rectangular"
                    width={120}
                    height={24}
                  />
                </TableCell>
              </TableRow>

              <TableRow
                // key={index}
                sx={tRowSx}
              >
                <TableCell sx={tCellSx} component="th" scope="row">
                  <Skeleton
                    variant="rectangular"
                    width={120}
                    height={24}
                  />
                </TableCell>
                <TableCell sx={tCellSx} align="right">
                  <Skeleton
                    variant="rectangular"
                    width={120}
                    height={24}
                  />
                </TableCell>
              </TableRow>
              <TableRow
                // key={index}
                sx={tRowSx}
              >
                <TableCell sx={tCellSx} component="th" scope="row">
                  <Skeleton
                    variant="rectangular"
                    width={120}
                    height={24}
                  />
                </TableCell>
                <TableCell sx={tCellSx} align="right">
                  <Skeleton
                    variant="rectangular"
                    width={120}
                    height={24}
                  />
                </TableCell>
              </TableRow>
              <TableRow
                sx={tRowSx}
              >
                <TableCell sx={tCellSx} component="th" scope="row">
                  <Skeleton
                    variant="rectangular"
                    width={120}
                    height={24}
                  />
                </TableCell>
                <TableCell sx={tCellSx} align="right">
                  <Skeleton
                    variant="rectangular"
                    width={120}
                    height={24}
                  />
                </TableCell>
              </TableRow>

              <TableRow
                sx={tRowSx}
              >
                <TableCell sx={tCellSx} component="th" scope="row">
                  <Skeleton
                    variant="rectangular"
                    width={120}
                    height={24}
                  />
                </TableCell>
                <TableCell sx={tCellSx} align="right">
                  <Skeleton
                    variant="rectangular"
                    width={120}
                    height={24}
                  />
                </TableCell>
              </TableRow>

              <TableRow
                sx={tRowSx}
              >
                <TableCell sx={tCellSx} component="th" scope="row">
                  <Skeleton
                    variant="rectangular"
                    width={120}
                    height={24}
                  />
                </TableCell>
                <TableCell sx={tCellSx} align="right">
                  <Link target='_blank' href={profileInfo?.portfolio_link || ''}>
                    <Skeleton
                      variant="rectangular"
                      width={120}
                      height={24}
                    />
                  </Link>
                </TableCell>
              </TableRow>

              {/* ))} */}
            </TableBody>
          </Table>
        </TableContainer>

        <Grid container sx={{ width: '100%', justifyContent: "space-between" }}>
          {
            props?.of == 'designer'
              ? <>
                <Grid item md={12} xs={12} mb={'10px'}>
                  <Skeleton
                    variant="rectangular"
                    width={'100%'}
                    height={43}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <Skeleton
                    variant="rectangular"
                    width={'100%'}
                    height={43}
                  />
                </Grid>
              </>

              : <Grid item md={12} xs={12}>
                <Skeleton
                  variant="rectangular"
                  width={'100%'}
                  height={43}
                />
              </Grid>
          }
        </Grid>
      </Box>
    )
  }
}
