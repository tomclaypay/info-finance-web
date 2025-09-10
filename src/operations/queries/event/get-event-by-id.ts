import { gql } from '@apollo/client'

const GET_EVENT_BY_ID = gql`
  query getEventById($eventId: uuid!) {
    event_by_pk(id: $eventId) {
      description
      end
      id
      images
      location
      participant_num
      fake_participant_num
      start
      images_event_end
      title
      video_url
      event_organizers {
        description
        event_id
        id
        images
        name
      }
      event_sponsors {
        description
        event_id
        id
        images
        name
      }
    }
  }
`

export default GET_EVENT_BY_ID
