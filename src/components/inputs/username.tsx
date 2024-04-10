import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import SimpleInp from './simple_input';
interface InputAdornmentsProps {
    error?: boolean;
    name?: string;
    onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    value?: unknown;
    label?: string,
    type?: string,
    autoComplete?: string,
    placeholder?: string;
    required?: boolean;
    helperText?: React.ReactNode;
    placeholderText: string,
}

export default function UsernameInputAdornments(props: InputAdornmentsProps) {

    return (
        <FormControl sx={{ width: '100%' }} variant="filled">
            <SimpleInp
                // id="filled-password-input"
                label='Имя пользователя'
                autoComplete={props?.autoComplete}
                error={props?.error}
                helperText={props?.helperText}
                onBlur={props?.onBlur}
                onChange={props?.onChange}
                name={props?.name}
                placeholderText={props?.placeholderText}
                type={props?.type}
            />
        </FormControl>
    )
}