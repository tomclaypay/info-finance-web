import { useQuery } from '@apollo/client'
import GET_ARTICLE_CATEGORIES from '@app/operations/rests/articles/get-article-categories'
import { Box, Button, CircularProgress, Container, Divider, Link, Stack, Tab, Tabs } from '@mui/material'
import { useTranslation } from 'next-i18next'

import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useMobile } from '../common'

const newsSlugs = {
  exchangesSlug: 'tin-tuc-san-giao-dich',
  warningSlug: 'tin-canh-bao',
  martSlug: 'tin-thi-truong',
}

const NewsLayout = (props: any) => {
  const { children } = props
  const router = useRouter()
  const { newsCategorySlug } = router.query
  const { loading, data } = useQuery(GET_ARTICLE_CATEGORIES, { context: { clientName: 'strapi' } })
  const { t } = useTranslation('common')

  const isMobile = useMobile()

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        py: isMobile ? 2 : 5,
      }}
    >
      <Container maxWidth="lg">
        {isMobile ? (
          <Tabs scrollButtons={false} variant="scrollable">
            <Tab
              label={t('all')}
              sx={{
                backgroundColor: !newsCategorySlug ? 'rgba(25, 117, 255, 0.08)' : 'transparent',
                borderRadius: '22px',
                padding: '12px 16px ',
                mx: 0,
              }}
              href={`${router.locale === 'vi' ? 'tin-tuc' : 'news'}`}
            />
            {data &&
              data.articleCategories.data?.map((item: any) => (
                <Tab
                  key={item.slug}
                  sx={{
                    backgroundColor:
                      newsCategorySlug === item.attributes?.slug ? 'rgba(25, 117, 255, 0.08)' : 'transparent',
                    borderRadius: '22px',
                    padding: '12px 16px ',
                  }}
                  label={
                    item.attributes?.slug === newsSlugs.exchangesSlug
                      ? t('news.categories.t4')
                      : item.attributes?.slug === newsSlugs.warningSlug
                      ? t('news.categories.t3')
                      : t('news.categories.t2')
                  }
                  href={`/${router.locale === 'vi' ? 'tin-tuc' : 'news'}/${item.attributes?.slug}`}
                />
              ))}
          </Tabs>
        ) : (
          <Stack direction="row" sx={{ mt: 3 }}>
            {loading && (
              <Stack alignItems="center" justifyContent="center">
                <CircularProgress />
              </Stack>
            )}
            <NextLink href={`${router.locale === 'vi' ? 'tin-tuc' : 'news'}`} passHref>
              <Button
                variant="text"
                sx={{
                  backgroundColor: !newsCategorySlug ? 'rgba(25, 117, 255, 0.08)' : 'transparent',
                  borderRadius: '22px',
                  padding: '12px 16px ',
                  marginRight: '10px',
                  '&:hover': {
                    backgroundColor: 'rgba(25, 117, 255, 0.08)',
                  },
                }}
              >
                <Link>{t('all')}</Link>
              </Button>
            </NextLink>

            {data &&
              data.articleCategories.data?.map((item: any) => (
                <NextLink
                  key={item.id}
                  href={`/${router.locale === 'vi' ? 'tin-tuc' : 'news'}/${item.attributes?.slug}`}
                  passHref
                >
                  <Button
                    variant="text"
                    sx={{
                      backgroundColor:
                        newsCategorySlug === item.attributes?.slug ? 'rgba(25, 117, 255, 0.08)' : 'transparent',
                      borderRadius: '22px',
                      padding: '12px 16px ',
                      marginRight: '10px',
                      '&:hover': {
                        backgroundColor: 'rgba(25, 117, 255, 0.08)',
                      },
                    }}
                  >
                    <Link>
                      {item.attributes?.slug === newsSlugs.exchangesSlug && t('news.categories.t4')}
                      {item.attributes?.slug === newsSlugs.warningSlug && t('news.categories.t3')}
                      {item.attributes?.slug === newsSlugs.martSlug && t('news.categories.t2')}
                    </Link>
                  </Button>
                </NextLink>
              ))}
          </Stack>
        )}

        <Divider sx={{ mt: 2, mb: 1 }} />
      </Container>
      {children}
    </Box>
  )
}

export default NewsLayout
