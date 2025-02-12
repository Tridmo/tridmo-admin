import Buttons from "@/components/buttons";
import SimpleInp from "@/components/inputs/simple_input";
import SimpleTypography from "@/components/typography";
import { getAllStyles, selectAllStyles } from "@/data/get_all_styles";
import instance from "@/utils/axios";
import { FormLabel, Grid, MenuItem } from "@mui/material";
import { Box, minHeight, SxProps } from "@mui/system";
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
  mt: '8px',

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

export function CreateProductFromModelForm({ model, handleClose, onSuccess: handleSuccess }: { handleClose: Function, onSuccess: Function, model: any }) {

  interface DataInterface {
    has_delivery: boolean;
    name: string;
    description: string;
    price: string;
    discount_percent: number;
    discount_until: Date | null;
    submit: any;
  }
  const initialData: DataInterface = {
    has_delivery: false,
    name: model.name,
    description: model.description,
    price: model.furniture_cost,
    discount_percent: 0,
    discount_until: null,
    submit: null
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
          text={"Создать модель как продукт"}
          sx={{
            fontSize: '28px',
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
              description: Yup.string().max(3000).required('Описание не указано'),
              price: Yup.number().min(1).required('Цена не указано'),
              has_delivery: Yup.boolean().nullable().optional(),
              discount_percent: Yup.number().max(100).nullable().optional(),
              discount_until: Yup.date().nullable().optional(),
            })
          }
          onSubmit={async (
            _values, { resetForm, setErrors, setStatus, setSubmitting }
          ) => {
            try {

              const formData = new FormData()

              formData.append('name', _values.name);
              formData.append('description', _values.description);
              formData.append('price', _values.price);
              if (_values.has_delivery) formData.append('has_delivery', "true");
              if (_values.discount_percent > 0) formData.append('discount_percent', String(_values.discount_percent));
              if (_values.discount_until) formData.append('discount_until', String(_values.discount_until));

              const res = await instance.post(
                `products/from-model/${model.id}`,
                formData
              );

              toast.success(res?.data?.message);
              setStatus({ success: true });
              setSubmitting(false);
              resetForm()
              handleClose()
              handleSuccess()

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
                    <Box sx={{ ...formControlSx }}>
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

                    <Box sx={{ ...formControlSx }}>
                      <SimpleInp
                        className='input_width'
                        variant='outlined'
                        paddingX={12}
                        paddingY={12}
                        error={Boolean(touched.price && errors.price)}
                        helperText={touched.price && errors.price}
                        name="price"
                        type="number"
                        autoComplete="off"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.price}
                        label="Цена"
                        labelFixed
                        placeholderText="Введите цена"
                      />
                    </Box>

                    <Box sx={{ ...formControlSx }}>
                      <SimpleInp
                        textarea
                        resize="vertical"
                        className='input_width'
                        variant='outlined'
                        paddingX={12}
                        paddingY={12}
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
                        placeholderText="Введите oписание"
                      />
                    </Box>

                    <Box sx={{ ...formControlSx }}>
                      <SimpleInp
                        className='input_width'
                        variant='outlined'
                        paddingX={12}
                        paddingY={12}
                        error={Boolean(errors.discount_percent)}
                        helperText={touched.discount_percent && errors.discount_percent}
                        name="discount_percent"
                        type="number"
                        autoComplete="off"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.discount_percent}
                        label="Скидка"
                        labelFixed
                        placeholderText="Введите cкидка"
                      />
                    </Box>

                    {
                      values.discount_percent > 0 && (
                        <Box sx={{ ...formControlSx }}>
                          <SimpleInp
                            className='input_width'
                            variant='outlined'
                            paddingX={12}
                            paddingY={12}
                            error={Boolean(errors.discount_until)}
                            helperText={touched.discount_until && errors.discount_until}
                            name="discount_until"
                            type="text"
                            autoComplete="off"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.discount_until}
                            label="Срок действия скидки"
                            labelFixed
                            placeholderText="Выберите дату"
                          />
                        </Box>
                      )
                    }

                  </Grid>

                </Grid>
                <Box sx={{ marginTop: '40px', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                  <Buttons
                    name="Отмена"
                    disabled={isSubmitting}
                    className="bookmark__btn"
                    onClick={() => handleClose()}
                  />
                  <Buttons
                    name={"Создать"}
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