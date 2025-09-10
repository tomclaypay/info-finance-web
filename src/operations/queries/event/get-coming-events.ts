import { gql } from '@apollo/client'

const GET_COMING_EVENTS = gql`
  query getComingEvents($nowDate: timestamptz, $limit: Int, $offset: Int) {
    comingEvents: event(where: { end: { _gte: $nowDate } }, order_by: { start: asc }, limit: $limit, offset: $offset) {
      description
      end
      id
      images
      images_event_end
      location
      participant_num
      video_url
      fake_participant_num
      start
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
    event_aggregate(where: { end: { _gte: $nowDate } }) {
      aggregate {
        count
      }
    }
  }
`

export default GET_COMING_EVENTS
