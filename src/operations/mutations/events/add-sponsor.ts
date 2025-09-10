import { gql } from '@apollo/client'

const ADD_SPONSOR = gql`
  mutation addSponsor($event_id: uuid, $images: jsonb, $name: String, $description: String) {
    insert_event_sponsor_one(object: { event_id: $event_id, images: $images, name: $name, description: $description }) {
      description
    }
  }
`

export default ADD_SPONSOR
