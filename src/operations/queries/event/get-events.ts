import { gql } from '@apollo/client'

const GET_EVENTS = gql`
  query getEvents($orderBy: [event_order_by!], $limit: Int) {
    event(order_by: $orderBy, limit: $limit) {
      description
      end
      id
      location
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
  }
`

export default GET_EVENTS
