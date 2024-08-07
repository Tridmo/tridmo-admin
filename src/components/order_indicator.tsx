import { ArrowDownward, ArrowDropDown, ArrowDropUp, ArrowUpward } from "@mui/icons-material"
import { order } from "../types/filters"
import { SxProps } from "@mui/system"
import { styled } from "@mui/material";
import { ThemeProps } from "../types/theme";

interface Props {
  order: order;
}

const Up = <svg width={'12px'} height={'10px'}><path d="m2 8 4-4 4 4z"></path></svg>
const Down = <svg width={'12px'} height={'10px'}><path transform="translate(0, -4)" d="m2 8 4 4 4-4z"></path></svg>

export function OrderIndicator({ order }: Props) {
  return (
    <>
      {
        order == 'asc' ? Up : Down
      }
    </>
  )
}