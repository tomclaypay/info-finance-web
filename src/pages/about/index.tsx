import { MainLayout } from '../../components/main-layout'
import { Box } from '@mui/material'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import About1 from '@app/components/about/About1'
import About2 from '@app/components/about/About2'
import About3 from '@app/components/about/About3'
import About5 from '@app/components/about/About5'
import { ReactElement } from 'react'
import About4 from '@app/components/about/About4'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { domain } from '@app/constants/common'
import { useRouter } from 'next/router'

const About = () => {
  const { t } = useTranslation(['seo'])
  const { locale } = useRouter()
  return (
    <>
      <Head>
        <title>{t(`about.title`, { ns: 'seo' })}</title>
        <meta name="description" content={t(`about.description`, { ns: 'seo' })} />
        <meta name="og:title" content={t(`about.title`, { ns: 'seo' })} />
        <meta name="og:description" content={t(`about.description`, { ns: 'seo' })} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: '${t(`about.title`, { ns: 'seo' })}',
              url: 'https://infofinance.com/tin-tuc',
              description: '${t(`about.description`, { ns: 'seo' })}',
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
                    name: '${locale === 'en' ? 'About' : 'Về chúng tôi'}',
                    item: '${locale === 'en' ? domain.en + 'about' : domain.vi + 'gioi-thieu'}',
                  },
                ],
              },
            }`,
          }}
        ></script>
        <link rel="canonical" href={`${locale === 'en' ? domain.en + 'about' : domain.vi + 'gioi-thieu'}`} />
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
        }}
      >
        <About1 />
        <About2 />
        <About3 />
        <About4 />
        <About5 />
      </Box>
    </>
  )
}

About.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>

export default About

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'about-us', 'seo'])),
      // Will be passed to the page component as props
    },
  }
}
