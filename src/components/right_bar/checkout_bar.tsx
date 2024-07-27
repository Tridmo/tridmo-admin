"use client"

import * as React from 'react'
import { Box, Button, Divider, Grid, IconButton, SxProps, Typography } from '@mui/material'
import { switch_on } from '../../data/toggle_cart';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { Close, DoneAll, ErrorOutlineSharp } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
import EmptyData from '../views/empty_data';
import { getNotifications, selectNotifications, selectNotificationsStatus } from '../../data/get_notifications';
import formatDate from '../../utils/format_date';
import { IMAGES_BASE_URL } from '../../utils/env_vars';
import { LazyLoadImage } from "react-lazy-load-image-component";
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from '@/styles/main.module.scss'
import instance from '../../utils/axios';
import { CustomTooltip } from '../tooltip';

const notificationActionMessages = {
  new_model_download: ` скачал(a) модель `,
  new__tag: ` создал(a) бирку для модель `,
}

const ContainerStyle = {
  display: "flex",
  justifyContent: "center",
  height: "100vh",
  maxWidth: "1200px",
  alignItems: "center",
}

const BgBlur = {
  position: "absolute",
  left: "0",
  top: "0",
  width: "100%",
  height: "100%",
  // background: "#fff",
  // filter: "blur(2px)"
}

const LoaderStyle = {
  // width: "100px !important",
  // height: "100px !important",
  zIndex: "10",
  position: "relative"
}


const CheckoutBar = () => {
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState);
  const notifications_status = useSelector(selectNotificationsStatus);
  const notificationsData = useSelector(selectNotifications);
  const [notifications, setNotifications] = React.useState<any[]>([]);
  const [hasMore, setHasMore] = React.useState(true);
  const [pagination, setPagination] = React.useState<any>();
  const [allSeen, setAllSeen] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (isAuthenticated) {
      dispatch(getNotifications());
    }
  }, [isAuthenticated, dispatch]);

  React.useEffect(() => {
    if (notificationsData) {
      let fetched: any[] = []
      setNotifications((prevNotifications) => {
        const existingIds = new Set(prevNotifications.map((ntf) => ntf.id));
        fetched = notificationsData.data.notifications.filter(
          (ntf) => !existingIds.has(ntf.id)
        );
        return [...prevNotifications, ...fetched];
      });
      // markAsSeenVisible(fetched.map(e => e.id))
      setPagination(notificationsData?.data?.pagination)
    }
  }, [notificationsData]);

  const markAsSeenVisible = async (arr) => {
    try {
      const res = await instance.put(`/notifications`, { notifications: arr });
    } catch (error) {
      console.error(error);
    }
  }

  const markAsSeenAll = async () => {
    try {
      const res = await instance.put(`/notifications/all`);
      if (res?.data?.success) setAllSeen(true)
    } catch (error) {
      console.error(error);
    }
  }

  const fetchMoreNotifications = async () => {
    if (pagination?.next) {
      const nextPage = pagination.next + 1;
      try {
        const res = await instance.get(
          `/notifications/?limit=${pagination?.limit}&page=${nextPage}`,
        );
        if (res?.data?.success) {
          let fetched: any[] = []
          setNotifications((prevNotifications) => {
            const existingIds = new Set(prevNotifications.map((ntf) => ntf.id));
            fetched = res.data.data.notifications.filter(
              (ntf) => !existingIds.has(ntf.id)
            );
            return [...prevNotifications, ...fetched];
          });
          // await markAsSeenVisible(fetched.map(e => e.id))
          setHasMore(res.data.data.pagination.next !== null);
          setPagination(res.data.data.pagination)
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setHasMore(false);
      }
    } else {
      setHasMore(false);
    }
  };

  const closeRightBar = () => {
    dispatch(switch_on(false));
  };

  if (notifications_status === 'succeeded') {
    return (
      <Box
        sx={{
          display: 'flex',
          padding: '24px 18px 32px 18px',
          marginBottom: '10px',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 1,
          width: '100%',
          height: '100%',
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography component="h3" sx={{ fontSize: '30px', display: 'inline-block' }}>
              Уведомления
              <Typography sx={{ fontSize: '30px', display: 'inline-block', color: '#686868' }}>
                ({`${pagination?.data_count || '0'}`})
              </Typography>
            </Typography>

            <CustomTooltip sx={{ zIndex: 1111111 }} title={'Oтметить все как прочитанное'}>
              <IconButton onClick={markAsSeenAll}>
                <DoneAll />
              </IconButton>
            </CustomTooltip>
          </Box>

          <Divider sx={{ mt: '10px', width: '100%' }} />

          <Box className={styles.hidden_scrollbar}>
            {notifications.length > 0 ? (
              <Box
                id="notifications_scroll_box"
                className={styles.hidden_scrollbar}
                sx={{
                  zIndex: 11120,
                  mt: '20px',
                  height: '87dvh',
                  overflowY: 'scroll',
                  '&::-webkit-scrollbar': {
                    width: 0,
                  },
                }}
              >
                <InfiniteScroll
                  className={styles.hidden_scrollbar}
                  style={{
                    padding: '0 6px',
                  }}
                  scrollThreshold={1}
                  scrollableTarget="notifications_scroll_box"
                  dataLength={notifications.length}
                  next={fetchMoreNotifications}
                  hasMore={hasMore}
                  loader={
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                      <CircularProgress />
                    </Box>
                  }
                  endMessage={
                    <p style={{ textAlign: 'center' }}>
                      Уведомлений больше нет
                    </p>
                  }
                  refreshFunction={() => {
                    dispatch(getNotifications());
                  }}
                  pullDownToRefresh
                  pullDownToRefreshThreshold={50}
                  pullDownToRefreshContent={
                    <h3 style={{ textAlign: 'center' }}>&#8595; Потяните вниз, чтобы обновить</h3>
                  }
                  releaseToRefreshContent={
                    <h3 style={{ textAlign: 'center' }}>&#8593; Отпустите, чтобы обновить</h3>
                  }
                >
                  {notifications.map((ntf, index) => (
                    <React.Fragment key={index}>
                      <Grid
                        item
                        xs={12}
                        sx={{
                          p: '12px 10px',
                          my: '6px',
                          position: 'relative',
                          display: 'flex',
                          justifyContent: 'start',
                          alignItems: 'center',
                          borderRadius: '4px',
                          bgcolor: ntf?.seen == true || allSeen ? '#fafafa' : '#fff',
                          boxShadow: `0px 1px 2px ${ntf?.seen == true || allSeen ? '0px' : '1px'} rgba(0, 0, 0, 0.1)`,
                          // '&:hover > .mark_read_btn': {
                          //   opacity: 1,
                          //   pointerEvents: 'all',
                          // },
                        }}
                      >
                        <LazyLoadImage
                          src={`${IMAGES_BASE_URL}/${ntf?.notifier?.image_src}`}
                          alt="image"
                          effect="blur"
                          width={46}
                          height={46}
                          placeholderSrc="/img/avatar.png"
                          delayTime={500}
                          objectFit="cover"
                          style={{
                            objectFit: 'cover',
                            borderRadius: '23px',
                          }}
                        />

                        <Box
                          sx={{
                            mx: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                          }}
                        >
                          <p>
                            <Link
                              href={`/users/${ntf?.notifier?.username}`}
                              passHref
                              onClick={() => closeRightBar()}
                              className={styles.bold_link_hover}
                            >
                              {ntf?.notifier?.full_name}
                            </Link>
                            {notificationActionMessages[ntf?.action?.name]}
                            <Link
                              href={`/${ntf?.product?.entity}/${ntf?.product?.slug}`}
                              passHref
                              onClick={() => dispatch(switch_on(false))}
                              className={styles.bold_link_hover}
                            >
                              {ntf?.product?.name}
                            </Link>
                          </p>
                        </Box>

                        <IconButton
                          className="mark_read_btn"
                          onClick={() => 'handle mark as read'}
                          sx={{
                            opacity: 0,
                            pointerEvents: 'none',
                            transition: 'all 0.4s ease',
                            top: 1,
                            right: 1,
                            position: 'absolute',
                          }}
                        >
                          <Close />
                        </IconButton>

                        <Typography
                          sx={{
                            bottom: 1,
                            right: 6,
                            position: 'absolute',
                            fontSize: '12px',
                            fontWeight: '400',
                            color: '#b6b6b6',
                          }}
                        >
                          {formatDate(ntf?.created_at, true)}
                        </Typography>
                      </Grid>
                      {/* <Divider sx={{ my: '8px', width: '100%' }} /> */}
                    </React.Fragment>
                  ))}
                </InfiniteScroll>
              </Box>
            ) : (
              <Box sx={{ margin: '36px 96px' }}>
                <EmptyData text="Нет уведомлений" boxShadow={false} border={false} />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        display: "flex",
        padding: "24px 24px 32px 24px",
        marginBottom: "10px",
        flexDirection: "column",
        justifyContent: "space-between",
        flex: 1,
        width: "100%",
        //  gap: "16px",
        height: "100%"
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            component="h3"
            sx={{
              fontSize: "30px",
              display: "inline-block",
            }}
          >
            Уведомления
            <Typography sx={{ fontSize: "30px", display: "inline-block", color: "#686868" }}>
              ({`${pagination?.data_count || "0"}`})
            </Typography>
          </Typography>

          <CustomTooltip sx={{ zIndex: 1111111 }} title={'Oтметить все как прочитанное'}>
            <IconButton
              onClick={() => 'handle mark all as read'}
            >
              <DoneAll />
            </IconButton>
          </CustomTooltip>
        </Box>

        <Divider
          sx={{
            mt: "10px",
            width: "100%",
          }}
        />
        {/* Map every single model */}

      </Box>
      <Box sx={BgBlur} />
      <Box>
        <Box sx={ContainerStyle}>
          <CircularProgress sx={LoaderStyle} />
        </Box>
      </Box>
    </Box>
  )
}
export default CheckoutBar


{/* <Grid container>
                  {notifications?.data?.notifications?.map((ntf: any, index: number) => {
                    return (
                      <>
                        <Grid
                          key={index}
                          item
                          xs={12}
                          sx={{
                            p: "12px 10px",
                            position: 'relative',
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "center",
                            borderRadius: "4px",
                            // border: "1px solid #E0E0E0",
                            '&:hover > .mark_read_btn': {
                              opacity: 1,
                              pointerEvents: 'all'
                            }
                          }}
                        >
                           <Image
                            // src={`${IMAGES_BASE_URL}/${ntf?.product?.cover?.[0]?.image_src}`}
                            src={`${IMAGES_BASE_URL}/${ntf?.notifier?.image_src}`}
                            width={46}
                            height={46}
                            objectFit='cover'
                            alt="Model"
                            style={{ borderRadius: '23px' }}
                          /> 
                          <LazyLoadImage
                            src={`${IMAGES_BASE_URL}/${ntf?.notifier?.image_src}`}
                            alt="image"
                            effect="blur"
                            width={46}
                            height={46}
                            placeholderSrc={"/img/avatar.png"}
                            delayTime={500}
                            objectFit={'cover'}
                            style={{
                              objectFit: 'cover',
                              borderRadius: '23px'
                            }}
                          />

                          <Box
                            sx={{
                              mx: "10px",
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'flex-start',
                            }}
                          >
                            <Link href={`/users/${ntf?.notifier?.username}`} passHref>
                              <SimpleTypography
                                text={ntf?.notifier?.full_name}
                                sx={{
                                  mx: '4px', // Add margin to create spacing
                                  '&:hover': {
                                    cursor: "pointer",
                                    color: "#7210BE",
                                  },
                                }}
                                onClick={() => closeRightBar()}
                              />
                            </Link>
                            <SimpleTypography
                              text={notificationActionMessages[ntf?.action?.name]}
                              className='badge__title'
                              sx={{
                                mx: '4px', // Add margin to create spacing
                              }}
                            />
                            <Link href={`/${ntf?.product?.entity}/${ntf?.product?.slug}`} passHref>
                              <SimpleTypography
                                text={ntf?.product?.name}
                                sx={{
                                  mx: '4px', // Add margin to create spacing
                                  '&:hover': {
                                    cursor: "pointer",
                                    color: "#7210BE",
                                  },
                                }}
                                onClick={() => dispatch(switch_on(false))}
                              />
                            </Link>
                          </Box>

                          <IconButton
                            className='mark_read_btn'
                            onClick={() => 'handle mark as read'}
                            sx={{
                              opacity: 0,
                              pointerEvents: 'none',
                              transition: 'all 0.4s ease',
                              top: 1,
                              right: 1,
                              position: 'absolute',
                            }}
                          >
                            <Close />
                          </IconButton>

                          <Typography
                            sx={{
                              bottom: 1,
                              right: 6,
                              position: 'absolute',
                              fontSize: "12px",
                              fontWeight: "400",
                              color: "#b6b6b6",
                            }}
                          >
                            {formatDate(ntf?.created_at, true)}
                          </Typography>

                          <Box sx={{
                          display: "flex",
                          flex: 1,
                          justifyContent: "center",
                          alignItems: 'center',
                          "&:hover": {
                            background: "#F5F5F5",
                            cursor: "pointer",
                          },
                          ml: "10px",
                          width: "36px",
                          height: "36px",
                        }}
                        >

                          {
                            (deleteItem.status || notifications_status !== "succeeded") && (model?.id === deleteItem?.model_id) ?
                              <CircularProgress size="20px" /> :
                              <Image
                                src={"/img/delete-bin-line.svg"}
                                style={{ marginLeft: "20px", padding: "9.67px" }}
                                width={24}
                                height={24}
                                alt="Model card"
                              />
                          }
                        </Box>
                        </Grid>
                        <Divider
                          sx={{
                            my: "8px",
                            width: "100%",
                          }}
                        />
                      </>
                    )
                  })
                  }

                </Grid> */}