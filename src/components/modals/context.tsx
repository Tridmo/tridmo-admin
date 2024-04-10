import * as React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { getMyProfile, resetMyProfile, selectMyProfile } from '../../data/me';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginState, setSignupState, setVerifyState, setOpenModal, setProfileEditState } from '../../data/modal_checker';
import { setAuthState } from "../../data/login";
import { Box, Typography, Grid, Button, TextField, InputAdornment, IconButton, SxProps } from '@mui/material';
import Image from 'next/image';
import SimpleTypography from '../typography'
import Buttons from '../buttons';
import axios from '../../utils/axios';
import { ACCESS_TOKEN_EXPIRATION_DAYS, REFRESH_TOKEN_EXPIRATION_DAYS } from '../../utils/expiration'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Cookies from 'js-cookie'
import SimpleInp from '../inputs/simple_input';
import EmailInputAdornments from '../inputs/email';
import PasswordInputAdornments from '../inputs/password';
import { passwordRegex, usernameRegex } from '@/types/regex';
import Link from 'next/link';
import UsernameInputAdornments from '../inputs/username';
import instance from '../../utils/axios';
//Login context
interface LoginContextProps {
  // setAlertMessage: any
  setModalChange__Viewer?: any,
  setOpen?: any,
  setUserEmail?: any,
  userEmail?: any,
  setProgress?: any,
}

export const LoginContext = (props: LoginContextProps) => {
  const authState = useSelector((state: any) => state?.auth_slicer?.authState);


  //declare dispatcher
  const dispatch = useDispatch<any>();
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null
        }}
        // 998971113539
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .min(4, "too short")
            .max(50, "too long")
            .email('Указанный адрес электронной почты должен быть действительным адресом электронной почты.')
            .required('Поле обязательно для заполнения.'),
          password: Yup.string()
            .required('Пароль не указан.')
            .max(255)
            .min(6, 'Пароль слишком короткий — минимум 6 символов.')
          // .matches(/[a-zA-Z]/, 'Пароль can only contain Latin letters.')
        })}
        onSubmit={async (
          _values,
          { resetForm, setErrors, setStatus, setSubmitting }
        ) => {
          try {
            const res = await axios.post(
              `auth/signin`,
              { email: _values.email, password: _values?.password },
            );
            resetForm();
            props?.setUserEmail(_values?.email);
            // dispatch(resetMyProfile())
            if (res?.data?.data?.user?.is_verified) {
              toast.success(res?.data?.message || 'Авторизация прошла успешна');

              (async () => {
                // Set cookies
                const accessTokenPromise = new Promise((resolve, reject) => {
                  Cookies.set(
                    'accessToken',
                    res?.data?.data?.token?.accessToken,
                    { expires: ACCESS_TOKEN_EXPIRATION_DAYS, path: '/', sameSite: 'Lax', secure: true }
                  );
                  resolve(true); // Resolve the promise once cookies are set
                });

                const refreshTokenPromise = new Promise((resolve, reject) => {
                  Cookies.set(
                    'refreshToken',
                    res?.data?.data?.token?.refreshToken,
                    { expires: REFRESH_TOKEN_EXPIRATION_DAYS, path: '/', sameSite: 'Lax', secure: true }
                  );
                  resolve(true); // Resolve the promise once cookies are set
                });

                // Wait for both promises to resolve
                await Promise.all([accessTokenPromise, refreshTokenPromise]);

                // Dispatch actions after cookies are set
                await dispatch(getMyProfile({ Authorization: `Bearer ${res?.data?.data?.token?.accessToken}` }));
                await dispatch(setAuthState(true));
                await dispatch(setOpenModal(false));
              })();
            } else {
              dispatch(setVerifyState(true));
              // toast.success("Please verify your email!")
            }
            dispatch(setLoginState(false));
            setStatus({ success: true });
            setSubmitting(false);
          } catch (err: any) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
            if (err.response.data.message) {
              toast.error(err.response.data.message);
            }
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid style={{ transformOrigin: '0 0 0' }}>
              <Grid sx={{ display: 'flex', alignItems: "start", justifyContent: "start", flexDirection: "column" }}>
                <SimpleTypography
                  className="modal__title"
                  variant="h6"
                  text="Вход"
                />
                <Grid
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    marginBottom: "26px"
                  }}>
                  <SimpleTypography
                    className="modal__sub-title"
                    variant="h6"
                    text="Еще не зарегистрировались?"
                  />
                  <Buttons
                    sx={{ marginLeft: '8px' }}
                    name="Зарегистрироваться"
                    onClick={() => {
                      dispatch(setSignupState(true));
                      dispatch(setLoginState(false))
                    }}
                    className='underlined__btn'
                  />
                </Grid>
                <Box sx={{ marginBottom: "26px", width: "100%" }}>
                  <EmailInputAdornments
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                    name="email"
                    type="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    placeholderText='example@gmail.com'
                  />
                </Box>

                <PasswordInputAdornments
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  name="password"
                  label='Пароль'
                  type="password"
                  onBlur={handleBlur}
                  required={true}
                  onChange={handleChange}
                  value={values.password}
                  placeholderText='Введите пароль'
                />

                <Box sx={{ marginTop: "10px" }}>
                  <Buttons name="Забыли пароль?" className='underlined__btn' />
                </Box>
                <Buttons
                  type="submit"
                  name="Войти"
                  startIcon={isSubmitting}
                  disabled={Boolean(errors.submit) || isSubmitting}
                  className='signIn__btn'
                />
              </Grid>
            </Grid>
          </form>)}
      </Formik>
    </>
  );
}

//Sign up context

export const SignUpContext = (props: LoginContextProps) => {
  const dispatch = useDispatch<any>();


  return (
    <>
      <Formik
        initialValues={{
          first_name: '',
          last_name: '',
          email: '',
          username: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          first_name: Yup.string()
            .max(255, 'Слишком длинное имя.')
            .min(2, 'Слишком короткое имя - минимум 2 символа.')
            .required('Имя не указано.'),
          last_name: Yup.string()
            .max(255, 'Слишком длинная фамилия.')
            .min(2, 'Слишком короткая фамилия - минимум 2 символа.'),
          username: Yup.string()
            .max(255, 'Слишком длинное имя пользователя.')
            .min(5, 'Слишком короткая имя пользователя - минимум 5 символа.')
            .matches(
              usernameRegex,
              'Имя пользователя может содержать только буквы, цифры, символы подчеркивания (_), тире (-) и точки (.).'
            ),
          email: Yup.string()
            .min(4, "Слишком короткий email.")
            .max(50, "Слишком длинный email.")
            .email('Указанный email должен быть действительным адресом электронной почты.')
            .required('Поле обязательно для заполнения.'),
          password: Yup.string()
            .matches(
              passwordRegex,
              'Пароль должен содержать от 8 до 32 символов, включая хотя бы одну заглавную и одну строчную латинскую букву, хотя бы одну цифру и хотя бы один специальный символ.'
            )
            .required('Поле обязательно для заполнения.')
        })}

        onSubmit={async (
          _values,
          { resetForm, setErrors, setStatus, setSubmitting }
        ) => {
          try {
            const res = await instance.get(`users/check/${_values.username}`);
            if (res.data.data.exists) {
              setStatus({ success: false });
              toast.error('Имя пользователя не доступно');
              setErrors({ submit: 'Имя пользователя не доступно' });
            } else {
              const signupResponse = await instance.post(`auth/signup`, {
                full_name: `${_values.first_name} ${_values.last_name}`,
                email: _values.email,
                username: _values.username,
                password: _values?.password,
              });
              setStatus({ success: true });
              props?.setUserEmail(_values?.email);
              dispatch(setSignupState(false));
              dispatch(setVerifyState(true));
              dispatch(setOpenModal(true));
              toast.success(res?.data?.message);
            }

          } catch (err: any) {
            setStatus({ success: false });
            toast.error(err?.response?.data?.message)
            setErrors({ submit: err.message });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid style={{ transformOrigin: '0 0 0' }}>
              <Grid sx={{ display: 'flex', alignItems: "start", justifyContent: "start", flexDirection: "column" }}>
                <SimpleTypography className="modal__title" variant="h6" text="Sign up" />
                <Grid sx={{ display: "flex", alignItems: "center", justifyContent: "start" }}>
                  <SimpleTypography className="modal__sub-title" variant="h6" text="Уже зарегистрирован?" />
                  <Buttons
                    sx={{ marginLeft: '8px' }}
                    name="Войти"
                    onClick={() => {
                      dispatch(setLoginState(true))
                      dispatch(setSignupState(false))
                    }}
                    className='underlined__btn'
                  />
                </Grid>

                <Box sx={{ display: "flex", marginTop: "26px", width: "100%", marginBottom: "26px" }}>
                  <Box sx={{ paddingRight: "8px", width: "50%" }}>
                    <SimpleInp
                      error={Boolean(touched.first_name && errors.first_name)}
                      helperText={touched.first_name && errors.first_name}
                      name="first_name"
                      type="first_name"
                      label="Имя"
                      autoComplete="off"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.first_name}
                      placeholderText='Имя'
                    />
                  </Box>
                  <Box sx={{ paddingLeft: "8px", width: "50%" }}>
                    <SimpleInp
                      error={Boolean(touched.last_name && errors.last_name)}
                      helperText={touched.last_name && errors.last_name}
                      name="last_name"
                      type="surname"
                      label="Фамилия"
                      autoComplete="off"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.last_name}
                      placeholderText='Фамилия'
                    />
                  </Box>
                </Box>

                <Box sx={{ marginBottom: "26px", width: "100%" }}>
                  <EmailInputAdornments
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                    name="email"
                    type="email"
                    label='Электронная почта'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    placeholderText='example@gmail.com'
                  />
                </Box>

                <Box sx={{ marginBottom: "26px", width: "100%" }}>
                  <UsernameInputAdornments
                    error={Boolean(touched.username && errors.username)}
                    helperText={touched.username && errors.username}
                    name="username"
                    type="text"
                    label='Имя пользователя'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username}
                    placeholderText='username'
                  />
                </Box>

                <PasswordInputAdornments
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  name="password"
                  label='Пароль'
                  type="password"
                  autoComplete="off"
                  onBlur={handleBlur}
                  required={true}
                  onChange={handleChange}
                  value={values.password}
                  placeholderText='Придумайте пароль'
                />

                {/* <Buttons name="Forgot your password?" className='underlined__btn' /> */}
                <Buttons
                  type="submit"
                  name="Create an account"
                  startIcon={isSubmitting}
                  disabled={Boolean(errors.submit) || isSubmitting}
                  className='signIn__btn'
                />
                <Box></Box>
                <SimpleTypography className='signIn__text' text=''
                  sx={{
                    fontSize: '12px',
                    fontWeight: 400,
                    lineHeight: '14px',
                    letterSpacing: '-0.02em',
                    color: '#424242',
                    textAlign: 'left'
                  }}
                >
                  {'Создавая учетную запись, вы соглашаетесь с нашими '}
                  <Buttons className='underlined__btn'
                    sx={{
                      fontSize: '12px',
                      fontWeight: 400,
                      lineHeight: '14px !important',
                      letterSpacing: '-0.02em',
                      color: '#424242',
                    }}
                  >
                    <Link href={"/terms_and_conditions"} target='_blank'>Пользовательского соглашения</Link>
                  </Buttons>

                  &nbsp;и&nbsp;

                  <Buttons className='underlined__btn'
                    sx={{
                      fontSize: '12px',
                      fontWeight: 400,
                      lineHeight: '14px !important',
                      letterSpacing: '-0.02em',
                      color: '#424242',
                    }}
                  >
                    <Link href={"/privacy_policy"} target='_blank'>Политикой конфиденциальности</Link>
                  </Buttons>

                </SimpleTypography>

              </Grid>
            </Grid>
          </form>)}
      </Formik>
    </>
  );
}


//Verify your account context

export const VerificationContext = (props: LoginContextProps) => {
  interface RenderTypes {
    minutes: any,
    seconds: any,
    completed: boolean,
  }


  //declare dispatcher
  const dispatch = useDispatch<any>();

  const Renderer = ({ minutes, seconds, completed }: RenderTypes) => {
    if (completed) {
      // Render a completed state
      return (
        <Grid sx={{ display: "flex", alignItems: "center", justifyContent: "start" }}>
          <SimpleTypography
            className="modal__sub-title"
            variant="h6"

            text="Didn't receive a code?"
          />
          <Buttons
            name="Send code again"
            onClick={() => { }}
            className='underlined__btn'
          />
        </Grid>
      )
    } else {
      // Render a countdown
      return (<>Resend in {" "}<span>{minutes}:{seconds}</span></>)
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          code: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          code: Yup.string()
            .max(255)
            .min(6, 'Too short - should be 6 chars minimum.')
            .required('Code field is required'),
        })}

        onSubmit={async (
          _values,
          { resetForm, setErrors, setStatus, setSubmitting }
        ) => {
          try {
            let res = await instance.post(
              `auth/verify`,
              { code: parseFloat(_values?.code), email: props?.userEmail }
            );
            resetForm();

            Cookies.set(
              'accessToken',
              res?.data?.data?.token?.accessToken,
              { expires: ACCESS_TOKEN_EXPIRATION_DAYS, path: '/', sameSite: 'Lax', secure: true },
            )

            Cookies.set(
              'refreshToken',
              res?.data?.data?.token?.refreshToken,
              { expires: REFRESH_TOKEN_EXPIRATION_DAYS, path: '/', sameSite: 'Lax', secure: true }
            )
            setStatus({ success: true });
            dispatch(resetMyProfile())
            dispatch(setAuthState(true))
            dispatch(setVerifyState(false))
            dispatch(setOpenModal(false));
            toast.success(res?.data?.message || 'Регистрация прошла успешно');
            setSubmitting(false);
          } catch (err: any) {
            setStatus({ success: false });
            if (err?.response?.data?.message) {
              toast.error(err?.response?.data?.message)
              setErrors({ submit: err?.response?.data?.message });
            }
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid style={{ transformOrigin: '0 0 0' }}>
              <Grid sx={{ display: 'flex', alignItems: "start", justifyContent: "start", flexDirection: "column" }}>
                <Button
                  sx={{ padding: "0 10px 0 0", marginBottom: "13px" }}
                  onClick={() => {
                    dispatch(setSignupState(true))
                    dispatch(setVerifyState(false))
                  }}
                >
                  <KeyboardArrowLeftIcon />
                  <SimpleTypography className='verification__back' text='Назад' />
                </Button>
                <SimpleTypography
                  className="modal__title"
                  variant="h6"

                  text="Подтвердите Ваш электронный адрес"
                />
                <Grid sx={{ display: "flex", alignItems: "center", justifyContent: "start", marginBottom: "10px" }}>

                  <SimpleTypography
                    className="modal__sub-title"
                    variant="h6"
                    text={`Мы отправили электронное письмо с подтверждением на адрес ${props?.userEmail}. Если вы не можете найти письмо в почтовом ящике, проверьте`}
                  >
                    <b style={{ marginLeft: "3px" }}>папку «Спам».</b>
                  </SimpleTypography>
                </Grid>


                {/* <SimpleInp
                  error={Boolean(touched.code && errors.code)}
                  helperText={touched.code && errors.code}
                  name="code"
                  type="code"
                  label="Confirmation code"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.code}
                  placeholderText='******'
                /> */}

                {/* 
                <EmailInputAdornments
                  error={Boolean(touched.code && errors.code)}
                  helperText={touched.code && errors.code}
                  name="code"
                  type="code"
                  label="Confirmation code"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.code}
                  placeholderText='******'
                /> */}
                {/* <Grid sx={{ display: 'flex', alignItems: "center" }}>

                  <Typography>
                    <Countdown
                      date={Date.now() + 75000}
                      renderer={Renderer}
                    />
                  </Typography>
                </Grid> */}
                {/* <Link 
                  href={"https://mail.google.com/mail/u/0/#inbox"}
                  >
                  <a rel="noopener noreferrer" target="_blank"> */}
                <Buttons
                  type="button"
                  onClick={() => window.open("https://mail.google.com/mail/u/0/#inbox", '_blank', 'noopener,noreferrer')}
                  name="Проверить электронную почту"
                  endIcon='checkout'
                  startIcon={isSubmitting}
                  disabled={Boolean(errors.submit) || isSubmitting}
                  className='signIn__btn'
                >
                </Buttons>
                {/* </a>
                </Link> */}
              </Grid>
            </Grid>
          </form>)}
      </Formik>
    </>
  );
}

export const EditProfileContext = (props: LoginContextProps) => {
  const dispatch = useDispatch<any>();
  const profile = useSelector(selectMyProfile)

  const formControlSx: SxProps = {
    width: '90%',

    ':not(:last-child)': {
      marginBottom: '26px'
    }
  }

  return (
    <>
      <Formik
        initialValues={{
          first_name: '',
          last_name: '',
          username: '',
          birth_date: '',
          address: '',
          telegram: '',
          phone: '',
          portfolio_link: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          first_name: Yup.string()
            .max(255, 'Слишком длинное имя.')
            .min(2, 'Слишком короткое имя - минимум 2 символа.'),
          last_name: Yup.string()
            .max(255, 'Слишком длинная фамилия.')
            .min(2, 'Слишком короткая фамилия - минимум 2 символа.'),
          username: Yup.string()
            .max(255, 'Слишком длинное имя пользователя.')
            .min(5, 'Слишком короткая имя пользователя - минимум 5 символа.')
            .matches(
              usernameRegex,
              'Имя пользователя может содержать только буквы, цифры, символы подчеркивания (_), тире (-) и точки (.).'
            ),
          birth_date: Yup.date().max(new Date()).optional(),
          address: Yup.string().optional(),
          telegram: Yup.string().optional(),
          phone: Yup.string().optional(),
          portfolio_link: Yup.string().optional(),
        })}

        onSubmit={async (
          _values,
          { resetForm, setErrors, setStatus, setSubmitting }
        ) => {
          try {

            if (_values.username) {
              const res = await axios.get(`users/check/${_values.username}`);
              if (res.data.data.exists) {
                setStatus({ success: false });
                toast.error('Имя пользователя не доступно');
                setErrors({ submit: 'Имя пользователя не доступно' });
                return
              }
            }

            const formData = new FormData()

            if (_values.first_name || _values.last_name) formData.append('full_name', `${_values.first_name || profile?.full_name?.split(' ')[0]} ${_values.last_name || profile?.full_name?.split(' ')[1]}`)
            if (_values.username) formData.append('username', _values.username)
            if (_values.birth_date) formData.append('birth_date', _values.birth_date)
            if (_values.address) formData.append('address', _values.address)
            if (_values.telegram) formData.append('telegram', _values.telegram)
            if (_values.phone) formData.append('phone', _values.phone)
            if (_values.portfolio_link) formData.append('portfolio_link', _values.portfolio_link)

            const res = await instance.put(`users/profile`, formData);
            setStatus({ success: true });
            dispatch(setProfileEditState(false));
            dispatch(setOpenModal(false));
            dispatch(getMyProfile());
            toast.success(res?.data?.message || 'Успешно сохранено');
          } catch (err: any) {
            setStatus({ success: false });
            toast.error(err?.response?.data?.message)
            setErrors({ submit: err.message });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid style={{ transformOrigin: '0 0 0' }}>
              <Grid sx={{ display: 'flex', alignItems: "start", justifyContent: "start", flexDirection: "column" }}>
                <SimpleTypography className="modal__title" variant="h6" text="Редактировать профиль" />

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
                    <Box sx={{ display: "flex", ...formControlSx }}>
                      <Box sx={{ paddingRight: "8px", width: "50%" }}>
                        <SimpleInp
                          error={Boolean(touched.first_name && errors.first_name)}
                          helperText={touched.first_name && errors.first_name}
                          name="first_name"
                          type="first_name"
                          label="Имя"
                          autoComplete="off"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.first_name || profile?.full_name?.split(' ')[0]}
                          placeholderText='Имя'
                        />
                      </Box>
                      <Box sx={{ paddingLeft: "8px", width: "50%" }}>
                        <SimpleInp
                          error={Boolean(touched.last_name && errors.last_name)}
                          helperText={touched.last_name && errors.last_name}
                          name="last_name"
                          type="surname"
                          label="Фамилия"
                          autoComplete="off"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.last_name || profile?.full_name?.split(' ')[1]}
                          placeholderText='Фамилия'
                        />
                      </Box>
                    </Box>

                    <Box sx={formControlSx}>
                      <SimpleInp
                        error={Boolean(touched.username && errors.username)}
                        helperText={touched.username && errors.username}
                        name="username"
                        type="text"
                        label='Имя пользователя'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.username || profile?.username}
                        placeholderText='username'
                      />
                    </Box>

                    <Box sx={formControlSx}>
                      <SimpleInp
                        error={Boolean(touched.birth_date && errors.birth_date)}
                        helperText={touched.birth_date && errors.birth_date}
                        name="birth_date"
                        type='date'
                        label='Дата рождения'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.birth_date || profile?.birth_date}
                        placeholderText='birth_date'
                      />
                    </Box>

                    <Box sx={formControlSx}>
                      <SimpleInp
                        error={Boolean(touched.address && errors.address)}
                        helperText={touched.address && errors.address}
                        name="address"
                        type="text"
                        label='Адрес'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.address || profile?.address}
                        placeholderText='пример: Ташкент, Узбекистан'
                      />
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
                    <Box sx={formControlSx}>
                      <SimpleInp
                        error={Boolean(touched.telegram && errors.telegram)}
                        helperText={touched.telegram && errors.telegram}
                        name="telegram"
                        type="text"
                        label='Телеграм'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.telegram || profile?.telegram}
                        placeholderText='username'
                      />
                    </Box>

                    <Box sx={formControlSx}>
                      <SimpleInp
                        error={Boolean(touched.phone && errors.phone)}
                        helperText={touched.phone && errors.phone}
                        name="phone"
                        type="text"
                        label='Номер телефона'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.phone || profile?.phone}
                        placeholderText='_ _ _'
                      />
                    </Box>

                    <Box sx={formControlSx}>
                      <SimpleInp
                        error={Boolean(touched.portfolio_link && errors.portfolio_link)}
                        helperText={touched.portfolio_link && errors.portfolio_link}
                        name="portfolio_link"
                        type="text"
                        label='Портфолио'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.portfolio_link || profile?.portfolio_link}
                        placeholderText='https://'
                      />
                    </Box>

                  </Grid>

                </Grid>

                {/* <Buttons name="Forgot your password?" className='underlined__btn' /> */}
                <Buttons
                  type="submit"
                  name="Сохранить"
                  startIcon={isSubmitting}
                  disabled={Boolean(errors.submit) || isSubmitting}
                  className='signIn__btn'
                />

              </Grid>
            </Grid>
          </form>)}
      </Formik>
    </>
  );
}