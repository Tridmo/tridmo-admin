"use client"

import { Box, keyframes, Modal, SxProps } from "@mui/material";
import * as React from "react";
import LoadingBar from "react-top-loading-bar";
import {
  setCategoryFormState,
  setColorFormState,
  setConfirmState,
  setCountryFormState,
  setInteriorStatusChangeState,
  setLoginState,
  setMaterialFormState,
  setOpenModal,
  setProfileEditState,
  setSignupState,
  setStyleFormState,
  setVerifyState,
} from "../../data/modal_checker";
import { useDispatch, useSelector } from '../../store';
import {
  CategoryFormContext,
  ChangeInteriorStatusContext,
  ColorFormContext,
  ConfirmContext,
  CountryFormContext,
  EditProfileContext,
  LoginContext,
  MaterialFormContext,
  SignUpContext,
  StyleFormContext,
  VerificationContext,
} from "./context";

export default function BasicModal(props: { styles?: SxProps }) {
  const [userEmail, setUserEmail] = React.useState("");
  const [progress, setProgress] = React.useState(0);

  //open certain modal by its status
  const isConfirmOpen = useSelector(
    (state: any) => state?.modal_checker?.isConfirm
  );
  const isLoginOpen = useSelector(
    (state: any) => state?.modal_checker?.isLogin
  );
  const isSignupOpen = useSelector(
    (state: any) => state?.modal_checker?.isSignup
  );
  const isVerifyOpen = useSelector(
    (state: any) => state?.modal_checker?.isVerify
  );
  const isProfileEditOpen = useSelector(
    (state: any) => state?.modal_checker?.isProfileEdit
  );
  const isStyleFormOpen = useSelector(
    (state: any) => state?.modal_checker?.isStyleForm?.open
  );
  const isCountryFormOpen = useSelector(
    (state: any) => state?.modal_checker?.isCountryForm?.open
  );
  const isCategoryFormOpen = useSelector(
    (state: any) => state?.modal_checker?.isCategoryForm?.open
  );
  const isMaterialFormOpen = useSelector(
    (state: any) => state?.modal_checker?.isMaterialForm?.open
  );
  const isColorFormOpen = useSelector(
    (state: any) => state?.modal_checker?.isColorForm?.open
  );
  const isInteriorStatusChangeOpen = useSelector(
    (state: any) => state?.modal_checker?.interiorStatusChange
  );
  const isModalOpen = useSelector(
    (state: any) => state?.modal_checker?.isModalOpen
  );

  const style: SxProps = {
    zIndex: 9001,
    minWidth: "440px",
    width:
      isProfileEditOpen || isCategoryFormOpen || isCountryFormOpen
        ? "676px"
        : "440px",
    overflow: "hidden",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    innerHeight: "226px",
    bgcolor: "#ffff",
    border: "1px solid #fff",
    boxShadow: 24,
    p: "24px",
    ...props?.styles,
  };

  //declare dispatcher
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setConfirmState(false));
    dispatch(setSignupState(false));
    dispatch(setLoginState(false));
    dispatch(setVerifyState(false));
    dispatch(setProfileEditState(false));
    dispatch(setInteriorStatusChangeState(false));
    dispatch(setStyleFormState({ open: false, editing: false, style: null }));
    dispatch(
      setCountryFormState({ open: false, editing: false, country: null })
    );
    dispatch(
      setCategoryFormState({ open: false, editing: false, category: null })
    );
    dispatch(
      setMaterialFormState({ open: false, editing: false, material: null })
    );
    dispatch(setColorFormState({ open: false, editing: false, color: null }));
    dispatch(setOpenModal(false));
  };
  const modalSlider = keyframes`
    from{
      transform:translateX(100%)
    }
    to{
      transform:translateX(0)
    }
  `;

  const myModalStyle: React.CSSProperties = {
    animation: `${modalSlider}  0.7s linear forwards`,
  };

  return (
    <div>
      <LoadingBar color={"#ff0000"} progress={progress} />
      {/* <AlertWrapper /> */}
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="login__modals--wrap" sx={style}>
          {isInteriorStatusChangeOpen ? (
            <ChangeInteriorStatusContext />
          ) : isConfirmOpen ? (
            <ConfirmContext />
          ) : isSignupOpen ? (
            <SignUpContext
              setUserEmail={(email: any) => {
                setUserEmail(email);
              }}
            />
          ) : isLoginOpen ? (
            <LoginContext
              setUserEmail={(email: any) => {
                setUserEmail(email);
              }}
            />
          ) : isVerifyOpen ? (
            <VerificationContext
              userEmail={userEmail}
              setProgress={(val: any) => {
                setProgress(val);
              }}
            />
          ) : isProfileEditOpen ? (
            <EditProfileContext />
          ) : isStyleFormOpen ? (
            <StyleFormContext />
          ) : isCountryFormOpen ? (
            <CountryFormContext />
          ) : isCategoryFormOpen ? (
            <CategoryFormContext />
          ) : isMaterialFormOpen ? (
            <MaterialFormContext />
          ) : isColorFormOpen ? (
            <ColorFormContext />
          ) : null}
        </Box>
      </Modal>
    </div>
  );
}
