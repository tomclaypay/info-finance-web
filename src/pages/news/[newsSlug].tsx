import { useDesktop, useMobile } from '@app/components/common'
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
import TelegramIcon from '@mui/icons-material/Telegram'
import TwitterIcon from '@mui/icons-material/Twitter'
import { FacebookShareButton, TwitterShareButton, TelegramShareButton } from 'react-share'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import NewsDetailBanner from '@app/components/banner/NewsDetailBanner'
import { domain } from '@app/constants/common'
import { useEffect, useMemo } from 'react'
import { articleCategorySlugType, getSlugs } from '@app/pages/news'

interface NewsDetailProps {
  dataArticle: any
  dataRelateArticles: any
  dataLatestArticles: any
}
const NewsDetail = ({ dataArticle, dataRelateArticles, dataLatestArticles }: NewsDetailProps) => {
  const isMobile = useMobile()
  const router = useRouter()
  const isDesktop = useDesktop()
  const { t } = useTranslation('common')
  const { locale } = router

  useEffect(() => {
    if (!dataArticle && typeof window !== 'undefined') {
      router.push('/404')
    }
    if (dataArticle?.articles?.data?.length === 0) {
      router.push('/news')
    }
  }, [dataArticle, router])

  const imageURL: [] = useMemo(
    () =>
      dataArticle?.articles?.data?.[0]?.attributes?.content?.split('<img').map((item: string) => {
        return { url: item.split('src="')[1]?.split('"')[0] }
      }),
    [dataArticle?.articles?.data]
  )

  return (
    <>
      <Head>
        <title>{`${dataArticle?.articles?.data?.[0]?.attributes?.seoTitle}`}</title>
        <meta name="description" content={`${dataArticle?.articles?.data?.[0]?.attributes?.seoDescription}`} />
        <meta name="og:description" content={`${dataArticle?.articles?.data?.[0]?.attributes?.seoDescription}`} />
        <meta name="og:title" content={`${dataArticle?.articles?.data?.[0]?.attributes?.seoTitle}`} />
        <meta
          property="og:image"
          content={`${dataArticle?.articles?.data?.[0]?.attributes?.seoImg?.data?.attributes?.url}`}
          key="image"
        />
        <link
          rel="canonical"
          href={`${locale === 'vi' ? domain.vi + 'tin-tuc' : domain.en + 'news'}/${
            dataArticle?.articles?.data?.[0]?.attributes?.slug
          }`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
              {
              "@context": "https://schema.org",
              "@type": "NewsArticle",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "${locale === 'vi' ? domain.vi + 'tin-tuc' : domain.en + 'news'}/${
              dataArticle?.articles?.data?.[0]?.attributes?.slug
            }"
              },
              "headline": "${dataArticle?.articles?.data?.[0]?.attributes?.seoTitle?.trim()}",
              "image": {
                "@type": "ImageObject",
                ${imageURL.slice(1).map((item: any) => {
                  return `"url": "${item.url}"`
                })}
              },
              "datePublished": "${dataArticle?.articles?.data?.[0]?.attributes?.publishedAt}",
              "dateModified": "${dataArticle?.articles?.data?.[0]?.attributes?.updatedAt}",
              "author": {
                "@type": "Person",
                "name": "Info Finance"
              },
              "publisher": {
                "@type": "Organization",
                "name": "CÔNG TY TNHH INFO FINANCE XTRA",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://infofinance.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmain-logo.07f32361.png&w=256&q=75"
                }
              },
              "description": "${dataArticle?.articles?.data?.[0]?.attributes?.seoDescription}",
              "articleBody": "${dataArticle?.articles?.data?.[0]?.attributes?.content}",
              "keywords": ["${dataArticle?.articles?.data?.[0]?.attributes?.seoTitle?.trim()}"]
            }
          `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": "[
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Trang chủ",
                  "item": "https://infofinance.com/"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Tin tức",
                  "item": "https://infofinance.com/tin-tuc"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "${dataArticle?.articles?.data?.[0]?.attributes?.seoTitle?.trim()}",
                  "item": "${locale === 'vi' ? domain.vi + 'tin-tuc' : domain.en + 'news'}/${
              dataArticle?.articles?.data?.[0]?.attributes?.slug
            }"
                }
              ]"
            }`,
          }}
        ></script>
        <link
          rel="canonical"
          href={`${locale === 'vi' ? domain.vi + 'tin-tuc' : domain.en + 'news'}/${router.query?.newsSlug || ''}`}
        />
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: isMobile ? 2 : 3,
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
              <FacebookShareButton url={`${process.env.NEXT_PUBLIC_SITE_URL}/${router.asPath}`}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    mt: 1.5,
                    mb: 1.5,
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
              </FacebookShareButton>
              <TwitterShareButton url={`${process.env.NEXT_PUBLIC_SITE_URL}/${router.asPath}`}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    mt: 1.5,
                    mb: 1.5,
                  }}
                >
                  <TwitterIcon sx={{ color: '#777777', width: 24, height: 24 }} />
                </Box>
              </TwitterShareButton>
              <TelegramShareButton url={`${process.env.NEXT_PUBLIC_SITE_URL}/${router.asPath}`}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    mt: 1.5,
                  }}
                >
                  <TelegramIcon sx={{ color: '#777777', width: 24, height: 24 }} />
                </Box>
              </TelegramShareButton>
            </Stack>
          )}

          <Stack direction={!isDesktop ? 'column' : 'row'} sx={{ position: 'relative' }}>
            <Stack sx={{ flex: '3' }}>
              {dataArticle && (
                <>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <NextLink href="/" passHref>
                      <Typography
                        variant="body2"
                        sx={{ whiteSpace: 'nowrap', color: 'unactive.main', cursor: 'pointer' }}
                      >
                        {t('header.home')}
                      </Typography>
                    </NextLink>

                    <ChevronRightOutlinedIcon color="disabled" />
                    <NextLink
                      href={{
                        pathname: locale === 'vi' ? '/tin-tuc' : '/news',
                        query: {
                          category: dataArticle.articles.data?.[0]?.attributes.articleCategories.data?.attributes?.slug,
                        },
                      }}
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
                        {t(`header.news`)}
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
                      {dataArticle.articles.data?.[0]?.attributes.title}
                    </Typography>
                  </Stack>

                  <Stack>
                    <Typography variant="h1" sx={{ fontSize: '2.5rem!important', mt: 2 }}>
                      {dataArticle.articles.data?.[0]?.attributes.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'subtitle.main', mt: 2, mb: isMobile ? 0 : 2 }}>
                      {format(
                        new Date(dataArticle.articles.data?.[0]?.attributes?.publishedTime ?? null),
                        "dd 'tháng' L uuuu",
                        {
                          locale: viLocale,
                        }
                      )}
                    </Typography>
                    <Box
                      dangerouslySetInnerHTML={{
                        __html: dataArticle.articles.data?.[0]?.attributes?.content.replace(
                          /<a /g,
                          '<a target="_blank" rel="noopener noreferrer" '
                        ),
                      }}
                      className="ck-content"
                      width="100%"
                      // sx={{ width: '100%', '& img': { maxWidth: '100%' } }}
                    />
                    <Box sx={{ mt: 2, mb: 3, p: 2, fontSize: '13px', backgroundColor: '#f5f5f5', color: '#7a7a7a' }}>
                      <i>
                        {t('warning-words.title')}: <br />
                        <br />
                        {t('warning-words.description')}
                      </i>
                    </Box>
                  </Stack>
                </>
              )}
            </Stack>

            <Divider orientation="vertical" variant="inset" flexItem sx={{ ml: 2, mr: 2 }} component="div" />
            <Stack
              sx={{
                p: '16px',
                backgroundColor: '#FAFAFA',
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
                <Stack direction={isDesktop || isMobile ? 'column' : 'row'}>
                  <Stack spacing={2} flex={isMobile ? 1 : 2}>
                    <Typography variant="h2" sx={{ fontSize: '1.25rem!important', mb: 4 }}>
                      {t('news.relative')}
                    </Typography>
                    {dataRelateArticles &&
                      (isMobile
                        ? dataRelateArticles.articles.data
                            ?.filter((item: any) => item.id !== dataArticle?.articles?.data?.[0]?.id)
                            ?.slice(0, 3)
                            ?.map((item: any) => (
                              <>
                                <LatestNewsItem key={item.id} data={item} image={false} />
                                <Divider orientation="horizontal" flexItem sx={{ mb: 2, mt: isMobile ? 2 : 5 }} />
                              </>
                            ))
                        : dataRelateArticles.articles.data
                            ?.filter((item: any) => item.id !== dataArticle?.articles?.data?.[0]?.id)
                            .map((item: any) => {
                              return (
                                <>
                                  <LatestNewsItem key={item.id} data={item} image={false} />
                                  <Divider orientation="horizontal" flexItem sx={{ mb: 2, mt: isMobile ? 2 : 5 }} />
                                </>
                              )
                            }))}
                  </Stack>

                  <Stack flex={1}>
                    <NewsDetailBanner
                      link_desktop={dataArticle?.articles.data?.[0]?.attributes?.linkBannerMobile}
                      link_mobile={dataArticle?.articles.data?.[0]?.attributes?.linkBannerMobile}
                      image_url_desktop={
                        dataArticle?.articles.data?.[0]?.attributes?.bannerDesktop?.data?.attributes?.url
                      }
                      image_url_mobile={
                        dataArticle?.articles.data?.[0]?.attributes?.bannerMobile?.data?.attributes?.url
                      }
                    />
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </Container>
        {dataLatestArticles && (
          <ProviderCategoryNews
            title={t('news.latest')}
            data={dataLatestArticles.articles.data?.filter(
              (item: any) => item.id !== dataArticle?.articles?.data?.[0]?.id
            )}
            slug={dataArticle.articles.data?.[0]?.attributes.articleCategories.data?.attributes?.slug}
            newsCategorySlug={dataArticle.articles.data?.[0]?.attributes.articleCategories.data?.attributes?.slug}
          />
        )}
      </Box>
    </>
  )
}

NewsDetail.getLayout = (page: any) => <MainLayout>{page}</MainLayout>

export default NewsDetail

export async function getServerSideProps(content: any) {
  const { newsSlug } = content.query
  const { locale } = content

  try {
    const { data: dataArticle } = await client.query({
      query: GET_ONE_ARTICLE,
      context: { clientName: 'strapi' },
      variables: {
        filters: {
          slug: {
            eq: newsSlug,
          },
        },
        locale: content.locale,
      },
    })

    const { data: dataRelateArticles } = await client.query({
      query: GET_LATEST_ARTICLES,
      context: { clientName: 'strapi' },
      variables: {
        pagination: {
          limit: 7,
        },
        locale: content.locale,
        sort: ['publishedTime:desc', 'id:desc'],
      },
    })
    const { data: dataLatestArticles } = await client.query({
      query: GET_LATEST_ARTICLES,
      context: { clientName: 'strapi' },
      variables: {
        pagination: {
          limit: 7,
        },
        sort: ['publishedTime:desc', 'id:desc'],
        locale: content.locale,
        // filters: {
        //   articleCategories: {
        //     slug: {
        //       eq: dataArticle.articles.data?.[0]?.attributes?.articleCategories.data?.attributes?.slug || '',
        //     },
        //   },
        // },
        filters: {
          articleCategories: {
            slug: {
              in: [
                getSlugs(articleCategorySlugType.world, locale),
                getSlugs(articleCategorySlugType.mart, locale),
                getSlugs(articleCategorySlugType.warning, locale),
                getSlugs(articleCategorySlugType.domestic, locale),
                getSlugs(articleCategorySlugType.other, locale),
              ],
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
        ...(await serverSideTranslations(content.locale, ['common', 'home-page'])),
      },
    }
  } catch (error) {
    console.log(error)

    return {
      props: {
        dataArticle: null,
        dataRelateArticles: null,
        dataLatestArticles: null,
        ...(await serverSideTranslations(content.locale, ['common', 'home-page'])),
      },
    }
  }
}
