import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, Paper, styled } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import Image from 'next/image';
import { ThemeProps } from '@/types/theme';
import SimpleTypography from '@/components/typography';
import Link from 'next/link';
import { getAllModels, selectAllModels } from '@/data/get_all_models';
import MyLoader from '../skeleton/Skeleton'
import CustomCard from '../custom_card';
import Skeleton from '@mui/material/Skeleton';
import { setLimitFilter } from '../../data/handle_filters';
import { selectAllInteriors } from '../../data/get_all_interiors';
import EmptyData from '../views/empty_data';
import CustomCardSkeleton from '../custom_card/skeleton';
import { selectAuthorInteriors } from '../../data/get_author_interiors';
type InputProps = {
  route: string,
  sliced?: number,
  cols: number,
  cardImgHeight?: any,
  withAuthor?: boolean,
};
const heights = [208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208];
const Label = styled(Paper)(({ theme }: ThemeProps) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
}));

export default function SimpleCard(props: InputProps) {
  const dispatch = useDispatch<any>();
  const fakeModels = new Array(props?.sliced || 16).fill('');

  React.useEffect(() => {
    dispatch(setLimitFilter({ limit: 15 }))
  }, [])

  if (props?.route == 'models') {

    const all__models = useSelector(selectAllModels)
    const all__models__status = useSelector((state: any) => state?.get_all_models?.status)

    // const all__models: { data?: any[] } = {
    //   data: Array.from({ length: 20 }, () => ({
    //     id: `${Math.random()}`,
    //     cover: [{ image: { src: '/img/models1.jpg' } }],
    //     brand: { name: 'Brand name' },
    //     name: `Model`,
    //     slug: `model_slug`
    //   }))
    // }

    if (all__models__status === "failed") {
      return (
        <SimpleTypography text='Извините, ошибка сетевого подключения:('></SimpleTypography>
      )
    }
    if (all__models__status === "loading") {
      return (

        <Grid className="models__card--wrap" container spacing={3} sx={{ width: "100%", margin: "0" }}>
          {fakeModels?.map((model: any, index: any) => (
            <Grid
              className='models__card'
              sx={{
                [`&:not(:nth-of-type(${props?.cols}n))`]: {
                  padding: "0 9.5px 0 0 !important",
                },
                [`&:nth-of-type(${props?.cols}n)`]: {
                  padding: "0 0 0 0 !important",
                },
                marginBottom: "10px"
              }}
              key={index}
              md={12 / props?.cols}
              sm={12 / (props?.cols - 2)}
              xs={12 / (props?.cols - 4)}
              item
            >
              <CustomCardSkeleton
                type={props?.route}
                link={`/${props?.route}`}
                key={index}
                model={model}
                imgHeight={props?.cardImgHeight || '208px'}
                tagIcon={model?.top ? '/icons/star.svg' : ''}
              />
            </Grid>
          ))}
        </Grid>

      )
    }

    if (all__models__status === "succeeded") {

      const data_sliced = props?.sliced ? all__models?.data?.models?.slice(0, props?.sliced) : all__models?.data?.models;

      return (
        data_sliced.length > 0 ?
          <Grid className="models__card--wrap" container spacing={3} sx={{ width: "100%", margin: "0" }}>
            {data_sliced?.map((model: any, index: any) => (
              <Grid
                className='models__card'
                sx={{
                  [`&:not(:nth-of-type(${props?.cols}n))`]: {
                    padding: "0 9.5px 0 0 !important",
                  },
                  [`&:nth-of-type(${props?.cols}n)`]: {
                    padding: "0 0 0 0 !important",
                  },
                  marginBottom: "10px"
                }}
                key={index}
                md={12 / props?.cols}
                sm={12 / (props?.cols - 2)}
                xs={12 / (props?.cols - 4)}
                item
              >
                <CustomCard
                  type={props?.route}
                  link={`/${props?.route}/${model?.slug}`}
                  key={index}
                  model={model}
                  imgHeight={props?.cardImgHeight || '208px'}
                  tagIcon={model?.top ? '/icons/star.svg' : ''}
                />
              </Grid>
            ))
            }
          </Grid >

          : <EmptyData />
      )
    }
  }


  if (props?.route == 'interiors') {

    const all__interiors = useSelector(selectAllInteriors)
    const all__interiors__status = useSelector((state: any) => state?.get_all_interiors?.status)

    // const all__interiors: { data?: any[] } = {
    //   data: Array.from({ length: 20 }, () => ({
    //     id: `${Math.random()}`,
    //     cover: [{ image: { src: '/img/interior1.jpg' } }],
    //     brand: { name: 'Brand name' },
    //     name: `Interior`,
    //     slug: `interior_slug`
    //   }))
    // }


    if (all__interiors__status === "failed") {
      return (
        <SimpleTypography text='Извините, ошибка сетевого подключения:('></SimpleTypography>
      )
    }
    if (all__interiors__status === "loading") {
      return (
        <Grid className="models__card--wrap" container spacing={3} sx={{ width: "100%", margin: "0" }}>
          {fakeModels?.map((model: any, index: any) => (
            <Grid
              className='models__card'
              sx={{
                [`&:not(:nth-of-type(${props?.cols}n))`]: {
                  padding: "0 9.5px 0 0 !important",
                },
                [`&:nth-of-type(${props?.cols}n)`]: {
                  padding: "0 0 0 0 !important",
                },
                marginBottom: "10px"
              }}
              key={index}
              md={12 / props?.cols}
              sm={12 / (props?.cols - 2)}
              xs={12 / (props?.cols - 4)}
              item
            >
              <CustomCardSkeleton
                type={props?.route}
                link={`/${props?.route}`}
                key={index}
                model={model}
                imgHeight={props?.cardImgHeight || '268px'}
                tagIcon={model?.top ? '/icons/star.svg' : ''}
              />
            </Grid>
          ))}
        </Grid>
      )
    }

    if (all__interiors__status === "succeeded") {

      const data_sliced = props?.sliced ? all__interiors?.data?.interiors?.slice(0, props?.sliced) : all__interiors?.data?.interiors;

      return (
        data_sliced.length > 0 ?
          <Grid className="models__card--wrap" container spacing={3} sx={{ width: "100%", margin: "0" }}>
            {data_sliced?.map((model: any, index: any) => (
              <Grid
                className='models__card'
                sx={{
                  [`&:not(:nth-of-type(${props?.cols}n))`]: {
                    padding: "0 9.5px 0 0 !important",
                  },
                  [`&:nth-of-type(${props?.cols}n)`]: {
                    padding: "0 0 0 0 !important",
                  },
                  marginBottom: "10px"
                }}
                key={index}
                md={12 / props?.cols}
                sm={12 / (props?.cols - 2)}
                xs={12 / (props?.cols - 4)}
                item
              >
                <CustomCard
                  type={props?.route}
                  link={`/${props?.route}/${model?.slug}`}
                  key={index}
                  model={model}
                  imgHeight={props?.cardImgHeight || '268px'}
                  withAuthor={props?.withAuthor}
                />
              </Grid>
            ))
            }
          </Grid >

          : <EmptyData />
      )
    }
  }

  if (props?.route == 'designer_interiors') {

    const all__interiors = useSelector(selectAuthorInteriors)
    const all__interiors__status = useSelector((state: any) => state?.get_author_interiors?.status)

    // const all__interiors: { data?: any[] } = {
    //   data: Array.from({ length: 20 }, () => ({
    //     id: `${Math.random()}`,
    //     cover: [{ image: { src: '/img/interior1.jpg' } }],
    //     brand: { name: 'Brand name' },
    //     name: `Interior`,
    //     slug: `interior_slug`
    //   }))
    // }


    if (all__interiors__status === "failed") {
      return (
        <SimpleTypography text='Извините, ошибка сетевого подключения:('></SimpleTypography>
      )
    }
    if (all__interiors__status === "loading") {
      return (
        <Grid className="models__card--wrap" container spacing={3} sx={{ width: "100%", margin: "0" }}>
          {fakeModels?.map((model: any, index: any) => (
            <Grid
              className='models__card'
              sx={{
                [`&:not(:nth-of-type(${props?.cols}n))`]: {
                  padding: "0 9.5px 0 0 !important",
                },
                [`&:nth-of-type(${props?.cols}n)`]: {
                  padding: "0 0 0 0 !important",
                },
                marginBottom: "10px"
              }}
              key={index}
              md={12 / props?.cols}
              sm={12 / (props?.cols - 2)}
              xs={12 / (props?.cols - 4)}
              item
            >
              <CustomCardSkeleton
                type={props?.route}
                link={`/interiors`}
                key={index}
                model={model}
                imgHeight={props?.cardImgHeight || '268px'}
                tagIcon={model?.top ? '/icons/star.svg' : ''}
              />
            </Grid>
          ))}
        </Grid>
      )
    }

    if (all__interiors__status === "succeeded") {

      const data_sliced = props?.sliced ? all__interiors?.data?.interiors?.slice(0, props?.sliced) : all__interiors?.data?.interiors;

      return (
        data_sliced.length > 0 ?
          <Grid className="models__card--wrap" container spacing={3} sx={{ width: "100%", margin: "0" }}>
            {data_sliced?.map((model: any, index: any) => (
              <Grid
                className='models__card'
                sx={{
                  [`&:not(:nth-of-type(${props?.cols}n))`]: {
                    padding: "0 9.5px 0 0 !important",
                  },
                  [`&:nth-of-type(${props?.cols}n)`]: {
                    padding: "0 0 0 0 !important",
                  },
                  marginBottom: "10px"
                }}
                key={index}
                md={12 / props?.cols}
                sm={12 / (props?.cols - 2)}
                xs={12 / (props?.cols - 4)}
                item
              >
                <CustomCard
                  type='interiors'
                  link={`/interiors/${model?.slug}`}
                  key={index}
                  model={model}
                  imgHeight={props?.cardImgHeight || '268px'}
                  withAuthor={props?.withAuthor}
                />
              </Grid>
            ))
            }
          </Grid >

          : <EmptyData />
      )
    }
  }

}