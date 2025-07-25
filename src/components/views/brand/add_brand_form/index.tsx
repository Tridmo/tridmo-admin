import Buttons from "@/components/buttons";
import FileInput, { FileValidations } from "@/components/inputs/file_input";
import MultipleSelect from "@/components/inputs/multiple_select";
import SimpleInp from "@/components/inputs/simple_input";
import SimpleSelect from "@/components/inputs/simple_select";
import SimpleTypography from "@/components/typography";
import { getAllBrands } from "@/data/get_all_brands";
import { selectAllCountries } from "@/data/get_all_countries";
import { selectAllStyles } from "@/data/get_all_styles";
import { setRouteCrumbs } from "@/data/route_crumbs";
import instance from "@/utils/axios";
import { IMAGES_BASE_URL } from "@/utils/image_src";
import { Grid, MenuItem } from "@mui/material";
import { Box, SxProps } from "@mui/system";
import { Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CSSProperties, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";

const supportedImageTypes = "image/png, image/jpg, image/jpeg, image/webp";
const maxCoverFileSize = 10;

const imageValidations: FileValidations = {
  allowedTypes: supportedImageTypes.split(", "),
  maxSize: maxCoverFileSize,
};

const formControlSx: SxProps = {
  width: "90%",

  "& > .input_width": {
    maxWidth: "240px",
    ":not(:last-child)": {
      marginBottom: "40px !important",
    },
  },
};

const labelStyle: CSSProperties = {
  position: "relative",
  fontSize: "14px",
  lineHeight: "20px",
  letterSpacing: "0.02em",
  color: "#292929",
  margin: "0 0 6px 0",
};

export function AddBrandForm({
  editing,
  brand,
  ...props
}: {
  editing?: boolean;
  brand?: any;
}) {
  const stylesData = useSelector(selectAllStyles);
  const countriesData = useSelector(selectAllCountries);

  const dispatch = useDispatch<any>();
  const router = useRouter();

  console.log(brand);

  if (editing && brand) {
    useEffect(() => {
      dispatch(
        setRouteCrumbs([
          {
            title: "Бренды",
            route: "/brands",
          },
          {
            title: brand?.name,
            route: `/brands/${brand?.slug}`,
          },
          {
            title: "Редактировать",
            route: `/brands/edit/${brand?.slug}`,
          },
        ])
      );
    }, []);
  }

  const initialData = {
    name: editing && brand?.name ? brand?.name : "",
    site_link: editing && brand?.site_link ? brand?.site_link : "",
    instagram: editing && brand?.instagram ? brand?.instagram : "",
    description: editing && brand?.description ? brand?.description : "",
    country_id: editing && brand?.country_id ? brand?.country_id : "",
    address: editing && brand?.address ? brand?.address : "",
    phone: editing && brand?.phone ? brand?.phone : "",
    styles: [],
    image: "",
    username: "",
    password: "",
    submit: null,
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#fff",
        border: "1px solid #E0E0E0",
        padding: "28px",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Formik
          initialValues={initialData}
          enableReinitialize={true}
          validationSchema={Yup.object().shape(
            editing && brand
              ? {
                  name: Yup.string().max(255).optional(),
                  site_link: Yup.string().url("Введите ссылку").optional(),
                  address: Yup.string().optional(),
                  phone: Yup.string().optional(),
                  // email: Yup.string().max(255).optional(),
                  instagram: Yup.string().max(255).optional(),
                  description: Yup.string().optional(),
                  username: Yup.string().optional(),
                  password: Yup.string().min(6).optional(),
                  styles: Yup.array()
                    .of(Yup.number())
                    .min(1, "Выберите хотя бы один стиль")
                    .max(3)
                    .optional(),
                  image: Yup.mixed().optional(),
                }
              : {
                  name: Yup.string().max(255).required("Название не указано"),
                  site_link: Yup.string()
                    .url("Введите ссылку")
                    .required("Ссылка на сайт не указано"),
                  address: Yup.string().required("Адрес не указано"),
                  phone: Yup.string().required("Номер телефона не указано"),
                  // email: Yup.string().max(255).required('Электронная почта не указано'),
                  instagram: Yup.string()
                    .max(255)
                    .required("Инстаграм не указано"),
                  description: Yup.string().required("Описание не указано"),
                  username: Yup.string()
                    .max(32)
                    .required("Имя пользователя не указано"),
                  password: Yup.string().min(6).required("Пароль не указано"),
                  styles: Yup.array()
                    .of(Yup.number())
                    .min(1, "Выберите хотя бы один стиль")
                    .max(3)
                    .required("Стили не указано"),
                  image: Yup.mixed().required("Загрузите изображение"),
                }
          )}
          onSubmit={async (
            _values,
            { resetForm, setErrors, setStatus, setSubmitting }
          ) => {
            try {
              const formData = new FormData();

              if (editing && brand) {
                if (_values.name != brand?.name)
                  formData.append("name", _values.name);
                if (_values.site_link != brand?.site_link)
                  formData.append("site_link", _values.site_link);
                if (_values.instagram != brand?.instagram)
                  formData.append("instagram", _values.instagram);
                if (_values.description != brand?.description)
                  formData.append("description", _values.description);
                if (_values.address != brand?.address)
                  formData.append("address", _values.address);
                if (_values.country_id != brand?.country_id)
                  formData.append("country_id", _values.country_id);
                if (_values.phone != brand?.phone)
                  formData.append("phone", _values.phone);
                if (_values.username != brand?.username)
                  formData.append("username", _values.username);
                if (_values.password)
                  formData.append("password", _values.password);
                if (_values.image != brand?.image)
                  formData.append("image", _values.image);
                if (_values.styles && _values.styles?.length) {
                  if (_values.styles?.length > 1)
                    _values.styles.forEach((i) => formData.append("styles", i));
                  else if (_values.styles?.length != 0)
                    formData.append("styles", JSON.stringify(_values.styles));
                }
              } else {
                formData.append("name", _values.name);
                formData.append("site_link", _values.site_link);
                formData.append("instagram", _values.instagram);
                formData.append("description", _values.description);
                formData.append("address", _values.address);
                formData.append("phone", _values.phone);
                formData.append("country_id", _values.country_id);
                formData.append("username", _values.username);
                formData.append("password", _values.password);
                formData.append("image", _values.image);
                if (_values.styles && _values.styles?.length) {
                  if (_values.styles?.length > 1)
                    _values.styles.forEach((i) => formData.append("styles", i));
                  else if (_values.styles?.length != 0)
                    formData.append("styles", JSON.stringify(_values.styles));
                }
              }

              const res = editing
                ? await instance.put(`/brands/${brand?.id}`, formData)
                : await instance.post(`/brands`, formData);

              dispatch(getAllBrands());
              toast.success(res?.data?.message);
              setStatus({ success: true });
              setSubmitting(false);
              resetForm();

              router.refresh();
              router.push(`/brands/${res?.data?.data?.brand?.slug}`);
            } catch (err: any) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
              toast.error(err?.response?.data?.message);
            }
          }}
        >
          {({
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
                width: "100%",
              }}
            >
              <Grid
                container
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <Grid
                  item
                  sx={{
                    display: "flex",
                    width: "50%",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <Box sx={{ ...formControlSx }}>
                    <SimpleInp
                      className="input_width"
                      variant="outlined"
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
                    <SimpleInp
                      textarea
                      resize="none"
                      className="input_width"
                      variant="outlined"
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
                        width: "100% !important",
                        minHeight: "196px",
                      }}
                    />
                    <FileInput
                      initialPreviews={
                        editing && brand
                          ? [`${IMAGES_BASE_URL}/${brand?.image_src}`]
                          : []
                      }
                      className="input_width"
                      labelElement={
                        <label data-shrink="true" style={labelStyle}>
                          {" "}
                          Логотип{" "}
                        </label>
                      }
                      error={Boolean(touched.image && errors.image)}
                      helperText={touched.image && errors.image}
                      validations={imageValidations}
                      name="image"
                      onBlur={handleBlur}
                      placeholderText="Перетащите или щелкните файл для загрузки"
                      accept={supportedImageTypes}
                      onChange={(files) => {
                        setFieldValue("image", files[0]);
                      }}
                    />
                  </Box>
                </Grid>

                <Grid
                  item
                  sx={{
                    display: "flex",
                    width: "50%",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    justifyContent: "flex-start",
                  }}
                >
                  <Box sx={{ ...formControlSx }}>
                    <SimpleInp
                      className="input_width"
                      variant="outlined"
                      paddingX={12}
                      paddingY={12}
                      error={Boolean(touched.site_link && errors.site_link)}
                      helperText={touched.site_link && errors.site_link}
                      name="site_link"
                      type="text"
                      autoComplete="off"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.site_link}
                      label="Ссылка на сайт"
                      labelFixed
                      placeholderText="https://"
                    />
                    <SimpleInp
                      className="input_width"
                      variant="outlined"
                      paddingX={12}
                      paddingY={12}
                      error={Boolean(touched.instagram && errors.instagram)}
                      helperText={touched.instagram && errors.instagram}
                      name="instagram"
                      type="text"
                      autoComplete="off"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.instagram}
                      label="Инстаграм"
                      labelFixed
                      placeholderText="username"
                    />
                    <SimpleInp
                      className="input_width"
                      variant="outlined"
                      paddingX={12}
                      paddingY={12}
                      error={Boolean(touched.phone && errors.phone)}
                      helperText={touched.phone && errors.phone}
                      name="phone"
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.phone}
                      label="Номер телефона"
                      labelFixed
                      placeholderText="Введите номер телефона"
                    />
                    <SimpleSelect
                      className="input_width"
                      variant="outlined"
                      paddingX={12}
                      paddingY={10}
                      error={Boolean(touched.country_id && errors.country_id)}
                      helperText={touched.country_id && errors.country_id}
                      name="country_id"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.country_id}
                      label="Страна"
                      labelFixed
                    >
                      {countriesData?.data?.map((c, i) => (
                        <MenuItem key={c.id} value={c.id}>
                          {c.name}
                        </MenuItem>
                      ))}
                    </SimpleSelect>
                    <SimpleInp
                      className="input_width"
                      variant="outlined"
                      paddingX={12}
                      paddingY={12}
                      error={Boolean(touched.address && errors.address)}
                      helperText={touched.address && errors.address}
                      name="address"
                      type="text"
                      autoComplete="off"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.address}
                      label="Адрес"
                      labelFixed
                      placeholderText="Введите aдрес"
                    />
                    <MultipleSelect
                      className="input_width"
                      variant="outlined"
                      paddingX={12}
                      paddingY={10}
                      error={Boolean(touched.styles && errors.styles)}
                      helperText={touched.styles && errors.styles}
                      name="styles"
                      onBlur={handleBlur}
                      onChange={(styles) => {
                        setFieldValue("styles", styles);
                      }}
                      initialSelected={
                        editing && brand?.styles
                          ? [...brand?.styles?.map((c) => `${c.id}/${c.name}`)]
                          : []
                      }
                      label="Стили"
                      labelFixed
                      value={values.styles}
                    >
                      {stylesData?.data?.map((c, i) => (
                        <MenuItem key={i} value={`${c.id}/${c.name}`}>
                          {c.name}
                        </MenuItem>
                      ))}
                    </MultipleSelect>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ margin: "40px 0 20px 0" }}>
                <SimpleTypography
                  text="Учетные данные для администратора бренда"
                  sx={{
                    fontSize: "20px",
                    fontWeight: "500",
                    lineHeight: "36px",
                    letterSpacing: "-0.02em",
                    textAlign: "left",
                  }}
                />
              </Box>
              <Grid
                container
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <Grid
                  item
                  sx={{
                    display: "flex",
                    width: "50%",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <Box sx={formControlSx}>
                    <SimpleInp
                      className="input_width"
                      variant="outlined"
                      paddingX={12}
                      paddingY={12}
                      error={Boolean(touched.username && errors.username)}
                      helperText={touched.username && errors.username}
                      name="username"
                      type="text"
                      autoComplete="off"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.username}
                      label="Имя пользователя"
                      labelFixed
                      placeholderText="username"
                    />
                  </Box>
                </Grid>

                <Grid
                  item
                  sx={{
                    display: "flex",
                    width: "50%",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    justifyContent: "flex-start",
                  }}
                >
                  <Box sx={formControlSx}>
                    <SimpleInp
                      className="input_width"
                      variant="outlined"
                      paddingX={12}
                      paddingY={12}
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                      name="password"
                      type="text"
                      autoComplete="off"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      label="Пароль"
                      labelFixed
                      placeholderText="Введите пароль"
                    />
                  </Box>
                </Grid>
              </Grid>

              <Box
                sx={{
                  marginTop: "40px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Buttons
                  name={editing ? "Сохранить" : "Загрузить"}
                  childrenFirst={true}
                  type="submit"
                  startIcon={isSubmitting}
                  disabled={Boolean(errors.submit) || isSubmitting}
                  loadingColor="#fff"
                  className="upload__btn"
                  sx={{
                    paddingX: "88px !important",
                  }}
                >
                  <Image
                    alt="upload icon"
                    src="/icons/upload-icon-white.svg"
                    width={20}
                    height={20}
                  />
                </Buttons>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}