import { useEffect, useState } from "react";
import SimpleSelect from "./simple_select";
import { MenuItem, SxProps, formControlClasses } from "@mui/material";
import { months } from "../../types/variables";
import { format, startOfMonth, endOfMonth, startOfWeek, addWeeks, endOfWeek, getISOWeek } from 'date-fns';
import { currentDate } from "../../utils/format_date";

interface MonthsProps {
  onChange: (selectedMonth) => any;
  sx?: SxProps;
  formControlSx?: SxProps;
  disabled?: any;
}

interface YearsProps {
  sx?: SxProps;
  formControlSx?: SxProps;
  onChange: (selectedYear) => any;
  startYear: any;
  endYear?: any;
}

interface WeeksProps {
  sx?: SxProps;
  formControlSx?: SxProps;
  onChange: (selectedWeek) => any;
  year: any;
  month: any;
}

export function MonthsSelect({ onChange, sx, formControlSx, disabled }: MonthsProps) {

  const currentMonth = new Date().getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState<any>(currentMonth)

  return (
    <SimpleSelect
      sx={sx}
      formControlSx={formControlSx}
      disabled={disabled}
      value={disabled ? '' : selectedMonth}
      variant='outlined'
      paddingX={12}
      paddingY={10}
      onChange={(e) => {
        setSelectedMonth(e.target.value)
        onChange(e.target.value)
      }}
    >
      {
        months?.map(
          (c, i) => {
            return (
              c.number <= currentMonth ?
                <MenuItem key={i} value={c.number}>{c.name}</MenuItem>
                : null
            )
          }
        )
      }
    </SimpleSelect>
  )
}

export function YearsSelect({ onChange, startYear, endYear, sx, formControlSx }: YearsProps) {

  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<any>(currentYear);
  const years: any[] = [];

  for (let year = endYear || currentYear; year >= startYear; year--) {
    years.push(year);
  }

  return (
    <SimpleSelect
      formControlSx={formControlSx}
      sx={sx}
      value={selectedYear}
      variant='outlined'
      paddingX={12}
      paddingY={10}
      onChange={(e) => {
        setSelectedYear(e.target.value)
        onChange(e.target.value)
      }}
    >
      {
        years?.map(
          (year) => (
            <MenuItem key={year} value={year}>{year}</MenuItem>
          )
        )
      }
    </SimpleSelect>
  )
}

export function WeeksSelect({ year, month, onChange, sx, formControlSx }: WeeksProps) {
  const [selectedWeek, setWeek] = useState<any>('');
  const [weeks, setWeeks] = useState<any[]>([]);

  useEffect(() => {
    if (year && month) {
      const firstDayOfMonth = startOfMonth(new Date(year, month - 1));
      const lastDayOfMonth = endOfMonth(new Date(year, month - 1));
      let startDate = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 }); // Assuming week starts on Monday
      const weeksInMonth: any[] = [];

      while (startDate <= lastDayOfMonth) {
        const weekNumber = getISOWeek(startDate);
        weeksInMonth.push({ date: startDate, weekNumber });
        startDate = addWeeks(startDate, 1);
      }

      setWeeks(weeksInMonth);
      setWeek('');
    } else {
      setWeeks([]);
      setWeek('');
    }
  }, [year, month]);

  return (
    <SimpleSelect
      formControlSx={formControlSx}
      sx={sx}
      value={selectedWeek}
      variant='outlined'
      paddingX={12}
      paddingY={10}
      onChange={(e) => {
        setWeek(e.target.value)
        onChange(e.target.value)
      }}
    >
      {
        weeks?.map(
          (wk, index) => (
            <MenuItem key={index} value={wk.weekNumber + 1}>
              {
                index == 0 ?
                  'Первая неделя'
                  : index == 1 ?
                    'Вторая неделя'
                    : index == 2 ?
                      'Третья неделя'
                      : index == 3 ?
                        'Четвертая неделя'
                        : null
              }
            </MenuItem>
          )
        )
      }
    </SimpleSelect>
  )
};