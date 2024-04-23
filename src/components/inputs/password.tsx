import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SimpleInp from './simple_input';

interface State {
  amount: string;
  password: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
}
interface InputAdornmentsProps {
  error?: boolean;
  name?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  value?: unknown;
  type?: string,
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  helperText?: React.ReactNode;
  placeholderText: string,
  label?: string,
}

export default function PasswordInputAdornments(props: InputAdornmentsProps) {
  const [values, setValues] = React.useState<State>({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <FormControl sx={{ width: '100%' }} variant="filled">
      <SimpleInp
        // id="filled-adornment-password"
        // helperText={props?.helperText}
        // FormHelperText={props?.helperText}
        label={props?.label || 'Пароль'}
        type={values.showPassword ? 'text' : 'password'}
        value={props?.value}
        error={props?.error}
        autoComplete={props?.autoComplete}
        onBlur={props?.onBlur}
        required={props?.required}
        onChange={props?.onChange}
        name={props?.name}
        placeholderText={props?.placeholderText}
        helperText={props?.helperText}
        endAdornment={
          <InputAdornment position="end"
            sx={{
              height: 'auto !important'
            }}
          >
            <IconButton
              sx={{
                margin: 0,
              }}
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {values.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}