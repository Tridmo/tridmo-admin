"use client"

import React, { CSSProperties, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Box, FormControl, MenuItem, Skeleton, SxProps, List, ListItem, ListItemText, Grid } from '@mui/material';
import SimpleSelect from '../../inputs/simple_select';
import { MonthsSelect, YearsSelect } from '../../inputs/date_select';
import { months } from '../../../types/variables';
import { useSelector } from '../../../store';
import { useDispatch } from 'react-redux';
import { getDownloadsChart, selectDownloadsChart, selectDownloadsChartStatus, selectModelDownloadsStats, selectModelDownloadsStatsStatus } from '../../../data/statistics/get_downloads_stats';
import { selectMyProfile } from '../../../data/me';
import { lineChartOptions } from '../../../types/charts.config';
import { getTagsChart, selectModelTagsStats, selectModelTagsStatsStatus, selectTagsChart, selectTagsChartStatus } from '../../../data/statistics/get_tags_stats';
import { getModelDownloadsStats } from '../../../data/statistics/get_downloads_stats';
import { getModelTagsStats } from '../../../data/statistics/get_tags_stats';
import { selectOneModel } from '../../../data/get_one_model';
import SearchInput from '../../inputs/search';
import { getModelDownloaders, selectModelDownloaders, selectModelDownloadersStatus } from '../../../data/get_all_designers';
import { set_model_downloaders_name } from '../../../data/handle_filters';
import SimpleTypography from '../../typography';
import { IMAGES_BASE_URL } from '../../../utils/env_vars';
import Link from 'next/link';
import Image from 'next/image';
import BasicPagination from '../../pagination/pagination';
import EmptyData from '../empty_data';
import formatDate from '../../../utils/format_date';
import Buttons from '../../buttons';
import { RateReview, SmsOutlined } from '@mui/icons-material';
import { chatApi, setChatToken } from '../../../utils/axios';
import Cookies from 'js-cookie';
import { selectChatToken } from '../../../data/get_chat_token';
import { setSelectedConversation } from '../../../data/chat';
import { useRouter } from 'next/navigation';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

const fake = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const liHeaderTextSx = {
  fontSize: '11px',
  fontWeight: 700,
  lineHeight: '16px',
  letterSpacing: '0.05em',
  textAlign: 'start',
  color: '#686868',
  textTransform: 'uppercase'
}

const modelImageWrapperSx: SxProps = {
  backgroundColor: '#fff',
  // border: '1px solid #E0E0E0',
  // borderRadius: '8px',
  width: '36px',
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
}

const modelImageSx: CSSProperties = {
  width: '100% !important',
  height: '100% !important',
  borderRadius: '18px',
  objectFit: 'contain'
}

const liSx: SxProps = {
  justifyContent: 'flex-start',
  padding: '16px',
  backgroundColor: '#fff',
  transition: '0.4s all ease',
  borderBottom: '2px solid #f5f5f5',

  // '&:hover': {
  //   zIndex: '10',
  //   backgroundColor: '#fff',
  //   boxShadow: '0px 3px 4px 0px #00000014',
  //   borderColor: 'transparent',
  // },
  '&:hover .brand_name': {
    color: '#0646E6 !important',
  },
}

const liHeaderSx: SxProps = {
  display: 'flex',
  backgroundColor: '#fff',
  padding: '10px 0px',
  borderBottom: '2px solid #f5f5f5',
}

const listSx: SxProps = {
  width: '100%',
  backgroundColor: '#fff',
  boxShadow: '0px 3px 4px 0px #00000014',
  borderRadius: '4px',
  padding: '24px',
}


const widthControl = {

  '&:nth-of-type(1)': {
    minWidth: '50%',
    maxWidth: '50%',
  },
  '&:nth-of-type(2)': {
    minWidth: '25%',
    maxWidth: '25%',
  },
  '&:nth-of-type(3)': {
    minWidth: '30%',
    maxWidth: '30%',
  },
}

interface Props {
  title?: string;
}

export default function ModelDownloadersList({ title }: Props) {

  const dispatch = useDispatch<any>()
  const router = useRouter()
  const downloadsDataStatus = useSelector(selectModelDownloadsStatsStatus)
  const downloadsData = useSelector(selectModelDownloadsStats)
  const tagsDataStatus = useSelector(selectModelTagsStatsStatus)
  const tagsData = useSelector(selectModelTagsStats)
  const downloadersData = useSelector(selectModelDownloaders)
  const downloadersStatus = useSelector(selectModelDownloadersStatus)
  const getUsersNameFilter = useSelector((state: any) => state?.handle_filters?.model_downloaders_name)
  const getUsersOrderBy = useSelector((state: any) => state?.handle_filters?.model_downloaders_orderby)
  const getUsersOrder = useSelector((state: any) => state?.handle_filters?.model_downloaders_order)
  const profile = useSelector(selectMyProfile)
  const model = useSelector(selectOneModel)
  const chatToken = useSelector(selectChatToken)

  const [isMonthly, setIsMonthly] = useState<boolean>(true)
  const [selectedYear, setSelectedYear] = useState<any>(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState<any>(new Date().getMonth() + 1)

  function handleMonthSelect(month) {
    setSelectedMonth(month)
    dispatch(getModelDownloadsStats({ year: selectedYear, month, brand_id: profile?.brand?.id, model_id: model?.id }))
    dispatch(getModelTagsStats({ year: selectedYear, month, brand_id: profile?.brand?.id, model_id: model?.id }))
  }
  function handleYearSelect(year) {
    setSelectedYear(year)
    dispatch(getModelDownloadsStats({ year, month: selectedMonth, brand_id: profile?.brand?.id, model_id: model?.id }))
    dispatch(getModelTagsStats({ year, month: selectedMonth, brand_id: profile?.brand?.id, model_id: model?.id }))
  }

  function handleSearch(searchValue) {
    dispatch(getModelDownloaders({
      model_id: model?.id,
      key: searchValue,
      orderBy: getUsersOrderBy,
      order: getUsersOrder,
    }))
    dispatch(set_model_downloaders_name(searchValue))
  }

  async function handleCreateConversation(user) {

    setChatToken(Cookies.get('chatToken') || chatToken)

    chatApi.post(`/conversations`, {
      members: [user?.id]
    })
      .then(res => {
        dispatch(setSelectedConversation(res?.data?.id))
        router.push('/chat')
      })
  }

  return (
    <Box
      sx={{
        width: '100%'
      }}
    >
      <List
        sx={listSx}
      >
        <ListItem alignItems="center"
          key={-3}
          sx={{ ...liHeaderSx, borderRadius: '4px' }}
        >
          <h3 style={{ margin: 0 }}>{title || `Пользователи, которые скачали (${downloadersData?.pagination?.data_count})`}</h3>
        </ListItem>

        <ListItem alignItems="center"
          key={-2}
          sx={{ ...liHeaderSx }}
        >
          <Grid width={'100%'} container justifyContent={'space-between'}>
            <Grid item>
              <FormControl>
                <SearchInput
                  placeHolder='Поиск'
                  startIcon
                  // value={get_downloader_name}
                  search={(s) => handleSearch(s)}
                  sx={{
                    borderColor: '#B8B8B8',
                    padding: '6px 12px',
                    backgroundColor: '#fff',
                    width: 'auto'
                  }}
                />
              </FormControl>
            </Grid>

          </Grid>
        </ListItem>

        <ListItem alignItems="center"
          key={-1}
          sx={liHeaderSx}
        >
          <SimpleTypography
            text='Пользователь'
            sx={{ ...liHeaderTextSx, ...widthControl }}
          />
          <SimpleTypography
            text='Дата загрузки'
            sx={{ ...liHeaderTextSx, ...widthControl }}
          />
          <SimpleTypography
            text='Действия'
            sx={{ ...liHeaderTextSx, ...widthControl }}
          />
        </ListItem>
        {
          downloadersStatus == 'succeeded' ?
            downloadersData?.users && downloadersData?.users?.length != 0 ?

              <>
                {
                  downloadersData?.users?.map((user, index: any) =>
                    <ListItem key={index} alignItems="center"
                      sx={liSx}
                    >

                      <ListItemText
                        // title='Нажмите, чтобы открыть'
                        sx={{
                          ...widthControl,
                          '& > span:first-of-type': {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start'
                          }
                        }}
                      >
                        <Box
                          sx={{
                            ...modelImageWrapperSx,
                            '&:hover:after': {
                              opacity: '1'
                            },
                            '&::after': {
                              bgcolor: '#fff',
                              backgroundImage: user?.image_src ? `url(${IMAGES_BASE_URL}/${user?.image_src})` : `url(/img/avatar.png)`,
                              transition: 'opacity 0.3s ease',
                              zIndex: 3000,
                              backgroundRepeat: 'no-repeat',
                              backgroundSize: 'cover',
                              content: '""',
                              display: 'flex',
                              pointerEvents: 'none',
                              opacity: '0',
                              border: '1px solid #B8B8B8',
                              borderRadius: '4px',
                              width: '200px',
                              height: '200px',
                              position: 'absolute',
                              top: '-160',
                              left: '100%',
                            }
                          }}
                        >
                          <Image
                            src={user?.image_src ? `${IMAGES_BASE_URL}/${user?.image_src}` : '/img/avatar.png'}
                            alt='Landing image'
                            width={36}
                            height={36}
                            style={modelImageSx}
                          />
                        </Box>


                        <Link href={`/users/${user?.username}`} style={{ marginLeft: '12px', width: '100%' }} >
                          <SimpleTypography
                            hoverTitle={user?.full_name}
                            text={user?.full_name}
                            className='card__title'
                            sx={{
                              fontSize: '16px',
                              fontWeight: 400,
                              textAlign: 'start',
                              color: '#141414'
                            }}
                          />
                          <SimpleTypography
                            hoverTitle={user?.username}
                            text={`@${user?.username}`}
                            sx={{
                              fontSize: '12px',
                              fontWeight: 400,
                              textAlign: 'start',
                              color: '#848484'
                            }}
                          />
                        </Link>
                      </ListItemText>

                      <ListItemText
                        sx={{ ...widthControl }}
                      >
                        <SimpleTypography
                          text={formatDate(user?.downloaded_at, true)}
                          sx={{
                            fontSize: '12px',
                            fontWeight: 400,
                            lineHeight: '24px',
                            letterSpacing: '-0.01em',
                            textAlign: 'start',
                            color: '#848484'
                          }}
                        />
                      </ListItemText>

                      <ListItemText
                        sx={{ ...widthControl }}
                      >
                        <Buttons
                          onClick={() => handleCreateConversation(user)}
                          sx={{ padding: '10px !important' }}
                          className='login__btn'
                          name="Написать"
                          childrenFirst={true}
                        >
                          <SmsOutlined sx={{ width: '20px', height: '20px', mr: '8px' }} />
                        </Buttons>
                      </ListItemText>

                    </ListItem>
                  )
                }
                <Box sx={{
                  ...liHeaderSx,
                  justifyContent: 'center',
                  border: 'none',
                  borderBottomLeftRadius: '4px',
                  borderBottomRightRadius: '4px',
                }}>
                  <BasicPagination
                    dataSource='model_downloaders'
                    dataId={model?.id}
                    count={downloadersData?.pagination?.pages}
                    page={parseInt(downloadersData?.pagination?.current) + 1}
                  />
                </Box>
              </>
              : <EmptyData sx={{ marginTop: '8px' }} />
            :
            <>
              {
                fake?.map((i) =>
                  <Box key={i}>
                    <ListItem key={i} alignItems="center"
                      sx={liSx}
                    >

                      <ListItemText sx={{
                        ...widthControl,
                        '& > span:first-of-type': {
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-start'
                        }
                      }}>
                        <Skeleton
                          variant="rectangular"
                          width={36}
                          height={36}
                        />
                        <Box sx={{ marginLeft: '24px' }}>
                          <Skeleton
                            variant="rectangular"
                            width={100}
                            height={16}
                            sx={{ marginBottom: '5px' }}
                          />
                          <Skeleton
                            variant="rectangular"
                            width={80}
                            height={14}
                          />
                        </Box>
                      </ListItemText>

                      <ListItemText sx={{ ...widthControl }} >
                        <Skeleton
                          variant="rectangular"
                          width={56}
                          height={20}
                        />
                      </ListItemText>

                    </ListItem>
                  </Box>
                )
              }
            </>
        }
      </List>
    </Box >
  );
};