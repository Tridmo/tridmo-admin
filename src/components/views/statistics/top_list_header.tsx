import { Box, FormControl, Grid, MenuItem, Skeleton, SxProps } from "@mui/material";
import SimpleTypography from "../../typography";
import { MonthsSelect, WeeksSelect, YearsSelect } from "../../inputs/date_select";
import { useState } from "react";
import { getModelsStats } from "../../../data/statistics/get_models_stats";
import { getBrandsStats } from "../../../data/statistics/get_brands_stats";
import { getCategoriesStats } from "../../../data/statistics/get_categories_stats";
import { useDispatch, useSelector } from "react-redux";
import { currentDate } from "../../../utils/format_date";
import SimpleSelect from "../../inputs/simple_select";
import { selectTopListItemLimit, selectTopListTopic, setTopListItemLimit, setTopListTopic } from "../../../data/handle_filters";

interface Props {
  sx?: SxProps;
}

const topics = [
  {
    name: 'по кол-вo загрузок',
    value: 'downloads',
  },
  {
    name: 'по кол-вo бирки',
    value: 'tags',
  },
]

const listLenghtMenu = [
  {
    name: 'Топ-3',
    value: 3,
  },
  {
    name: 'Топ-5',
    value: 5,
  },
  {
    name: 'Топ-10',
    value: 10,
  },
  {
    name: 'Топ-50',
    value: 50,
  },
]

export default function TopListHeader({ sx }: Props) {

  const dispatch = useDispatch<any>()
  const { year, month, week } = currentDate()
  const topListItemLimit = useSelector(selectTopListItemLimit)
  const topListTopic = useSelector(selectTopListTopic)

  const [selectedYear, setSelectedYear] = useState<any>('')
  const [selectedMonth, setSelectedMonth] = useState<any>('')
  const [selectedWeek, setSelectedWeek] = useState<any>('')

  function handleMonthSelect(month) {
    setSelectedMonth(month)
    dispatch(getModelsStats({ topic: topListTopic.value, limit: topListItemLimit, year: selectedYear || year, month: month, week: selectedWeek }))
    dispatch(getBrandsStats({ topic: topListTopic.value, limit: topListItemLimit, year: selectedYear || year, month: month, week: selectedWeek }))
    dispatch(getCategoriesStats({ topic: topListTopic.value, limit: topListItemLimit, year: selectedYear || year, month: month, week: selectedWeek }))
  }
  function handleYearSelect(year) {
    setSelectedYear(year)
    dispatch(getModelsStats({ topic: topListTopic.value, limit: topListItemLimit, year: year, month: selectedMonth, week: selectedWeek }))
    dispatch(getBrandsStats({ topic: topListTopic.value, limit: topListItemLimit, year: year, month: selectedMonth, week: selectedWeek }))
    dispatch(getCategoriesStats({ topic: topListTopic.value, limit: topListItemLimit, year: year, month: selectedMonth, week: selectedWeek }))
  }
  function handleWeekSelect(week) {
    setSelectedWeek(week)
    dispatch(getModelsStats({ topic: topListTopic.value, limit: topListItemLimit, year: selectedYear || year, month: selectedMonth || month, week: week }))
    dispatch(getBrandsStats({ topic: topListTopic.value, limit: topListItemLimit, year: selectedYear || year, month: selectedMonth || month, week: week }))
    dispatch(getCategoriesStats({ topic: topListTopic.value, limit: topListItemLimit, year: selectedYear || year, month: selectedMonth || month, week: week }))
  }
  function handleLimitChange(limit) {
    dispatch(setTopListItemLimit(limit))
    dispatch(getModelsStats({ topic: topListTopic.value, limit: limit, year: selectedYear, month: selectedMonth, week: selectedWeek }))
    dispatch(getBrandsStats({ topic: topListTopic.value, limit: limit, year: selectedYear, month: selectedMonth, week: selectedWeek }))
    dispatch(getCategoriesStats({ topic: topListTopic.value, limit: limit, year: selectedYear, month: selectedMonth, week: selectedWeek }))
  }
  function handleTopicChange({ value, name }) {
    dispatch(setTopListTopic({ name, value }))
    dispatch(getModelsStats({ topic: value, limit: topListItemLimit, year: selectedYear, month: selectedMonth, week: selectedWeek }))
    dispatch(getBrandsStats({ topic: value, limit: topListItemLimit, year: selectedYear, month: selectedMonth, week: selectedWeek }))
    dispatch(getCategoriesStats({ topic: value, limit: topListItemLimit, year: selectedYear, month: selectedMonth, week: selectedWeek }))
  }

  return (
    <Grid container
      xs={12}
      md={12}
      lg={12}
      sm={12}
      sx={{
        p: '24px',
        width: '100%',
        bgcolor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0px 3px 4px 0px #00000014',
        borderRadius: '4px',
        ...sx
      }}
    >
      <h3 style={{ margin: 0 }}>Список популярности</h3>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}
      >

        <SimpleSelect
          formControlSx={{ width: 'auto' }}
          sx={sx}
          value={topListItemLimit}
          variant='outlined'
          paddingX={12}
          paddingY={10}
          onChange={(e) => handleLimitChange(e.target.value)}
        >
          {
            listLenghtMenu?.map(
              (e) => (
                <MenuItem key={e.value} value={e.value}>{e.name}</MenuItem>
              )
            )
          }
        </SimpleSelect>

        <SimpleSelect
          formControlSx={{ width: 'auto', ml: '8px !important' }}
          sx={sx}
          value={`${topListTopic.value}//${topListTopic.name}`}
          variant='outlined'
          paddingX={12}
          paddingY={10}
          onChange={(e) => {
            const value = String(e.target.value).split('//')[0]
            const name = String(e.target.value).split('//')[1]
            handleTopicChange({ name, value })
          }}
        >
          {
            topics?.map(
              (topic) => (
                <MenuItem key={topic.value} value={`${topic.value}//${topic.name}`}>{topic.name}</MenuItem>
              )
            )
          }
        </SimpleSelect>

        <YearsSelect
          onChange={(year) => handleYearSelect(year)}
          formControlSx={{ width: '120px', ml: '8px !important' }}
          sx={{ width: '100%' }}
          startYear={2024}
        />
        <MonthsSelect
          onChange={(month) => handleMonthSelect(month)}
          formControlSx={{ width: '120px', ml: '8px !important' }}
          sx={{ width: '100%' }}
        />
        <WeeksSelect
          onChange={(week) => handleWeekSelect(week)}
          year={selectedYear || year}
          month={selectedMonth || month}
          formControlSx={{ width: 'auto', ml: '8px !important' }}
          sx={{ width: '100%' }}
        />
      </Box>
    </Grid>
  )
}