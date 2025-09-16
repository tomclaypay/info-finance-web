import { MainLayout } from '../../../components/main-layout'
import Image from 'next/image'
import { Box, Container, Link, Pagination, PaginationItem, Stack, Typography } from '@mui/material'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import GET_LATEST_ARTICLES from '@app/operations/rests/articles/get-latest-articles'
import { client } from '@app/contexts/apollo-client-context'
import { PAGE_SIZE } from '@app/constants'
import PaginationNextLink from '@app/components/news/PaginationNextLink'
import GET_ARTICLE_CATEGORIES from '@app/operations/rests/articles/get-article-categories'
// import TotalNewsItem from '@app/components/news/TotalNews-item'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import CategoryNewsItem from '@app/components/news/CategoryNews-item'
import { useMobile } from '@app/components/common'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'

interface TotalNewsCategorySlugProps {
  dataArticlesEachPage: any
  dataArticlesCategories: any
}

const TotalNewsCategorySlug = ({ dataArticlesEachPage, dataArticlesCategories }: TotalNewsCategorySlugProps) => {
  const router = useRouter()
  const { t } = useTranslation(['common', 'seo'])
  const page = parseInt(router.query?.page as string) || 1
  const isMobile = useMobile()
  const titleSEO = {
    'tin-tuc-san-giao-dich': t('broker-news.title', { ns: 'seo' }),
    'exchanges-news': t('broker-news.title', { ns: 'seo' }),
    'tin-canh-bao': t('warning-news.title', { ns: 'seo' }),
    'warning-news': t('warning-news.title', { ns: 'seo' }),
    'tin-thi-truong': t('market-news.title', { ns: 'seo' }),
    'market-news': t('market-news.title', { ns: 'seo' }),
    'tin-the-gioi': t('world-news.title', { ns: 'seo' }),
    'world-news': t('world-news.title', { ns: 'seo' }),
    'tin-trong-nuoc': t('domestic-news.title', { ns: 'seo' }),
    'domestic-news': t('domestic-news.title', { ns: 'seo' }),
    'tin-khac': t('other-news.title', { ns: 'seo' }),
    'other-news': t('other-news.title', { ns: 'seo' }),
  }
  const desSEO = {
    'tin-tuc-san-giao-dich': t('broker-news.description', { ns: 'seo' }),
    'exchanges-news': t('broker-news.description', { ns: 'seo' }),
    'tin-canh-bao': t('warning-news.description', { ns: 'seo' }),
    'warning-news': t('warning-news.description', { ns: 'seo' }),
    'tin-thi-truong': t('market-news.description', { ns: 'seo' }),
    'market-news': t('market-news.description', { ns: 'seo' }),
    'tin-the-gioi': t('world-news.description', { ns: 'seo' }),
    'world-news': t('world-news.description', { ns: 'seo' }),
    'tin-trong-nuoc': t('domestic-news.description', { ns: 'seo' }),
    'domestic-news': t('domestic-news.description', { ns: 'seo' }),
    'tin-khac': t('other-news.description', { ns: 'seo' }),
    'other-news': t('other-news.description', { ns: 'seo' }),
  }
  const totalNewsCategorySlug = router?.query?.totalNewsCategorySlug as keyof typeof titleSEO

  return (
    <>
      <Head>
        <title>{titleSEO[totalNewsCategorySlug]}</title>
        <meta name="description" content={desSEO[totalNewsCategorySlug]} />
        <meta name="og:title" content={titleSEO[totalNewsCategorySlug]} />
        <meta name="og:description" content={desSEO[totalNewsCategorySlug]} />
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 8,
          minHeight: '80vh',
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Stack direction="row" sx={{ position: 'relative' }}>
            <Stack sx={{ flex: '3' }}>
              <Stack direction="row">
                <Link component={NextLink} href="/news" passHref>
                  <Typography
                    variant="body2"
                    sx={{ color: 'unactive.main', mr: 1, cursor: 'pointer' }}
                    whiteSpace="nowrap"
                  >
                    {t('news.title')}
                  </Typography>
                </Link>
                <Image
                  src="https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Caret_Right_042bc78de9.png?updated_at=2022-08-26T03:51:08.034Z"
                  width={16}
                  height={16}
                  alt="icon"
                  loading="lazy"
                />
                <Link component={NextLink} href={`/news/category/${totalNewsCategorySlug}`} passHref>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.main',
                      ml: 1,
                      WebkitLineClamp: 1,
                      display: '-webkit-box',
                      width: '400px',
                      overflow: 'hidden',
                      WebkitBoxOrient: 'vertical',
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                    }}
                  >
                    {`${dataArticlesCategories.articleCategories.data[0]?.attributes?.name}`}
                  </Typography>
                </Link>
              </Stack>
            </Stack>
          </Stack>
          <Stack spacing={2} sx={{ my: 2 }}>
            {dataArticlesEachPage.articles.data.map((article: any) => (
              <CategoryNewsItem key={article?.id} data={article} horizontal={!isMobile} isMobile={isMobile} />
            ))}
          </Stack>
          <Pagination
            variant="outlined"
            shape="rounded"
            color="primary"
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              paddingBottom: 16,
            }}
            page={page}
            count={Math.ceil((dataArticlesEachPage.articles.meta.pagination.total || 0) / PAGE_SIZE)}
            renderItem={(item) => (
              <PaginationItem
                component={PaginationNextLink}
                // rel={item.page === page ? '' : item.page > page ? 'next' : 'prev'}
                href={`/news/category/${totalNewsCategorySlug}${item.page === 1 ? '' : `?page=${item.page}`}`}
                {...item}
              />
            )}
          />
        </Container>
      </Box>
    </>
  )
}

TotalNewsCategorySlug.getLayout = (page: any) => <MainLayout>{page}</MainLayout>

export default TotalNewsCategorySlug

export async function getServerSideProps(content: any) {
  try {
    const { totalNewsCategorySlug, page } = content.query
    const { data: dataArticlesEachPage } = await client.query({
      query: GET_LATEST_ARTICLES,
      context: { clientName: 'strapi' },
      variables: {
        pagination: {
          pageSize: PAGE_SIZE,
          page: parseInt(page as string) || 1,
        },
        sort: ['publishedTime:desc', 'id:desc'],
        locale: content.locale,
        filters: {
          articleCategories: {
            slug: {
              eq: totalNewsCategorySlug,
            },
          },
        },
      },
    })

    const { data: dataArticlesCategories } = await client.query({
      query: GET_ARTICLE_CATEGORIES,
      context: { clientName: 'strapi' },
      variables: {
        locale: content.locale,
        filters: {
          slug: {
            eq: totalNewsCategorySlug,
          },
        },
      },
    })

    return {
      props: {
        dataArticlesCategories: dataArticlesCategories,
        dataArticlesEachPage: dataArticlesEachPage,
        ...(await serverSideTranslations(content.locale, ['common', 'home-page', 'seo'])),
      },
    }
  } catch (error) {
    console.log(error)
  }
}
