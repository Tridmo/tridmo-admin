import React, { createContext, useContext, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthState } from "../../data/login";
import { getUpdatedAccessToken } from '../../data/re-update_access_token'
// import Cookies from 'js-cookie'
import Cookies from 'js-cookie'
const AuthContext = createContext({});
import { getMyProfile, selectMyProfile } from '../../data/me';
import { setAuthToken } from "../../utils/axios";
import { useParams, usePathname, useRouter } from "next/navigation";
import useHash from "../hooks/use_hash";

import { resetMyProfile } from '../../data/get_profile'
import { toast } from 'react-toastify'
import { setVerifyState } from '../../data/modal_checker'


export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch<any>();
  const update_cookie_status = useSelector((state: any) => state?.update_access_token?.status);
  const myProfile = useSelector(selectMyProfile)
  const myProfileStatus = useSelector((state: any) => state?.profile_me?.status)

  const pathname = usePathname()
  const router = useRouter();
  const params = useParams();
  const hash = useHash();

  useMemo(() => {
    if (hash) {
      const hashParams = new URLSearchParams(hash.slice(1))

      const accessToken = hashParams.get('access_token')
      const refreshToken = hashParams.get('refresh_token')
      const expiresAt = hashParams.get('expires_at');
      const expiresIn = hashParams.get('expires_in');


      if (accessToken && refreshToken && expiresAt) {
        Cookies.set(
          'accessToken',
          accessToken,
          { expires: new Date(parseInt(expiresAt) * 1000), path: '/', sameSite: 'Lax', secure: true },
        )

        Cookies.set(
          'refreshToken',
          refreshToken,
          { path: '/', sameSite: 'Lax', secure: true }
        )

        setTimeout(() => {
          dispatch(resetMyProfile())
          router.replace('/');
          toast.success("Электронная почта успешно подтверждена");
          dispatch(setAuthState(true))
          dispatch(setVerifyState(false))
        }, 0)
      }
      else {
        setTimeout(() => {
          toast.error("Не удалось подтвердить электронную почту! Пожалуйста, попробуйте еще раз");
          router.push('/');
        }, 0)
      }
    }
    if (pathname && pathname.includes("unauthorized_client")) {
      setTimeout(() => {
        toast.error("Не удалось подтвердить электронную почту! Пожалуйста, попробуйте еще раз");
        router.push('/');
      }, 0)
    }
  }, [router, dispatch, params, hash])

  useEffect(() => {
    async function loadUserFromCookies() {

      if (Cookies.get('accessToken')) {
        setAuthToken(Cookies.get('accessToken'))
        dispatch(setAuthState(true));

        if (myProfileStatus === 'idle') {
          await dispatch(getMyProfile())
        }
        if (myProfileStatus === 'rejected') {
          dispatch(setAuthState(false));
        }

      }

      if (Cookies.get('refreshToken')) {
        if (update_cookie_status === "idle" && !Cookies.get('accessToken')) {
          dispatch(getUpdatedAccessToken())
          if (update_cookie_status === 'succeeded') {
            dispatch(setAuthState(true));

            if (myProfileStatus === 'idle') {
              await dispatch(getMyProfile())
            }

          }
        }
      } else {
        dispatch(setAuthState(false));
      }
    }
    loadUserFromCookies();
  }, [dispatch, update_cookie_status, myProfileStatus]);

  return (
    <AuthContext.Provider
      value={{}}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
