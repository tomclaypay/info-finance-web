import { useQuery } from '@apollo/client'
import EventHorizontalCard from '@app/components/events/card/EventHorizontalCard'
import { MainLayout } from '@app/components/main-layout'
import { Event } from '@app/interfaces/event'
import GET_ENDED_EVENTS from '@app/operations/queries/event/get-ended-events'
import { Box, Button, Container, Divider, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const EventEndIndex = () => {
  const [nowDate, setNowDate] = useState(new Date())
  useEffect(() => {
    setNowDate(new Date())
  }, [])

  const { t } = useTranslation(['common', 'seo'])

  const { data: endedEvents, fetchMore: fetchMoreEndedEvents } = useQuery(GET_ENDED_EVENTS, {
    variables: {
      nowDate,
      limit: 3,
      offset: 0,
    },
  })

  return (
    <Container maxWidth="lg">
      <Head>
        <title>{t(`event-end.title`, { ns: 'seo' })}</title>
        <meta name="description" content={t(`event-end.description`, { ns: 'seo' })} />
        <meta name="og:title" content={t(`event-end.title`, { ns: 'seo' })} />
        <meta name="og:description" content={t(`event-end.description`, { ns: 'seo' })} />
      </Head>
      <Stack py={5}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Image
            src={
              'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/dot_Blue_2404e1c4fe.png?updated_at=2022-08-25T09:27:29.663Z'
            }
            alt="icon"
            width={12}
            height={24}
            loading="lazy"
          />
          <Typography variant="h2" sx={{ flex: '1', ml: 2 }}>
            {t('event.t6')}
          </Typography>
        </Box>
        <Stack>
          {endedEvents?.endedEvents?.length > 0 &&
            endedEvents?.endedEvents?.map((event: Event, index: number) => (
              <Stack key={event.id}>
                <EventHorizontalCard event={event} ended={true} />
                {index < endedEvents?.endedEvents?.length - 1 && (
                  <Divider orientation="horizontal" flexItem sx={{ mt: 4, mb: 4 }} />
                )}
              </Stack>
            ))}
        </Stack>
        {endedEvents?.endedEvents?.length < endedEvents?.event_aggregate?.aggregate?.count && (
          <Stack alignItems="center" mt={15}>
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
              sx={{ borderRadius: '22px', fontWeight: '500' }}
            >
              {t('text.seeMore')}
            </Button>
          </Stack>
        )}
      </Stack>
    </Container>
  )
}

EventEndIndex.getLayout = (page: any) => <MainLayout>{page}</MainLayout>

export default EventEndIndex

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'seo'])),
      // Will be passed to the page component as props
    },
    revalidate: 30,
  }
}
