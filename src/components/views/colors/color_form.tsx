import Buttons from "@/components/buttons";
import SimpleInp from "@/components/inputs/simple_input";
import SimpleTypography from "@/components/typography";
import { getAllStyles, selectAllStyles } from "@/data/get_all_styles";
import instance from "@/utils/axios";
import { FormLabel, Grid, MenuItem } from "@mui/material";
import { Box, SxProps } from "@mui/system";
import { Formik } from "formik";
import Image from "next/image";
import { CSSProperties, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from 'yup'; '../../../data/categories';
import { useRouter } from 'next/navigation';
import { setColorFormState, setOpenModal, setStyleFormState } from "../../../data/modal_checker";
import { getAllMaterials } from "../../../data/get_all_materials";
import { getAllColors } from "../../../data/get_all_colors";
import ColorInput from "../../inputs/color_input";


const formControlSx: SxProps = {
  width: '100%',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',

  '& > .input_width': {
    maxWidth: '400px'
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

export function ColorForm({ editing = false, color }: { editing?: boolean, color?: any }) {

  const dispatch = useDispatch<any>()
  const router = useRouter()

  interface DataInterface {
    name: any,
    hex_value: any,
    submit: any
  }
  const initialData: DataInterface = {
    name: editing && color?.name ? color?.name : '',
    hex_value: editing && color?.hex_value ? color?.hex_value : '',
    submit: null
  }

  function handleCloseModal() {
    dispatch(setOpenModal(false))
    dispatch(setColorFormState({ open: false, editing: false, color: null }))
  }

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#fff',
      }}
    >
      <Box sx={{ marginBottom: '40px' }}>
        <SimpleTypography
          text={editing ? "Редактировать цвет" : "Новый цвет"}
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
              hex_value: Yup.string().max(20).required('Цвет не указано'),
            })
          }
          onSubmit={async (
            _values, { resetForm, setErrors, setStatus, setSubmitting }
          ) => {
            try {

              const formData = new FormData()

              formData.append('name', _values.name)
              formData.append('hex_value', _values.hex_value)

              const res =
                editing && color ?
                  await instance.put(
                    `/colors/${color?.id}`,
                    formData
                  )
                  : await instance.post(
                    `/colors`,
                    formData
                  );

              toast.success(res?.data?.message);
              setStatus({ success: true });
              setSubmitting(false);
              resetForm()
              handleCloseModal()

              dispatch(getAllColors())

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

                    </Box>

                    <Box
                      sx={{ ...formControlSx }}
                    >
                      <ColorInput
                        className='input_width'
                        variant='outlined'
                        paddingX={12}
                        paddingY={12}
                        error={Boolean(touched.hex_value && errors.hex_value)}
                        helperText={touched.hex_value && errors.hex_value}
                        name="hex_value"
                        type="text"
                        autoComplete="off"
                        onBlur={handleBlur}
                        onChange={(color) => {
                          setFieldValue('hex_value', color)
                        }}
                        value={values.hex_value}
                        label="Цвет"
                        labelFixed
                        placeholderText="Выберите цвет"
                      />

                    </Box>
                  </Grid>

                </Grid>
                <Box sx={{ marginTop: '40px', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                  <Buttons
                    name="Отмена"
                    disabled={Boolean(errors.submit) || isSubmitting}
                    className="bookmark__btn"
                    onClick={handleCloseModal}
                  />
                  <Buttons
                    name={editing ? "Сохранить" : "Добавить"}
                    childrenFirst={true}
                    type='submit'
                    startIcon={isSubmitting}
                    disabled={Boolean(errors.submit) || isSubmitting}
                    loadingColor='#fff'
                    className="upload__btn"
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