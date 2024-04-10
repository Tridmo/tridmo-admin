import Buttons from "@/components/buttons";
import FileInput, { FileValidations } from "@/components/inputs/file_input";
import SimpleInp from "@/components/inputs/simple_input";
import SimpleSelect from "@/components/inputs/simple_select";
import SimpleTypography from "@/components/typography";
import { getAllStyles, selectAllStyles } from "@/data/get_all_styles";
import instance from "@/utils/axios";
import { Grid, MenuItem } from "@mui/material";
import { Box, SxProps } from "@mui/system";
import axios from "axios";
import { Formik } from "formik";
import Cookies from 'js-cookie'
import Image from "next/image";
import { CSSProperties, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from 'yup';
import { getInteriorCategories, selectInteriorCategories } from '../../../../data/categories';
import { useRouter } from 'next/navigation';

export function AddInteriorForm() {
    const stylesData = useSelector(selectAllStyles)
    const categoriesData = useSelector(selectInteriorCategories);


    const dispatch = useDispatch<any>()
    const router = useRouter()

    const supportedFileTypes = 'image/png, image/jpg, image/jpeg, image/webp'
    const imagesCountLimit = 9;
    const maxCoverFileSize = 5;
    const maxImagesFileSize = 10;
    const minImages = 1000
    const minCover = 300
    const maxCover = 800

    const coverValidations: FileValidations = {
        allowedTypes: supportedFileTypes.split(', '),
        maxSize: maxCoverFileSize,
        // minWidth: minCover,
        // minHeight: minCover,
        // maxWidth: maxCover,
        // maxHeight: maxCover,
    }
    const imagesValidations: FileValidations = {
        allowedTypes: supportedFileTypes.split(', '),
        maxSize: maxImagesFileSize,
        minWidth: minImages,
        minHeight: minImages,
    }


    const formControlSx: SxProps = {
        width: '90%',

        ':not(:last-child)': {
            marginBottom: '24px'
        }
    }

    const labelStyle: CSSProperties = {
        position: 'relative',
        fontSize: '11px',
        lineHeight: '14px',
        letterSpacing: '0.02em',
        color: '#424242',
        margin: '0 0 6px 0',
    }

    interface DataInterface {
        name: any,
        description: any,
        style_id: any,
        category_id: any,
        cover: any,
        images: any[],
        submit: any
    }
    const initialData: DataInterface = {
        name: '',
        description: '',
        style_id: '',
        category_id: '',
        cover: '',
        images: [],
        submit: null
    }

    return (
        <Box
            sx={{
                width: '100%',
                backgroundColor: '#fff',
                border: '1px solid #E0E0E0',
                padding: '28px'
            }}
        >
            <Box sx={{ marginBottom: '40px' }}>
                <SimpleTypography
                    text="Загрузить новый проект"
                    sx={{
                        fontSize: '30px',
                        fontWeight: '500',
                        lineHeight: '36px',
                        letterSpacing: '-0.02em',
                        textAlign: 'left',
                    }}
                />
            </Box>

            <Box sx={{ width: '100%' }}>
                <Formik

                    initialValues={initialData}

                    validationSchema={
                        Yup.object().shape({
                            name: Yup.string().max(255).required('Название не указано'),
                            description: Yup.string().max(255).required('Описание не указано'),
                            style_id: Yup.number().required('Cтиль не указано'),
                            category_id: Yup.number().required('Категория не указано'),

                            cover: Yup.mixed().required('Загрузите изображение обложки'),
                            images: Yup.array().of(Yup.mixed()).required('Загрузите хотя бы одно изображение')
                        })
                    }
                    onSubmit={async (
                        _values, { resetForm, setErrors, setStatus, setSubmitting }
                    ) => {
                        console.log(_values, 'jddjdjd');
                        try {

                            const formData = new FormData()

                            formData.append('name', _values.name)
                            formData.append('description', _values.description)
                            formData.append('style_id', _values.style_id)
                            formData.append('category_id', _values.category_id)
                            formData.append('cover', _values.cover)

                            _values.images.forEach(i => formData.append('images', i))

                            const res = await instance.post(
                                `/interiors`,
                                formData
                            );

                            toast.success(res?.data?.message);
                            setStatus({ success: true });
                            setSubmitting(false);
                            resetForm()

                            router.push(`/interiors/${res?.data?.data?.interior?.slug}`)

                        } catch (err: any) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                            toast.error(err?.response?.data?.message);
                        }
                    }}
                >
                    {
                        ({
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            setFieldValue,
                            errors,
                            isSubmitting,
                            touched,
                            values,
                        }) => (
                            <form
                                onSubmit={handleSubmit}
                                style={{
                                    width: '100%'
                                }}
                            >
                                <Grid container
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        justifyContent: 'space-between'
                                    }}
                                >

                                    <Grid
                                        item
                                        sx={{
                                            display: 'flex',
                                            width: '50%',
                                            flexDirection: 'column',
                                            alignItems: 'flex-start',
                                            justifyContent: 'flex-start',
                                            borderRight: '1px solid #E0E0E0'
                                        }}
                                    >
                                        <Box
                                            sx={{ ...formControlSx }}
                                        >
                                            <SimpleInp
                                                error={Boolean(touched.name && errors.name)}
                                                helperText={touched.name && errors.name}
                                                name="name"
                                                type="text"
                                                autoComplete="off"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.name}
                                                label="Название"
                                                placeholderText="Введите название"
                                            />
                                        </Box>

                                        <Box
                                            sx={{ ...formControlSx }}
                                        >
                                            <SimpleInp
                                                error={Boolean(touched.description && errors.description)}
                                                helperText={touched.description && errors.description}
                                                name="description"
                                                type="text"
                                                autoComplete="off"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.description}
                                                label="Описание"
                                                placeholderText="Введите текст..."
                                            />
                                        </Box>

                                        <Box
                                            sx={{ ...formControlSx }}
                                        >
                                            {/* <label data-shrink='true' style={labelStyle}> Категория </label> */}
                                            <SimpleSelect
                                                error={Boolean(touched.style_id && errors.style_id)}
                                                helperText={touched.style_id && errors.style_id}
                                                name="style_id"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                label="Cтиль"
                                                placeholderText="Выберите стиль"
                                                value={values.style_id || "Выберите стиль"}
                                            >
                                                {
                                                    stylesData?.data?.map(
                                                        (c, i) => (
                                                            <MenuItem key={i} value={c.id}>{c.name}</MenuItem>
                                                        )
                                                    )
                                                }
                                            </SimpleSelect>
                                        </Box>

                                        <Box
                                            sx={{ ...formControlSx }}
                                        >
                                            {/* <label data-shrink='true' style={labelStyle}> Категория </label> */}
                                            <SimpleSelect
                                                error={Boolean(touched.category_id && errors.category_id)}
                                                helperText={touched.category_id && errors.category_id}
                                                name="category_id"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                label="Категория"
                                                placeholderText="Выберите категория"
                                                value={values.category_id || "Выберите категория"}
                                            >
                                                {
                                                    categoriesData?.map(
                                                        (c, i) => (
                                                            <MenuItem key={i} value={c.id}>{c.name}</MenuItem>
                                                        )
                                                    )
                                                }
                                            </SimpleSelect>
                                        </Box>
                                    </Grid>

                                    <Grid
                                        item
                                        sx={{
                                            display: 'flex',
                                            width: '50%',
                                            flexDirection: 'column',
                                            alignItems: 'flex-end',
                                            justifyContent: 'flex-start',
                                        }}
                                    >
                                        <Box sx={{ ...formControlSx }}>
                                            <FileInput
                                                labelElement={<label data-shrink='true' style={labelStyle}> Обложка </label>}
                                                error={Boolean(touched.cover && errors.cover)}
                                                helperText={touched.cover && errors.cover}
                                                validations={coverValidations}
                                                name="cover"
                                                onBlur={handleBlur}
                                                placeholderText="Перетащите или щелкните файл для загрузки"
                                                accept={supportedFileTypes}
                                                onChange={(files) => {
                                                    setFieldValue('cover', files[0])
                                                }}
                                            />
                                        </Box>

                                        <Box sx={{ ...formControlSx }}>
                                            <FileInput
                                                labelElement={<label data-shrink='true' style={labelStyle}> Изображений </label>}
                                                error={Boolean(touched.images && errors.images)}
                                                helperText={touched.images && errors.images}
                                                validations={imagesValidations}
                                                name="images"
                                                onBlur={handleBlur}
                                                placeholderText="Перетащите или щелкните файл для загрузки"
                                                accept={supportedFileTypes}
                                                multiple
                                                limit={imagesCountLimit}
                                                onChange={(files) => {
                                                    console.log(files, 'FF');
                                                    setFieldValue('images', files)
                                                }}
                                            />
                                        </Box>

                                    </Grid>

                                </Grid>
                                <Box sx={{ marginTop: '40px', width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                                    <Buttons
                                        name="Загрузить"
                                        childrenFirst={true}
                                        type='submit'
                                        startIcon={isSubmitting}
                                        disabled={Boolean(errors.submit) || isSubmitting}
                                        loadingColor='#fff'
                                        className="upload__btn"
                                        sx={{
                                            paddingX: '88px !important'
                                        }}
                                    >
                                        <Image
                                            alt="upload icon"
                                            src='/icons/upload-icon-white.svg'
                                            width={20}
                                            height={20}
                                        />
                                    </Buttons>
                                </Box>
                            </form>
                        )
                    }
                </Formik>
            </Box>
        </Box >
    )
}