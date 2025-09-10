import { gql } from '@apollo/client'

const GET_ENDED_EVENTS = gql`
  query getEndedEvents($nowDate: timestamptz, $limit: Int, $offset: Int) {
    endedEvents: event(where: { end: { _lte: $nowDate } }, order_by: { end: desc }, limit: $limit, offset: $offset) {
      description
      end
      id
      images
      location
      participant_num
      fake_participant_num
      video_url
      images_event_end
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
    event_aggregate(where: { end: { _lte: $nowDate } }) {
      aggregate {
        count
      }
    }
  }
`

export default GET_ENDED_EVENTS
