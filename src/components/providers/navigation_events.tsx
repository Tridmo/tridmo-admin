'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { resetMyProfile } from '../../data/get_profile'
import { toast } from 'react-toastify'
import { setAuthState } from '../../data/login'
import { setVerifyState } from '../../data/modal_checker'
import useHash from '../hooks/use_hash'
import { setAuthToken } from '../../utils/axios'
const NavigationContext = createContext({})

export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const dispatch = useDispatch<any>();
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

  return (
    <NavigationContext.Provider value={{}} />
  )
}

export const useNavigation = () => useContext(NavigationContext);
