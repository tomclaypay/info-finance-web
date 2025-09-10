import { gql } from '@apollo/client'

const GET_EVENT_BY_SLUG = gql`
  query getEventBySlug($eventSlug: String) {
    event(where: { slug: { _eq: $eventSlug } }) {
      description
      end
      id
      images
      location
      participant_num
      fake_participant_num
      video_url
      start
      images_event_end
      title
      slug
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

export default GET_EVENT_BY_SLUG
