import { Box, Grid } from '@mui/material'
import Image from "next/image"
import SimpleTypography from '../typography'

function ConnectionError() {
    return (
        <Box>
            <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
                <Grid sx={{ margin: "52px auto", alignItems: "center" }} container spacing={2}>
                    <Grid sx={{ display: "flex", justifyContent: "end" }} item xs={6}>
                        <Image src="/img/connection-error.svg" alt="Connection error" width={500} height={500} />
                    </Grid>
                    <Grid sx={{ paddingLeft: "56px !important" }} item xs={6}>
                        <SimpleTypography className="not-found__title" text='Что-то пошло не так...' />
                        <SimpleTypography className="not-found__text" text='Убедитесь, что ваше соединение хорошее, и попробуйте обновить эту страницу.' />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}


export default ConnectionError;
