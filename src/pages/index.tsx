import { client } from '@app/contexts/apollo-client-context'
import GET_LATEST_ARTICLES from '@app/operations/rests/articles/get-latest-articles'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'
import { HomeSlider, HomePopup, HomeSupport, HomeExchangeReview } from '../components/home'
import { MainLayout } from '../components/main-layout'
import { gtm } from '../lib/gtm'
import { GET_HOMEPAGE_BANNERS } from '@app/operations/queries/banners/home-banners'
import GET_EXCHANGES_WEBSITE from '@app/operations/queries/exchanges/get-exchanges-website'
import GET_HIGHLIGHT_EXCHANGES from '@app/operations/queries/exchanges/get-highlight-exchanges'
import { ExchangeListResponse } from '@app/interfaces/exchange'
import { useRouter } from 'next/router'
import { domain } from '@app/constants/common'
import HomeLargeBanner from '@app/components/banner/HomeLargeBanner'
import { Stack } from '@mui/system'
import HomeLeftRightBanner from '@app/components/banner/HomeLeftRightBanner'
import { articleCategorySlugType, getSlugs } from '@app/pages/news'

interface HomeProps {
  dataLatestArticles: any
  dataExchanges: ExchangeListResponse
  dataHotArticles: any
  dataHighlightTopBrokerExchanges: ExchangeListResponse
  dataBanner: any
}

const jsonLd = (obj: unknown) => ({ __html: JSON.stringify(obj) })

const Home = ({
  dataBanner,
  dataLatestArticles,
  dataExchanges,
  dataHighlightTopBrokerExchanges,
  dataHotArticles,
}: HomeProps) => {
  const { t } = useTranslation(['common', 'seo'])
  const router = useRouter()
  const locale = router.locale ?? 'vi'

  useEffect(() => {
    gtm.push({ event: 'page_view' })
  }, [])

  // === SEO helpers ===
  const { baseUrl, ogLocale, altOgLocale, canonical, title, description, ogImage, inLanguage } = useMemo(() => {
    const baseUrl = locale === 'vi' ? domain.vi : domain.en
    const canonical = baseUrl
    const ogLocale = locale === 'vi' ? 'vi_VN' : 'en_US'
    const altOgLocale = locale === 'vi' ? 'en_US' : 'vi_VN'
    const title = t('homepage.title', { ns: 'seo' })
    const description = t('homepage.description', { ns: 'seo' })
    const inLanguage = locale === 'vi' ? 'vi' : 'en'
    // cố gắng lấy ảnh banner đầu tiên làm OG image, fallback ảnh mặc định
    const bannerCandidate =
      dataBanner?.home?.[0]?.image_url || dataBanner?.home?.[0]?.image?.url || dataBanner?.home?.[0]?.image || null
    const ogImage = bannerCandidate
      ? bannerCandidate.startsWith('http')
        ? bannerCandidate
        : `${baseUrl.replace(/\/$/, '')}${bannerCandidate.startsWith('/') ? '' : '/'}${bannerCandidate}`
      : `${baseUrl.replace(/\/$/, '')}/images/og-default.jpg`

    return { baseUrl, canonical, ogLocale, altOgLocale, title, description, ogImage, inLanguage }
  }, [dataBanner, locale, t])

  // JSON-LD blocks
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}#website`,
    url: baseUrl,
    name: 'InfoFinance',
    inLanguage,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}search?keyword={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'InfoFinance',
    url: baseUrl,
    logo: `${baseUrl}logo.png`,
  }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${baseUrl}#webpage`,
    url: baseUrl,
    name: title,
    description,
    inLanguage,
    isPartOf: { '@id': `${baseUrl}#website` },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: title,
        item: baseUrl,
      },
    ],
  }

  const [isLeftHome, setLeftHome] = useState(false)
  const [isRightHome, setRightHome] = useState(false)

  return (
    <>
      <Head>
        {/* Primary */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <link rel="canonical" href={canonical} />

        {/* Hreflang alternates */}
        <link rel="alternate" hrefLang="vi-VN" href={domain.vi} />
        <link rel="alternate" hrefLang="en-US" href={domain.en} />
        <link rel="alternate" hrefLang="x-default" href={domain.en} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="InfoFinance" />
        <meta property="og:locale" content={ogLocale} />
        <meta property="og:locale:alternate" content={altOgLocale} />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content={title} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        {/* PWA / theming (nhẹ) */}
        <meta name="theme-color" content="#ffffff" />

        {/* JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(websiteSchema)} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(organizationSchema)} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(webPageSchema)} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema)} />
      </Head>

      {/* H1 duy nhất (có thể ẩn thị giác nhưng vẫn hữu ích cho SEO/Accessibility) */}
      <h1
        style={{
          position: 'absolute',
          left: '-10000px',
          top: 'auto',
          width: 1,
          height: 1,
          overflow: 'hidden',
        }}
      >
        {title}
      </h1>

      <main role="main">
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

// Tối ưu cache cho SSR: giúp tốc độ tải và SEO tốt hơn
export async function getServerSideProps(ctx: any) {
  const { locale } = ctx
  try {
    // Cache 5 phút trên CDN + SWR 10 phút
    ctx?.res?.setHeader?.('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')

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
          pagination: { limit: 12 },
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
          where: { hidden: { _eq: false } },
          order_by: { total_point: 'desc_nulls_last' },
        },
      }),
      client.query({
        query: GET_HIGHLIGHT_EXCHANGES,
        variables: { where: { is_top_broker: { _eq: true } } },
      }),
      client.query({
        query: GET_LATEST_ARTICLES,
        context: { clientName: 'strapi' },
        variables: {
          pagination: { limit: 4 },
          locale,
          sort: 'publishedTime:desc',
          filters: { pin: { eq: true } },
        },
      }),
    ])

    return {
      props: {
        dataBanner,
        dataLatestArticles,
        dataExchanges,
        dataHighlightTopBrokerExchanges,
        dataHotArticles,
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
