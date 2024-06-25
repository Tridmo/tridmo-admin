import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { ThemeProps } from '@/types/theme';
import { FormLabel, InputAdornment, InputLabel, MenuItem, SxProps, styled } from '@mui/material';
import { Label } from '@mui/icons-material';

interface SimpleSelectProps {
  formControlSx?: SxProps;
  sx?: SxProps;
  variant?: 'filled' | 'outlined' | 'standard';
  paddingX?: number;
  paddingY?: number;
  error?: boolean;
  name?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
  value?: any;
  disabled?: boolean,
  label?: string,
  type?: string,
  autoComplete?: string,
  required?: boolean;
  helperText?: any;
  startAdornment?: any;
  endAdornment?: any;
  placeholderText?: string,
  children: React.ReactNode;
  labelFixed?: boolean;
  className?: string;
}


export default function SimpleSelect(props: SimpleSelectProps) {

  const [current, setCurrent] = React.useState<string | undefined>(props?.placeholderText)

  const SimpleSelectControl = styled(FormControl)(
    // text-transform: capitalize;
    ({ theme }: ThemeProps) => `
    margin: 0 !important;
    
    * {
        transition: all 0.4s ease;
    }


    .MuiInput-underline{
        background:#fafafa !important;
        padding-top: 5px ;
        padding-bottom: 5px ;
    }
    .MuiInputLabel-root{
        font-size: 15px;
        line-height: 14px;
        letter-spacing: 0.02em;
        color: #424242;
        margin-bottom:6px;
    }

    .Mui-focused {
        .MuiOutlinedInput-notchedOutline {
            border: 1px solid #7210BE;
        }
    }

    .Mui-focused::after{
        border-color: #848484;
    }

    .MuiOutlinedInput-root {
        border-radius: 4px;
        transition: all 0.4s ease;
        ${props?.paddingX ? 'padding-left:' + props?.paddingX + 'px; ' + 'padding-right:' + props?.paddingX + 'px;' : ''}
        ${props?.paddingY ? 'padding-top:' + props?.paddingY + 'px; ' + 'padding-bottom:' + props?.paddingY + 'px;' : ''}
        
        & div:nth-of-type(2) {
            padding: 0;
            padding-right: 16px;
            min-height: 25px;
            display: flex;
            align-items: center;
        }
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

    .MuiTextField-root {
        border-bottom: none;
    }

    .MuiSelect-select-MuiInputBase-input-MuiInput-input{
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: #848484;
    }
  `
  );

  return (
    <SimpleSelectControl disabled={props?.disabled} className={props?.className || ''} sx={{ m: 1, width: '100%', ...props?.formControlSx }} variant="filled">

      {
        props?.labelFixed ?
          <FormLabel
            sx={{ mb: '6px', fontWeight: 400, fontSize: '14px', color: '#292929', lineHeight: '20px' }}
          >{props?.label}</FormLabel>
          : null
      }

      <TextField
        sx={{ ...props?.sx }}
        id={props?.label}
        autoComplete={props?.autoComplete}
        error={props?.error}
        onBlur={props?.onBlur}
        onChange={props?.onChange}
        label={!props?.labelFixed ? props?.label : null}
        name={props?.name}
        value={props?.value}
        disabled={props?.disabled}
        type={props?.type}
        variant={props?.variant || "standard"}
        InputProps={{
          startAdornment: props?.startAdornment || (
            <InputAdornment position="start">
            </InputAdornment>
          ),
          endAdornment: props?.endAdornment || (
            <InputAdornment position="start">
            </InputAdornment>
          ),
        }}
        select // This prop converts the TextField into a Select
      >
        {
          props?.placeholderText ?
            <MenuItem
              key={-1}
              content='option'
              value={props?.placeholderText}
              onClick={() => setCurrent(props?.placeholderText)}
              disabled
              selected
            >{props.placeholderText}</MenuItem>

            : null
        }

        {props?.children}
      </TextField>
    </SimpleSelectControl>
  )
}