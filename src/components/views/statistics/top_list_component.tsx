import { Box, List, ListItem, ListItemText, Skeleton } from "@mui/material";
import Link from "next/link";
import SimpleTypography from "../../typography";
import { useSelector } from "react-redux";
import { selectTopListItemLimit } from "../../../data/handle_filters";

interface Props {
  data: {
    name: string;
    secondary_text?: string;
    columns?: {
      column_name?: string;
      value?: string | number;
    }[];
    link: string;
    image?: string;
  }[];
  loading?: boolean;
}

export default function TopList({ data, loading }: Props) {

  const topListItemLimit = useSelector(selectTopListItemLimit)
  const fakeData = Array.from({ length: topListItemLimit })

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <List>
        {
          !loading ?
            data?.map((elem, ind) => (
              <ListItem
                key={ind}
                sx={{
                  p: '8px 0',
                  width: '100%',
                  ':not(:last-child)': {
                    borderBottom: '1px solid #f2f2f2'
                  }
                }}
              >
                <Link href={elem?.link}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',

                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <ListItemText>
                      <SimpleTypography
                        text={`${ind + 1}`}
                        sx={{
                          fontSize: '16px',
                          fontWeight: 400,
                          color: '#848484'
                        }}
                      />
                    </ListItemText>
                    <ListItemText sx={{ ml: '8px' }}>
                      <SimpleTypography text={`${elem?.name}`} />
                      {
                        !!elem?.secondary_text &&
                        <SimpleTypography
                          text={`${elem?.secondary_text}`}
                          sx={{
                            mt: '4px',
                            fontSize: '14px',
                            fontWeight: 400,
                            color: '#848484'
                          }}
                        />
                      }
                    </ListItemText>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    {
                      !!elem?.columns && elem?.columns.map(col => (
                        <ListItemText
                          sx={{
                            ml: '12px',
                            'span': {
                              display: 'flex',
                              alignItems: 'flex-end',
                              justifyContent: 'flex-start',
                            }
                          }}
                        >
                          {
                            !!col.value &&
                            <SimpleTypography
                              text={`${col.value}`}
                            />
                          }
                          {
                            !!col.column_name &&
                            <SimpleTypography
                              text={`${col.column_name}`}
                              sx={{
                                ml: '4px',
                                fontSize: '14px',
                                fontWeight: 400,
                                color: '#848484'
                              }}
                            />
                          }
                        </ListItemText>
                      ))
                    }
                  </Box>
                </Link>
              </ListItem>
            ))
            :
            fakeData?.map((elem, ind) => (
              <ListItem
                key={ind}
                sx={{
                  p: '8px 0',
                  width: '100%',
                  ':not(:last-child)': {
                    borderBottom: '1px solid #f2f2f2'
                  }
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',

                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <ListItemText>
                      <ListItemText>
                        <SimpleTypography
                          text={`${ind + 1}`}
                          sx={{
                            fontSize: '16px',
                            fontWeight: 400,
                            color: '#848484'
                          }}
                        />
                      </ListItemText>
                    </ListItemText>
                    <ListItemText>
                      <Skeleton
                        sx={{ ml: '8px' }}
                        variant='rectangular'
                        width='60px'
                        height='20px'
                      />
                    </ListItemText>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >

                    <ListItemText
                      sx={{
                        ml: '12px',
                        'span': {
                          display: 'flex',
                          alignItems: 'flex-end',
                          justifyContent: 'flex-start',
                        }
                      }}
                    >
                      <Skeleton
                        variant='rectangular'
                        width='50px'
                        height='20px'
                      />
                    </ListItemText>

                  </Box>
                </Box>
              </ListItem>
            ))
        }
      </List>
    </Box>
  )
}