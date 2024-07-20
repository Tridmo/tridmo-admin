"use client"

import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Box, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Skeleton } from '@mui/material';
import SimpleSelect from '../../inputs/simple_select';
import { MonthsSelect, YearsSelect } from '../../inputs/date_select';
import { months } from '../../../types/variables';
import { useSelector } from '../../../store';
import { useDispatch } from 'react-redux';
import { getDownloadsChart, selectDownloadsChart, selectDownloadsChartStatus, selectModelDownloadsStats, selectModelDownloadsStatsStatus } from '../../../data/statistics/get_downloads_stats';
import { selectMyProfile } from '../../../data/me';
import { lineChartOptions } from '../../../types/charts.config';
import { getTagsChart, selectModelTagsStats, selectModelTagsStatsStatus, selectTagsChart, selectTagsChartStatus } from '../../../data/statistics/get_tags_stats';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

interface Props {
  title?: string;
}

export default function DownloadsAndTagsChartComponent({ title }: Props) {

  const dispatch = useDispatch<any>()
  const downloadsDataStatus = useSelector(selectDownloadsChartStatus)
  const downloadsData = useSelector(selectDownloadsChart)
  const tagsDataStatus = useSelector(selectTagsChartStatus)
  const tagsData = useSelector(selectTagsChart)
  const profile = useSelector(selectMyProfile)

  const [isMonthly, setIsMonthly] = useState<boolean>(true)
  const [selectedYear, setSelectedYear] = useState<any>(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState<any>(new Date().getMonth() + 1)

  function handleMonthSelect(month) {
    setSelectedMonth(month)
    dispatch(getDownloadsChart({ year: selectedYear, month, brand_id: profile?.brand?.id }))
    dispatch(getTagsChart({ year: selectedYear, month, brand_id: profile?.brand?.id }))
  }
  function handleYearSelect(year) {
    setSelectedYear(year)
    dispatch(getDownloadsChart({ year, month: selectedMonth, brand_id: profile?.brand?.id }))
    dispatch(getTagsChart({ year, month: selectedMonth, brand_id: profile?.brand?.id }))
  }

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        bgcolor: '#fff',
        p: '24px',
        // boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.1)',
        boxShadow: '0px 3px 4px 0px #00000014',
        borderRadius: '4px',
      }}
    >
      <h3 style={{ marginTop: 0 }}>{title || 'Статистика'}</h3>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}
      >
        <FormControl>
          {/* <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel> */}
          <RadioGroup
            onChange={(e) => setIsMonthly(e.target.value == 'monthly' ? true : false)}
            defaultValue={'monthly'}
            row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group"
          >
            <FormControlLabel defaultChecked value="monthly" control={<Radio />} label="Ежемесячно" />
            <FormControlLabel value="daily" control={<Radio />} label="Ежедневно" />
          </RadioGroup>
        </FormControl>

        <YearsSelect
          onChange={(year) => handleYearSelect(year)}
          formControlSx={{ width: '120px' }}
          sx={{ width: '100%' }}
          startYear={2024}
        />
        <MonthsSelect
          disabled={isMonthly}
          onChange={(month) => handleMonthSelect(month)}
          formControlSx={{ width: '120px', ml: '8px !important' }}
          sx={{ width: '100%' }}
        />
      </Box>

      <Box
        sx={{
          width: '100%',
          mt: '8px',
        }}
      >
        {
          downloadsDataStatus == 'succeeded' &&
            tagsDataStatus == 'succeeded' &&
            !!downloadsData &&
            !!tagsData
            ?
            (
              !!isMonthly ?
                <Line
                  data={{
                    labels: months.map(m => m.name),
                    datasets: [
                      {
                        label: 'Загрузки',
                        data: downloadsData?.chart_data?.monthly_downloads,
                        borderColor: 'rgba(42, 157, 144, 1)',
                        backgroundColor: 'rgba(42, 157, 144, 0.2)',
                        fill: true,
                      },
                      {
                        label: 'Бирки',
                        data: tagsData?.chart_data?.monthly_tags,
                        borderColor: 'rgba(231, 110, 80, 1)',
                        backgroundColor: 'rgba(231, 110, 80, 0.2)',
                        fill: true,
                      },
                    ],
                  }}
                  options={lineChartOptions}
                  width={'100%'}
                  height={'300px'}
                />
                :
                <Line
                  data={{
                    labels: Array.from({ length: downloadsData?.chart_data?.daily_downloads?.length }, (_, i) => `${i + 1}`), // Days 1 to 30
                    datasets: [
                      {
                        label: 'Загрузки',
                        data: downloadsData?.chart_data?.daily_downloads,
                        borderColor: 'rgba(42, 157, 144, 1)',
                        backgroundColor: 'rgba(42, 157, 144, 0.2)',
                        fill: true,
                      },
                      {
                        label: 'Бирки',
                        data: tagsData?.chart_data?.daily_tags,
                        borderColor: 'rgba(231, 110, 80, 1)',
                        backgroundColor: 'rgba(231, 110, 80, 0.2)',
                        fill: true,
                      },
                    ],
                  }}
                  options={lineChartOptions}
                  width={'100%'}
                  height={'300px'}
                />
            )
            :
            <Skeleton
              variant='rectangular'
              width={'100%'}
              height={'300px'}
            />

        }
      </Box>
    </Box >
  );
};