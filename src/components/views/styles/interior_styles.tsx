import { Box, FormControlLabel, Checkbox } from '@mui/material'
import { useEffect, useState } from 'react'
import Skeleton from '@mui/material/Skeleton';
import { selectAllColors } from '../../../data/get_all_colors'
import { getAllStyles, selectAllStyles } from '../../../data/get_all_styles'
import { useDispatch, useSelector } from 'react-redux';
import SimpleTypography from '../../typography'
import { getAllModels } from '../../../data/get_all_models';
import { usePathname, useRouter } from 'next/navigation'
import { setStyleFilter } from '../../../data/handle_filters';
import { getAllInteriors } from '../../../data/get_all_interiors';

const SkletonData = ['', '', '', '', '', '']
interface stylesProps {
  id: string,
  created_at: string,
  name: string,
  updated_at: string,
}
export default function InteriorStyles() {
  const pathname = usePathname();
  const dispatch = useDispatch<any>();
  const StylesData = useSelector(selectAllStyles);
  const [isAll__Chechbox__Selected, setIsAll__Chechbox__Selected] = useState(false)
  const StylesStatus = useSelector((state: any) => state?.get_all_styles?.status)
  const [custom__styles, setCustom__styles] = useState<any>([]);
  const router = useRouter();
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  // ---- filters selector ----- //

  const getCategoryFilter = useSelector((state: any) => state?.handle_filters?.interior_categories)
  const getCategoryNameFilter = useSelector((state: any) => state?.handle_filters?.category_name)
  const getColorFilter = useSelector((state: any) => state?.handle_filters?.colors)
  const getStyleFilter = useSelector((state: any) => state?.handle_filters?.styles)
  const getPageFilter = useSelector((state: any) => state?.handle_filters?.page)

  useEffect(() => {
    if (StylesStatus == 'idle') {
      dispatch(getAllStyles())
    }
  }, [StylesData, StylesStatus, dispatch])

  useEffect(() => {
    if (StylesStatus === "succeeded") {
      if (router) {
        let arr = new Array();
        StylesData?.data?.forEach((style: stylesProps) => {
          arr.push({
            id: style?.id,
            created_at: style?.created_at,
            name: style?.name,
            updated_at: style?.updated_at,
            is__Selected: getStyleFilter?.includes((style.id).toString()) || getStyleFilter?.includes(style.id) || getStyleFilter == style?.id,
          })
        })

        setCustom__styles(arr);
        // setIsInitialized(true);
      }
    }
  }, [StylesData, StylesStatus, router, getStyleFilter]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    let arr = [...custom__styles];
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
    dispatch(setStyleFilter({ snex: res }))
    dispatch(getAllInteriors({
      categories: getCategoryFilter,
      styles: res,
      page: getPageFilter,
    }))

    for (let i = 0; i < arr?.length; i++) {
      if (arr[i].is__Selected) {
        count++;
      }
    }

    setCustom__styles(arr);
  };

  if (StylesStatus === "succeeded") {
    return (
      <Box>
        <SimpleTypography text="Стиль" className="section__title" />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {
            custom__styles?.map((item: any, index: number) => (
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
        <SimpleTypography text="Стиль" className="section__title" />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {
            SkletonData.map((item, index): any => (
              <Skeleton
                key={index}
                variant="rectangular"
                width={'100%'}
                height={24}
                style={{ margin: "5px 0" }}
              />
              // <SkeletonElement key={index} type="text" />
            ))
          }
        </Box>
      </Box>
    )
  }


}
