import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { SimpleCardsSkeleton } from '../skeleton/FakeModels'
import { Grid } from '@mui/material'
import SimpleTypography from '@/components/typography'

const SimpleCard = dynamic(() => import('./index'), {
   loading: () => <div>...</div>,
   suspense: true,
})

const GroupCard = () => {
   return (
      <Suspense fallback={<SimpleCardsSkeleton />}>
         <Grid xs={9} sx={{ minHeight: "100vh" }}>
            <SimpleTypography text='Section name' className='section__title' variant="h2" />
            {/* ---- MODEL CARDS ---- */}

            <SimpleCard route='any' cols={0} />

            {/* ---- MODEL CARDS ---- */}

         </Grid>
      </Suspense>
   )
}

export default GroupCard