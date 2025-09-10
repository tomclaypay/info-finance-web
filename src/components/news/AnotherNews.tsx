import { Box, Button, Container, Divider, Grid, Link, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import NextLink from 'next/link'
import { useMobile } from '../common'
import CategoryNewsItem from './CategoryNews-item'

interface AnotherNewsProps {
  dataArticlesByCategoryAnother?: any
  handleReadMore?: () => void
  newsCategorySlug?: string
}

const AnotherNews = ({ dataArticlesByCategoryAnother, newsCategorySlug, handleReadMore }: AnotherNewsProps) => {
  const { t } = useTranslation('common')
  const isMobile = useMobile()

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        mt: isMobile ? 2 : 0,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Image
            src={
              'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/dot_Blue_2404e1c4fe.png?updated_at=2022-08-25T09:27:29.663Z'
            }
            alt="icon"
            width={12}
            height={24}
            loading="lazy"
          />
          <Typography variant="h2" sx={{ flex: '1', ml: isMobile ? 1 : 2 }}>
            {t('news.another')}
          </Typography>
          {!isMobile && (
            <NextLink href={`/news/category/${newsCategorySlug}`} passHref>
              <Link
                sx={{
                  color: 'primary.main',
                  marginRight: '5px',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography variant="button" sx={{ mr: 1 }}>
                  {t('news.seeAll')}
                </Typography>
                <Image
                  src={
                    'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Arrow_Right_18e705d65a.png?updated_at=2022-08-25T09:28:40.108Z'
                  }
                  alt="icon"
                  width={24}
                  height={24}
                  loading="lazy"
                />
              </Link>
            </NextLink>
          )}
        </Box>
        <Grid container spacing={5} sx={{ mt: 0 }}>
          {dataArticlesByCategoryAnother &&
            dataArticlesByCategoryAnother.articles?.data.map((item: any, index: number) => (
              <Grid key={index} item xs={12} sm={3} md={3} sx={{ paddingTop: '0px!important' }}>
                <Stack sx={{ height: '100%' }}>
                  <CategoryNewsItem data={item} horizontal={isMobile ? true : false} isMobile={isMobile} />
                </Stack>
                {/* {index < dataArticlesByCategoryAnother.articles?.data.length - 1 && (
                  <Divider flexItem textAlign="center" sx={{ mt: -2, mb: 5 }} />
                )} */}

                <Divider flexItem textAlign="center" sx={{ mt: -2, mb: 5 }} />
              </Grid>
            ))}
        </Grid>
        {isMobile &&
          (newsCategorySlug === 'tin-canh-bao'
            ? dataArticlesByCategoryAnother.articles?.data.length <
              dataArticlesByCategoryAnother.articles?.meta.pagination.total - 8
            : dataArticlesByCategoryAnother.articles?.data.length <
              dataArticlesByCategoryAnother.articles?.meta.pagination.total - 6) && (
            <Button
              onClick={handleReadMore}
              fullWidth
              variant="contained"
              sx={{ borderRadius: '22px', fontWeight: '500', mt: 4 }}
            >
              {t('text.seeMore')}
            </Button>
          )}
      </Container>
    </Box>
  )
}

export default AnotherNews
