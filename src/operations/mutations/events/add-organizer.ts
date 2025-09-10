import { gql } from '@apollo/client'

const ADD_ORGANIZER = gql`
  mutation addOrganizer($event_id: uuid, $images: jsonb, $name: String, $description: String) {
    insert_event_organizer_one(
      object: { event_id: $event_id, images: $images, name: $name, description: $description }
    ) {
      description
    }
  }
`

export default ADD_ORGANIZER
