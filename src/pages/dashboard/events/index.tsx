import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'
import '@fullcalendar/list/main.css'
import '@fullcalendar/timeline/main.css'
import { useState, useRef, useEffect, useCallback, ReactElement } from 'react'
import Head from 'next/head'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import { FormActions, OBJECT_TYPE, UPLOAD_TYPE } from '@app/constants/common'
import timeGridPlugin from '@fullcalendar/timegrid'
import timelinePlugin from '@fullcalendar/timeline'
import { Box, Stack, Typography, useMediaQuery } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'
import { gtm } from '@app/lib/gtm'
import { CalendarToolbar } from '@app/components/dashboard/events/event-forms/calendar-toolbar'
import { AuthGuard } from '@app/components/authentication/auth-guard'
import { DashboardLayout } from '@app/components/dashboard/dashboard-layout'
import CreateEditEventSection from '@app/components/dashboard/events/section/create-edit-event-section'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import { Event } from '@app/interfaces/event'
import { useMutation, useQuery } from '@apollo/client'
import ADD_EVENT from '@app/operations/mutations/events/add-event'
import ADD_SPONSOR from '@app/operations/mutations/events/add-sponsor'
import ADD_ORGANIZER from '@app/operations/mutations/events/add-organizer'
import UPDATE_EVENT from '@app/operations/mutations/events/update-event'
import DELETE_SPONSOR from '@app/operations/mutations/events/delete-sponsor'
import DELETE_ORGANIZER from '@app/operations/mutations/events/delete-organizer'
import GET_EVENTS from '@app/operations/queries/event/get-events'
import useUploadFile from '@app/hooks/use-upload-file'
import GET_EVENT_BY_ID from '@app/operations/queries/event/get-event-by-id'
import useUploadVideo from '@app/hooks/use-upload-video'

const FullCalendarWrapper = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(3),
  '& .fc-license-message': {
    display: 'none',
  },
  '& .fc': {
    '--fc-bg-event-opacity': 1,
    '--fc-border-color': theme.palette.divider,
    '--fc-daygrid-event-dot-width': '10px',
    '--fc-event-text-color': theme.palette.primary.contrastText,
    '--fc-list-event-hover-bg-color': theme.palette.background.default,
    '--fc-neutral-bg-color': theme.palette.background.default,
    '--fc-page-bg-color': theme.palette.background.default,
    '--fc-today-bg-color': alpha(theme.palette.primary.main, 0.25),
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily,
  },
  '& .fc .fc-col-header-cell-cushion': {
    paddingBottom: '10px',
    paddingTop: '10px',
    fontSize: theme.typography.overline.fontSize,
    fontWeight: theme.typography.overline.fontWeight,
    letterSpacing: theme.typography.overline.letterSpacing,
    lineHeight: theme.typography.overline.lineHeight,
    textTransform: theme.typography.overline.textTransform,
  },
  '& .fc .fc-day-other .fc-daygrid-day-top': {
    color: theme.palette.text.secondary,
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
    padding: '12px',
  },
}))
export interface UploadFileRef {
  handleUploadFiles: () => Promise<string[] | undefined>
}

export interface ImageFiles {
  images: any[]
  images_event_end: any[]
}

const Calendar = () => {
  const calendarRef = useRef(null)
  const smDown = useMediaQuery((theme: any) => theme.breakpoints.down('sm'))
  const [date, setDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<Event>({
    id: '',
    title: '',
    start: '',
    end: '',
    description: '',
    images: [],
    images_event_end: [],
    location: '',
    participant_num: 0,
    event_sponsors: [],
    event_organizers: [],
    video_url: '',
  })
  const [view, setView] = useState(smDown ? 'timeGridDay' : 'dayGridMonth')
  const [dialog, setDialog] = useState({
    isOpen: false,
    eventId: undefined,
    range: {
      start: undefined,
      end: undefined,
    },
  })
  const [imageFiles, setImageFiles] = useState<ImageFiles>({
    images: [],
    images_event_end: [],
  })

  const [video, setVideo] = useState<any>('')
  const { handleUploadFiles } = useUploadFile({ objectType: OBJECT_TYPE.EVENT, type: UPLOAD_TYPE.IMAGE })
  const { uploadVideoToS3 } = useUploadVideo({ objectType: OBJECT_TYPE.EVENT, type: UPLOAD_TYPE.VIDEO })

  const [addEvent] = useMutation(ADD_EVENT)
  const [updateEvent] = useMutation(UPDATE_EVENT)

  const [addSponsor] = useMutation(ADD_SPONSOR)
  const [deleteSponsor] = useMutation(DELETE_SPONSOR)

  const [addOrganizer] = useMutation(ADD_ORGANIZER)
  const [deleteOrganizer] = useMutation(DELETE_ORGANIZER)

  const { data: dataEvents, refetch: refetchDataEvents } = useQuery(GET_EVENTS, {
    variables: { orderBy: { start: 'asc' } },
  })

  const { data: dataSelectedEvent, refetch: refetchSelectedEvent } = useQuery(GET_EVENT_BY_ID, {
    variables: {
      eventId: '',
    },
  })

  const handleChangeFiles = (event: any, type: string, name: string) => {
    if (type === 'addImg' && event.target.files.length > 0) {
      const files = event.target.files as FileList
      setImageFiles({ ...imageFiles, [name]: imageFiles[name as keyof typeof imageFiles].concat([...(files || [])]) })
    }

    if (type === 'removeImg') {
      const files = event?.images as FileList
      setImageFiles({ ...imageFiles, [name]: [...(files || [])] })
    }
  }

  const handleDropVideo = (event: any) => {
    const files = event.target.files as FileList
    if (files?.[0]?.size > 5e8) {
      toast.error('Vui lòng tải file nhỏ hơn 500MB')
    } else setVideo(files?.[0])
  }

  const handleRemoveVideo = () => {
    setVideo('')
  }

  const handleEventFormSubmit = async (formValues: Event) => {
    try {
      const images = await handleUploadFiles(imageFiles.images)
      const images_event_end = await handleUploadFiles(imageFiles.images_event_end)
      setImageFiles({
        images: [],
        images_event_end: [],
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { event_sponsors, event_organizers, participant_num, ...other } = formValues
      await addEvent({
        variables: {
          ...other,
          images,
          images_event_end,
        },
        onCompleted: async (data) => {
          event_sponsors.map(async (sponsor) => {
            await addSponsor({
              variables: {
                images: sponsor.images,
                name: sponsor.name,
                description: sponsor.description,
                event_id: data.insert_event_one.id,
              },
            })
          })
          event_organizers.map(async (organizer) => {
            await addOrganizer({
              variables: {
                images: organizer.images,
                name: organizer.name,
                description: organizer.description,
                event_id: data.insert_event_one.id,
              },
            })
          })
          refetchDataEvents()
        },
      })

      toast.success('Tạo sự kiện thành công')
      setDialog({
        ...dialog,
        isOpen: false,
        range: {
          start: undefined,
          end: undefined,
        },
      })
      // router.push('/dashboard/events')
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleUpdateEventFormSubmit = async (formValues: Event) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { event_sponsors, event_organizers, images, images_event_end, id, participant_num, video_url, ...other } =
        formValues
      const newImages = imageFiles.images.length > 0 ? await handleUploadFiles(imageFiles.images) : null
      const newImagesEndEvent =
        imageFiles.images_event_end.length > 0 ? await handleUploadFiles(imageFiles.images_event_end) : null
      setImageFiles({
        images: [],
        images_event_end: [],
      })

      const newVideo = video !== '' ? await uploadVideoToS3(video) : null
      setVideo('')

      const newVideoName = newVideo?.split('/videos/')[1].replace('.mp4', '')

      const newPreUrl = newVideo?.split('/videos/')[0]

      const newVideUrl = `${newPreUrl}/videos_m3u8/${newVideoName}/${newVideoName}.m3u8`

      const addSponsors = event_sponsors?.filter((sponsor) => !sponsor.event_id)
      const removeSponsors = selectedEvent?.event_sponsors?.filter(
        (sponsor1) => !event_sponsors.some((sponsor2) => sponsor2 === sponsor1)
      )
      const addOrganizers = event_organizers?.filter((organizer) => !organizer.event_id)
      const removeOrganizers = selectedEvent?.event_organizers?.filter(
        (organizer1) => !event_organizers.some((organizer2) => organizer1 === organizer2)
      )

      await updateEvent({
        variables: {
          ...other,
          id,
          images: newImages ? images.concat(newImages) : images,
          images_event_end: newImagesEndEvent ? images_event_end.concat(newImagesEndEvent) : images_event_end,
          video_url: newVideo ? newVideUrl : video_url,
          video_url_mp4: newVideo ? newVideo : selectedEvent.video_url_mp4,
        },
        onCompleted: async () => {
          if (addSponsors?.length > 0) {
            addSponsors.map(async (sponsor) => {
              await addSponsor({
                variables: {
                  images: sponsor.images,
                  name: sponsor.name,
                  description: sponsor.description,
                  event_id: id,
                },
              })
            })
          }

          if (selectedEvent && removeSponsors?.length > 0) {
            removeSponsors?.map(async (sponsor) => {
              await deleteSponsor({
                variables: {
                  id: sponsor.id,
                },
              })
            })
          }

          if (addOrganizers?.length > 0) {
            addOrganizers.map(async (organizer) => {
              await addOrganizer({
                variables: {
                  images: organizer.images,
                  name: organizer.name,
                  description: organizer.description,
                  event_id: id,
                },
              })
            })
          }

          if (selectedEvent && removeOrganizers?.length > 0) {
            removeOrganizers?.map(async (organizer) => {
              await deleteOrganizer({
                variables: {
                  id: organizer.id,
                },
              })
            })
          }

          refetchDataEvents()
        },
      })

      toast.success('Chỉnh sửa sự kiện thành công')
      setDialog({
        isOpen: false,
        eventId: undefined,
        range: {
          start: undefined,
          end: undefined,
        },
      })
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    gtm.push({ event: 'page_view' })
  }, [])

  const handleResize = useCallback(() => {
    const calendarEl: any = calendarRef.current

    if (calendarEl) {
      const calendarApi = calendarEl.getApi()
      const newView = smDown ? 'timeGridDay' : 'dayGridMonth'

      calendarApi.changeView(newView)
      setView(newView)
    }
  }, [calendarRef, smDown])

  useEffect(
    () => {
      handleResize()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [smDown]
  )

  const handleDateToday = () => {
    const calendarEl: any = calendarRef.current

    if (calendarEl) {
      const calendarApi = calendarEl.getApi()

      calendarApi.today()
      setDate(calendarApi.getDate())
    }
  }

  const handleViewChange = (newView: any) => {
    const calendarEl: any = calendarRef.current

    if (calendarEl) {
      const calendarApi = calendarEl.getApi()

      calendarApi.changeView(newView)
      setView(newView)
    }
  }

  const handleDatePrev = () => {
    const calendarEl: any = calendarRef.current

    if (calendarEl) {
      const calendarApi = calendarEl.getApi()

      calendarApi.prev()
      setDate(calendarApi.getDate())
    }
  }

  const handleDateNext = () => {
    const calendarEl: any = calendarRef.current

    if (calendarEl) {
      const calendarApi = calendarEl.getApi()

      calendarApi.next()
      setDate(calendarApi.getDate())
    }
  }

  const handleAddClick = () => {
    setDialog({
      ...dialog,
      isOpen: true,
    })
  }

  const handleRangeSelect = (arg: any) => {
    const calendarEl: any = calendarRef.current

    if (calendarEl) {
      const calendarApi = calendarEl.getApi()
      calendarApi.unselect()
    }

    // if (arg.end.getTime() > new Date()) {
    //   setDialog({
    //     eventId: undefined,
    //     isOpen: true,
    //     range: {
    //       start: arg.start.getTime(),
    //       end: arg.end.getTime(),
    //     },
    //   })
    // } else {
    //   toast.error('Vui lòng chọn ngày trễ hơn hiện tại')
    // }

    setDialog({
      eventId: undefined,
      isOpen: true,
      range: {
        start: arg.start.getTime(),
        end: arg.end.getTime(),
      },
    })
  }

  const handleEventSelect = (arg: any) => {
    setDialog({
      ...dialog,
      isOpen: true,
      eventId: arg.event.id,
    })
  }

  const handleEventResize = async ({ event }: { event: any }) => {
    console.log({ event })
  }

  const handleEventDrop = async ({ event }: { event: any }) => {
    console.log({ event })
  }

  const handleCloseDialog = () => {
    setDialog({
      ...dialog,
      isOpen: false,
      range: {
        start: undefined,
        end: undefined,
      },
    })
    setVideo('')
  }

  useEffect(() => {
    // setSelectedEvent(dataEvents?.event?.find((event: Event) => event.id === dialog.eventId))
    refetchSelectedEvent({
      eventId: dialog.eventId,
    })
    setSelectedEvent(dataSelectedEvent?.event_by_pk)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialog.eventId, dataSelectedEvent])

  return (
    <>
      <Head>
        <title>Dashboard: Calendar | Material Kit Pro</title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: 'background.paper',
          flexGrow: 1,
          p: 8,
        }}
      >
        <CalendarToolbar
          date={date}
          onAddClick={handleAddClick}
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
            droppable
            editable
            eventClick={handleEventSelect}
            eventDisplay="block"
            eventDrop={handleEventDrop}
            eventResizableFromStart
            eventResize={handleEventResize}
            events={dataEvents ? dataEvents.event : []}
            headerToolbar={false}
            height={800}
            initialDate={date}
            initialView={view}
            plugins={[dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin, timelinePlugin]}
            ref={calendarRef}
            rerenderDelay={10}
            select={handleRangeSelect}
            selectable
            eventBackgroundColor="#EBF1FF"
            eventTextColor="#000000"
            weekends
            eventContent={(event) => {
              return (
                <Stack sx={{ cursor: 'pointer', width: '100%', whiteSpace: 'normal' }}>
                  <Typography variant="body2" fontWeight="800">
                    {event.event.title}
                  </Typography>
                  <Typography variant="caption">{`${format(new Date(event.event.start as Date), 'HH:mm')} - ${format(
                    new Date(event.event.end as Date),
                    'HH:mm'
                  )}`}</Typography>
                  <Typography variant="caption">{event.event.extendedProps.location}</Typography>
                </Stack>
              )
            }}
          />
        </FullCalendarWrapper>
      </Box>

      <CreateEditEventSection
        type={selectedEvent === undefined ? FormActions.CREATE : FormActions.UPDATE}
        handleEventFormSubmit={selectedEvent === undefined ? handleEventFormSubmit : handleUpdateEventFormSubmit}
        onAddComplete={handleCloseDialog}
        onClose={handleCloseDialog}
        onDeleteComplete={handleCloseDialog}
        onEditComplete={handleCloseDialog}
        open={dialog.isOpen}
        range={dialog.range}
        event={selectedEvent}
        refetchDataEvents={refetchDataEvents}
        handleChangeFiles={handleChangeFiles}
        imageFiles={imageFiles}
        video={video}
        handleDropVideo={handleDropVideo}
        handleRemoveVideo={handleRemoveVideo}
      />
    </>
  )
}

Calendar.getLayout = (page: ReactElement) => (
  <AuthGuard authorized={true}>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default Calendar
