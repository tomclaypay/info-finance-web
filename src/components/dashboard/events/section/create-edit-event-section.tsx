import { FormActions } from '@app/constants/common'
import { Event } from '@app/interfaces/event'
import { addMinutes } from 'date-fns'
import { Dialog } from '@mui/material'
import { CreateEditEventForm } from '../event-forms/create-edit-event-form'

interface CreateEditComplaintSectionProps {
  type: FormActions
  event?: Event
  imageFiles: { images: any[]; images_event_end: any[] }
  handleEventFormSubmit: (formValues: Event) => void
  refetchDataEvents: () => void
  handleChangeFiles: (event: any, type: string, name: string) => void
  onClose: () => void
  range?: {
    start?: Date
    end?: Date
  }
  open: boolean
  onAddComplete: () => void
  onDeleteComplete: () => void
  onEditComplete: () => void
  video: any
  handleDropVideo: (event: any) => void
  handleRemoveVideo: () => void
}

function CreateEditEventSection(props: CreateEditComplaintSectionProps) {
  const {
    type,
    event,
    handleEventFormSubmit,
    video,
    handleDropVideo,
    handleRemoveVideo,
    imageFiles,
    handleChangeFiles,
    onClose,
    open,
    range,
    refetchDataEvents,
  } = props

  const initialValues: Event = {
    id: event?.id || '',
    title: event?.title || '',
    start: event?.start || (range?.start && new Date(range?.start)) || new Date(),
    end: event?.end || (range?.end && new Date(range?.end)) || addMinutes(new Date(), 30),
    description: event?.description || '',
    images: event?.images || [],
    location: event?.location || '',
    event_organizers: event?.event_organizers || [],
    images_event_end: event?.images_event_end || [],
    event_sponsors: event?.event_sponsors || [],
    participant_num: event?.participant_num || 0,
    fake_participant_num: event?.fake_participant_num || 0,
    video_url: event?.video_url || '',
  }

  return (
    <Dialog fullWidth maxWidth="md" onClose={onClose} open={open}>
      <CreateEditEventForm
        event={event}
        type={type}
        imageFiles={imageFiles}
        handleChangeFiles={handleChangeFiles}
        disabled={false}
        initialValues={initialValues}
        onSubmit={handleEventFormSubmit}
        onClose={onClose}
        refetchDataEvents={refetchDataEvents}
        video={video}
        handleDropVideo={handleDropVideo}
        handleRemoveVideo={handleRemoveVideo}
      />
    </Dialog>
  )
}

export default CreateEditEventSection
