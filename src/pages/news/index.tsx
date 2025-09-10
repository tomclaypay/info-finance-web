import { useLazyQuery } from '@apollo/client'
import { useMobile } from '@app/components/common'
import { MainLayout } from '@app/components/main-layout'
import AnotherNews from '@app/components/news/AnotherNews'
import HotNews from '@app/components/news/HotNews'
import LatestNews from '@app/components/news/LatestNews'
import ProviderCategoryNews from '@app/components/news/ProviderCategoryNews'
import WarningNews from '@app/components/news/WarningNews'
import { domain } from '@app/constants/common'
import { client } from '@app/contexts/apollo-client-context'
import GET_LATEST_ARTICLES from '@app/operations/rests/articles/get-latest-articles'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Container, Tab } from '@mui/material'
import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const enum articleCategorySlugType {
  warning = 'warning',
  mart = 'mart',
  world = 'world',
  domestic = 'domestic',
  other = 'other',
}

export const getSlugs = (type: articleCategorySlugType, locale: string) => {
  switch (type) {
    case articleCategorySlugType.warning: {
      return locale === 'en' ? 'warning-news' : 'tin-canh-bao'
    }

    case articleCategorySlugType.mart: {
      return locale === 'en' ? 'market-news' : 'tin-thi-truong'
    }

    case articleCategorySlugType.world: {
      return locale === 'en' ? 'world-news' : 'tin-the-gioi'
    }

    case articleCategorySlugType.domestic: {
      return locale === 'en' ? 'domestic-news' : 'tin-trong-nuoc'
    }

    case articleCategorySlugType.other: {
      return locale === 'en' ? 'other-news' : 'tin-khac'
    }
    default:
      return ''
  }
}

interface NewsProps {
  dataLatestArticles: any
  dataLatestArticlesWarning: any
  dataLatestArticlesMart: any
  dataHotArticles: any
  dataLatestArticlesOther: any
  dataLatestArticlesWorld: any
  dataLatestArticlesDomestic: any
}

const News = ({
  dataLatestArticles,
  dataLatestArticlesWarning,
  dataLatestArticlesMart,
  dataHotArticles,
  dataLatestArticlesOther,
  dataLatestArticlesWorld,
  dataLatestArticlesDomestic,
}: NewsProps) => {
  const { t } = useTranslation(['common', 'seo'])
  const isMobile = useMobile()
  const router = useRouter()
  const locale = router.locale

  const tabList = [
    {
      value: 'all',
      label: t('all'),
    },
    {
      value: articleCategorySlugType.mart,
      label: t('news.categories.t2'),
    },
    {
      value: articleCategorySlugType.world,
      label: t('news.categories.t4'),
    },
    // {
    //   value: articleCategorySlugType.warning,
    //   label: t('news.categories.t3'),
    // },
    {
      value: articleCategorySlugType.domestic,
      label: t('news.categories.t5'),
    },
    {
      value: articleCategorySlugType.other,
      label: t('news.categories.t6'),
    },
  ]
  const { category } = router.query
  const [valueTab, setValueTab] = useState('all')
  const [limit, setLimit] = useState(4)

  const hotNews = dataHotArticles?.articles?.data
    .concat(dataLatestArticles?.articles?.data.slice(dataHotArticles?.articles?.data.length))
    .slice(0, 4)
  const [getDataArticlesByCategoryAnotherOnMobile, { data: dataArticlesByCategoryAnotherOnMobile }] = useLazyQuery(
    GET_LATEST_ARTICLES,
    {
      variables: {
        pagination: {
          limit: isMobile ? limit : 8,
          start: valueTab === articleCategorySlugType.warning ? 8 : 6,
        },
        sort: ['publishedTime:desc', 'id:desc'],
        locale: router.locale,
        filters: {
          articleCategories: {
            slug: {
              in: [
                getSlugs(articleCategorySlugType.domestic, locale as string),
                getSlugs(articleCategorySlugType.mart, locale as string),
                getSlugs(articleCategorySlugType.warning, locale as string),
                getSlugs(articleCategorySlugType.world, locale as string),
                getSlugs(articleCategorySlugType.other, locale as string),
              ],
            },
          },
        },
      },
      context: { clientName: 'strapi' },
    }
  )

  const handleReadMore = () => {
    setLimit(limit + 4)
  }

  const handleChangeTab = (newValue: string) => {
    setValueTab(newValue)
  }

  useEffect(() => {
    if (
      valueTab === articleCategorySlugType.domestic ||
      valueTab === articleCategorySlugType.mart ||
      valueTab === articleCategorySlugType.warning ||
      valueTab === articleCategorySlugType.world ||
      valueTab === articleCategorySlugType.other
    ) {
      getDataArticlesByCategoryAnotherOnMobile({
        variables: {
          pagination: {
            limit: 8,
            start: 6,
          },
          sort: ['publishedTime:desc', 'id:desc'],
          locale: router.locale,
          filters: {
            articleCategories: {
              slug: {
                in: [getSlugs(valueTab, router?.locale as string)],
              },
            },
          },
        },
      })
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueTab])

  useEffect(() => {
    if (category === getSlugs(articleCategorySlugType.world, router?.locale as string)) {
      setValueTab(articleCategorySlugType.world)
    }
    if (category === getSlugs(articleCategorySlugType.warning, router?.locale as string)) {
      setValueTab(articleCategorySlugType.warning)
    }
    if (category === getSlugs(articleCategorySlugType.mart, router?.locale as string)) {
      setValueTab(articleCategorySlugType.mart)
    }
    if (category === getSlugs(articleCategorySlugType.domestic, router?.locale as string)) {
      setValueTab(articleCategorySlugType.domestic)
    }
    if (category === getSlugs(articleCategorySlugType.other, router?.locale as string)) {
      setValueTab(articleCategorySlugType.other)
    }
  }, [category, router?.locale])

  return (
    <>
      <Head>
        <title>{t(`news.title`, { ns: 'seo' })}</title>
        <meta name="og:title" content={t(`news.title`, { ns: 'seo' })} />
        <meta name="description" content={t(`news.description`, { ns: 'seo' })} />
        <meta name="og:description" content={t(`news.description`, { ns: 'seo' })} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: "${t(`news.title`, { ns: 'seo' })}",
              url: 'https://infofinance.com/tin-tuc',
              description: "${t(`news.description`, { ns: 'seo' })}",
              publisher: {
                '@type': 'Organization',
                name: 'CÔNG TY TNHH INFO FINANCE XTRA',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://infofinance.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmain-logo.07f32361.png&w=256&q=75',
                },
              },
              breadcrumb: {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Trang chủ',
                    item: 'https://infofinance.com/',
                  },
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name:"${locale === 'en' ? 'News' : 'Tin tức'}",
                    item: "${locale === 'en' ? domain.en + 'news' : domain.vi + 'tin-tuc'}",
                  },
                ],
              },
            }`,
          }}
        ></script>
        <link rel="canonical" href={`${locale === 'en' ? domain.en + 'news' : domain.vi + 'tin-tuc'}`} />
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          py: isMobile ? 2 : 5,
        }}
      >
        <TabContext value={valueTab}>
          <Container maxWidth="lg">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                sx={{
                  justifyContent: 'space-between',
                  display: 'flex',
                  my: 2,
                }}
                onChange={(event, newValue) => handleChangeTab(newValue)}
                aria-label="lab API tabs example"
                variant="scrollable"
                textColor="primary"
                TabIndicatorProps={{
                  style: {
                    backgroundColor: 'transparent',
                  },
                }}
              >
                {tabList.map((item: any, index: number) => (
                  <Tab
                    key={index}
                    value={item.value}
                    label={item.label}
                    sx={{
                      backgroundColor: valueTab === item.value ? '#F4F8FF' : 'transparent',
                      borderRadius: '22px',
                      padding: '12px 16px',
                      minWidth: '88px',
                      margin: '0 10px!important',
                      '&:hover': {
                        backgroundColor: '#F4F8FF',
                      },
                      fontWeight: '600',
                    }}
                  />
                ))}
              </TabList>
            </Box>
          </Container>

          <TabPanel
            value="all"
            sx={{
              padding: 0,
            }}
          >
            {dataLatestArticles && <LatestNews data={dataLatestArticles.articles.data} />}
            {dataLatestArticles && <HotNews data={hotNews} />}
            {dataLatestArticlesMart && (
              <ProviderCategoryNews
                title={t('news.market')}
                data={dataLatestArticlesMart.articles.data}
                slug={getSlugs(articleCategorySlugType.mart, router?.locale as string)}
                newsCategorySlug={getSlugs(articleCategorySlugType.mart, router?.locale as string)}
                handleChangeTab={handleChangeTab}
              />
            )}
            {dataLatestArticlesWorld && (
              <ProviderCategoryNews
                title={t('news.world')}
                data={dataLatestArticlesWorld.articles.data}
                slug={getSlugs(articleCategorySlugType.world, router?.locale as string)}
                newsCategorySlug={getSlugs(articleCategorySlugType.world, router?.locale as string)}
                handleChangeTab={handleChangeTab}
              />
            )}

            {/* {dataLatestArticlesWarning && (
              <WarningNews
                handleChangeTab={handleChangeTab}
                data={dataLatestArticlesWarning.articles.data}
                slug={getSlugs(articleCategorySlugType.warning, router?.locale as string)}
              />
            )} */}

            {dataLatestArticlesDomestic && (
              <ProviderCategoryNews
                title={t('news.domestic')}
                data={dataLatestArticlesDomestic.articles.data}
                slug={getSlugs(articleCategorySlugType.domestic, router?.locale as string)}
                newsCategorySlug={getSlugs(articleCategorySlugType.domestic, router?.locale as string)}
                handleChangeTab={handleChangeTab}
              />
            )}

            {dataLatestArticlesOther && (
              <ProviderCategoryNews
                title={t('news.other')}
                data={dataLatestArticlesOther.articles.data}
                slug={getSlugs(articleCategorySlugType.other, router?.locale as string)}
                newsCategorySlug={getSlugs(articleCategorySlugType.other, router?.locale as string)}
                handleChangeTab={handleChangeTab}
              />
            )}
          </TabPanel>

          <TabPanel
            sx={{
              padding: 0,
            }}
            value={articleCategorySlugType.world}
          >
            <ProviderCategoryNews
              title={t('news.world')}
              slug={getSlugs(articleCategorySlugType.world, router?.locale as string)}
              newsCategorySlug={getSlugs(articleCategorySlugType.world, router?.locale as string)}
              data={dataLatestArticlesWorld?.articles?.data}
              detail={true}
            />
            {dataArticlesByCategoryAnotherOnMobile && (
              <AnotherNews
                newsCategorySlug={getSlugs(articleCategorySlugType.world, router?.locale as string)}
                handleReadMore={handleReadMore}
                dataArticlesByCategoryAnother={dataArticlesByCategoryAnotherOnMobile}
              />
            )}
          </TabPanel>

          <TabPanel
            sx={{
              padding: 0,
            }}
            value={articleCategorySlugType.warning}
          >
            <WarningNews
              detail={true}
              slug={getSlugs(articleCategorySlugType.warning, router?.locale as string)}
              data={dataLatestArticlesWarning?.articles?.data}
            />

            {dataArticlesByCategoryAnotherOnMobile && (
              <AnotherNews
                newsCategorySlug={getSlugs(articleCategorySlugType.warning, router?.locale as string)}
                handleReadMore={handleReadMore}
                dataArticlesByCategoryAnother={dataArticlesByCategoryAnotherOnMobile}
              />
            )}
          </TabPanel>

          <TabPanel
            sx={{
              padding: 0,
            }}
            value={articleCategorySlugType.mart}
          >
            <ProviderCategoryNews
              newsCategorySlug={getSlugs(articleCategorySlugType.mart, router?.locale as string)}
              slug={getSlugs(articleCategorySlugType.mart, router?.locale as string)}
              data={dataLatestArticlesMart?.articles?.data}
              detail={true}
              title={t('news.market')}
            />
            {dataArticlesByCategoryAnotherOnMobile && (
              <AnotherNews
                newsCategorySlug={getSlugs(articleCategorySlugType.mart, router?.locale as string)}
                handleReadMore={handleReadMore}
                dataArticlesByCategoryAnother={dataArticlesByCategoryAnotherOnMobile}
              />
            )}
          </TabPanel>

          <TabPanel
            sx={{
              padding: 0,
            }}
            value={articleCategorySlugType.domestic}
          >
            <ProviderCategoryNews
              newsCategorySlug={getSlugs(articleCategorySlugType.domestic, router?.locale as string)}
              slug={getSlugs(articleCategorySlugType.domestic, router?.locale as string)}
              data={dataLatestArticlesDomestic?.articles?.data}
              detail={true}
              title={t('news.domestic')}
            />
            {dataArticlesByCategoryAnotherOnMobile && (
              <AnotherNews
                newsCategorySlug={getSlugs(articleCategorySlugType.domestic, router?.locale as string)}
                handleReadMore={handleReadMore}
                dataArticlesByCategoryAnother={dataArticlesByCategoryAnotherOnMobile}
              />
            )}
          </TabPanel>

          <TabPanel
            sx={{
              padding: 0,
            }}
            value={articleCategorySlugType.other}
          >
            <ProviderCategoryNews
              newsCategorySlug={getSlugs(articleCategorySlugType.other, router?.locale as string)}
              slug={getSlugs(articleCategorySlugType.other, router?.locale as string)}
              data={dataLatestArticlesOther?.articles?.data}
              detail={true}
              title={t('news.other')}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  )
}

News.getLayout = (page: any) => <MainLayout>{page}</MainLayout>

export default News

export async function getServerSideProps(context: GetStaticPropsContext) {
  const { locale } = context
  try {
    const { data: dataLatestArticles } = await client.query({
      query: GET_LATEST_ARTICLES,
      context: { clientName: 'strapi' },
      variables: {
        pagination: {
          limit: 6,
        },
        locale,
        sort: ['publishedTime:desc', 'id:desc'],
        filters: {
          articleCategories: {
            slug: {
              in: [
                getSlugs(articleCategorySlugType.domestic, locale ?? 'vi'),
                getSlugs(articleCategorySlugType.mart, locale ?? 'vi'),
                getSlugs(articleCategorySlugType.warning, locale ?? 'vi'),
                getSlugs(articleCategorySlugType.world, locale ?? 'vi'),
                getSlugs(articleCategorySlugType.other, locale ?? 'vi'),
              ],
            },
          },
        },
      },
    })

    const { data: dataHotArticles } = await client.query({
      query: GET_LATEST_ARTICLES,
      context: { clientName: 'strapi' },
      variables: {
        pagination: {
          limit: 6,
        },
        locale,
        sort: ['publishedTime:desc', 'id:desc'],
        filters: {
          pin: {
            eq: true,
          },
        },
      },
    })

    const { data: dataLatestArticlesWorld } = await client.query({
      query: GET_LATEST_ARTICLES,
      context: { clientName: 'strapi' },
      variables: {
        pagination: {
          limit: 6,
        },
        sort: ['publishedTime:desc', 'id:desc'],
        locale,
        filters: {
          articleCategories: {
            slug: {
              eq: getSlugs(articleCategorySlugType.world, locale ?? 'vi'),
            },
          },
        },
      },
    })

    const { data: dataLatestArticlesWarning } = await client.query({
      query: GET_LATEST_ARTICLES,
      context: { clientName: 'strapi' },
      variables: {
        pagination: {
          limit: 8,
        },
        sort: ['publishedTime:desc', 'id:desc'],
        locale,
        filters: {
          articleCategories: {
            slug: {
              eq: getSlugs(articleCategorySlugType.warning, locale ?? 'vi'),
            },
          },
        },
      },
    })

    const { data: dataLatestArticlesMart } = await client.query({
      query: GET_LATEST_ARTICLES,
      context: { clientName: 'strapi' },
      variables: {
        pagination: {
          limit: 6,
        },
        sort: ['publishedTime:desc', 'id:desc'],
        locale,
        filters: {
          articleCategories: {
            slug: {
              eq: getSlugs(articleCategorySlugType.mart, locale ?? 'vi'),
            },
          },
        },
      },
    })

    const { data: dataLatestArticlesDomestic } = await client.query({
      query: GET_LATEST_ARTICLES,
      context: { clientName: 'strapi' },
      variables: {
        pagination: {
          limit: 6,
        },
        sort: ['publishedTime:desc', 'id:desc'],
        locale,
        filters: {
          articleCategories: {
            slug: {
              eq: getSlugs(articleCategorySlugType.domestic, locale ?? 'vi'),
            },
          },
        },
      },
    })

    const { data: dataLatestArticlesOther } = await client.query({
      query: GET_LATEST_ARTICLES,
      context: { clientName: 'strapi' },
      variables: {
        pagination: {
          limit: 6,
        },
        sort: ['publishedTime:desc', 'id:desc'],
        locale,
        filters: {
          articleCategories: {
            slug: {
              eq: getSlugs(articleCategorySlugType.other, locale ?? 'vi'),
            },
          },
        },
      },
    })

    if (
      dataLatestArticles &&
      dataLatestArticlesWorld &&
      dataLatestArticlesWarning &&
      dataLatestArticlesMart &&
      dataLatestArticlesDomestic &&
      dataLatestArticlesOther &&
      dataHotArticles
    ) {
      return {
        props: {
          dataLatestArticles: dataLatestArticles,
          dataLatestArticlesWorld: dataLatestArticlesWorld,
          dataLatestArticlesWarning: dataLatestArticlesWarning,
          dataLatestArticlesMart: dataLatestArticlesMart,
          dataHotArticles: dataHotArticles,
          dataLatestArticlesDomestic: dataLatestArticlesDomestic,
          dataLatestArticlesOther: dataLatestArticlesOther,
          ...(await serverSideTranslations(locale ?? 'vi', ['common', 'home-page', 'seo'])),
        },
      }
    } else {
      return {
        props: {
          dataLatestArticles: null,
          dataLatestArticlesWorld: null,
          dataLatestArticlesWarning: null,
          dataLatestArticlesMart: null,
          dataHotArticles: null,
          dataLatestArticlesDomestic: null,
          dataLatestArticlesOther: null,
          ...(await serverSideTranslations(locale ?? 'vi', ['common', 'home-page', 'seo'])),
        },
      }
    }
  } catch (error) {
    return {
      props: {
        dataLatestArticles: null,
        dataLatestArticlesWorld: null,
        dataLatestArticlesWarning: null,
        dataLatestArticlesMart: null,
        dataHotArticles: null,
        dataLatestArticlesDomestic: null,
        dataLatestArticlesOther: null,
        ...(await serverSideTranslations(locale ?? 'vi', ['common', 'home-page', 'seo'])),
      },
    }
  }
}
