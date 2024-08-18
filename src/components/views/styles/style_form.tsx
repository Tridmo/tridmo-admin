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
import { setOpenModal, setStyleFormState } from "../../../data/modal_checker";


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

export function StyleForm({ editing = false, style }: { editing?: boolean, style?: any }) {

  const dispatch = useDispatch<any>()
  const router = useRouter()

  interface DataInterface {
    name: any,
    submit: any
  }
  const initialData: DataInterface = {
    name: editing && style?.name ? style?.name : '',
    submit: null
  }

  function handleCloseModal() {
    dispatch(setOpenModal(false))
    dispatch(setStyleFormState({ open: false, editing: false, style: null }))
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
          text={editing ? "Редактировать стиль" : "Новый стиль"}
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
            })
          }
          onSubmit={async (
            _values, { resetForm, setErrors, setStatus, setSubmitting }
          ) => {
            try {

              const formData = new FormData()

              formData.append('name', _values.name)
              formData.append('type', '1')

              const res =
                editing && style ?
                  await instance.put(
                    `/styles/${style?.id}`,
                    formData
                  )
                  : await instance.post(
                    `/styles`,
                    formData
                  );

              toast.success(res?.data?.message);
              setStatus({ success: true });
              setSubmitting(false);
              resetForm()
              handleCloseModal()

              dispatch(getAllStyles())

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