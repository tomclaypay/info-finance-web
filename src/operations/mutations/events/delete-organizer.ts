import { gql } from '@apollo/client'

const DELETE_ORGANIZER = gql`
  mutation deleteOrganizer($id: uuid!) {
    delete_event_organizer_by_pk(id: $id) {
      name
    }
  }
`

export default DELETE_ORGANIZER
