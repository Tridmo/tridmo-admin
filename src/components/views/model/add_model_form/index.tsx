import Buttons from "@/components/buttons";
import FileInput, { FileValidations } from "@/components/inputs/file_input";
import SimpleInp from "@/components/inputs/simple_input";
import SimpleSelect from "@/components/inputs/simple_select";
import SimpleTypography from "@/components/typography";
import { getAllStyles, selectAllStyles } from "@/data/get_all_styles";
import instance from "@/utils/axios";
import { FormLabel, Grid, MenuItem } from "@mui/material";
import { Box, SxProps } from "@mui/system";
import axios from "axios";
import { Formik } from "formik";
import Cookies from 'js-cookie'
import Image from "next/image";
import { CSSProperties, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from 'yup';
import { selectCategories, selectModelCategories } from '../../../../data/categories';
import { useRouter, useSearchParams } from 'next/navigation';
import { selectAllColors } from '../../../../data/get_all_colors';
import { selectAllMaterials } from '../../../../data/get_all_materials';
import { selectAllBrands } from '../../../../data/get_all_brands';
import { selectModelPlatforms } from '../../../../data/get_model_platforms';
import { selectRenderPlatforms } from '../../../../data/get_render_platforms';
import ColorsSelect from '../../../inputs/color_select';
import MultipleSelect from '../../../inputs/multiple_select';

const availabilityData = [
  {
    value: 1,
    name: 'Доступно'
  },
  {
    value: 2,
    name: 'Не доступно'
  },
]

export function AddModelForm() {
  const stylesData = useSelector(selectAllStyles)
  const categoriesData = useSelector(selectModelCategories);
  const colorsData = useSelector(selectAllColors);
  const materialsData = useSelector(selectAllMaterials);
  const brandsData = useSelector(selectAllBrands);
  const modelPlatformsData = useSelector(selectModelPlatforms);
  const renderPlatformsData = useSelector(selectRenderPlatforms);

  const dispatch = useDispatch<any>()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [categoryChildren, setCategoryChildren] = useState<any[]>([])

  const supportedFileTypes = 'application/x-compressed, .zip, .rar, .7z'
  const supportedImageTypes = 'image/png, image/jpg, image/jpeg, image/webp'
  const imagesCountLimit = 9;
  const maxFileSize = 100;
  const maxCoverFileSize = 5;
  const maxImagesFileSize = 10;
  const minImages = 1000
  const minCover = 300
  const maxCover = 800

  const fileValidations: FileValidations = {
    allowedTypes: supportedFileTypes.split(', '),
    maxSize: maxFileSize
  }
  const coverValidations: FileValidations = {
    allowedTypes: supportedImageTypes.split(', '),
    maxSize: maxCoverFileSize,
    // minWidth: minCover,
    // minHeight: minCover,
    // maxWidth: maxCover,
    // maxHeight: maxCover,
  }
  const imagesValidations: FileValidations = {
    allowedTypes: supportedImageTypes.split(', '),
    maxSize: maxImagesFileSize,
    minWidth: minImages,
    minHeight: minImages,
  }


  const formControlSx: SxProps = {
    width: '90%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',

    '& > .input_width': {
      maxWidth: '305px'
    },
    '& > .dimensions_input_width': {
      maxWidth: '205px'
    },

    ':not(:last-child)': {
      marginBottom: '40px'
    }
  }

  const labelStyle: CSSProperties = {
    position: 'relative',
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.02em',
    color: '#292929',
    margin: '0 0 6px 0',
  }

  interface DataInterface {
    name: any,
    width: any,
    height: any,
    length: any,
    furniture_cost: any,
    availability: any,
    description: any,
    style_id: any,
    parent_category_id: any,
    category_id: any,
    brand_id: any,
    model_platform_id: any,
    render_platform_id: any,
    colors: any[],
    materials: any[],
    file: any,
    cover: any,
    images: any[],
    submit: any
  }
  const initialData: DataInterface = {
    name: '',
    width: '',
    height: '',
    length: '',
    furniture_cost: '',
    availability: '1',
    description: '',
    style_id: '',
    parent_category_id: '',
    category_id: '',
    brand_id: searchParams.get('brand') || '',
    model_platform_id: '',
    render_platform_id: '',
    colors: [],
    materials: [],
    file: '',
    cover: '',
    images: [],
    submit: null
  }

  function selectParentCategory(id) {
    const data: any[] = [...categoriesData]
    const selected = data?.find((c) => c?.id == id)
    const arr: any[] = Array.from(selected?.children)
    console.log(selected);
    console.log(arr);

    setCategoryChildren(arr)
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
      <Box sx={{ width: '100%' }}>
        <Formik

          initialValues={initialData}

          validationSchema={
            Yup.object().shape({
              name: Yup.string().max(255).required('Название не указано'),
              width: Yup.number().required('Ширина не указано'),
              height: Yup.number().required('Высота не указано'),
              length: Yup.number().required('Длина не указано'),
              furniture_cost: Yup.number().required('Цена не указано'),
              availability: Yup.string().max(255).required('Доступность не указано'),
              description: Yup.string().max(255).required('Описание не указано'),
              style_id: Yup.number().required('Cтиль не указано'),
              parent_category_id: Yup.number().required('Основная категория не указана'),
              category_id: Yup.number().required('Категория не указано'),
              brand_id: Yup.string().required('Категория не указано'),
              model_platform_id: Yup.string().required('Платформа не указано'),
              render_platform_id: Yup.string().required('Платформа не указано'),
              colors: Yup.array().of(Yup.number()).min(1).required('Загрузите хотя бы один цвет'),
              materials: Yup.array().of(Yup.number()).min(1).required('Загрузите хотя бы один материал'),

              file: Yup.mixed().required('Загрузите файл'),
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
              formData.append('width', _values.width)
              formData.append('height', _values.height)
              formData.append('length', _values.length)
              formData.append('furniture_cost', _values.furniture_cost)
              formData.append('availability', _values.availability)
              formData.append('description', _values.description)
              formData.append('style_id', _values.style_id)
              formData.append('category_id', _values.category_id)
              formData.append('brand_id', _values.brand_id)
              formData.append('model_platform_id', _values.model_platform_id)
              formData.append('render_platform_id', _values.render_platform_id)
              formData.append('file', _values.file)
              formData.append('cover', _values.cover)
              _values.images.forEach(i => formData.append('images', i))
              _values.colors.forEach(i => formData.append('colors', i))
              _values.materials.forEach(i => formData.append('materials', i))

              const res = await instance.post(
                `/models`,
                formData
              );

              toast.success(res?.data?.message);
              setStatus({ success: true });
              setSubmitting(false);
              resetForm()

              router.push(`/models/${res?.data?.data?.model?.slug}`)

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
                      width: '60%',
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
                        className='input_width'
                        variant='outlined'
                        paddingX={12}
                        paddingY={12}
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                        name="name"
                        type="text"
                        autoComplete="off"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.name}
                        label="Название"
                        labelFixed
                        placeholderText="Введите название"
                      />

                      <SimpleSelect
                        disabled={Boolean(searchParams.get('brand'))}
                        className='input_width'
                        variant='outlined'
                        paddingX={12}
                        paddingY={10}
                        error={Boolean(touched.brand_id && errors.brand_id)}
                        helperText={touched.brand_id && errors.brand_id}
                        name="brand_id"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Бренд"
                        labelFixed
                        value={values.brand_id}
                      >
                        {
                          brandsData?.data?.brands?.map(
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
                        className='input_width'
                        variant='outlined'
                        paddingX={12}
                        paddingY={10}
                        error={Boolean(touched.parent_category_id && errors.parent_category_id)}
                        helperText={touched.parent_category_id && errors.parent_category_id}
                        name="parent_category_id"
                        onBlur={handleBlur}
                        onChange={(e) => {
                          handleChange(e)
                          selectParentCategory(e.target.value)
                        }}
                        label="Главная категория"
                        labelFixed
                        value={values.parent_category_id}
                      >
                        {
                          categoriesData?.map(
                            (c, i) => (
                              <MenuItem key={i} value={c.id}>{c.name}</MenuItem>
                            )
                          )
                        }
                      </SimpleSelect>

                      <SimpleSelect
                        className='input_width'
                        variant='outlined'
                        paddingX={12}
                        paddingY={10}
                        error={Boolean(touched.category_id && errors.category_id)}
                        helperText={touched.category_id && errors.category_id}
                        name="category_id"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Категория"
                        labelFixed
                        value={values.category_id}
                      >
                        {
                          categoryChildren?.map(
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
                        className='input_width'
                        variant='outlined'
                        paddingX={12}
                        paddingY={10}
                        error={Boolean(touched.model_platform_id && errors.model_platform_id)}
                        helperText={touched.model_platform_id && errors.model_platform_id}
                        name="model_platform_id"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Платформа моделирования"
                        labelFixed
                        value={values.model_platform_id}
                      >
                        {
                          modelPlatformsData?.platforms?.map(
                            (c, i) => (
                              <MenuItem key={i} value={c.id}>{c.name}</MenuItem>
                            )
                          )
                        }
                      </SimpleSelect>

                      <SimpleSelect
                        className='input_width'
                        variant='outlined'
                        paddingX={12}
                        paddingY={10}
                        error={Boolean(touched.render_platform_id && errors.render_platform_id)}
                        helperText={touched.render_platform_id && errors.render_platform_id}
                        name="render_platform_id"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Платформа рендеринга"
                        labelFixed
                        value={values.render_platform_id}
                      >
                        {
                          renderPlatformsData?.platforms?.map(
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
                        className='input_width'
                        variant='outlined'
                        paddingX={12}
                        paddingY={10}
                        error={Boolean(touched.style_id && errors.style_id)}
                        helperText={touched.style_id && errors.style_id}
                        name="style_id"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Стиль"
                        labelFixed
                        value={values.style_id}
                      >
                        {
                          stylesData?.data?.map(
                            (c, i) => (
                              <MenuItem key={i} value={c.id}>{c.name}</MenuItem>
                            )
                          )
                        }
                      </SimpleSelect>

                      <MultipleSelect
                        className='input_width'
                        variant='outlined'
                        paddingX={12}
                        paddingY={10}
                        error={Boolean(touched.materials && errors.materials)}
                        helperText={touched.materials && errors.materials}
                        name="materials"
                        onBlur={handleBlur}
                        onChange={(materials => {
                          setFieldValue('materials', materials)
                        })}
                        label="Материалы"
                        labelFixed
                        value={values.materials}
                      >
                        {
                          materialsData?.data?.map(
                            (c, i) => (
                              <MenuItem key={i} value={`${c.id}/${c.name}`}>{c.name}</MenuItem>
                            )
                          )
                        }
                      </MultipleSelect>

                    </Box>

                    <Box
                      sx={{ ...formControlSx }}
                    >
                      <ColorsSelect
                        // className='input_width'
                        error={Boolean(touched.colors && errors.colors)}
                        helperText={touched.colors && errors.colors}
                        name="colors"
                        onBlur={handleBlur}
                        limit={3}
                        onChange={(colors) => {
                          setFieldValue('colors', colors)
                        }}
                        label="Цвета"
                      />

                    </Box>

                    <Box
                      sx={{ ...formControlSx }}
                    >
                      <SimpleInp
                        className='input_width'
                        variant='outlined'
                        paddingX={12}
                        paddingY={12}
                        error={Boolean(touched.furniture_cost && errors.furniture_cost)}
                        helperText={touched.furniture_cost && errors.furniture_cost}
                        name="furniture_cost"
                        type="number"
                        autoComplete="off"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Цена мебели"
                        labelFixed
                        value={values.furniture_cost}
                      />

                      <SimpleSelect
                        className='input_width'
                        variant='outlined'
                        paddingX={12}
                        paddingY={10}
                        error={Boolean(touched.availability && errors.availability)}
                        helperText={touched.availability && errors.availability}
                        name="availability"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Доступность"
                        labelFixed
                        value={values.availability}
                      >
                        {
                          availabilityData?.map(
                            (c, i) => (
                              <MenuItem key={i} value={c.value}>{c.name}</MenuItem>
                            )
                          )
                        }
                      </SimpleSelect>
                    </Box>

                    <FormLabel
                      sx={{ display: 'block', mb: '6px', fontWeight: 400, fontSize: '14px', color: '#292929', lineHeight: '20px' }}
                    >Размеры</FormLabel>
                    <Box
                      sx={{ ...formControlSx }}
                    >
                      <SimpleInp
                        className='dimensions_input_width'
                        variant='outlined'
                        paddingX={12}
                        paddingY={12}
                        error={Boolean(touched.width && errors.width)}
                        helperText={touched.width && errors.width}
                        name="width"
                        type="number"
                        autoComplete="off"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.width}
                        placeholderText="Ширина"
                        endIconWithBg={'см'}
                      />
                      <SimpleInp
                        className='dimensions_input_width'
                        variant='outlined'
                        paddingX={12}
                        paddingY={12}
                        error={Boolean(touched.height && errors.height)}
                        helperText={touched.height && errors.height}
                        name="height"
                        type="number"
                        autoComplete="off"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.height}
                        placeholderText="Высота"
                        endIconWithBg={'см'}
                      />
                      <SimpleInp
                        className='dimensions_input_width'
                        variant='outlined'
                        paddingX={12}
                        paddingY={12}
                        error={Boolean(touched.length && errors.length)}
                        helperText={touched.length && errors.length}
                        name="length"
                        type="number"
                        autoComplete="off"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.length}
                        placeholderText="Длина"
                        endIconWithBg={'см'}
                      />

                    </Box>

                    <Box
                      sx={{ ...formControlSx }}
                    >
                      <SimpleInp
                        variant='outlined'
                        paddingX={12}
                        paddingY={10}
                        error={Boolean(touched.description && errors.description)}
                        helperText={touched.description && errors.description}
                        name="description"
                        type="text"
                        autoComplete="off"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.description}
                        label="Описание"
                        labelFixed
                        placeholderText="Введите текст..."
                        inputSx={{
                          width: '100% !important',
                          minHeight: '126px'
                        }}
                      />
                    </Box>


                  </Grid>

                  <Grid
                    item
                    sx={{
                      display: 'flex',
                      width: '40%',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <Box sx={{ ...formControlSx }}>
                      <FileInput
                        labelElement={<label data-shrink='true' style={labelStyle}> Файл </label>}
                        error={Boolean(touched.file && errors.file)}
                        helperText={touched.file && errors.file}
                        name="file"
                        validations={fileValidations}
                        onBlur={handleBlur}
                        icon='/icons/upload-cloud-purple.svg'
                        iconBgColor='#F3E5FF'
                        placeholderText="Перетащите или щелкните файл для загрузки"
                        accept={supportedFileTypes}
                        onChange={(files) => {
                          setFieldValue('file', files[0])
                        }}
                      />
                    </Box>

                    <Box sx={{ ...formControlSx }}>
                      <FileInput
                        labelElement={<label data-shrink='true' style={labelStyle}> Обложка </label>}
                        error={Boolean(touched.cover && errors.cover)}
                        helperText={touched.cover && errors.cover}
                        validations={coverValidations}
                        name="cover"
                        onBlur={handleBlur}
                        placeholderText="Перетащите или щелкните файл для загрузки"
                        accept={supportedImageTypes}
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
                        accept={supportedImageTypes}
                        multiple
                        limit={imagesCountLimit}
                        onChange={(files) => {
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