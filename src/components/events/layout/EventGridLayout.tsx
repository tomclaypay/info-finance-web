import { useMobile } from '@app/components/common'
import { Event } from '@app/interfaces/event'
import { Container, Grid, Link, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import NextLink from 'next/link'
import Carousel from 'react-material-ui-carousel'
import EventVerticalCard from '../card/EventVerticalCard'
import EventsSlider from '../media/EventsSlider'
import { useRouter } from 'next/router'

interface EventGridLayoutProps {
  comingEvents: Event[]
  endedEvents: Event[]
  registeredEvents?: Event[]
}

export const EventGridLayout = ({ comingEvents, endedEvents, registeredEvents }: EventGridLayoutProps) => {
  const { t } = useTranslation('common')
  const { locale } = useRouter()
  const isMobile = useMobile()

  return (
    <Stack>
      {comingEvents?.length > 0 ? (
        <EventsSlider events={comingEvents} registeredEvents={registeredEvents} />
      ) : (
        <Container>
          <Grid container columnSpacing={4}>
            <Grid item xs={12} sm={4} md={3}>
              <EventVerticalCard
                event={{ title: locale === 'vi' ? 'Sự kiện đang được cập nhật' : 'We are coming soon!!!' }}
              />
            </Grid>
          </Grid>
        </Container>
      )}
      {comingEvents?.length > 0 && isMobile && (
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
          {comingEvents.map((event: Event) => (
            <Stack key={event.id} px={2} py={3} mt={-2}>
              <EventVerticalCard
                key={event.id}
                event={event}
                registered={!!registeredEvents?.find((item: Event) => item.id === event.id)}
              />
            </Stack>
          ))}
        </Carousel>
      )}
      <Container
        maxWidth="lg"
        sx={{
          marginTop: 5,
        }}
      >
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
            <Typography variant="h2" sx={{ flex: '1' }}>
              {t('event.t6')}
            </Typography>
          </Stack>
          {!isMobile && (
            <Link
              component={NextLink}
              href="/events/end"
              passHref
              sx={{
                color: 'primary.main',
                marginRight: '5px',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography variant="button" sx={{ mr: 1 }}>
                {t('text.seeMore')}
              </Typography>
              <Image
                src={
                  'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Arrow_Right_18e705d65a.png?updated_at=2022-08-25T09:28:40.108Z'
                }
                alt="icon"
                width={24}
                height={24}
                loading="lazy"
              />
            </Link>
          )}
        </Stack>

        <Grid container columnSpacing={4} sx={{ mt: 0 }}>
          {endedEvents?.length > 0 &&
            endedEvents?.map((event: any) => (
              <Grid key={event.id} item xs={12} sm={4} md={3} sx={{ paddingTop: '0px!important', mb: 3 }}>
                <Stack sx={{ height: '100%' }}>
                  <EventVerticalCard
                    event={event}
                    ended={true}
                    registered={!!registeredEvents?.find((item: Event) => item.id === event.id)}
                  />
                </Stack>
              </Grid>
            ))}
        </Grid>
      </Container>
    </Stack>
  )
}
