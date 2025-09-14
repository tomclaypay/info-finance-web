import { client } from '@app/contexts/apollo-client-context'
import GET_LATEST_ARTICLES from '@app/operations/rests/articles/get-latest-articles'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { HomeSlider, HomePopup, HomeSupport, HomeExchangeReview } from '../components/home'
import { MainLayout } from '../components/main-layout'
import { gtm } from '../lib/gtm'
import GET_BANNERS from '@app/operations/queries/banners/get-banners'
import { useRouter } from 'next/router'
import { domain } from '@app/constants/common'
import HomeLargeBanner from '@app/components/banner/HomeLargeBanner'
import { Stack } from '@mui/system'
import HomeLeftRightBanner from '@app/components/banner/HomeLeftRightBanner'
import GET_EXCHANGES_WEBSITE from '@app/operations/queries/exchanges/get-exchanges-website'
import { ExchangeListResponse } from '@app/interfaces/exchange'
import GET_HIGHLIGHT_EXCHANGES from '@app/operations/queries/exchanges/get-highlight-exchanges'
import { articleCategorySlugType, getSlugs } from '@app/pages/news'
import { GET_HOMEPAGE_BANNERS } from '@app/operations/queries/banners/home-banners'

interface HomeProps {
  dataLatestArticles: any
  dataExchanges: ExchangeListResponse
  dataHotArticles: any
  dataHighlightTopBrokerExchanges: ExchangeListResponse
  dataBanner: any
}
const Home = ({
  dataBanner,
  dataLatestArticles,
  dataExchanges,
  dataHighlightTopBrokerExchanges,
  dataHotArticles,
}: HomeProps) => {
  useEffect(() => {
    gtm.push({ event: 'page_view' })
  }, [])

  const { t } = useTranslation(['common', 'seo'])

  const router = useRouter()
  const locale = router.locale
  const [isLeftHome, setLeftHome] = useState(false)
  const [isRightHome, setRightHome] = useState(false)

  return (
    <>
      <Head>
        <title>{t(`homepage.title`, { ns: 'seo' })}</title>
        <meta name="description" content={t(`homepage.description`, { ns: 'seo' })} />
        <meta name="og:title" content={t(`homepage.title`, { ns: 'seo' })} />
        <meta name="og:description" content={t(`homepage.description`, { ns: 'seo' })} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://infofinance.com/",
            "name": "InfoFinance",
            "description": "${t(`homepage.description`, { ns: 'seo' })}",
            "inLanguage": "vi",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://infofinance.com/search?keyword={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }`,
          }}
        ></script>
        <link rel="canonical" href={locale === 'vi' ? domain.vi : domain.en} />
      </Head>
      <main>
        <HomeSlider banners={dataBanner?.home} />
        <Stack
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'flex-start',
            height: '100%',
          }}
        >
          <HomeLeftRightBanner
            dataBanner={dataBanner.left_home_desktop}
            position="left"
            setLeftRightHome={(value) => setLeftHome(value)}
          />
          <Stack
            maxWidth={{
              xs: '100%',
              sm: '100%',
              md: !isLeftHome && !isRightHome ? '100%' : '900px',
              lg: !isLeftHome && !isRightHome ? '100%' : '1100px',
              xl: !isLeftHome && !isRightHome ? '100%' : '1400px',
            }}
            sx={{ overflow: 'hidden' }}
          >
            <HomeSupport
              dataLatestArticles={dataLatestArticles}
              dataExchanges={dataExchanges}
              dataHighlightTopBrokerExchanges={dataHighlightTopBrokerExchanges}
              dataPinArticles={dataHotArticles}
              dataBanner={dataBanner.home_desktop}
            />
            <HomeLargeBanner dataBanner={dataBanner.home_large_desktop} />
            <HomePopup dataBanner={dataBanner.home_popup_desktop} />
            <HomeExchangeReview />
          </Stack>
          <HomeLeftRightBanner
            dataBanner={dataBanner.right_home_desktop}
            position="right"
            setLeftRightHome={(value) => setRightHome(value)}
          />
        </Stack>
      </main>
    </>
  )
}

Home.getLayout = (page: any) => <MainLayout>{page}</MainLayout>

export default Home

export async function getServerSideProps({ locale }: any) {
  try {
    const [
      { data: dataLatestArticles },
      { data: dataBanner },
      { data: dataExchanges },
      { data: dataHighlightTopBrokerExchanges },
      { data: dataHotArticles },
    ] = await Promise.all([
      client.query({
        query: GET_LATEST_ARTICLES,
        context: { clientName: 'strapi' },
        variables: {
          pagination: {
            limit: 12,
          },
          locale,
          sort: ['publishedTime:desc', 'id:desc'],
          filters: {
            articleCategories: {
              slug: {
                in: [
                  getSlugs(articleCategorySlugType.domestic, locale),
                  getSlugs(articleCategorySlugType.mart, locale),
                  getSlugs(articleCategorySlugType.warning, locale),
                  getSlugs(articleCategorySlugType.world, locale),
                  getSlugs(articleCategorySlugType.other, locale),
                ],
              },
            },
          },
        },
      }),
      client.query({
        query: GET_HOMEPAGE_BANNERS,
        variables: { lang: locale === 'vi' ? 'vn' : 'en' },
      }),
      client.query({
        query: GET_EXCHANGES_WEBSITE,
        variables: {
          limit: 8,
          where: {
            hidden: {
              _eq: false,
            },
          },
          order_by: {
            total_point: 'desc_nulls_last',
          },
        },
      }),
      client.query({
        query: GET_HIGHLIGHT_EXCHANGES,
        variables: {
          where: { is_top_broker: { _eq: true } },
        },
      }),
      client.query({
        query: GET_LATEST_ARTICLES,
        context: { clientName: 'strapi' },
        variables: {
          pagination: {
            limit: 4,
          },
          locale,
          sort: 'publishedTime:desc',
          filters: {
            pin: {
              eq: true,
            },
          },
        },
      }),
    ])

    return {
      props: {
        dataBanner,
        dataLatestArticles: dataLatestArticles,
        dataExchanges: dataExchanges,
        dataHighlightTopBrokerExchanges: dataHighlightTopBrokerExchanges,
        dataHotArticles: dataHotArticles,
        ...(await serverSideTranslations(locale ?? 'vi', ['common', 'complaints', 'home-page', 'exchange', 'seo'])),
      },
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        dataBanner: null,
        dataLatestArticles: null,
        dataExchanges: null,
        dataHighlightTopBrokerExchanges: null,
        dataHotArticles: null,
        ...(await serverSideTranslations(locale ?? 'vi', ['common', 'complaints', 'home-page', 'exchange', 'seo'])),
      },
    }
  }
}
