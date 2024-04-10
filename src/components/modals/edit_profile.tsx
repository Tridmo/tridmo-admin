import { Box, styled, Modal } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import Image from "next/image";
import axios from '../../utils/axios'
import SimpleTypography from "../typography";
import Buttons from "../buttons";
import { ThemeProps } from "../../types/theme";
import { useState } from "react";
import SimpleInp from "../inputs/simple_input";
import { useDispatch, useSelector } from "react-redux";
import { selectUserProfile, resetMyProfile } from "../../data/get_profile";
import { setProfileEditState } from "../../data/modal_checker";
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
// import Cookies from 'js-cookie'
import Cookies from 'js-cookie'
import instance from '../../utils/axios';


const EditProfileModal = styled(Box)(
  ({ theme }: ThemeProps) => `
  position: absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
    background: #fff;
    padding: 28px 32px;
    outline:none
    `
);

function EditProfile() {

  const modalChecker = useSelector((state: any) => state.modal_checker.isEditModalOpen)
  const dispatch = useDispatch()
  const userData = useSelector(selectUserProfile);
  const userDataStatus = useSelector((state: any) => state?.get_profile?.status);
  const handleOpen = () => dispatch(setProfileEditState(true));
  const handleClose = () => dispatch(setProfileEditState(false));

  if (userDataStatus === "succeeded") {
    return (
      <Modal
        open={modalChecker}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Formik
          initialValues={{
            email: userData?.user?.email,
            first_name: userData?.user?.full_name?.split(" ")[0],
            last_name: userData?.user?.full_name?.split(" ")[1],
            submit: null
          }}
          validationSchema={Yup.object().shape({
            first_name: Yup.string()
              .required('No first name provided.')
              .max(255),
            last_name: Yup.string()
              .required('No surname provided.')
              .max(255)
            // .min(6, 'Password is too short - should be 6 chars minimum.')
            // .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
          })}
          onSubmit={
            async (_values, { resetForm, setErrors, setStatus, setSubmitting }) => {
              try {
                let res = await instance.put(
                  `users/profile`,
                  { full_name: `${_values.first_name} ${_values.last_name}` }
                );
                // resetForm();
                dispatch(resetMyProfile())
                toast.success(res?.data?.message);
                setStatus({ success: true });
                handleClose()
                setSubmitting(false);
              } catch (err: any) {
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
                toast.error(err?.response?.data?.message);
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
              <EditProfileModal className="profile__edit--modal">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "26px",
                    paddingBottom: "30px",
                    borderBottom: "1px solid #B3B3B3"
                  }}>
                  <SimpleTypography
                    text="Edit profile"
                    className="modal__title"
                  />
                  <CloseIcon
                    sx={{ cursor: "pointer" }}
                    onClick={handleClose}
                  />
                </Box>
                {/* <Box sx={{marginBottom:"26px", display:"flex",alignItems:"center",paddingBottom:"26px",borderBottom: "1px solid #b3b3b3"}}>
                    <Box sx={{borderRadius:"50%",width:"88px",height:"88px",overflow:"hidden",marginRight:"20px"}}>
                        <Image 
                            src="/img/default__user.svg" 
                            width={88}
                            height={88}
                            alt="user-img"
                        ></Image>
                    </Box>
                    <Buttons className="upload__img--btn" name="Upload photo">
                    
                        <Image 
                            src="/icons/upload-icon.svg" 
                            width={16}
                            height={17}
                            alt="user-img"
                            style={{marginRight:"6px"}}
                        ></Image>
                    </Buttons>
                </Box> */}
                <Box>
                  <Box sx={{ display: "flex", justifyContent: 'space-between', marginBottom: "26px" }}>
                    <Box sx={{ width: "48%" }}>
                      <SimpleInp
                        error={Boolean(touched.first_name && errors.first_name)}
                        helperText={touched.first_name && errors.first_name}
                        name="first_name"
                        type="text"
                        label='First name'
                        autoComplete="true"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.first_name}
                        placeholderText='Enter your first name'
                      />
                    </Box>
                    <Box sx={{ width: "48%", }}>
                      <SimpleInp
                        error={Boolean(touched.last_name && errors.last_name)}
                        helperText={touched.last_name && errors.last_name}
                        name="last_name"
                        type="text"
                        label='Surname'
                        // autoComplete="off"
                        onChange={handleChange}
                        value={values.last_name}
                        onBlur={handleBlur}
                        placeholderText='Enter your surname'
                      />
                    </Box>
                  </Box>
                  <Box sx={{ width: "100%", marginBottom: "26px" }}>
                    <SimpleInp
                      //  helperText={"salom"}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                      name="Email"
                      type="email"
                      label='Email'
                      // autoComplete="off"
                      onChange={handleChange}
                      disabled={true}
                      value={values.email}
                      onBlur={handleBlur}
                      placeholderText='bendover1977@gmail.com'
                    />
                  </Box>

                  <Buttons
                    className="profile__change--btn"
                    name=""
                    type="button"
                    // startIcon={isSubmitting}
                    disabled={Boolean(errors.submit) || isSubmitting}
                  >
                    <Image
                      style={{ marginRight: "6px" }}
                      src={'/img/load.svg'}
                      width={30}
                      height={20}
                      alt="Load"
                    />
                    Change password
                  </Buttons>

                  <Buttons
                    className="profile__done--btn"
                    name="Update"
                    type="submit"
                    startIcon={isSubmitting}
                    disabled={Boolean(errors.submit) || isSubmitting}
                  />
                </Box>


              </EditProfileModal>
            </form>
          )}
        </Formik>
      </Modal>
    )
  } else {
    return (
      <>{null}</>
    )
  }

}
export default EditProfile
