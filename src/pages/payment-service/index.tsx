import { useMobile } from '@app/components/common'
import { MainLayout } from '@app/components/main-layout'
import AboutPaymentService from '@app/components/payment-service/AboutPaymentService'
import ContactSection from '@app/components/payment-service/ContactSection'
import PaymentServiceBanner from '@app/components/payment-service/PaymentServiceBanner'
import ServicesSection from '@app/components/payment-service/ServiceSection'
import UnderstandingMissionSection from '@app/components/payment-service/UnderstandingMissionSection'
import WhyChooseUs from '@app/components/payment-service/WhyChooseUs'
import { domain } from '@app/constants/common'
import { client } from '@app/contexts/apollo-client-context'
import { BannerPosition } from '@app/hooks/useBanner'
import { BannersListResponse } from '@app/interfaces/banner'
import GET_BANNERS from '@app/operations/queries/banners/get-banners'
import { Box } from '@mui/material'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

const PaymentService = ({
  leftPaymentServiceBannerData,
  rightPaymentServiceBannerData,
  paymentServiceBannerData,
}: {
  leftPaymentServiceBannerData: BannersListResponse | null
  rightPaymentServiceBannerData: BannersListResponse | null
  paymentServiceBannerData: BannersListResponse | null
}) => {
  const { t } = useTranslation(['common', 'seo'])
  const isMobile = useMobile()
  const router = useRouter()
  const locale = router.locale
  const ref = useRef<HTMLDivElement>(null)

  const scrollTo = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  console.log('leftPaymentServiceBannerData', leftPaymentServiceBannerData)
  console.log('rightPaymentServiceBannerData', rightPaymentServiceBannerData)

  return (
    <>
      <Head>
        <title>{t(`paymentService.title`, { ns: 'seo' })}</title>
        <meta name="og:title" content={t(`paymentService.title`, { ns: 'seo' })} />
        <meta name="description" content={t(`paymentService.description`, { ns: 'seo' })} />
        <meta name="og:description" content={t(`paymentService.description`, { ns: 'seo' })} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
                      '@context': 'https://schema.org',
                      '@type': 'WebPage',
                      name: "${t(`paymentService.title`, { ns: 'seo' })}",
                      url: 'https://infofinance.com/dich-vu-thanh-toan',
                      description: "${t(`paymentService.description`, { ns: 'seo' })}",
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
                            name:"${locale === 'en' ? 'Payment Service' : 'Dịch vụ thanh toán'}",
                            item: "${
                              locale === 'en' ? domain.en + 'payment-service' : domain.vi + 'dich-vu-thanh-toan'
                            }",
                          },
                        ],
                      },
                    }`,
          }}
        ></script>
        <link
          rel="canonical"
          href={`${locale === 'en' ? domain.en + 'payment-service' : domain.vi + 'dich-vu-thanh-toan'}`}
        />
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          py: isMobile ? 2 : 5,
        }}
      >
        <PaymentServiceBanner paymentServiceBannerData={paymentServiceBannerData?.banners[0]} scrollTo={scrollTo} />
        <div ref={ref}>
          <AboutPaymentService />
        </div>
        <ServicesSection />
        <WhyChooseUs />
        <UnderstandingMissionSection
          leftPaymentServiceBanner={leftPaymentServiceBannerData?.banners[0]}
          rightPaymentServiceBanner={rightPaymentServiceBannerData?.banners[0]}
        />
        <ContactSection />
      </Box>
    </>
  )
}
PaymentService.getLayout = (page: any) => <MainLayout>{page}</MainLayout>

export default PaymentService

export async function getServerSideProps(context: any) {
  const { locale } = context

  try {
    const [
      { data: paymentServiceBannerData },
      { data: leftPaymentServiceBannerData },
      { data: rightPaymentServiceBannerData },
    ] = await Promise.all([
      client.query({
        query: GET_BANNERS,
        variables: {
          positionEqual: BannerPosition.PaymentServiceDesktop,
          languageEqual: locale === 'en' ? 'en' : 'vn',
        },
      }),
      client.query({
        query: GET_BANNERS,
        variables: {
          positionEqual: BannerPosition.LeftPaymentServiceDesktop,
          languageEqual: locale === 'en' ? 'en' : 'vn',
        },
      }),
      client.query({
        query: GET_BANNERS,
        variables: {
          positionEqual: BannerPosition.RightPaymentServiceDesktop,
          languageEqual: locale === 'en' ? 'en' : 'vn',
        },
      }),
    ])
    return {
      props: {
        paymentServiceBannerData,
        leftPaymentServiceBannerData,
        rightPaymentServiceBannerData,
        ...(await serverSideTranslations(locale, ['common', 'payment-service', 'seo'])),
      },
    }
  } catch (error) {
    return {
      props: {
        paymentServiceBannerData: null,
        leftPaymentServiceBannerData: null,
        rightPaymentServiceBannerData: null,
        ...(await serverSideTranslations(locale, ['common', 'payment-service', 'seo'])),
      },
    }
  }
}
