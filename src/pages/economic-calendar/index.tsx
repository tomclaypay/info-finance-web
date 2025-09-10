import { MainLayout } from '@app/components/main-layout'
import { domain } from '@app/constants/common'
import EconomicCalendar from '@app/pages/economic-calendar/EconomicCalendar'
import { Paper, Stack, styled } from '@mui/material'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))
const Calendar = () => {
  const { t } = useTranslation(['common', 'seo'])
  const router = useRouter()
  const locale = router.locale

  return (
    <>
      <Head>
        <title>{t(`calendar.title`, { ns: 'seo' })}</title>
        <meta name="og:title" content={t(`calendar.title`, { ns: 'seo' })} />
        <meta name="description" content={t(`calendar.description`, { ns: 'seo' })} />
        <meta name="og:description" content={t(`calendar.description`, { ns: 'seo' })} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
                  '@context': 'https://schema.org',
                  '@type': 'WebPage',
                  name: "${t(`calendar.title`, { ns: 'seo' })}",
                  url: 'https://infofinance.com/lich',
                  description: "${t(`calendar.description`, { ns: 'seo' })}",
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
                        name:"${locale === 'en' ? 'Calendar' : 'Lịch'}",
                        item: "${locale === 'en' ? domain.en + 'calendar' : domain.vi + 'lich'}",
                      },
                    ],
                  },
                }`,
          }}
        ></script>
        <link rel="canonical" href={`${locale === 'en' ? domain.en + 'calendar' : domain.vi + 'lich'}`} />
      </Head>
      <Stack
        direction="column"
        spacing={2}
        width={'100%'}
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Item sx={{ width: '100%' }}>
          <EconomicCalendar />
        </Item>
        <Item sx={{ width: '100%' }}>{/* <DividendsCalendar /> */}</Item>
      </Stack>
    </>
  )
}

Calendar.getLayout = (page: any) => <MainLayout>{page}</MainLayout>

export default Calendar

export async function getServerSideProps(context: any) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home-page', 'seo'])),
    },
  }
}
