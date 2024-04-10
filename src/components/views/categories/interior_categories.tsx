import { Box, FormControlLabel, Checkbox } from '@mui/material'
import { useEffect, useState } from 'react'
import Skeleton from '@mui/material/Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import SimpleTypography from '../../typography'
import { getAllModels } from '../../../data/get_all_models';
import { usePathname, useRouter } from 'next/navigation'
import { setCategoryFilter, setInteriorCategoryFilter, setStyleFilter } from '../../../data/handle_filters';
import { getInteriorCategories, selectInteriorCategories } from '../../../data/categories';
import { getAllInteriors } from '../../../data/get_all_interiors';

const SkletonData = ['', '', '', '', '', '']
interface stylesProps {
    id: string,
    created_at: string,
    name: string,
    updated_at: string,
}
function InteriorCategories() {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch<any>();
    const CategoriesData = useSelector(selectInteriorCategories);
    const [isAll__Chechbox__Selected, setIsAll__Chechbox__Selected] = useState(false)
    const CategoriesStatus = useSelector((state: any) => state?.categories?.interior_status)
    const [customCategories, setCustomCategories] = useState<any>([]);
    const [isInitialized, setIsInitialized] = useState<boolean>(false);
    // ---- filters selector ----- //

    const getCategoryFilter = useSelector((state: any) => state?.handle_filters?.interior_categories)
    const getCategoryNameFilter = useSelector((state: any) => state?.handle_filters?.category_name)
    const getColorFilter = useSelector((state: any) => state?.handle_filters?.colors)
    const getStyleFilter = useSelector((state: any) => state?.handle_filters?.styles)
    const getPageFilter = useSelector((state: any) => state?.handle_filters?.page)

    useEffect(() => {
        if (CategoriesStatus == 'idle') {
            dispatch(getInteriorCategories())
        }
    }, [CategoriesData, CategoriesStatus, dispatch])

    useEffect(() => {
        if (CategoriesStatus === "succeeded") {
            let arr = new Array();
            CategoriesData?.forEach((category: stylesProps) => {
                arr.push({
                    id: category?.id,
                    created_at: category?.created_at,
                    name: category?.name,
                    updated_at: category?.updated_at,
                    is__Selected: getCategoryFilter?.includes((category.id).toString()) || getCategoryFilter?.includes(category.id) || getCategoryFilter == category?.id,
                })
            })

            setCustomCategories(arr);
            // setIsInitialized(true);
        }
    }, [CategoriesData, CategoriesStatus, getCategoryFilter]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
        let arr = [...customCategories];
        let count = 0;
        let res: any[] = [];
        for (let i = 0; i < arr?.length; i++) {
            if (arr[i].id === id && event.target.checked) {
                arr[i].is__Selected = true;
            } else if (arr[i].id === id && !event.target.checked) {
                arr[i].is__Selected = false;
            }
        }
        for (let i = 0; i < arr?.length; i++) {
            if (arr[i].is__Selected) {
                res.push(arr[i]?.id)
            }
        }
        dispatch(setInteriorCategoryFilter({ knex: res }))
        dispatch(getAllInteriors({
            categories: res,
            colors: getColorFilter,
            styles: getStyleFilter,
            page: getPageFilter,
        }))

        for (let i = 0; i < arr?.length; i++) {
            if (arr[i].is__Selected) {
                count++;
            }
        }

        setCustomCategories(arr);
    };

    if (CategoriesStatus === "succeeded") {
        return (
            <Box>

                <SimpleTypography className='section__title' text="Категории"></SimpleTypography>

                <Box sx={{ paddingBottom: '18px', display: "flex", flexDirection: "column", borderBottom: "1px solid #E0E0E0" }}>
                    {
                        customCategories?.map((item: any, index: number) => (
                            <FormControlLabel
                                key={item.id}
                                label={item?.name}
                                control={
                                    <Checkbox
                                        onClick={(event: any) => { handleChange(event, item?.id) }}
                                        checked={item?.is__Selected}
                                        indeterminate={false}
                                    />
                                }
                            />
                        ))
                    }

                </Box>
            </Box>
        )
    }
    else {
        return (
            <Box>
                <SimpleTypography className='section__title' text="Категории"></SimpleTypography>
                <Box sx={{ overflow: "hidden" }}>
                    <Box sx={{ borderBottom: "1px solid #E0E0E0" }}>
                        {
                            SkletonData.map((item, index): any => (
                                <Skeleton
                                    key={index}
                                    variant="rectangular"
                                    width={'100%'}
                                    height={24}
                                    style={{ margin: "10px 0" }}
                                />
                                // <SkeletonElement type="text" key={index} />
                                // <SkeletonProfile key={index} />
                            ))
                        }
                    </Box>
                </Box>
            </Box>
        )
    }


}

export default InteriorCategories;
