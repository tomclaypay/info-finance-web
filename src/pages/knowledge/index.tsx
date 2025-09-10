import { useMobile } from '@app/components/common'
import ProviderCategoryInvestmentIdeas from '@app/components/knowledge/ProdviderCategoryInvestmentIdeas'
import ProviderCategoryAll from '@app/components/knowledge/ProviderCategoryAll'
import ProviderCategoryBroker from '@app/components/knowledge/ProviderCategoryBroker'
import ProviderCategoryKnowledge from '@app/components/knowledge/ProviderCategoryKnowledge'
import { MainLayout } from '@app/components/main-layout'
import { domain } from '@app/constants/common'
import { client } from '@app/contexts/apollo-client-context'
import GET_LATEST_ARTICLES from '@app/operations/rests/articles/get-latest-articles'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Container, Tab } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const enum articleCategorySlugType {
  investment = 'investment',
  broker = 'broker',
  investmentIdeas = 'investment-ideas',
}

export const getSlugs = (type: articleCategorySlugType, locale: string) => {
  switch (type) {
    case articleCategorySlugType.investment: {
      return locale === 'en' ? 'investment-knowledge' : 'kien-thuc-dau-tu'
    }

    case articleCategorySlugType.broker: {
      return locale === 'en' ? 'choose-broker' : 'lua-chon-nha-moi-gioi'
    }

    case articleCategorySlugType.investmentIdeas: {
      return locale === 'en' ? 'investment-ideas' : 'y-tuong-dau-tu'
    }

    default:
      return ''
  }
}

interface knowledgeProps {
  dataLatestArticles: any
  dataLatestArticlesInvestment: any
  dataLatestArticlesBroker: any
  dataLatestArticlesInvestmentIdeas: any
}

const Knowledges = ({
  dataLatestArticles,
  dataLatestArticlesBroker,
  dataLatestArticlesInvestment,
  dataLatestArticlesInvestmentIdeas,
}: knowledgeProps) => {
  const { t } = useTranslation(['common', 'seo'])
  const isMobile = useMobile()
  const router = useRouter()
  const locale = router.locale
  const [limit, setLimit] = useState(4)

  const handleReadMore = () => {
    setLimit(limit + 4)
  }

  const tabList = [
    {
      value: 'all',
      label: t('all'),
    },
    {
      value: articleCategorySlugType.investment,
      label: t('knowledge.categories.t2'),
    },
    {
      value: articleCategorySlugType.broker,
      label: t('knowledge.categories.t3'),
    },
    {
      value: articleCategorySlugType.investmentIdeas,
      label: t('knowledge.categories.t4'),
    },
  ]

  const { category } = router.query

  const [valueTab, setValueTab] = useState('all')

  const handleChangeTab = (newValue: string) => {
    setValueTab(newValue)
  }

  useEffect(() => {
    if (category === getSlugs(articleCategorySlugType.investment, router?.locale as string)) {
      setValueTab(articleCategorySlugType.investment)
    }
    if (category === getSlugs(articleCategorySlugType.broker, router?.locale as string)) {
      setValueTab(articleCategorySlugType.broker)
    }
  }, [category, router?.locale])

  return (
    <>
      <Head>
        <title>{t(`knowledge.title`, { ns: 'seo' })}</title>
        <meta name="og:title" content={t(`knowledge.title`, { ns: 'seo' })} />
        <meta name="description" content={t(`knowledge.description`, { ns: 'seo' })} />
        <meta name="og:description" content={t(`knowledge.description`, { ns: 'seo' })} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: "${t(`knowledge.title`, { ns: 'seo' })}",
              url: 'https://infofinance.com/tin-tuc',
              description: "${t(`knowledge.description`, { ns: 'seo' })}",
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
                    name:"${locale === 'en' ? 'Knowledge' : 'Kiến thức'}",
                    item: "${locale === 'en' ? domain.en + 'knowledge' : domain.vi + 'kien-thuc'}",
                  },
                ],
              },
            }`,
          }}
        ></script>
        <link rel="canonical" href={`${locale === 'en' ? domain.en + 'knowledge' : domain.vi + 'kien-thuc'}`} />
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
            <ProviderCategoryAll dataArticlesByCategoryAll={dataLatestArticles} handleReadMore={handleReadMore} />
          </TabPanel>

          <TabPanel
            sx={{
              padding: 0,
            }}
            value={articleCategorySlugType.investment}
          >
            <ProviderCategoryKnowledge
              title={t('knowledge.categories.t2')}
              slug={getSlugs(articleCategorySlugType.investment, router?.locale as string)}
              knowledgeCategorySlug={getSlugs(articleCategorySlugType.investment, router?.locale as string)}
              data={dataLatestArticlesInvestment?.articles?.data}
              detail={true}
            />
          </TabPanel>

          <TabPanel
            sx={{
              padding: 0,
            }}
            value={articleCategorySlugType.broker}
          >
            <ProviderCategoryBroker
              data={dataLatestArticlesBroker?.articles?.data}
              slug={getSlugs(articleCategorySlugType.broker, router?.locale as string)}
              detail={true}
            />
          </TabPanel>
          <TabPanel
            sx={{
              padding: 0,
            }}
            value={articleCategorySlugType.investmentIdeas}
          >
            <ProviderCategoryInvestmentIdeas
              title={t('knowledge.categories.t4')}
              data={dataLatestArticlesInvestmentIdeas?.articles?.data}
              slug={getSlugs(articleCategorySlugType.investmentIdeas, router?.locale as string)}
              detail={true}
              knowledgeCategorySlug={getSlugs(articleCategorySlugType.investmentIdeas, router?.locale as string)}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  )
}

Knowledges.getLayout = (page: any) => <MainLayout>{page}</MainLayout>

export default Knowledges

export async function getServerSideProps(context: any) {
  const { locale } = context
  try {
    const { data: dataLatestArticles } = await client.query({
      query: GET_LATEST_ARTICLES,
      context: { clientName: 'strapi' },
      variables: {
        pagination: {
          limit: 8,
        },
        locale,
        filters: {
          articleCategories: {
            slug: {
              // eq: slugs.exchangesSlug,
              in: [
                getSlugs(articleCategorySlugType.investment, locale),
                getSlugs(articleCategorySlugType.broker, locale),
                getSlugs(articleCategorySlugType.investmentIdeas, locale),
              ],
            },
          },
        },
        sort: ['publishedTime:desc', 'id:desc'],
      },
    })

    const { data: dataLatestArticlesInvestment } = await client.query({
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
              // eq: slugs.exchangesSlug,
              eq: getSlugs(articleCategorySlugType.investment, locale),
            },
          },
        },
      },
    })

    const { data: dataLatestArticlesBroker } = await client.query({
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
              eq: getSlugs(articleCategorySlugType.broker, locale),
            },
          },
        },
      },
    })

    const { data: dataLatestArticlesInvestmentIdeas } = await client.query({
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
              eq: getSlugs(articleCategorySlugType.investmentIdeas, locale),
            },
          },
        },
      },
    })

    if (
      dataLatestArticles &&
      dataLatestArticlesInvestment &&
      dataLatestArticlesBroker &&
      dataLatestArticlesInvestmentIdeas
    ) {
      return {
        props: {
          dataLatestArticles: dataLatestArticles,
          dataLatestArticlesInvestment: dataLatestArticlesInvestment,
          dataLatestArticlesBroker: dataLatestArticlesBroker,
          dataLatestArticlesInvestmentIdeas: dataLatestArticlesInvestmentIdeas,
          ...(await serverSideTranslations(locale, ['common', 'home-page', 'seo'])),
        },
      }
    } else
      return {
        props: {
          dataLatestArticles: null,
          dataLatestArticlesInvestment: null,
          dataLatestArticlesBroker: null,
          dataLatestArticlesInvestmentIdeas: null,
          ...(await serverSideTranslations(locale, ['common', 'home-page', 'seo'])),
        },
      }
  } catch (error) {
    console.log(error)
    return {
      props: {
        dataLatestArticles: null,
        dataLatestArticlesExchanges: null,
        dataLatestArticlesWarning: null,
        dataLatestArticlesBroker: null,
        ...(await serverSideTranslations(locale, ['common', 'home-page', 'seo'])),
      },
    }
  }
}
