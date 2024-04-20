import { useSelector } from "react-redux"
import { setCategoryFilter, setModelBrandFilter, setModelNameFilter, setModelTopFilter, setPageFilter, setStyleFilter } from "../../../../data/handle_filters"
import { useDispatch } from "../../../../store"
import { UnknownAction } from "@reduxjs/toolkit"

export type ModelFilterTypes = {
  brand: string,
  categories: any[],
  colors: any[],
  styles: any[],
  name: string,
  top: boolean | undefined,
  page: number,
}

export function modelFilterSelectors() {
  return{
    getModelCategoryFilter: () => useSelector((state: any) => state?.handle_filters?.categories),
    getModelBrandFilter: () => useSelector((state: any) => state?.handle_filters?.model_brand),
    getModelColorFilter: () => useSelector((state: any) => state?.handle_filters?.colors),
    getModelStyleFilter: () => useSelector((state: any) => state?.handle_filters?.styles),
    getModelPageFilter: () => useSelector((state: any) => state?.handle_filters?.page),
    getModelTopFilter: () => useSelector((state: any) => state?.handle_filters?.model_top),
    getModelNameFilter: () => useSelector((state: any) => state?.handle_filters?.model_name),
  }
}

interface FilterSetters {
  categories: typeof setCategoryFilter;
  brand: typeof setModelBrandFilter;
  name: typeof setModelNameFilter;
  top: typeof setModelTopFilter;
  styles: typeof setStyleFilter;
  page: typeof setPageFilter;
}

const filterSetters: FilterSetters = {
  categories: setCategoryFilter,
  brand: setModelBrandFilter,
  name: setModelNameFilter,
  top: setModelTopFilter,
  styles: setStyleFilter,
  page: setPageFilter,
};

export function setFilter<K extends keyof FilterSetters>(filter_name: K, filter: ModelFilterTypes[K]): ModelFilterTypes{

  const {
    getModelCategoryFilter,
    getModelBrandFilter,
    getModelColorFilter,
    getModelStyleFilter,
    getModelPageFilter,
    getModelTopFilter,
    getModelNameFilter,
  } = modelFilterSelectors();

  // dispatch((filterSetters[filter_name] as (filter: ModelFilterTypes[K]) => UnknownAction)(filter))

  const modelFilters: ModelFilterTypes = {
    brand: getModelBrandFilter(),
    categories: getModelCategoryFilter(),
    colors: getModelColorFilter(),
    styles: getModelStyleFilter(),
    name: getModelNameFilter(),
    top: getModelTopFilter(),
    page: getModelPageFilter(),
  }

  modelFilters[filter_name] = filter

  return modelFilters
}