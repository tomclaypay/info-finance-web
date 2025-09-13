import { useMobile } from '@app/components/common'
import { MainLayout } from '@app/components/main-layout'
import LatestNewsItem from '@app/components/news/LatestNews-item'
import ProviderCategoryNews from '@app/components/news/ProviderCategoryNews'
import { client } from '@app/contexts/apollo-client-context'
import GET_LATEST_ARTICLES from '@app/operations/rests/articles/get-latest-articles'
import GET_ONE_ARTICLE from '@app/operations/rests/articles/get-one-article'
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined'
import { Box, Container, Divider, Stack, Typography } from '@mui/material'
import { format } from 'date-fns'
import viLocale from 'date-fns/locale/vi'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useTranslation } from 'next-i18next'

interface NewsDetailProps {
  dataArticle: any
  dataRelateArticles: any
  dataLatestArticles: any
}
const NewsDetail = ({ dataArticle, dataRelateArticles, dataLatestArticles }: NewsDetailProps) => {
  const isMobile = useMobile()
  const router = useRouter()
  const { t } = useTranslation('common')
  const { newsSlug } = router.query
  useEffect(() => {
    if (newsSlug) {
      router.push(`/news/${newsSlug}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newsSlug])

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        pt: isMobile ? 2 : 8,
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        {!isMobile && (
          <Stack
            sx={{
              position: 'absolute',
              top: '50px',
              left: '-60px',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                color: 'primary.main',
                textAlign: 'center',
                ml: 1,
              }}
            >
              Share
            </Typography>
            <NextLink href="/" passHref>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  mt: 2,
                  mb: 2,
                }}
              >
                <Image
                  src="https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Facebook_878b974ea0.png?updated_at=2022-08-26T04:35:00.763Z"
                  alt="logo"
                  height={24}
                  width={24}
                  loading="lazy"
                />
              </Box>
            </NextLink>
            <NextLink href="/" passHref>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  mt: 2,
                  mb: 2,
                }}
              >
                <Image
                  src="https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Twitter_3e041a0978.png?updated_at=2022-08-26T04:35:00.759Z"
                  alt="logo"
                  height={24}
                  width={24}
                  loading="lazy"
                />
              </Box>
            </NextLink>
            <NextLink href="/" passHref>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  mt: 2,
                }}
              >
                <Image
                  src="https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Linked_In_7072ecf9f5.png?updated_at=2022-08-26T04:35:00.676Z"
                  alt="logo"
                  height={24}
                  width={24}
                  loading="lazy"
                />
              </Box>
            </NextLink>
          </Stack>
        )}

        <Stack direction={isMobile ? 'column' : 'row'} sx={{ position: 'relative' }}>
          <Stack sx={{ flex: '3' }}>
            {dataArticle && (
              <>
                <Stack direction="row" spacing={1} alignItems="center">
                  <NextLink href="/news" passHref>
                    <Typography
                      variant="body2"
                      sx={{ whiteSpace: 'nowrap', color: 'unactive.main', cursor: 'pointer' }}
                    >
                      Tin tức
                    </Typography>
                  </NextLink>

                  <ChevronRightOutlinedIcon color="disabled" />
                  <NextLink
                    href={`/${router.locale === 'vi' ? 'tin-tuc' : 'news'}/${
                      dataArticle.articles.data?.[0].attributes.articleCategories.data?.attributes?.slug
                    }`}
                    passHref
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'unactive.main',
                        whiteSpace: 'nowrap',
                        cursor: 'pointer',
                      }}
                    >
                      {dataArticle.articles.data?.[0].attributes.articleCategories.data?.attributes.name}
                    </Typography>
                  </NextLink>
                  <ChevronRightOutlinedIcon color="disabled" />
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.main',
                      WebkitLineClamp: 1,
                      display: '-webkit-box',
                      width: '400px',
                      overflow: 'hidden',
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {dataArticle.articles.data?.[0].attributes.title}
                  </Typography>
                </Stack>

                <Stack>
                  <Typography variant="h1" sx={{ fontSize: '2.5rem!important', mt: 2 }}>
                    {dataArticle.articles.data?.[0].attributes.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'subtitle.main', mt: 2, mb: isMobile ? 0 : 2 }}>
                    {format(
                      new Date(dataArticle.articles.data?.[0].attributes.publishedTime),
                      "dd 'tháng' L uuuu・  HH:mm",
                      {
                        locale: viLocale,
                      }
                    )}
                  </Typography>
                  <Box
                    dangerouslySetInnerHTML={{
                      __html: dataArticle.articles.data?.[0].attributes?.content.replace(
                        /<a /g,
                        '<a target="_blank" rel="noopener noreferrer" '
                      ),
                    }}
                    sx={{ width: '100%', '& img': { maxWidth: '100%' } }}
                  />
                </Stack>
              </>
            )}
          </Stack>

          <Divider orientation="vertical" variant="inset" flexItem sx={{ ml: 2, mr: 2 }} component="div" />

          <Stack
            sx={{
              flex: '1',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                height: 'min-content',
                position: 'sticky',
                top: '100px',
              }}
            >
              <Typography variant="h1" sx={{ fontSize: '1.25rem!important', mb: 4 }}>
                Tin liên quan
              </Typography>
              <Stack
                sx={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flex: '1',
                }}
                divider={<Divider orientation="horizontal" flexItem sx={{ mb: 2, mt: isMobile ? 2 : 5 }} />}
              >
                {dataRelateArticles &&
                  (isMobile
                    ? dataRelateArticles.articles.data
                        ?.slice(0, 3)
                        ?.map((item: any) => <LatestNewsItem key={item.id} data={item} image={false} />)
                    : dataRelateArticles.articles.data?.map((item: any) => (
                        <LatestNewsItem key={item.id} data={item} image={false} />
                      )))}
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Container>

      {dataLatestArticles && (
        <ProviderCategoryNews
          title={t('news.latest')}
          data={dataLatestArticles.articles.data}
          slug={dataArticle.articles.data?.[0].attributes.articleCategories.data?.attributes?.slug}
        />
      )}
    </Box>
  )
}

NewsDetail.getLayout = (page: any) => <MainLayout>{page}</MainLayout>

export default NewsDetail

export const getServerSideProps = async (context: any) => {
  try {
    const { newsSlug } = context.query || {}
    const { data: dataArticle } = await client.query({
      query: GET_ONE_ARTICLE,
      context: { clientName: 'strapi' },
      variables: {
        filters: {
          slug: {
            eq: newsSlug,
          },
        },
      },
    })

    const { data: dataRelateArticles } = await client.query({
      query: GET_LATEST_ARTICLES,
      context: { clientName: 'strapi' },
      variables: {
        pagination: {
          limit: 6,
        },
        sort: ['publishedTime:desc', 'id:desc'],
      },
    })

    const { data: dataLatestArticles } = await client.query({
      query: GET_LATEST_ARTICLES,
      context: { clientName: 'strapi' },
      variables: {
        pagination: {
          limit: 6,
        },
        sort: ['publishedTime:desc', 'id:desc'],
        filters: {
          articleCategories: {
            slug: {
              eq: dataArticle.articles.data?.[0].attributes.articleCategories.data?.attributes?.slug,
            },
          },
        },
      },
    })

    return {
      props: {
        dataArticle: dataArticle,
        dataRelateArticles: dataRelateArticles,
        dataLatestArticles: dataLatestArticles,
        ...(await serverSideTranslations(context.locale || 'vi', ['common', 'home-page'])),
      },
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        dataArticle: null,
        dataRelateArticles: null,
        dataLatestArticles: null,
        ...(await serverSideTranslations(context.locale || 'vi', ['common', 'home-page'])),
      },
    }
  }
}
