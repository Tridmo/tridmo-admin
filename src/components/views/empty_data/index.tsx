import SimpleTypography from '@/components/typography'
import { Box, SxProps, styled } from '@mui/material'
import Image from 'next/image'
import React from 'react'

interface Props {
  containerHeight?: string;
  boxShadow?: boolean;
  border?: boolean;
  sx?: SxProps;
  text?: string;
}

export default function EmptyData({ boxShadow = true, border = true, ...props }: Props) {

  const Container = styled(Box)(
    () => `
            width: 100%;
            min-height: ${props?.containerHeight ? props?.containerHeight : '274px'};
            display: flex;
            align-items: center;
            justify-content: center;
            ${border ? 'border: 1px solid #F5F5F5;' : ''}
            ${boxShadow ? 'box-shadow: 0px 2px 18px 0px #00000012 inset;' : ''}
        `
  )

  return (
    <Container sx={{ ...props?.sx }}>
      <Box>
        <Image width={160} height={160} alt='box' src='/img/empty-box.svg' />
        <SimpleTypography
          sx={{
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '22px',
            color: '#686868',
            textAlign: 'center',
          }}
          text={props?.text || 'Это место пусто'} />

      </Box>
    </Container>
  )
}