import { Box, Grid } from "@mui/material";
import SimpleTypography from "../../typography";

interface Props {
  header: string;
  data: {
    name: string;
    count: string;
  }[];
}

export default function SimpleCountsList({ header, data }: Props) {
  return (
    <Grid item xs={12}
      sx={{
        p: '20px 24px',
        bgcolor: '#fff',
        boxShadow: '0px 3px 4px 0px #00000014',
        borderRadius: '4px',
      }}
    >
      <SimpleTypography text={header}
        sx={{
          mb: '20px',
          fontWeiht: 500,
          fontSize: '18px',
          lineHeight: '22px'
        }}
      />
      {
        data?.map(c => (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
            }}
          >
            <SimpleTypography text={`${c?.name}:`}
              sx={{
                mr: '8px',
                fontWeiht: 400,
                fontSize: '14px',
                lineHeight: '22px'
              }}
            />
            <SimpleTypography text={c?.count}
              sx={{
                mr: '8px',
                fontWeiht: 400,
                fontSize: '14px',
                lineHeight: '22px',
                color: '#7210BE'
              }}
            />
          </Box>
        ))
      }
    </Grid>
  )
}