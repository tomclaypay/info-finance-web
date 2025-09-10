import { Box } from '@mui/material'

import { MainLayout } from '../../main-layout'
import EventHero from '../media/EventHero'

const EventsLayout = ({ children }: any) => {
  return (
    <Box>
      <EventHero />
      {children}
    </Box>
  )
}

EventsLayout.getLayout = (page: any) => <MainLayout> {page}</MainLayout>

export default EventsLayout
