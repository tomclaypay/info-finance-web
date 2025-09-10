export interface Event {
  id: string
  title: string
  start: any
  end: any
  description: string
  slug?: string
  video_url?: string
  video_url_mp4?: string
  images: string[]
  images_event_end: string[]
  location?: string
  participant_num?: number
  fake_participant_num?: number
  event_sponsors: EventChild[]
  event_organizers: EventChild[]
}
export interface EventChild {
  event_id?: string
  id?: string
  images: string[]
  name: string
  description: string
}
export interface RegisterEvent {
  jobPosition: string
  name: string
  email: string
  phone: string
  origin: string
}

export const STATUS_OF_EVENT = (event: Event, type?: string, locale?: string) => {
  if (new Date(event.start) > new Date()) {
    switch (type) {
      case 'color':
        return 'primary.main'
      case 'background':
        return '#F4F8FF'
      default:
        return locale === 'en' ? 'Upcoming' : 'Sắp diễn ra'
    }
  }
  if (new Date(event.end) < new Date()) {
    switch (type) {
      case 'color':
        return 'error.main'
      case 'background':
        return '#FFE9E6'
      default:
        return locale === 'en' ? 'Finished' : 'Đã kết thúc'
    }
  }

  if (new Date(event.start) < new Date() && new Date(event.end) > new Date()) {
    switch (type) {
      case 'color':
        return 'success.main'
      case 'background':
        return '#F1FFF8'
      default:
        return locale === 'en' ? 'Happening' : 'Đang diễn ra'
    }
  }
}
