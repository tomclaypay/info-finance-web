import { useQuery } from '@apollo/client'
import { useDesktop, useMobile } from '@app/components/common'
import { EventCalendarLayout } from '@app/components/events/layout/EventCalendarLayout'
import { EventGridLayout } from '@app/components/events/layout/EventGridLayout'
import { MainLayout } from '@app/components/main-layout'
import { domain } from '@app/constants/common'
import { AuthContext } from '@app/contexts/amplify-context'
import { BannerContext } from '@app/contexts/bannerContext'
import GET_COMING_EVENTS from '@app/operations/queries/event/get-coming-events'
import GET_ENDED_EVENTS from '@app/operations/queries/event/get-ended-events'
import GET_EVENTS_BY_EMAIL from '@app/operations/queries/event/get-events-by-email'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined'
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

const EventIndex = () => {
  const [typeView, setTypeView] = useState('grid')
  const [registered, setRegistered] = useState(false)
  const value = useContext(AuthContext)
  const [nowDate, setNowDate] = useState(new Date())
  const isMobile = useMobile()
  const isDesktop = useDesktop()
  const { locale } = useRouter()
  useEffect(() => {
    setNowDate(new Date())
  }, [])
  const { banner: bannerData } = useContext(BannerContext)

  const { t } = useTranslation(['common', 'seo'])

  const { data: registeredEvents } = useQuery(GET_EVENTS_BY_EMAIL, {
    variables: {
      email: value?.user?.email,
      nowDate,
    },
    skip: !value?.user?.email,
  })

  const { data: comingEvents } = useQuery(GET_COMING_EVENTS, {
    variables: {
      nowDate,
    },
  })

  const { data: endedEvents, fetchMore: fetchMoreEndedEvents } = useQuery(GET_ENDED_EVENTS, {
    variables: {
      nowDate,
      limit: 4,
      offset: 0,
    },
  })

  return (
    <>
      <Head>
        <title>{t(`event.title`, { ns: 'seo' })}</title>
        <meta name="description" content={t(`event.description`, { ns: 'seo' })} />
        <meta name="og:title" content={t(`event.title`, { ns: 'seo' })} />
        <meta name="og:description" content={t(`event.description`, { ns: 'seo' })} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: '${t(`event.title`, { ns: 'seo' })}',
              url: 'https://infofinance.com/tin-tuc',
              description: '${t(`event.description`, { ns: 'seo' })}',
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
                    name: '${locale === 'en' ? 'Events' : 'Sự kiện'}',
                    item: '${locale === 'en' ? domain.en + 'events' : domain.vi + 'su-kien'}',
                  },
                ],
              },
            }`,
          }}
        ></script>
        <link rel="canonical" href={`${locale === 'en' ? domain.en + 'events' : domain.vi + 'su-kien'}`} />
      </Head>
      <Box mt={10} marginTop={!bannerData ? 10 : isDesktop ? 30 : '80px'}>
        <Container>
          <Stack
            direction={isMobile ? 'column' : 'row'}
            alignItems={isMobile ? 'flex-start' : 'center'}
            sx={{ mb: 3 }}
            justifyContent={isMobile ? 'flex-end' : 'space-between'}
            spacing={1}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Image
                src={
                  'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/dot_Blue_2404e1c4fe.png?updated_at=2022-08-25T09:27:29.663Z'
                }
                alt="icon"
                width={12}
                height={24}
                loading="lazy"
              />
              <Typography variant="h1" sx={{ flex: '1' }}>
                {typeView === 'grid' ? t('event.t1') : t('event.t5')}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                  color: registered ? '#2A559C' : '#67696E',
                  cursor: 'pointer',
                  px: 1,
                  py: 1,
                  backgroundColor: '#F4F8FF',
                  borderRadius: '8px',
                }}
                onClick={() => setRegistered(!registered)}
              >
                <TaskOutlinedIcon />
                <Typography variant="body2" sx={{ fontWeight: '500' }}>
                  {t('event.t2')}
                </Typography>
              </Stack>

              {typeView === 'grid' ? (
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{
                    color: '#2A559C',
                    cursor: 'pointer',
                    px: 1,
                    py: 1,
                    backgroundColor: '#F4F8FF',
                    borderRadius: '8px',
                  }}
                  onClick={() => setTypeView('calendar')}
                >
                  <CalendarMonthOutlinedIcon />
                  <Typography variant="body2" sx={{ fontWeight: '500' }}>
                    {t('event.t3')}
                  </Typography>
                </Stack>
              ) : (
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{
                    color: '#2A559C',
                    cursor: 'pointer',
                    px: 1,
                    py: 1,
                    backgroundColor: '#F4F8FF',
                    borderRadius: '8px',
                  }}
                  onClick={() => setTypeView('grid')}
                >
                  <FormatListBulletedOutlinedIcon />
                  <Typography variant="body2" sx={{ fontWeight: '500' }}>
                    {t('event.t4')}
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Stack>
        </Container>
        {comingEvents &&
          endedEvents &&
          (typeView === 'grid' ? (
            <EventGridLayout
              registeredEvents={registeredEvents?.event}
              comingEvents={registered ? registeredEvents?.event : comingEvents?.comingEvents}
              endedEvents={endedEvents?.endedEvents}
            />
          ) : (
            <EventCalendarLayout
              registeredEvents={registeredEvents?.event}
              comingEvents={registered ? registeredEvents?.event : comingEvents?.comingEvents}
              endedEvents={endedEvents?.endedEvents}
            />
          ))}

        {endedEvents?.endedEvents?.length < endedEvents?.event_aggregate?.aggregate?.count && (
          <Stack alignItems="center" my={isMobile ? 4 : 7} mx={isMobile ? 2 : 0}>
            <Button
              onClick={() =>
                fetchMoreEndedEvents({
                  variables: {
                    offset: endedEvents.endedEvents.length,
                  },
                  updateQuery: (prevResult, { fetchMoreResult }) => {
                    fetchMoreResult.endedEvents = [...prevResult.endedEvents, ...fetchMoreResult.endedEvents]
                    return fetchMoreResult
                  },
                })
              }
              variant="contained"
              fullWidth={isMobile ? true : false}
              sx={{ borderRadius: '22px', fontWeight: '500' }}
            >
              {t('text.seeMore')}
            </Button>
          </Stack>
        )}
      </Box>
    </>
  )
}

EventIndex.getLayout = (page: any) => <MainLayout>{page}</MainLayout>

export default EventIndex

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'seo'])),
      // Will be passed to the page component as props
    },
    revalidate: 30,
  }
}
