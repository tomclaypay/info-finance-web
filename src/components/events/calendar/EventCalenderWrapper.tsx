import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'
import '@fullcalendar/list/main.css'
import '@fullcalendar/timeline/main.css'
import { useState, useRef, useEffect, ReactElement } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import timeGridPlugin from '@fullcalendar/timegrid'
import timelinePlugin from '@fullcalendar/timeline'
import { Box, useMediaQuery } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'
import { gtm } from '@app/lib/gtm'
import { AuthGuard } from '@app/components/authentication/auth-guard'
import { DashboardLayout } from '@app/components/dashboard/dashboard-layout'
import { CalendarHeader } from './CalendarHeader'
import { Event } from '@app/interfaces/event'

const FullCalendarWrapper = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(3),
  '& .fc-license-message': {
    display: 'none',
  },
  '& .fc': {
    '--fc-bg-event-opacity': 1,
    '--fc-border-color': theme.palette.divider,
    '--fc-daygrid-event-dot-width': '5px',
    '--fc-event-text-color': theme.palette.primary.contrastText,
    '--fc-list-event-hover-bg-color': theme.palette.background.default,
    '--fc-neutral-bg-color': theme.palette.background.default,
    '--fc-page-bg-color': theme.palette.background.default,
    '--fc-today-bg-color': alpha(theme.palette.primary.main, 0.25),
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily,
  },
  '& .fc .fc-col-header-cell-cushion': {
    paddingBottom: '5px',
    paddingTop: '5px',
    fontSize: theme.typography.overline.fontSize,
    fontWeight: theme.typography.overline.fontWeight,
    letterSpacing: theme.typography.overline.letterSpacing,
    lineHeight: theme.typography.overline.lineHeight,
    textTransform: theme.typography.overline.textTransform,
  },
  '& .fc-h-event': {
    border: 'none',
  },
  '& .fc .fc-daygrid-day-top': {
    color: theme.palette.text.secondary,
    justifyContent: 'center',
  },
  '& .fc .fc-day-other .fc-daygrid-day-top': {
    color: theme.palette.text.secondary,
  },
  '& .fc .fc-daygrid-body-unbalanced .fc-daygrid-day-events': {
    minHeight: '0',
  },
  '& .fc-daygrid-event': {
    borderRadius: theme.shape.borderRadius,
    padding: '0px 4px',
    fontSize: theme.typography.subtitle2.fontSize,
    fontWeight: theme.typography.subtitle2.fontWeight,
    lineHeight: theme.typography.subtitle2.lineHeight,
  },
  '& .fc-daygrid-block-event .fc-event-time': {
    fontSize: theme.typography.body2.fontSize,
    fontWeight: theme.typography.body2.fontWeight,
    lineHeight: theme.typography.body2.lineHeight,
  },
  '& .fc-daygrid-day-frame': {
    // borderRadius: '4px',
  },
  '& .fc-daygrid-day-number': {
    fontFamily: 'Montserrat',
    fontSize: '16px',
  },
}))

export interface UploadFileRef {
  handleUploadFiles: () => Promise<string[] | undefined>
}

interface EventCalendarWrapperProps {
  events: Event[]
  handleSelectedEvents: (arg: any) => void
  handleUnselectedEvents: () => void
}

const EventCalendarWrapper = ({ events, handleSelectedEvents, handleUnselectedEvents }: EventCalendarWrapperProps) => {
  const calendarRef = useRef(null)
  const smDown = useMediaQuery((theme) => theme?.breakpoints.down('sm'))
  const [date, setDate] = useState(new Date())
  // const [modalRegister, setModalRegister] = useState(false)
  const [view, setView] = useState(smDown ? 'dayGridMonth' : 'dayGridMonth')
  // const value = useContext(AuthContext)
  // const [dialog, setDialog] = useState({
  //   isOpen: false,
  //   eventId: undefined,
  //   range: {
  //     start: undefined,
  //     end: undefined,
  //   },
  // })

  useEffect(() => {
    gtm.push({ event: 'page_view' })
  }, [])

  // const { data: dataUser } = useQuery(GET_ONE_USER, {
  //   variables: {
  //     id: value?.user?.id,
  //   },
  // })

  const handleDateToday = () => {
    const calendarEl = calendarRef.current

    if (calendarEl) {
      const calendarApi = calendarEl.getApi()

      calendarApi.today()
      setDate(calendarApi.getDate())
    }
  }

  const handleViewChange = (newView: any) => {
    const calendarEl = calendarRef.current

    if (calendarEl) {
      const calendarApi = calendarEl.getApi()

      calendarApi.changeView(newView)
      setView(newView)
    }
  }

  const handleDatePrev = () => {
    const calendarEl = calendarRef.current

    if (calendarEl) {
      const calendarApi = calendarEl.getApi()

      calendarApi.prev()
      setDate(calendarApi.getDate())
    }
  }

  const handleDateNext = () => {
    const calendarEl = calendarRef.current

    if (calendarEl) {
      const calendarApi = calendarEl.getApi()

      calendarApi.next()
      setDate(calendarApi.getDate())
    }
  }

  // const handleEventSelect = (arg: any) => {
  //   setDialog({
  //     ...dialog,
  //     isOpen: true,
  //     eventId: arg.event.id,
  //   })
  // }

  // const handleCloseDialog = () => {
  //   setDialog({
  //     ...dialog,
  //     isOpen: false,
  //     range: {
  //       start: undefined,
  //       end: undefined,
  //     },
  //   })
  // }

  // const handleRegister = () => {
  //   setDialog({
  //     ...dialog,
  //     isOpen: false,
  //   })
  //   setModalRegister(true)
  // }

  return (
    <>
      <Box
        component="main"
        sx={{
          backgroundColor: 'background.paper',
          borderRadius: '8px',
          padding: '10px',
          // flexGrow: 1,
          boxShadow: '4px 4px 40px rgba(0, 0, 0, 0.1)',
        }}
      >
        <CalendarHeader
          date={date}
          onDateNext={handleDateNext}
          onDatePrev={handleDatePrev}
          onDateToday={handleDateToday}
          onViewChange={handleViewChange}
          view={view}
          mobile={smDown}
        />
        <FullCalendarWrapper>
          <FullCalendar
            allDayMaintainDuration
            dayMaxEventRows={3}
            // eventClick={handleEventSelect}
            eventDisplay="block"
            eventResizableFromStart
            events={events}
            headerToolbar={false}
            height={350}
            contentHeight={200}
            initialDate={date}
            initialView={view}
            plugins={[dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin, timelinePlugin]}
            ref={calendarRef}
            rerenderDelay={10}
            select={handleSelectedEvents}
            unselect={handleUnselectedEvents}
            selectable
            weekends
            eventContent={(event) => (
              <Box
                sx={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '100%',
                  position: 'absolute',
                  top: '3px',
                  whiteSpace: 'normal',
                  opacity: new Date(event.event.end as Date) > new Date() ? '1' : '0.2',
                  backgroundColor: new Date(event.event.end as Date) > new Date() ? '#00C868' : 'red',
                }}
              />
            )}
          />
        </FullCalendarWrapper>
      </Box>

      {/* <ModalEvent
        open={dialog.isOpen}
        onClose={handleCloseDialog}
        event={selectedEvent}
        handleRegister={handleRegister}
        listed={ownerEvents?.find((item) => item.id === selectedEvent?.id)}
      />

      <RegisterEventForm
        onClose={() => setModalRegister(false)}
        open={modalRegister}
        event={selectedEvent}
        listed={ownerEvents?.find((item) => item.id === selectedEvent?.id)}
        dataUser={dataUser && dataUser}
      /> */}
    </>
  )
}

EventCalendarWrapper.getLayout = (page: ReactElement) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default EventCalendarWrapper
