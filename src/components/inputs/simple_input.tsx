import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { ThemeProps } from '@/types/theme';
import { InputAdornment } from '@mui/material';
import { SxProps, styled } from '@mui/system';
interface InputAdornmentsProps {
    error?: boolean;
    name?: string;
    onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    value?: any;
    disabled?: boolean,
    label?: string,
    type?: string,
    autoComplete?: string,
    placeholder?: string;
    required?: boolean;
    helperText?: any;
    startAdornment?: any;
    endAdornment?: any;
    placeholderText: string,
    variant?: 'filled' | 'outlined' | 'standard',
    sx?: SxProps,
    paddingX?: number,
    paddingY?: number,
}


export default function SimpleInp(props: InputAdornmentsProps) {

    const SimpleInputControl = styled(FormControl)(
        // text-transform: capitalize;
        ({ theme }: ThemeProps) => `
    margin: 0 !important;

    .MuiInput-underline{
        background:#fafafa !important;
        padding-top: 5px ;
        padding-bottom: 5px ;
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
        ${props?.paddingX ? 'padding-left:' + props?.paddingX + 'px; ' + 'padding-right:' + props?.paddingX + 'px;' : ''}
        
        & input {
            ${props?.paddingY ? 'padding:' + props?.paddingY + 'px ' + props?.paddingY + 'px;' : ''}
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
  `
    );

    return (
        <SimpleInputControl sx={{ m: 1, width: '100%' }} variant="filled">

            <TextField
                id={props?.label}
                autoComplete={props?.autoComplete}
                error={props?.error}
                helperText={props?.helperText}
                onBlur={props?.onBlur}
                onChange={props?.onChange}
                label={props?.label}
                name={props?.name}
                value={props?.value}
                disabled={props?.disabled}
                placeholder={props?.placeholderText}
                type={props?.type}
                // autoComplete="current-password"
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
                variant={props?.variant || "standard"}
            />
        </SimpleInputControl>
    )
}