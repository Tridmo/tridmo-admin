import * as React from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link'
import { Box, ListItem } from '@mui/material';
import SimpleTypography from '../typography';
import Image from 'next/image';
import { setCategoryFilter, setCategoryNameFilter, setColorFilter, setStyleFilter } from '../../data/handle_filters';
import { getAllModels } from '../../data/get_all_models'

interface breadCrumbProps {
  style?: string | undefined,
  name: string,
  direction?: string,
  category?: string,
  model_name?: string,
  breadCrumbsData?: any
}
export default function ModelCrumb(props: breadCrumbProps) {
  const dispatch = useDispatch<any>()
  const handleGoBack = () => {
    dispatch(getAllModels({
      categories: [],
      colors: [],
      styles: [],
      page: 1,
    }))

    dispatch(setStyleFilter({ snex: [] }))
    dispatch(setColorFilter({ cnex: [] }))
    dispatch(setCategoryFilter([]))
  }

  return (
    <Box
      sx={{
        maxWidth: "1200px",
        margin: "0 auto",
        alignItems: "center",
      }}

      className='products__breadcrumb'
    >

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ marginRight: "10px" }} onClick={handleGoBack}>
          {/* <Box sx={{ marginRight: "10px" }} onClick={handleGoBack}> */}
          <Link href={`/`} style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <Image
              alt="Go back"
              src="/icons/go-back.svg"
              width={5}
              height={9}
            />
            <SimpleTypography
              className='back__text'
              text='Go back'
            />
          </Link>
        </Box>
        <Box sx={{ marginRight: "10px", cursor: "pointer" }}>
          <Box>
            <a style={{ display: "flex", textDecoration: "none" }}>
              <SimpleTypography
                className='breadcumb__text'
                text={props?.name}
              />
            </a>
          </Box>
        </Box>

      </Box>
    </Box>
  );
}
