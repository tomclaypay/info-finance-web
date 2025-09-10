import { Event } from '@app/interfaces/event'
import { Container, Grid, Stack } from '@mui/material'
import Carousel from 'react-material-ui-carousel'
import EventVerticalCard from '../card/EventVerticalCard'

interface EventsSliderProps {
  events: Event[]
  registeredEvents?: Event[]
}

const EventsSlider = ({ events, registeredEvents }: EventsSliderProps) => {
  const sliderItems: number = events.length > 4 ? 4 : events.length
  const items: Array<any> = []

  for (let i = 0; i <= events.length - sliderItems; i += 1) {
    items.push(
      <Container maxWidth="lg">
        <Grid container columnSpacing={4} sx={{ mt: 0 }}>
          {events &&
            events.slice(i, i + sliderItems).map((event: any) => (
              <Grid key={event.id} item xs={3} sx={{ paddingTop: '0px!important', mb: 3 }}>
                <Stack sx={{ height: '100%' }}>
                  <EventVerticalCard
                    event={event}
                    registered={!!registeredEvents?.find((item: Event) => item.id === event.id)}
                  />
                </Stack>
              </Grid>
            ))}
        </Grid>
      </Container>
    )
  }
  return (
    <Carousel
      autoPlay={false}
      sx={{
        height: '100%',
        paddingTop: '15px',
      }}
      swipe
      cycleNavigation={false}
      animation="slide"
      indicators={false}
      navButtonsAlwaysVisible
      navButtonsProps={{
        style: {
          marginLeft: '200px',
          marginRight: '200px',
          zIndex: '10',
        },
      }}
    >
      {items}
    </Carousel>
  )
}

export default EventsSlider
