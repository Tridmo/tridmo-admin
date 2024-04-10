import React from 'react'
import './LoginSection.scss'
import { Box } from '@mui/system'
import Buttons from '@/components/buttons'
import { setLoginState, setSignupState, setOpenModal } from '@/data/modal_checker';
import { useDispatch } from 'react-redux';

interface LoginSectionProps {
  loginLink: string
  signUpLink: string
}

const LoginSection = ({ loginLink, signUpLink }: LoginSectionProps) => {

  const dispatch = useDispatch<any>();

  return (
    <div className='signBox'>
      <div className='signLine'>Войдите или зарегистрируйтесь, чтобы оставить комментарий</div>
      <div style={{ padding: "0", display: "flex" }}>
        <Box sx={{ marginRight: "16px" }}>
          <Buttons
            name="Регистрация "
            onClick={() => {
              dispatch(setSignupState(true))
              dispatch(setOpenModal(true))
            }}
            className="bordered__btn--signup"
          />
        </Box>
        <Buttons
          name="Логин"
          onClick={() => {
            dispatch(setLoginState(true));
            dispatch(setOpenModal(true))
          }}
          className="login__btn"
        />
      </div>
    </div>
  )
}

export default LoginSection
