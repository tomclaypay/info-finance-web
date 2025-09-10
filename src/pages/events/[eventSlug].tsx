import { useMutation, useQuery } from '@apollo/client'
import { useMobile } from '@app/components/common'
import EventVerticalCard from '@app/components/events/card/EventVerticalCard'
import EventComingDetail from '@app/components/events/layout/EventComingDetail'
import EventEndDetail from '@app/components/events/layout/EventEndDetail'
import { MainLayout } from '@app/components/main-layout'
import { domain } from '@app/constants/common'
import { client } from '@app/contexts/apollo-client-context'
import { useAuth } from '@app/hooks/use-auth'
import { Event, RegisterEvent } from '@app/interfaces/event'
import REGISTER_EVENT from '@app/operations/mutations/events/register-event'
import GET_COMING_EVENTS from '@app/operations/queries/event/get-coming-events'
import GET_EVENT_BY_SLUG from '@app/operations/queries/event/get-event-by-slug'
import GET_EVENTS_BY_EMAIL from '@app/operations/queries/event/get-events-by-email'
import { removeHtmlTagsAndEntities } from '@app/utils/common'
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'

const EventDetail = ({ eventSEO }: any) => {
  const router = useRouter()

  const { locale } = router
  const auth = useAuth()
  const [registered, setRegistered] = useState(false)
  const { eventSlug } = router.query
  const [modalRegister, setModalRegister] = useState(false)
  const [openAlertModal, setOpenAlertModal] = useState(false)
  const [nowDate, setNowDate] = useState(new Date())
  const { t } = useTranslation('common')
  const isMobile = useMobile()

  const handleOpenModalRegister = () => {
    setModalRegister(true)
  }

  const handleCloseModalRegister = () => {
    setModalRegister(false)
  }

  const handleCloseAlertModal = () => {
    setOpenAlertModal(false)
  }

  const [registerEvent] = useMutation(REGISTER_EVENT)

  const { data: event } = useQuery(GET_EVENT_BY_SLUG, {
    variables: {
      eventSlug,
    },
  })

  const { data: comingEvents, fetchMore: fetchMoreComingEvents } = useQuery(GET_COMING_EVENTS, {
    variables: {
      nowDate,
      limit: 4,
      offset: 0,
    },
  })

  const { data: registeredEvents, refetch: refetch } = useQuery(GET_EVENTS_BY_EMAIL, {
    variables: {
      email: auth?.user?.email,
    },
    skip: !auth?.isAuthenticated,
  })

  useEffect(() => {
    setNowDate(new Date())
  }, [])

  useEffect(() => {
    if (registeredEvents?.event?.length > 0) {
      const result = registeredEvents?.event?.find((item: Event) => item.id === event?.event?.[0]?.id)
      if (result) {
        setRegistered(true)
      } else setRegistered(false)
    }
  }, [event, registeredEvents])

  const handleSubmitRegisterEvent = async (formValues: RegisterEvent) => {
    await registerEvent({
      variables: {
        ...formValues,
        eventId: event?.event?.[0].id,
      },
      onCompleted: () => {
        refetch()
        handleCloseModalRegister()
        setOpenAlertModal(true)
      },
    })
  }
  return (
    <>
      <Head>
        <title>{eventSEO?.title}</title>
        <meta name="description" content={removeHtmlTagsAndEntities(eventSEO?.description?.slice(0, 160) ?? '')} />
        <meta property="og:image" content={eventSEO?.thumbnail} />
        <link
          rel="canonical"
          href={`${locale === 'vi' ? domain.vi + 'su-kien' : domain.en + 'events'}/${router?.query?.eventSlug || ''}`}
        />
      </Head>
      {event && event?.event?.[0] && (
        <>
          <Stack pb={isMobile ? 3 : 0}>
            {new Date(event?.event?.[0].end) >= new Date() && (
              <EventComingDetail
                event={event?.event?.[0]}
                registered={registered}
                modalRegister={modalRegister}
                openAlertModal={openAlertModal}
                handleOpenModalRegister={handleOpenModalRegister}
                handleCloseModalRegister={handleCloseModalRegister}
                handleSubmitRegisterEvent={handleSubmitRegisterEvent}
                handleCloseAlertModal={handleCloseAlertModal}
              />
            )}
            {new Date(event?.event?.[0].end) < new Date() && <EventEndDetail event={event?.event?.[0]} />}
            <Container maxWidth="lg">
              <Stack>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, mt: isMobile ? 3 : 1 }}>
                  <Image
                    src={
                      'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/dot_Blue_2404e1c4fe.png?updated_at=2022-08-25T09:27:29.663Z'
                    }
                    alt="icon"
                    width={12}
                    height={24}
                    loading="lazy"
                  />
                  <Typography variant="h1" sx={{ flex: '1', ml: isMobile ? 1 : 2 }}>
                    {t('event.t1')}
                  </Typography>
                </Box>
                {!isMobile && (
                  <Grid container columnSpacing={4} sx={{ mt: 0 }}>
                    {comingEvents && comingEvents?.comingEvents?.length > 0 ? (
                      comingEvents?.comingEvents?.map((event: any) => (
                        <Grid key={event.id} item xs={12} sm={3} sx={{ paddingTop: '0px!important', mb: 3 }}>
                          <Stack sx={{ height: '100%' }}>
                            <EventVerticalCard
                              event={event}
                              registered={!!registeredEvents?.event?.find((item: Event) => item.id === event.id)}
                            />
                          </Stack>
                        </Grid>
                      ))
                    ) : (
                      <Grid key={event.id} item xs={12} sm={3} sx={{ paddingTop: '0px!important', mb: 3 }}>
                        <Stack sx={{ height: '100%' }}>
                          <EventVerticalCard
                            event={{ title: locale === 'vi' ? 'Sự kiện đang được cập nhật' : 'We are coming soon!!!' }}
                          />
                        </Stack>
                      </Grid>
                    )}
                  </Grid>
                )}

                {isMobile && comingEvents && comingEvents?.comingEvents?.length > 0 && (
                  <Carousel
                    autoPlay={false}
                    sx={{
                      height: '100%',
                      mb: 1,
                    }}
                    swipe
                    cycleNavigation={true}
                    animation="slide"
                    navButtonsAlwaysVisible={isMobile && false}
                    indicatorContainerProps={{
                      style: {
                        zIndex: '10',
                        position: 'absolute',
                        bottom: isMobile ? '0px' : '70px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 'max-content',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      },
                    }}
                    activeIndicatorIconButtonProps={{
                      style: {
                        backgroundColor: '#2A559C',
                        border: '1px solid #2A559C',
                      },
                    }}
                    indicatorIconButtonProps={{
                      style: {
                        width: '12px',
                        margin: '0 5px',
                        height: '12px',
                        border: '1px solid #2A559C',
                        color: 'transparent',
                      },
                    }}
                  >
                    {comingEvents.comingEvents.map((event: Event) => (
                      <Stack key={event.id} px={0.1} py={3} mt={-2.5}>
                        <EventVerticalCard
                          event={event}
                          registered={!!registeredEvents?.event?.find((item: Event) => item.id === event.id)}
                        />
                      </Stack>
                    ))}
                  </Carousel>
                )}
                {!isMobile && comingEvents?.comingEvents?.length < comingEvents?.event_aggregate?.aggregate?.count && (
                  <Stack alignItems="center" mt={isMobile ? 0 : 15} mb={4}>
                    <Button
                      onClick={() =>
                        fetchMoreComingEvents({
                          variables: {
                            offset: comingEvents.comingEvents.length,
                          },
                          updateQuery: (prevResult, { fetchMoreResult }) => {
                            fetchMoreResult.comingEvents = [...prevResult.comingEvents, ...fetchMoreResult.comingEvents]
                            return fetchMoreResult
                          },
                        })
                      }
                      variant="contained"
                      sx={{ borderRadius: '22px', fontWeight: '500' }}
                      fullWidth={isMobile ? true : false}
                    >
                      {t('text.seeMore')}
                    </Button>
                  </Stack>
                )}
              </Stack>
            </Container>
          </Stack>
        </>
      )}
    </>
  )
}

EventDetail.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>

export default EventDetail

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale = '', params } = context
  const eventSlug = params?.eventSlug
  try {
    const eventResponse = await client.query({ query: GET_EVENT_BY_SLUG, variables: { eventSlug } })

    const { title, description, images } = eventResponse?.data?.event?.[0] ?? {}

    const eventSEO = {
      title,
      description,
      thumbnail:
        images?.[0] ||
        'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Screenshot_2018_12_16_at_21_06_29_f07726afef.png?updated_at=2022-11-30T08:25:12.500Z',
    }
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
        eventSEO,
      },
    }
  } catch (e) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
      },
    }
  }
}
