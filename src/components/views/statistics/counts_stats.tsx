import { Box, Grid } from "@mui/material";
import CountsGrid from "./counts_component";
import { useSelector } from "../../../store";
import { selectRegStats, selectRegStatsStatus } from "../../../data/statistics/get_registrations_stats";
import { selectBrandsStats, selectBrandsStatsStatus } from "../../../data/statistics/get_brands_stats";
import { selectModelsStats, selectModelsStatsStatus } from "../../../data/statistics/get_models_stats";
import { selectCategoriesStats, selectCategoriesStatsStatus } from "../../../data/statistics/get_categories_stats";
import { selectDownloadsStats, selectDownloadsStatsStatus } from "../../../data/statistics/get_downloads_stats";
import { selectInteriorsStats, selectInteriorsStatsStatus } from "../../../data/statistics/get_interiors_stats";
import { selectTagsStats, selectTagsStatsStatus } from "../../../data/statistics/get_tags_stats";

export function CountsStats() {

  const regStats = useSelector(selectRegStats)
  const brandsStats = useSelector(selectBrandsStats)
  const modelsStats = useSelector(selectModelsStats)
  const downloadsStats = useSelector(selectDownloadsStats)
  const interiorsStats = useSelector(selectInteriorsStats)
  const tagsStats = useSelector(selectTagsStats)

  const regStatsStatus = useSelector(selectRegStatsStatus)
  const brandsStatsStatus = useSelector(selectBrandsStatsStatus)
  const modelsStatsStatus = useSelector(selectModelsStatsStatus)
  const downloadsStatsStatus = useSelector(selectDownloadsStatsStatus)
  const interiorsStatsStatus = useSelector(selectInteriorsStatsStatus)
  const tagsStatsStatus = useSelector(selectTagsStatsStatus)

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <CountsGrid
        fillWidth
        mainColor="#7210BE"
        loading={
          regStatsStatus == 'loading' ||
          brandsStatsStatus == 'loading' ||
          modelsStatsStatus == 'loading' ||
          downloadsStatsStatus == 'loading' ||
          interiorsStatsStatus == 'loading' ||
          tagsStatsStatus == 'loading'
        }
        data={[
          {
            name: 'Пользователи',
            count: regStats?.count
          },
          {
            name: 'Бренды',
            count: brandsStats?.count
          },
          {
            name: 'Модели',
            count: modelsStats?.count,
            secondary_text: `Доступно: ${modelsStats?.available_count || ""} \nНе доступно: ${modelsStats?.unavailable_count || ""}`,
          },
          {
            name: 'Загрузки',
            count: downloadsStats?.count
          },
          {
            name: 'Интерьеры',
            count: interiorsStats?.count
          },
          {
            name: 'Бирки',
            count: tagsStats?.count
          },
        ]}
      />

    </Box>
  )
}