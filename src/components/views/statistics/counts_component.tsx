import { Box, Grid, Skeleton, SxProps } from "@mui/material";
import SimpleTypography from "../../typography";


interface Props {
  data: {
    name: string;
    count: string | number;
    secondary_text?: string;
  }[];
  sx?: SxProps;
  loading?: boolean;
}

export default function CountsGrid({ data, sx, loading }: Props) {

  const fakeData = Array.from({ length: 5 })

  return (
    <Grid container
      gap={2}
      sx={{
        width: '100%',
        ...sx
      }}
    >
      {
        !loading ?
          data.map((elem, ind) => (
            <Grid item
              xs={2.25}
              lg={2.25}
              md={3}
              sm={4}
              key={ind}
              sx={{
                p: '24px',
                bgcolor: '#fff',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                }}
              >
                <SimpleTypography
                  text={elem?.name}
                />
                <SimpleTypography
                  sx={{
                    fontSize: '32px',
                    fontWeight: 700
                  }}
                  text={elem?.count as string}
                />
                {
                  elem?.secondary_text && (
                    <SimpleTypography
                      sx={{
                        fontSize: '14px',
                        fontWeight: 400,
                      }}
                      text={elem.secondary_text}
                    />
                  )
                }
              </Box>
            </Grid>
          ))
          :
          fakeData.map((elem, ind) => (
            <Grid
              xs={2}
              md={2}
              lg={2}
              sm={2}
              key={ind}
              sx={{
                p: '24px',
                bgcolor: '#fff',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                }}
              >
                <Skeleton
                  variant='rectangular'
                  width='80px'
                  height='20px'
                />
                <Skeleton
                  sx={{ mt: '8px' }}
                  variant='rectangular'
                  width='40px'
                  height='40px'
                />
              </Box>
            </Grid>
          ))
      }
    </Grid>
  )
}