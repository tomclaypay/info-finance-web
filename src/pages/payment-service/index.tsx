import { useMobile } from '@app/components/common'
import { MainLayout } from '@app/components/main-layout'
import AboutPaymentService from '@app/components/payment-service/AboutPaymentService'
import ContactSection from '@app/components/payment-service/ContactSection'
import PaymentServiceBanner from '@app/components/payment-service/PaymentServiceBanner'
import ServicesSection from '@app/components/payment-service/ServiceSection'
import UnderstandingMissionSection from '@app/components/payment-service/UnderstandingMissionSection'
import WhyChooseUs from '@app/components/payment-service/WhyChooseUs'
import { domain } from '@app/constants/common'
import { Box } from '@mui/material'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

const PaymentService = () => {
  const { t } = useTranslation(['common', 'seo'])
  const isMobile = useMobile()
  const router = useRouter()
  const locale = router.locale
  const ref = useRef<HTMLDivElement>(null)

  const scrollTo = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }
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
        <PaymentServiceBanner scrollTo={scrollTo} />
        <div ref={ref}>
          <AboutPaymentService />
        </div>
        <ServicesSection />
        <WhyChooseUs />
        <UnderstandingMissionSection />
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
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common', 'payment-service', 'seo'])),
      },
    }
  } catch (error) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common', 'payment-service', 'seo'])),
      },
    }
  }
}
