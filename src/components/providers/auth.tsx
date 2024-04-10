import React, { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthState } from "../../data/login";
import { getUpdatedAccessToken } from '../../data/re-update_access_token'
// import Cookies from 'js-cookie'
import Cookies from 'js-cookie'
const AuthContext = createContext({});
import { getMyProfile, selectMyProfile } from '../../data/me';


export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch<any>();
  const update_cookie_status = useSelector((state: any) => state?.update_access_token?.status);
  const myProfile = useSelector(selectMyProfile)
  const myProfileStatus = useSelector((state: any) => state?.profile_me?.status)

  useEffect(() => {
    async function loadUserFromCookies() {

      if (Cookies.get('accessToken') && Cookies.get('refreshToken')) {
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
