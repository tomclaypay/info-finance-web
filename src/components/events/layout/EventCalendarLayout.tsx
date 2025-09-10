import EventCalendarWrapper from '../calendar/EventCalenderWrapper'
import { Event } from '@app/interfaces/event'
import { Container, Divider, Stack } from '@mui/material'
import EventHorizontalCard from '../card/EventHorizontalCard'
import { useEffect, useState } from 'react'
import { useMobile } from '@app/components/common'
import EventVerticalCard from '../card/EventVerticalCard'

interface EventCalendarLayoutProps {
  comingEvents: Event[]
  endedEvents: Event[]
  registeredEvents?: Event[]
}

export const EventCalendarLayout = ({ comingEvents, endedEvents, registeredEvents }: EventCalendarLayoutProps) => {
  const [selectedEvents, setSelectedEvent] = useState<Event[]>(comingEvents?.concat(endedEvents))

  const isMobile = useMobile()
  const handleSelectedEvents = (arg: any) => {
    setSelectedEvent(
      comingEvents
        ?.concat(endedEvents)
        ?.filter((event) => new Date(event.start) > arg.start && new Date(event.end) < arg.end)
    )
  }

  const handleUnselectedEvents = () => {
    setSelectedEvent(comingEvents.concat(endedEvents))
  }

  useEffect(() => {
    setSelectedEvent(comingEvents?.concat(endedEvents))
  }, [comingEvents, endedEvents])

  return (
    <Container maxWidth="lg" sx={{ pb: isMobile ? 2 : 10, pt: isMobile ? 1 : 0 }}>
      <Stack direction={isMobile ? 'column-reverse' : 'row'} spacing={isMobile ? 2 : 0}>
        <Stack flex={5}>
          {/* {comingEvents?.length > 0 &&
            comingEvents?.map((event: Event, index: number) => (
              <Stack key={event.id}>
                <EventHorizontalCard event={event} />
                {index < comingEvents?.length && <Divider orientation="horizontal" flexItem sx={{ mt: 4, mb: 4 }} />}
              </Stack>
            ))} */}
          {selectedEvents?.length > 0 &&
            selectedEvents?.map((event: Event, index: number) => (
              <Stack key={event.id}>
                {isMobile ? (
                  <EventVerticalCard
                    hasStatus={true}
                    event={event}
                    registered={!!registeredEvents?.find((item: Event) => item.id === event.id)}
                  />
                ) : (
                  <EventHorizontalCard
                    event={event}
                    registered={!!registeredEvents?.find((item: Event) => item.id === event.id)}
                  />
                )}
                {index < selectedEvents?.length - 1 && (
                  <Divider orientation="horizontal" flexItem sx={{ mt: 2, mb: 2 }} />
                )}
              </Stack>
            ))}
        </Stack>
        <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
        <Stack flex={2}>
          <EventCalendarWrapper
            events={comingEvents?.concat(endedEvents)}
            handleSelectedEvents={handleSelectedEvents}
            handleUnselectedEvents={handleUnselectedEvents}
          />
        </Stack>
      </Stack>
    </Container>
  )
}
