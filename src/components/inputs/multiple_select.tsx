import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { ThemeProps } from '@/types/theme';
import { Box, Chip, FormLabel, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, SxProps, styled } from '@mui/material';

const SimpleSelectControl = styled(FormControl)(
  // text-transform: capitalize;
  ({ theme }: ThemeProps) => `
    margin: 0 !important;
    
    * {
        transition: all 0.4s ease;
    }

    .MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input {
        padding: 0 0 !important;
    }

    .MuiOutlinedInput-root {

        border-radius: 4px;
        transition: all 0.4s ease;

        & div:nth-of-type(1) {
            padding: 0;
            min-height: 25px;
            display: flex;
            align-items: center;
            color: #292929;
        }
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

interface SimpleSelectProps {
  sx?: SxProps;
  className?: string;
  variant?: 'filled' | 'outlined' | 'standard';
  paddingX?: number;
  paddingY?: number;
  error?: boolean;
  name?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
  onChange: (selected: any[]) => void;
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
  children?: React.ReactNode,
  labelFixed?: boolean;
  initialSelected?: any[];
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelect(props: SimpleSelectProps) {

  const muiOutlineInputRoot: SxProps = {}
  const muiFormControlRoot: SxProps = {}

  if (props?.paddingX) {
    muiOutlineInputRoot['paddingLeft'] = muiOutlineInputRoot['paddingRight'] = `${props?.paddingX}px`
  }
  if (props?.paddingY) {
    muiOutlineInputRoot['paddingTop'] = muiOutlineInputRoot['paddingBottom'] = `${props?.paddingY}px`
  }

  const SX = {
    '.MuiOutlinedInput-root': muiOutlineInputRoot,
    '.MuiFormControl-root': muiFormControlRoot,
  }

  const [current, setCurrent] = React.useState<string | undefined>(props?.placeholderText)

  const [selectedElems, setSelectedElems] = React.useState<any[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedElems>) => {
    const { target: { value } } = event;
    const arr = Array.from(value)
    setSelectedElems(arr);
  };

  React.useEffect(() => {
    if (props?.initialSelected && props?.initialSelected.length && !selectedElems.length) {
      setSelectedElems(props?.initialSelected)
    }
  }, [props?.initialSelected])

  React.useMemo(() => {
    props.onChange(selectedElems.map(e => `${e.split('/')[0]}`))
  }, [selectedElems])

  return (
    <SimpleSelectControl className={props?.className || ''} sx={{ m: 1, width: '100%', ...SX }} variant="filled">

      {
        props?.labelFixed ?
          <FormLabel
            id="demo-multiple-chip-label"
            sx={{ mb: '6px', fontWeight: 400, fontSize: '14px', color: '#292929', lineHeight: '20px' }}
          >{props?.label}</FormLabel>
          : null
      }

      <Select
        sx={{ ...props?.sx }}
        autoComplete={props?.autoComplete}
        error={props?.error}
        onBlur={props?.onBlur}
        onChange={handleChange}
        name={props?.name}
        value={selectedElems}
        disabled={props?.disabled}
        type={props?.type}
        multiple
        variant={props?.variant || "standard"}
        input={<OutlinedInput />}
        renderValue={(selected) => {
          return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {
                selected.map((value) => (
                  <Chip
                    sx={{
                      height: '25px'
                    }}
                    key={value}
                    label={value.split('/')[1]}
                  />
                ))
              }
            </Box>)
        }}
        MenuProps={MenuProps}
      // inputProps={{
      //     startAdornment: props?.startAdornment || (
      //         <InputAdornment position="start">
      //         </InputAdornment>
      //     ),
      //     endAdornment: props?.endAdornment || (
      //         <InputAdornment position="start">
      //         </InputAdornment>
      //     ),
      // }}
      >
        {/* {
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
                } */}

        {props?.children}
      </Select>
    </SimpleSelectControl >
  )
}