import { Grid, Table, TableBody, TableCell, TableContainer, Box, TableRow, Paper, Skeleton, SxProps } from '@mui/material';
import SimpleTypography from '../../../typography';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

import Link from 'next/link';
import Buttons from '../../../buttons';
import { useRouter } from 'next/navigation';
import { sampleUser } from '@/data/samples';
import { selectDesignerProfile } from '../../../../data/get_designer';
import { selectMyProfile } from '../../../../data/me';
import { IMAGES_BASE_URL } from '../../../../utils/image_src';
import { setProfileEditState, setOpenModal } from '../../../../data/modal_checker';
import formatDate from '../../../../utils/format_date';
import CountsGrid from '../../statistics/counts_component';
import BrickDataGrid from '../../../bricks_grid';
import UserDownloadsList from '../downloads_list';
import UserInteriorsList from '../interiors_list';
import { selectCategoriesByUserDownloads } from '../../../../data/categories';
import SimpleCountsList from '../simple_counts_list';
import { selectAllBrandsByUserDownloads } from '../../../../data/get_brands_by_user_downloads';

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
  const dispatch = useDispatch()
  const getProfileStatus = useSelector((state: any) => props?.of == 'designer' ? state?.get_designer?.status : state?.get_profile?.status)
  const profileInfo = useSelector(props?.of == 'designer' ? selectDesignerProfile : selectMyProfile)
  const all__categories = useSelector(selectCategoriesByUserDownloads)
  const all__brands = useSelector(selectAllBrandsByUserDownloads)

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
            </Grid>

            <Grid item xs={12}>
              <BrickDataGrid
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
