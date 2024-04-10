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

interface ProfileProps {
    of: 'designer' | 'own'
}

export default function ProfileInfo(props: ProfileProps) {
    const router = useRouter()
    const getProfileStatus = useSelector((state: any) => props?.of == 'designer' ? state?.get_designer?.status : state?.get_profile?.status)
    const dispatch = useDispatch()

    const profileInfo = useSelector(props?.of == 'designer' ? selectDesignerProfile : selectMyProfile)

    const wrapperSx: SxProps = {
        display: 'flex',
        flexDirection: 'column',
        width: '400px',
    }
    const tableWrapperSx: SxProps = {
        backgroundColor: '#fff',
        border: '1px solid #E0E0E0',
        display: 'flex',
        flexDirection: 'column',
        padding: '32px 24px',
        width: '100%',
        marginBottom: '16px'
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


    if (getProfileStatus == 'succeeded') {
        return (
            <Box
                sx={wrapperSx}
            >
                <Box
                    sx={tableWrapperSx}
                >
                    <Box mb={'18px'}>
                        <Box mb={'18px'} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Image
                                width={152}
                                height={152}
                                alt="avatar"
                                style={{ objectFit: "cover", margin: '0 auto', borderRadius: '50%' }}
                                src={profileInfo?.image_src ? `${IMAGES_BASE_URL}/${profileInfo?.image_src}` : '/img/avatar.png'}
                            />
                        </Box>
                        <SimpleTypography sx={{
                            fontSize: '22px',
                            fontWeight: '500',
                            lineFeight: '26px',
                            letterSpacing: '-0.02em',
                            textAlign: 'center',
                        }} text={profileInfo?.username} />

                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <SimpleTypography sx={{
                                color: '#3C9154',
                                fontSize: '16px',
                                fontWeight: '400',
                                textAlign: 'left',
                                marginRight: '3px'
                            }} text={`Репутация:`} />

                            <SimpleTypography sx={{
                                color: '#3C9154',
                                fontSize: '16px',
                                fontWeight: '600',
                                textAlign: 'left',
                            }} text={profileInfo?.designs_count} />
                        </Box>
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
                                        <SimpleTypography
                                            text={"ФИО"}
                                            className="table__text"
                                        />
                                    </TableCell>
                                    <TableCell sx={tCellSx} align="right">
                                        <SimpleTypography
                                            text={profileInfo?.full_name}
                                            className="table__text_info"
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow
                                    // key={index}
                                    sx={tRowSx}
                                >
                                    <TableCell sx={tCellSx} component="th" scope="row">
                                        <SimpleTypography
                                            text={"Дата регистрации"}
                                            className="table__text"
                                        />
                                    </TableCell>
                                    <TableCell sx={tCellSx} align="right">
                                        <SimpleTypography
                                            text={formatDate(profileInfo?.created_at)}
                                            className="table__text_info"
                                        />
                                    </TableCell>
                                </TableRow>
                                {
                                    props?.of == 'own'
                                        ? <TableRow
                                            // key={index}
                                            sx={tRowSx}
                                        >
                                            <TableCell sx={tCellSx} component="th" scope="row">
                                                <SimpleTypography
                                                    text={"Электрон Почта"}
                                                    className="table__text"
                                                />
                                            </TableCell>
                                            <TableCell sx={tCellSx} align="right">
                                                <SimpleTypography
                                                    text={profileInfo?.email}
                                                    className="table__text_info"
                                                />
                                            </TableCell>
                                        </TableRow>
                                        : null
                                }
                                <TableRow
                                    sx={tRowSx}
                                >
                                    <TableCell sx={tCellSx} component="th" scope="row">
                                        <SimpleTypography
                                            text={"Дата рождения"}
                                            className="table__text"
                                        />
                                    </TableCell>
                                    <TableCell sx={tCellSx} align="right">
                                        <SimpleTypography
                                            text={profileInfo?.birth_date ? formatDate(profileInfo?.birth_date) : ""}
                                            className="table__text_info"
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow
                                    sx={tRowSx}
                                >
                                    <TableCell sx={tCellSx} component="th" scope="row">
                                        <SimpleTypography
                                            text={"Адрес"}
                                            className="table__text"
                                        />
                                    </TableCell>
                                    <TableCell sx={tCellSx} align="right">
                                        <SimpleTypography
                                            text={profileInfo?.address || ''}
                                            className="table__text_info"
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow
                                    sx={tRowSx}
                                >
                                    <TableCell sx={tCellSx} component="th" scope="row">
                                        <SimpleTypography
                                            text={"Портфолио"}
                                            className="table__text"
                                        />
                                    </TableCell>
                                    <TableCell sx={tCellSx} align="right">
                                        <Link target='_blank' href={profileInfo?.portfolio_link || ''}>
                                            <SimpleTypography
                                                text={profileInfo?.portfolio_link || ''}
                                                className="table__text_info"
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
                                        {
                                            profileInfo?.telegram
                                                ? <Link target="_blank" href={`https://t.me/${profileInfo?.telegram}`}>
                                                    <Buttons
                                                        sx={{ width: '100%' }}
                                                        className='bookmark__btn'
                                                        name="Связаться через Telegram"
                                                        childrenFirst={true}
                                                    >
                                                        <Image
                                                            width={19}
                                                            height={23}
                                                            alt="web"
                                                            src={"/icons/telegram-logo.svg"}
                                                        />
                                                    </Buttons>
                                                </Link>
                                                : <Buttons
                                                    sx={{ width: '100%' }}
                                                    className='bookmark__btn--disabled'
                                                    name="Связаться через Telegram"
                                                    childrenFirst={true}
                                                >
                                                    <Image
                                                        width={19}
                                                        height={23}
                                                        alt="web"
                                                        src={"/icons/telegram-logo.svg"}
                                                    />
                                                </Buttons>
                                        }
                                    </Grid>
                                    <Grid item md={12} xs={12}>
                                        {
                                            profileInfo?.phone
                                                ? <Link href={`tel:${profileInfo?.phone}`}>
                                                    <Buttons
                                                        sx={{ width: '100%' }}
                                                        className='bookmark__btn'
                                                        name="Связаться по телефону"
                                                        childrenFirst={true}
                                                    >
                                                        <Image
                                                            width={19}
                                                            height={23}
                                                            alt="Phone number"
                                                            src={"/icons/phone.svg"}
                                                        />
                                                    </Buttons>
                                                </Link>
                                                : <Buttons
                                                    sx={{ width: '100%' }}
                                                    className='bookmark__btn--disabled'
                                                    name="Связаться по телефону"
                                                    childrenFirst={true}
                                                >
                                                    <Image
                                                        width={19}
                                                        height={23}
                                                        alt="Phone number"
                                                        src={"/icons/phone.svg"}
                                                    />
                                                </Buttons>
                                        }
                                    </Grid>
                                </>

                                : <Grid item md={12} xs={12}>
                                    <Buttons
                                        sx={{ width: '100%' }}
                                        className='bookmark__btn'
                                        name="Редактировать"
                                        childrenFirst={true}
                                        onClick={() => {
                                            dispatch(setProfileEditState(true))
                                            dispatch(setOpenModal(true))
                                        }}
                                    >
                                        <Image
                                            width={16}
                                            height={16}
                                            alt="Phone number"
                                            src={"/icons/edit.svg"}
                                        />
                                    </Buttons>
                                </Grid>
                        }
                    </Grid>
                </Box>

                {
                    props?.of == 'own'
                        ? <Grid container sx={{ width: '100%', justifyContent: "space-between" }}>


                            <Grid item md={12} xs={12}>
                                <Buttons
                                    name="Новый проект"
                                    childrenFirst={true}
                                    className="upload__btn"
                                    sx={{ width: '100%' }}
                                    onClick={() => router.push('/interiors/addnew')}
                                >
                                    <Image
                                        alt="upload icon"
                                        src='/icons/plus-white.svg'
                                        width={13}
                                        height={13}
                                    />
                                </Buttons>
                            </Grid>

                        </Grid>

                        : null
                }

            </Box>
        )
    }
    else {
        return (
            <Box
                sx={wrapperSx}
            >
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

                {
                    props?.of == 'own'
                        ? <Grid container sx={{ width: '100%', justifyContent: "space-between" }}>


                            <Grid item md={12} xs={12}>
                                <Buttons
                                    name="Новый проект"
                                    childrenFirst={true}
                                    className="upload__btn"
                                    sx={{ width: '100%' }}
                                    onClick={() => router.push('/interiors/addnew')}
                                >
                                    <Image
                                        alt="upload icon"
                                        src='/icons/plus-white.svg'
                                        width={13}
                                        height={13}
                                    />
                                </Buttons>
                            </Grid>

                        </Grid>

                        : null
                }

            </Box>
        )
    }
}
