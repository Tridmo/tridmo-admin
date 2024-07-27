import { Box, Grid, Skeleton, SxProps } from "@mui/material";
import SimpleTypography from "../typography";


interface Props {
  data: {
    name: string;
    main_text: string | number;
    secondary_text?: string;
  }[];
  sx?: SxProps;
  fullWidth?: boolean;
  fill?: boolean;
  loading?: boolean;
}

export default function BrickDataGrid({ data, sx, loading, fullWidth, fill }: Props) {

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
              xs={fullWidth ? 12 : !!fill}
              lg={fullWidth ? 12 : !!fill}
              md={fullWidth ? 12 : !!fill}
              sm={fullWidth ? 12 : !!fill}
              key={ind}
              sx={{
                p: '24px',
                bgcolor: '#fff',
                borderRadius: '4px',
                boxShadow: '0px 3px 4px 0px #00000014',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                }}
              >
                <SimpleTypography
                  sx={{
                    minWidth: '150px',
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: '20px',
                    mb: '8px',
                  }}
                  text={elem?.name}
                />
                <SimpleTypography
                  sx={{
                    fontSize: '18px',
                    fontWeight: 500,
                    lineHeight: '22px',
                    color: !elem?.main_text ? '#e6e6e6' : '#454545'
                  }}
                  text={elem?.main_text as string || 'не указано'}
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