import { gql } from '@apollo/client'

const GET_EVENTS_BY_EMAIL = gql`
  query getEvents($email: String, $nowDate: timestamptz) {
    event(where: { end: { _gte: $nowDate }, event_registers: { email: { _eq: $email } } }) {
      description
      end
      id
      images
      location
      participant_num
      fake_participant_num
      video_url
      start
      slug
      images_event_end
      title
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

export default GET_EVENTS_BY_EMAIL
