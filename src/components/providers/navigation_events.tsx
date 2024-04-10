'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { getAllModels } from '../../data/get_all_models'
import { getAllInteriors } from '../../data/get_all_interiors'
import { getAllStyles } from '../../data/get_all_styles'
import Cookies from 'js-cookie'
import { resetMyProfile } from '../../data/get_profile'
import { toast } from 'react-toastify'
import { setAuthState } from '../../data/login'
import { setVerifyState } from '../../data/modal_checker'
import useHash from '../hooks/use_hash'
import { getAllDesigners } from '../../data/get_all_designers'
import { getAllBrands } from '../../data/get_all_brands'
import { setCategoryFilter, setCategoryNameFilter, setColorFilter, setStyleFilter, setPageFilter, } from '../../data/handle_filters'

const NavigationContext = createContext({})

export function NavigationEvents() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const dispatch = useDispatch<any>();
    const router = useRouter();
    const params = useParams();
    const hash = useHash();


    const [isInitialized, setIsInitialized] = useState(false);

    const getModelStatus = useSelector((state: any) => state?.get_all_models?.status);
    const getInteriorsStatus = useSelector((state: any) => state?.get_all_interiors?.status);
    const StyleStatus = useSelector((state: any) => state?.get_all_styles?.status)
    const getDesignersStatus = useSelector((state: any) => state?.get_all_designers?.status)
    const getBrandsStatus = useSelector((state: any) => state?.get_all_brands?.status)

    // ---- filters selector ----- //

    const getModelCategoryFilter = useSelector((state: any) => state?.handle_filters?.categories)
    const getModelStyleFilter = useSelector((state: any) => state?.handle_filters?.styles)
    const getModelPageFilter = useSelector((state: any) => state?.handle_filters?.page)
    const getModelLimitFilter = useSelector((state: any) => state?.handle_filters?.limit)


    useEffect(() => {
        const url = `${pathname}?${searchParams}`

    }, [pathname, searchParams, getModelStatus, dispatch, getModelCategoryFilter, getModelStyleFilter, getModelPageFilter, StyleStatus, router, getInteriorsStatus])

    useEffect(() => {
        if (searchParams.get('category_name')) {
            dispatch(setCategoryNameFilter({ knnex: searchParams.get('category_name') }));
        }
        if (searchParams.get('categories')) {
            if (typeof searchParams.get('categories') === 'object') {
                dispatch(setCategoryFilter({ knex: searchParams.get('categories') }));
            } else if (searchParams.get('categories')) {
                dispatch(setCategoryFilter({ knex: [searchParams.get('categories')] }));
            }
        }

        if (typeof searchParams.get('colors') === 'object') {
            dispatch(setColorFilter({ cnex: searchParams.get('colors') }));
        } else if (searchParams.get('colors')) {
            dispatch(setColorFilter({ cnex: [searchParams.get('colors')] }));
        }

        if (typeof searchParams.get('styles') === 'object') {
            dispatch(setStyleFilter({ snex: searchParams.get('styles') }));
        } else if (searchParams.get('styles')) {
            dispatch(setStyleFilter({ snex: [searchParams.get('styles')] }));
        }

        if (searchParams.get('page')) {
            dispatch(setPageFilter({ page: searchParams.get('page') }));
        }

        setIsInitialized(true)
    }, [dispatch, router, isInitialized])

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
    }, [router, dispatch, params])

    return (
        <NavigationContext.Provider value={{}} />
    )
}

export const useNavigation = () => useContext(NavigationContext);
