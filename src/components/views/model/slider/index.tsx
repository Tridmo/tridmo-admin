import React, { useEffect, useRef, useState } from 'react'
import { Grid, List, styled, ListItem, Breadcrumbs } from '@mui/material';
import Image from 'next/image';
import Buttons from '../../../buttons';
import { useDispatch, useSelector } from 'react-redux';
import { getOneModel, selectOneModel } from '../../../../data/get_one_model';
import { setShowModelsModal } from '../../../../data/loader'
import { Box, SxProps } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';
import SimpleTypography from '../../../typography';
import { sampleModel } from '@/data/samples/sample_model';
import { IMAGES_BASE_URL } from '../../../../utils/image_src';
import { selectMyProfile } from '../../../../data/me';
import instance from '../../../../utils/axios';
import { setLoginState, setOpenModal } from '../../../../data/modal_checker';
import { toast } from 'react-toastify';

const mainWidth = 558;

const SimpleListItem = styled(ListItem)(
    ({ theme }) => `
        width: 56px;
        height: 56px;   
        border: 1px solid #e0e0e0;
        padding: 0;
        cursor: pointer;

        &.MuiListItem-slider__item--active{
            border-color: #7210be;
        }

      

        &.MuiListItem-slider__big--item{
            width: 100%;
            height: ${mainWidth}px;
            border: none;

            &:hover{
                
            }
        }
  `
);

const SimpleImage = styled(Image)(
    ({ theme }) => `
            position: absolute;
            inset: 0px;
            box-sizing: border-box;
            padding: 0px;
            border: none;
            margin: auto;
            display: block;
            width: 0px;
            height: 0px;
            min-width: 100%;
            max-width: 100%;
            min-height: 100%;
            max-height: 100%;
            object-fit: contain;
    `
)
const myLoader = () => {
    return `/img/card-loader.jpg`
}

const fakeModelImages = [1, 2, 3, 4, 5]

const SimpleSlider = ({ name }: any) => {
    const [sliderBtnHover, setSliderBtnHover] = useState(0)
    const dispatch = useDispatch<any>()

    const simpleModel = useSelector(selectOneModel);
    const currentUser = useSelector(selectMyProfile);
    const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
    const simple_model_status = useSelector((state: any) => state?.get_one_model?.status);

    const matches = useMediaQuery('(max-width:600px)');
    const [sliderCount, setSliderCount] = React.useState(0)
    const [sliderTransition, setSliderTransition] = React.useState(0.4)
    const [isSaved, setIsSaved] = useState<any>(false)

    useEffect(() => {
        if (simpleModel && isAuthenticated && currentUser) {
            setIsSaved(simpleModel?.is_saved)
        }
    }, [isAuthenticated, currentUser, simpleModel])

    const handleSave = () => {

        if (!isAuthenticated) {
            dispatch(setLoginState(true))
            dispatch(setOpenModal(true))
            return;
        }

        if (!isSaved) {
            setIsSaved(true)
            instance.post(
                '/saved/models',
                { model_id: simpleModel?.id }
            ).then(res => {
                setIsSaved(res?.data?.success)
                // toast.success(res?.data?.message)
            }).catch(err => {
                setIsSaved(false)
                // toast.error(err?.response?.data?.message)
            })
        }
        else if (isSaved) {
            setIsSaved(false)
            instance.delete(
                '/saved/models/' + simpleModel?.id
            ).then(res => {
                setIsSaved(!res?.data?.success)
                // toast.success(res?.data?.message)
            }).catch(err => {
                setIsSaved(true)
                // toast.error(err?.response?.data?.message)
            })
        }
    };


    function SliderRightHandler() {
        if (sliderCount < simpleModel?.images?.length - 1) {
            setSliderCount(sliderCount + 1)
        }
    }

    function SliderLeftHandler() {
        if (sliderCount >= 1) {
            setSliderCount(sliderCount - 1)
        }
    }

    const wdth = name === "slider" && !matches ? mainWidth : name !== "slider" ? 720 : window.innerWidth

    const ButtonHover = {
        opacity: sliderBtnHover
    }

    if ("succeeded") {
        return (
            <>
                <Grid
                    sx={
                        name === "slider" ? {
                            display: "flex",
                            flexDirection: "unset",
                            marginTop: "20px",
                            maxWidth: '55.5% !important',
                        } : {
                            display: "flex",
                            flexDirection: "column-reverse"
                        }
                    }
                    container={name === "slider" ? true : false}
                    spacing={name === "slider" ? 2 : 1}
                    item
                    md={name === "slider" ? 6 : 12}
                    xs={12}
                    className="products__slider"
                >
                    <Grid
                        className='products__small--wrap'
                        sx={name === "slider" ?
                            {
                                padding: "0 !important",
                                margin: "0 16px 0 18px !important",
                                height: `${wdth}px !important`,
                                maxWidth: '56px !important'
                            }
                            : {
                                padding: "11px !important",
                                display: "flex",
                                justifyContent: "center"
                            }}
                        item
                        md={name === "slider" ? 2 : 12}
                        xs={12}
                    >
                        <List
                            className='products__small-items'
                            sx={{ display: `${name === "slider" ? "block" : "flex"}`, paddingTop: 0 }}
                        >
                            {
                                simpleModel?.images?.map((slide: any, index: number) => (
                                    <SimpleListItem
                                        sx={name === "slider" ? { margin: "0 0 8px 0" } : { margin: "0 8px 0 0" }}
                                        className={`${sliderCount == index ? "MuiListItem-slider__item--active products__small--item" : "products__small--item"}`}
                                        onClick={() => setSliderCount(index)}
                                        key={index}
                                    >
                                        <Image
                                            width={56}
                                            height={56}
                                            style={{
                                                width: '100%',
                                                height: '100%'
                                            }}
                                            priority={true}
                                            alt="slider"
                                            src={`${IMAGES_BASE_URL}/${slide?.image_src}`}
                                        />
                                    </SimpleListItem>
                                ))
                            }

                        </List>
                    </Grid>

                    <Grid
                        sx={name === "slider" ?
                            {
                                overflow: "hidden",
                                position: "relative",
                                padding: "0 !important",
                                minWidth: `${wdth}px !important`,
                                maxHeight: `${wdth}px !important`
                            }
                            : {
                                padding: "0 !important",
                                overflow: "hidden"
                            }
                        }
                        item
                        xs={12}
                        md={name === "slider" ? 10 : 12}
                        onMouseEnter={() => setSliderBtnHover(1)}
                        onMouseLeave={() => setSliderBtnHover(0)}
                    >
                        <Box sx={ButtonHover}>
                            <Buttons
                                onClick={SliderRightHandler}
                                type="button"
                                className="slider__right--arrow"
                                name=""
                            >
                                <Image
                                    alt="Icons"
                                    src="/icons/slider-arrow-right.svg"
                                    width={9}
                                    height={14}
                                />
                            </Buttons>
                        </Box>
                        <Box sx={ButtonHover}>
                            <Buttons
                                onClick={SliderLeftHandler}
                                type="button"
                                className="slider__left--arrow"
                                name=""
                            >
                                <Image
                                    alt="Icons"
                                    src="/icons/slider-arrow-left.svg"
                                    width={9}
                                    height={14}
                                />
                            </Buttons>
                        </Box>
                        <List sx={{
                            transform: `translateX(-${sliderCount * wdth}px)`,
                            padding: "0 !important",
                            display: "flex",
                            position: 'relative',
                            width: `${simpleModel?.images?.length * wdth}px`,
                            transition: `all ${sliderTransition}s ease`
                        }}>
                            {
                                simpleModel?.images?.map((slide: any, index: number) => (
                                    <SimpleListItem
                                        className="MuiListItem-slider__big--item"
                                        onClick={(e) => { dispatch(setShowModelsModal(true)) }}
                                        key={index}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <SimpleImage
                                            alt=''
                                            layout='fill'
                                            sx={{ objectFit: name == 'slider' ? 'cover' : 'contain' }}
                                            src={`${IMAGES_BASE_URL}/${slide?.image_src}`}
                                            priority={true}
                                        />
                                    </SimpleListItem>
                                ))
                            }

                        </List>
                    </Grid>

                    {
                        name === "slider" ?

                            <Buttons
                                name={isSaved ? 'Сохранено' : 'Сохранить'}
                                className='bookmark__btn'
                                childrenFirst={true}
                                onClick={handleSave}
                                sx={{
                                    marginLeft: '90px',
                                    // position: 'absolute'
                                }}
                            >
                                <Image
                                    alt='bookmark'
                                    width={18}
                                    height={18}
                                    src={isSaved ? '/icons/bookmark-full.svg' : '/icons/bookmark-line.svg'}
                                />
                            </Buttons>

                            : null
                    }

                </Grid>
            </>
        )
    } else {
        return (
            <>
                <Grid
                    sx={
                        name === "slider" ? {
                            display: "flex",
                            flexDirection: "unset",
                            marginTop: "20px"
                        } : {
                            display: "flex",
                            flexDirection: "column-reverse"
                        }
                    }
                    container={name === "slider" ? true : false}
                    spacing={name === "slider" ? 2 : 1}
                    item
                    xs={name === "slider" ? 6 : 12}
                >
                    <Grid
                        sx={name === "slider" ? { padding: "0 0 0 18px !important" } :
                            {
                                padding: "11px !important",
                                display: "flex",
                                justifyContent: "center"
                            }
                        }
                        xs={name === "slider" ? 2 : 12}
                        item
                    >
                        <List
                            sx={{
                                padding: "0 !important",
                                display: `${name === "slider" ? "block" : "flex"}`
                            }}
                        >
                            {
                                fakeModelImages.map((slide: any, index: number) => (
                                    <SimpleListItem
                                        sx={name === "slider" ? { margin: "0 0 8px 0" } : { margin: "0 8px 0 0" }}
                                        className={`${sliderCount == index ? "MuiListItem-slider__item--active" : ""}`}
                                        onClick={() => setSliderCount(index)}
                                        key={index}
                                    >
                                        <Image
                                            loader={myLoader}
                                            width={56}
                                            height={56}
                                            alt="slider"
                                            src={`/img/card-loader.jpg`}
                                        />
                                    </SimpleListItem>
                                ))
                            }

                        </List>
                    </Grid>
                    <Grid
                        sx={name === "slider" ?
                            { overflow: "hidden", position: "relative", padding: "0 0 18px 0 !important" } : { padding: "0 !important", overflow: "hidden" }}
                        item
                        xs={name === "slider" ? 10 : 12}
                    >
                        <Buttons
                            onClick={SliderRightHandler}
                            type="button"
                            className="slider__right--arrow"
                            name=""
                        >
                            <Image
                                alt="Icons"
                                src="/icons/slider-arrow-right.svg"
                                width={9}
                                height={14}
                            />
                        </Buttons>
                        <Buttons
                            onClick={SliderLeftHandler}
                            type="button"
                            className="slider__left--arrow"
                            name=""
                        >
                            <Image
                                alt="Icons"
                                src="/icons/slider-arrow-left.svg"
                                width={9}
                                height={14}
                            />
                        </Buttons>
                        <List sx={{
                            transform: `translateX(-${sliderCount * wdth}px)`,
                            padding: "0 !important",
                            display: "flex",
                            position: 'relative',
                            width: `${simpleModel?.images?.length * wdth}px`,
                            transition: `all ${sliderTransition}s ease`
                        }}>
                            {
                                fakeModelImages.map((slide: any, index: number) => (
                                    <SimpleListItem
                                        className="MuiListItem-slider__big--item"
                                        onClick={(e) => { dispatch(setShowModelsModal(true)) }}
                                        key={index}
                                    >
                                        <SimpleImage
                                            loader={myLoader}
                                            width={wdth}
                                            height={wdth}
                                            // layout='fill'
                                            sx={{ objectFit: 'contain' }}
                                            priority={true}
                                            src={`/img/card-loader.jpg`}
                                            alt="card-loader"
                                        />
                                    </SimpleListItem>
                                ))
                            }

                        </List>
                    </Grid>
                </Grid>
            </>
        )
    }
}

export default SimpleSlider