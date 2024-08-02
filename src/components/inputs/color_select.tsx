import React, { useEffect, useMemo, useState } from 'react'
import { Box, SxProps } from '@mui/system'
import { useSelector, useDispatch } from 'react-redux'
import Buttons from '@/components/buttons'
import SimpleTypography from '@/components/typography'
import { selectAllColors } from '@/components/../data/get_all_colors'
import Skeleton from '@mui/material/Skeleton';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import { useRouter, useSearchParams } from 'next/navigation'
import { FormLabel } from '@mui/material'

interface colorProps {
  id: string,
  created_at: string,
  hex_value: string,
  name: string,
  updated_at: string,
}

interface InputProps {
  sx?: SxProps;
  variant?: 'filled' | 'outlined' | 'standard';
  paddingX?: number;
  paddingY?: number;
  error?: boolean;
  name?: string;
  onChange: (colors: number[]) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
  value?: any;
  disabled?: boolean;
  label?: string;
  type?: string;
  limit?: number;
  autoComplete?: string;
  required?: boolean;
  helperText?: any;
  startAdornment?: any;
  endAdornment?: any;
  placeholderText?: string;
  children?: React.ReactNode;
  className?: string;
  initialSelected?: any[];
  clear?: boolean;
}

export default function ColorsSelect(props: InputProps) {
  const AllColors = useSelector(selectAllColors)
  const dispatch = useDispatch<any>();
  const ColorsStatus = useSelector((state: any) => state?.get_all_colors?.status)
  const router = useRouter();
  // const searchParams = useSearchParams();
  const [custom__colors, setCustom__colors] = React.useState<any>([]);
  const [selectedColors, setSelectedColors] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (ColorsStatus === "succeeded") {
      let arr = new Array();
      AllColors[0]?.data?.forEach((color: colorProps) => {
        arr.push({
          id: color?.id,
          created_at: color?.created_at,
          hex_value: color?.hex_value,
          name: color?.name,
          updated_at: color?.updated_at,
          is__Selected: props?.initialSelected?.length && props?.initialSelected?.includes(color?.id),
          is__Disabled: false,
        })
      })
      setCustom__colors(arr);
      if (props?.initialSelected?.length) setSelectedColors(arr.filter(c => c?.is__Selected == true).map(c => c?.id))
      // setIsInitialized(true);
    }
  }, [AllColors, ColorsStatus]);

  const SkletonData = ['', '', '', '', '', '', '', '', '', '', '', '', '', '']

  const handleChange = (event: any, id: string) => {
    let arr = [...custom__colors];
    let count = 0;
    const res: any[] = [];

    for (let i = 0; i < arr?.length; i++) {
      if (arr[i].id === id && !arr[i].is__Selected && !props?.limit) {
        arr[i].is__Selected = true;
        res.push(arr[i]?.id)
        count++;
      }
      else if (
        arr[i].id === id &&
        !arr[i].is__Selected &&
        props?.limit &&
        (arr.filter((c, i, a) => c.is__Selected == true).length + 1) <= props?.limit
      ) {
        arr[i].is__Selected = true;
        res.push(arr[i]?.id)
        count++;
      }
      else if (arr[i].id === id) {
        arr[i].is__Selected = false;
        count--;
      }
    }

    const selectedCount = arr.filter((c, i, a) => c.is__Selected == true).length

    if (props?.limit && selectedCount >= props?.limit) {
      for (let i = 0; i < arr?.length; i++) {
        if (!arr[i].is__Selected) {
          arr[i].is__Disabled = true;
        }
      }
    }
    else if (props?.limit && selectedCount < props?.limit) {
      for (let i = 0; i < arr?.length; i++) {
        if (arr[i].is__Disabled) {
          arr[i].is__Disabled = false;
        }
      }
    }

    setCustom__colors(arr);
    setSelectedColors(arr.filter(c => c?.is__Selected == true).map(c => c?.id))
  };

  useEffect(() => {
    props?.onChange(selectedColors)
  }, [selectedColors])

  useMemo(() => {
    if (!!props?.clear) {
      const arr = [...custom__colors]
      arr.forEach(c => {
        c.is__Selected = false
        c.is__Disabled = false
      })
      setCustom__colors(arr)
      setSelectedColors([])
    }
  }, [props?.clear])

  if (ColorsStatus === "succeeded") {
    return (
      <Box className={props?.className || ''} sx={{
        ...props?.sx
      }}
      >

        <SimpleTypography
          text={`Цвета ${props?.limit ? `max(${props?.limit})` : ''}`}
          sx={{ mb: '6px', fontWeight: 400, fontSize: '14px', color: '#292929', lineHeight: '20px' }}
        />
        {
          custom__colors?.map((color: any, index: any) => (
            <Buttons
              bgColor={color.hex_value}
              key={index}
              name=""
              disabled={color?.is__Disabled}
              className={`colors__btn ${color?.is__Selected ? "colors__active--btn" : ""}`}
              onClick={(e) => { handleChange(e, color?.id) }}
            >
              <DoneRoundedIcon sx={color?.name?.toLowerCase() === "white" ? { color: "#000" } : { color: "#fff" }} className='btn__check' />
            </Buttons>
          ))
        }
      </Box>
    )
  }
  else {
    return (
      <Box sx={{
        padding: "0 0 0 18px",
        marginTop: "15px",
        marginBottom: "10px",
        ...props?.sx
      }}
      >
        <SimpleTypography className='section__title' text="Цвета"></SimpleTypography>
        <Box sx={{ display: "flex", flexFlow: "wrap" }}>
          {
            SkletonData.map((item, index): any => (
              <Skeleton
                key={index}
                style={{ marginRight: "13px", marginBottom: "13px" }}
                variant="circular"
                width={26}
                height={26}
              />
              // <SkeletonElement key={index} type="avatar" />
            ))
          }

        </Box>

      </Box>
    )
  }


}