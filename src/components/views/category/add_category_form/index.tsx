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
import { getCategories, getModelCategories, selectCategories, selectInteriorCategories, selectModelCategories, selectOneCategory } from '../../../../data/categories';
import { useRouter } from 'next/navigation';
import { selectAllColors } from '../../../../data/get_all_colors';
import { selectAllMaterials } from '../../../../data/get_all_materials';
import { selectAllBrands } from '../../../../data/get_all_brands';
import { selectModelPlatforms } from '../../../../data/get_model_platforms';
import { selectRenderPlatforms } from '../../../../data/get_render_platforms';
import ColorsSelect from '../../../inputs/color_select';
import MultipleSelect from '../../../inputs/multiple_select';
import { setRouteCrumbs } from "../../../../data/route_crumbs";

const typeData = [
  {
    value: 'model',
    name: 'Для моделей'
  },
  {
    value: 'interior',
    name: 'Для интерьеров'
  },
]


const formControlSx: SxProps = {
  width: '100%',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',

  '& > .input_width': {
    maxWidth: '240px'
  },
}

const labelStyle: CSSProperties = {
  position: 'relative',
  fontSize: '14px',
  lineHeight: '20px',
  letterSpacing: '0.02em',
  color: '#292929',
  margin: '0 0 6px 0',
}

export function AddCategoryForm({ editing = false }: { editing?: boolean }) {

  const dispatch = useDispatch<any>()
  const router = useRouter()

  const parentCategoriesData = useSelector(selectModelCategories)
  const category = useSelector(selectOneCategory)


  const [selectedType, setSelectedType] = useState<'model' | 'interior' | string>(editing && category?.type ? category?.type : 'model')
  const [parentCategories, setParentCategories] = useState<any[]>(editing && selectedType != 'interior' ? parentCategoriesData : [])

  if (editing) {
    useEffect(() => {
      dispatch(setRouteCrumbs(
        [{
          title: 'Категории',
          route: '/categories'
        }, {
          title: category?.name,
          route: `/categories`
        }, {
          title: 'Редактировать',
          route: `/categories/edit/${category?.id}`
        }]
      ))
    }, [])
  }

  interface DataInterface {
    name: any,
    type: any,
    parent_id: any,
    submit: any
  }
  const initialData: DataInterface = {
    name: editing && category?.name ? category?.name : '',
    type: editing && category?.type ? category?.type : '',
    parent_id: editing && category?.parent_id ? category?.parent_id : '',
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
          text={editing ? "Редактировать категорию" : "Новая категория"}
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
              type: Yup.string().oneOf(['model', 'interior']).required('Тип не указан'),
              parent_id: Yup.number().optional(),
            })
          }
          onSubmit={async (
            _values, { resetForm, setErrors, setStatus, setSubmitting }
          ) => {
            try {

              const formData = new FormData()

              formData.append('name', _values.name)
              formData.append('type', _values.type)
              if (_values.parent_id && _values.type != 'interior') formData.append('parent_id', _values.parent_id)

              const res = await instance.post(
                `/categories`,
                formData
              );

              toast.success(res?.data?.message);
              setStatus({ success: true });
              setSubmitting(false);
              resetForm()

              dispatch(getCategories())
              dispatch(getModelCategories())
              router.push(`/categories`)

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
                      width: '100%',
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
                        className='input_width'
                        variant='outlined'
                        paddingX={12}
                        paddingY={10}
                        error={Boolean(touched.type && errors.type)}
                        helperText={touched.type && errors.type}
                        name="type"
                        onBlur={handleBlur}
                        onChange={(e) => {
                          handleChange(e)
                          setSelectedType(e.target.value)
                          if (e.target.value == 'interior') {
                            setParentCategories([])
                            setFieldValue('parent_id', undefined)
                          }
                          else {
                            setParentCategories([...parentCategoriesData])
                          }
                        }}
                        label="Тип"
                        labelFixed
                        value={values.type}
                      >
                        {
                          typeData?.map(
                            (c, i) => (
                              <MenuItem key={i} value={c.value}>{c.name}</MenuItem>
                            )
                          )
                        }
                      </SimpleSelect>
                      <SimpleSelect
                        className='input_width'
                        variant='outlined'
                        paddingX={12}
                        paddingY={10}
                        error={Boolean(touched.parent_id && errors.parent_id)}
                        helperText={touched.parent_id && errors.parent_id}
                        name="parent_id"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Главная категория"
                        labelFixed
                        disabled={selectedType == 'interior' || !parentCategories.length}
                        value={values.parent_id}
                      >
                        {
                          parentCategories?.map(
                            (c, i) => (
                              <MenuItem key={i} value={c.id}>{c.name}</MenuItem>
                            )
                          )
                        }
                      </SimpleSelect>
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