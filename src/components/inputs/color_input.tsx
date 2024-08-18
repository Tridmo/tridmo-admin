import React, { CSSProperties, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { ThemeProps } from '@/types/theme';
import { Box, FormLabel, InputAdornment, TextareaAutosize, SxProps, styled } from '@mui/material';
import { Label } from '@mui/icons-material';
import SimpleTypography from '../typography';
import { MuiColorInput } from 'mui-color-input'

interface InputAdornmentsProps {
  error?: boolean;
  name?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onChange?: (color: any) => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  value?: any;
  disabled?: boolean,
  label?: string,
  labelFixed?: boolean,
  type?: string,
  autoComplete?: string,
  placeholder?: string;
  required?: boolean;
  helperText?: any;
  startAdornment?: any;
  endAdornment?: any;
  className?: string;
  placeholderText?: string,
  variant?: 'filled' | 'outlined' | 'standard',
  sx?: SxProps,
  inputSx?: {
    width?: CSSProperties['width'];
    height?: CSSProperties['height'];
    minWidth?: CSSProperties['minWidth'];
    minHeight?: CSSProperties['minHeight'];
    maxWidth?: CSSProperties['maxWidth'];
    maxHeight?: CSSProperties['maxHeight'];
  },
  paddingX?: number,
  paddingY?: number,
  endIconWithBg?: string,
  textarea?: boolean,
  resize?: CSSProperties['resize'],
}

const SimpleInputControl = styled(FormControl)(
  // text-transform: capitalize;
  ({ theme }: ThemeProps) => `
margin: 0 !important;

.MuiInput-underline{
    background:#fafafa !important;
    padding-top: 5px ;
    padding-bottom: 5px ;
}

.MuiOutlinedInput-root {
            border-radius: 4px;
        }

.Mui-focused::after{
    border-color:#7210BE;
}

.MuiInputLabel-root{
    font-size: 15px;
    line-height: 14px;
    letter-spacing: 0.02em;
    color: #424242;
    margin-bottom:6px;
}

.Mui-focused::after{
    border-color: #848484;
}

.MuiOutlinedInput-root {
    border-radius: 4px;
    
    & input {
        padding: 0 0;
    }
}

.MuiInputBase-root {
    display: flex;
    align-items: flex-start;
}

.MuiInput-root::before {
    border-bottom: 1px solid #848484;
}

.MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before {
    border-bottom: 1px solid #848484;
}

.MuiInput-root::after {
    border-bottom: 2px solid #7210BE
}

.MuiInput-input:focus{
    background-color: transparent !important;
}
`
);

export default function ColorInput({ inputSx, ...props }: InputAdornmentsProps) {

  const [color, setColor] = useState<string>('')

  const muiOutlineInputRoot: SxProps = {
    '& > .MuiInputAdornment-root': { height: 'auto !important' },
    alignItems: 'center',
  }
  const muiFormControlRoot: SxProps = {
    '& > .MuiInputAdornment-root': { height: 'auto !important' },
  }

  if (props?.paddingX) {
    muiOutlineInputRoot['paddingLeft'] = muiOutlineInputRoot['paddingRight'] = `${props?.paddingX}px`
  }
  if (props?.paddingY) {
    muiOutlineInputRoot['paddingTop'] = muiOutlineInputRoot['paddingBottom'] = `${props?.paddingY}px`
  }

  if (inputSx) {
    for (const [key, value] of Object.entries(inputSx)) {
      muiOutlineInputRoot[key] = value
      muiFormControlRoot[key] = value
    }
  }

  const SX = {
    '.MuiOutlinedInput-root': muiOutlineInputRoot,
    '.MuiFormControl-root': muiFormControlRoot,
  }

  return (
    <SimpleInputControl className={props?.className || ''} sx={{ m: 1, width: '100%', ...SX }} variant="filled">

      {
        props?.labelFixed ?
          <FormLabel
            sx={{ mb: '6px', fontWeight: 400, fontSize: '14px', color: '#292929', lineHeight: '20px' }}
          >{props?.label}</FormLabel>
          : null
      }
      <MuiColorInput format="hex"
        sx={{
          '& input, & textarea': {
            resize: props?.resize,
            padding: '0 0',
          }
        }}
        id={props?.label}
        autoComplete={props?.autoComplete}
        error={props?.error}
        helperText={props?.helperText}
        onBlur={props?.onBlur}
        onChange={(color) => {
          setColor(color);
          props?.onChange && props.onChange(color);
        }}
        label={!props?.labelFixed ? props?.label : null}
        name={props?.name}
        value={props?.value}
        disabled={props?.disabled}
        placeholder={props?.placeholderText}
        variant={props?.variant || "standard"}
      />
    </SimpleInputControl>
  )
}