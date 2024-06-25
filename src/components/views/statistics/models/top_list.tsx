import { Box, Divider, Grid } from "@mui/material";
import SimpleTypography from "../../../typography";
import TopList from "./../top_list_component";
import { useSelector } from "../../../../store";
import { selectModelsStats, selectModelsStatsStatus } from "../../../../data/statistics/get_models_stats";
import { selectTopListItemLimit, selectTopListTopic } from "../../../../data/handle_filters";

export function ModelTopList() {

  const data = useSelector(selectModelsStats)
  const dataStatus = useSelector(selectModelsStatsStatus)

  const topListTopic = useSelector(selectTopListTopic)
  const topListItemLimit = useSelector(selectTopListItemLimit)

  return (
    <Box
      sx={{
        width: '100%'
      }}
    >
      <SimpleTypography
        text={`Топ-${topListItemLimit} моделей ${topListTopic?.name}`}
        sx={{
          fontSize: '18px',
          fontWeight: 600,
          mb: '8px'
        }}
      />
      <Divider />
      <TopList
        loading={dataStatus == 'idle' || dataStatus == 'loading' || !data}
        data={
          data?.top_list?.map(e => {
            return {
              name: e?.name,
              secondary_text: e['brand.name'],
              link: `/models/${e?.slug}`,
              columns: [
                {
                  column_name: e?.category_name
                },
                {
                  column_name:
                    Number(e?.downloads_count || e?.tags_count) > 2 &&
                      Number(e?.downloads_count || e?.tags_count) < 4
                      ? (topListTopic.value == 'downloads' ? 'загрузки' : topListTopic.value == 'tags' ? 'бирки' : '')
                      : Number(e?.downloads_count || e?.tags_count) == 1
                        ? (topListTopic.value == 'downloads' ? 'загрузкa' : topListTopic.value == 'tags' ? 'бирка' : '')
                        : (topListTopic.value == 'downloads' ? 'загрузок' : topListTopic.value == 'tags' ? 'бирки' : ''),

                  value: e?.downloads_count || e?.tags_count
                }
              ]
            }
          })
        }
      />
    </Box>
  )
}