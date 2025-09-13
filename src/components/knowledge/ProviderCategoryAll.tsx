import { Box, Container, Divider, Grid, Link, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useMobile } from '../common'
import KnowledgeItem from '@app/components/knowledge/Knowledge-item'
import NextLink from 'next/link'

interface ProviderCategoryAllProps {
  dataArticlesByCategoryAll?: any
  handleReadMore?: () => void
}

const ProviderCategoryAll = ({ dataArticlesByCategoryAll }: ProviderCategoryAllProps) => {
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
            {t('knowledge.news')}
          </Typography>
          <Link
            component={NextLink}
            href="/knowledge/category/all"
            passHref
            sx={{
              color: 'primary.main',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography variant="button" sx={{ mr: 1 }}>
              {t('text.seeMore')}
            </Typography>
            <Image
              src={
                'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Arrow_Right_18e705d65a.png?updated_at=2022-08-25T09:28:40.108Z'
              }
              alt="icon"
              width={24}
              height={24}
            />
          </Link>
        </Box>
        <Grid container spacing={5} sx={{ mt: 0 }}>
          {dataArticlesByCategoryAll &&
            dataArticlesByCategoryAll.articles?.data.map((item: any, index: number) => (
              <Grid key={index} item xs={12} sm={3} md={3} sx={{ paddingTop: '0px!important' }}>
                <Stack sx={{ height: '100%' }}>
                  <KnowledgeItem data={item} horizontal={isMobile ? true : false} isMobile={isMobile} />
                </Stack>
                <Divider flexItem textAlign="center" sx={{ mt: -2, mb: 5 }} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default ProviderCategoryAll
