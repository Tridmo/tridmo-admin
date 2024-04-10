import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import { ThemeProps } from '@/types/theme';
import { Button, Grid, InputAdornment } from '@mui/material';
import { Box, SxProps, styled } from '@mui/system';
import Buttons from '../buttons';
import Image from 'next/image';
import SimpleTypography from '../typography';
import { ToastContainer, toast } from 'react-toastify';
import { LazyLoadImage } from "react-lazy-load-image-component";

export interface FileValidations {
    allowedTypes?: string[];
    maxSize?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
    minSize?: number;
    minWidth?: number;
}

interface InputAdornmentsProps {
    error?: boolean;
    name?: string;
    onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onChange: (files: File | File[]) => void;
    validations?: FileValidations;
    onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    value?: any;
    disabled?: boolean,
    label?: string,
    labelElement?: React.ReactElement,
    type?: string,
    autoComplete?: string,
    placeholder?: string;
    required?: boolean;
    helperText?: any;
    placeholderText: string,
    icon?: string,
    multiple?,
    limit?: number,
    accept?: string,
}

interface CustomFile {
    src: string;
    width: number;
    height: number;
    size: number;
    type: string;
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

export function validateFile(
    file: CustomFile,
    validations: FileValidations
): { error?: string } {
    const { allowedTypes, maxSize, minSize, minWidth, minHeight, maxWidth, maxHeight } = validations

    const size = Math.round(file.size / 1024 / 1024)

    if (allowedTypes && !allowedTypes?.includes(file.type)) {
        return { error: `File type is not valid (${file.type.split('/')[1]})` }
    }
    if (maxSize && size > maxSize) {
        return { error: `File is too large (${size}MB)` }
    }
    if (minSize && size < minSize) {
        return { error: `File is too small (${size})MB` }
    }
    if (minWidth && file.width < minWidth) {
        return { error: `Image width is too small (${file.width}px)` }
    }
    if (minHeight && file.height < minHeight) {
        return { error: `Image height is too small (${file.height}px)` }
    }
    if (maxWidth && file.width > maxWidth) {
        return { error: `Image width is too large (${file.width}px)` }
    }
    if (maxHeight && file.height > maxHeight) {
        return { error: `Image height is too large (${file.height}px)` }
    }

    return {}
}

export function readFile(file): Promise<CustomFile> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (event) {
            const img = new window.Image();
            img.onload = function () {
                resolve({
                    src: img.src,
                    width: img.width,
                    height: img.height,
                    size: file.size,
                    type: file.type,
                });
            };
            img.src = event.target!.result as string
        };
        reader.readAsDataURL(file)
    });
};

const getUploadsCount = (): number => {
    const x = window.sessionStorage.getItem('upc')
    if (!x) window.sessionStorage.setItem('upc', '0')
    return Number(x)
}
const singleUploadCount = (): boolean => {
    const x = window.sessionStorage.getItem('suc')
    if (!x) window.sessionStorage.setItem('suc', 'false')
    return Boolean(x)
}
const setSingleLimitReached = (status: boolean): void => {
    window.sessionStorage.setItem('slr', String(status))
}

const increaseUploadsCount = () => {
    window.sessionStorage.setItem('upc', (getUploadsCount() + 1).toString())
}
const decreaseUploadsCount = () => {
    window.sessionStorage.setItem('upc', (getUploadsCount() - 1).toString())
}
const resetUploadsCount = () => {
    window.sessionStorage.setItem('upc', '0')
}

export default function FileInput(props: InputAdornmentsProps) {

    const hiddenFileInput = React.useRef<HTMLInputElement>(null);

    const [placeHolderDisplay, setplaceHolderDisplay] = React.useState('block')
    const [uploadBtnWidth, setUploadBtnWidth] = React.useState<string | null>(null)
    const [uploadBtnDisplay, setUploadBtnDisplay] = React.useState<string | null>(null)
    const [previews, setPreviews] = React.useState<string[]>([])
    const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([])
    const [eventChange, setEventChange] = React.useState<React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>>()

    const [isDragging, setIsDragging] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const placeholderTextSx: SxProps = {
        marginLeft: '16px',
        display: placeHolderDisplay
    }

    React.useEffect(() => {
        if (uploadedFiles.length == 0) {
            resetUploadsCount()
        }
    }, [])

    const handleClick = (event) => {
        const fileInput = hiddenFileInput.current?.querySelector('input[type="file"]');
        if (fileInput) {
            setError(null);
            (fileInput as HTMLInputElement).click();
        }
    };

    const switchToEmptyBtn = () => {
        setplaceHolderDisplay('none')
        setUploadBtnDisplay('flex')
        setUploadBtnWidth('96px')
    }
    const switchToFullBtn = () => {
        setplaceHolderDisplay('block')
        setUploadBtnDisplay('flex')
        setUploadBtnWidth('100%')
    }
    const switchToHiddenBtn = () => {
        setplaceHolderDisplay('none')
        setUploadBtnDisplay('none')
    }

    const showError = (err) => {
        setError(err)
        setTimeout(() => {
            setError(null)
        }, 2000)
    }

    const updateBtnStatus = async (statusUpdater?: Function) => {
        if (statusUpdater) {
            statusUpdater()
        }
        else if (getUploadsCount() === 0 && props?.multiple) {
            switchToFullBtn()
        }
        else if (props?.limit && getUploadsCount() == props?.limit) {
            switchToHiddenBtn()
        }
        else if (getUploadsCount() != 0 && props?.limit && getUploadsCount() < props?.limit) {
            switchToEmptyBtn()
        }
    }

    const performFileActions = async (file: File): Promise<boolean> => {

        if (!props?.multiple && uploadedFiles.length >= 1) {
            showError('Images limit reached');
            return false;
        }

        if (props?.limit && getUploadsCount() >= props?.limit) {
            if (getUploadsCount() > props?.limit) showError('Images limit reached');
            return false;
        }

        const customFile = await readFile(file);
        if (props?.validations && Object.keys(props?.validations).length) {
            const { error: e } = validateFile(customFile, props?.validations);
            if (e) {
                showError(e)
            }
            else {
                if (props?.multiple) increaseUploadsCount();
                await updateBtnStatus(!props.multiple ? switchToHiddenBtn : undefined)

                await setPreviews(prev => [...prev, customFile.src]);
                await setUploadedFiles(prev => props?.multiple ? [...prev, file] : [file]);
            }

        } else {
            if (props?.multiple) increaseUploadsCount();
            await updateBtnStatus(!props.multiple ? switchToHiddenBtn : undefined)

            await setPreviews(prev => [...prev, customFile.src]);
            await setUploadedFiles(prev => props?.multiple ? [...prev, file] : [file]);
        }

        return true;
    }

    const handleChange = async (event) => {
        setError(null)

        const filesUploaded: File[] = event.target.files;

        if (!filesUploaded || filesUploaded.length === 0) return

        if (props?.limit && getUploadsCount() >= props?.limit) {
            if (getUploadsCount() > props?.limit) showError('Images limit reached');
            await updateBtnStatus(switchToHiddenBtn)
            return;
        }

        const arr = Array.from(filesUploaded)

        if (arr.length > 1 && props?.multiple) {
            for (const f of arr) {
                await performFileActions(f)
            }
        } else {
            await performFileActions(arr[0])
        }
    };

    const handleRemove = async (index) => {
        setUploadedFiles(prev => {
            const arr = [...prev]
            arr.splice(index, 1)
            return arr;
        });
        setPreviews(prev => {
            const arr = [...prev]
            arr.splice(index, 1)
            return arr;
        });

        if (getUploadsCount() != 0 && props?.multiple) decreaseUploadsCount();
        await updateBtnStatus(!props?.multiple ? switchToFullBtn : undefined)
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isDragging) {
            setIsDragging(true);
            setError(null)
        }
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setError(null)
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        setError(null)
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            e.target.files = files
            handleChange(e); // Reuse your existing handleChange function
        }
    };

    React.useEffect(() => {

        if (props?.limit && uploadedFiles.length > props?.limit) {
            uploadedFiles.length = props?.limit;
            setUploadedFiles(uploadedFiles)
        }
        if (!props?.limit && uploadedFiles.length > 1) {
            uploadedFiles.length = 1;
            setUploadedFiles(uploadedFiles)
        }

        props?.onChange(uploadedFiles)

    }, [uploadedFiles])

    return (
        <SimpleInputControl sx={{ m: 1, width: '100%', position: 'relative' }} variant="filled">

            {
                props?.labelElement ?
                    <label {...props?.labelElement?.props}>
                        {...props?.labelElement?.props?.children}
                        {props?.multiple && props?.limit ? ` (${previews?.length}/${props?.limit})` :
                            props?.multiple && !props?.limit ? ` (${previews?.length})` :
                                !props?.multiple ? ` (${previews?.length}/1)` : ''
                        }
                    </label>
                    : null
            }

            <Grid
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                sx={{
                    width: '100%',
                    // border: isDragging ? '2px dashed #000' : 'none',
                }}
                container
                rowGap={1}
                columnGap={1}
            >
                {
                    previews.map((url, i) => (
                        <Button
                            key={i}
                            onClick={() => handleRemove(i)}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                width: '96px',
                                height: '96px',
                                borderRadius: '4px',
                                border: '1px solid #F5F5F5',
                                padding: 0,
                                // backgroundImage: `url(${url})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',

                                '&:hover': {
                                    backgroundColor: 'transparent'
                                }
                            }}
                        >
                            <Image
                                alt='image preview'
                                src={url}
                                width={94}
                                height={94}
                                style={{ borderRadius: '3px', objectFit: 'cover' }}
                            />
                            <Box
                                key={i}
                                sx={{
                                    opacity: 0,
                                    position: 'absolute',
                                    top: 0,
                                    bottom: 0,
                                    right: 0,
                                    left: 0,
                                    backgroundColor: '#FFFFFF26',
                                    backdropFilter: 'blur(2px)',
                                    transition: 'all 0.4s ease',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',

                                    '&:hover': {
                                        opacity: 1
                                    }
                                }}
                            >
                                <Box
                                    key={i}
                                    sx={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '4px',
                                        backgroundColor: '#FAE1E1',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '9.5px'
                                    }}
                                >
                                    <Image
                                        key={i}
                                        alt='upload icon'
                                        src={props?.icon || '/icons/trash.svg'}
                                        width={13}
                                        height={13}
                                    />
                                </Box>
                            </Box>
                        </Button>
                    ))
                }
                <Button
                    onClick={handleClick}
                    sx={{
                        display: uploadBtnDisplay || 'flex',
                        width: uploadBtnWidth || '100%',
                        height: uploadBtnWidth || 'auto',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        padding: '24px',
                        backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='4' ry='4' stroke='%23B3B3B3FF' stroke-width='3' stroke-dasharray=${isDragging ? '\'2%2c0\'' : '\'2%2c10\''} stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
                        borderRadius: '4px',
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        MozAppearance: 'none',
                        transition: 'background-image 0.4s ease',
                    }}
                >
                    <Box
                        sx={{
                            width: '54px',
                            height: '54px',
                            borderRadius: '50%',
                            backgroundColor: '#E1E9FE',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '12px'
                        }}
                    >
                        <Image
                            alt='upload icon'
                            src={props?.icon || '/icons/upload-cloud.svg'}
                            width={30}
                            height={30}
                        />
                    </Box>
                    <Box
                        sx={placeholderTextSx}>
                        <SimpleTypography
                            text={props?.placeholderText}
                            sx={{
                                fontWeight: 400,
                                fontSize: '14px',
                                lineHeight: '20px',
                                color: '#424242',
                                textAlign: 'start',
                                textTransform: 'none'
                            }}
                        />
                    </Box>
                </Button>
                <Input
                    sx={{
                        display: 'none'
                    }}
                    ref={hiddenFileInput}
                    id={props?.label}
                    autoComplete={props?.autoComplete}
                    error={props?.error}
                    onBlur={props?.onBlur}
                    onChange={handleChange}
                    name={props?.name}
                    value={props?.value}
                    disabled={props?.disabled}
                    placeholder={props?.placeholderText}
                    type='file'
                    inputProps={{
                        multiple: props?.multiple,
                        accept: props?.accept
                    }}
                />
            </Grid>
            <Box
                sx={{
                    position: 'absolute',
                    top: '100%',
                    display: 'block',
                }}>
                <SimpleTypography
                    text={error ? error : ''}
                    sx={{
                        opacity: error ? 1 : 0,
                        transition: 'opacity 0.4s ease',
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '20px',
                        color: '#DB2E2E',
                        textAlign: 'start',
                        textTransform: 'none'
                    }}
                />
            </Box>
        </SimpleInputControl >
    )
}