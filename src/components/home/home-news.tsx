import { Box } from '@mui/material'
import LatestNews from '../news/LatestNews'
import WarningNews from '../news/WarningNews'
import ProviderCategoryNews from '../news/ProviderCategoryNews'

interface HomeNewsProps {
  newsPage: any
  dataNews: any
}
export const HomeNews = ({ newsPage, dataNews }: HomeNewsProps) => {
  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
      }}
    >
      {newsPage === 'all' && dataNews && dataNews.length > 0 && <LatestNews data={dataNews} home={true} />}
      {newsPage === 'tin-canh-bao' && dataNews && dataNews.length > 0 && <WarningNews data={dataNews} home={true} />}
      {newsPage !== 'all' && newsPage !== 'tin-canh-bao' && dataNews && dataNews.length > 0 && (
        <ProviderCategoryNews data={dataNews} home={true} />
      )}
    </Box>
  )
}
