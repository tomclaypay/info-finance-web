import { gql } from '@apollo/client'

const DELETE_EVENT = gql`
  mutation deleteEvent($id: uuid!) {
    delete_event_by_pk(id: $id) {
      end
    }
  }
`

export default DELETE_EVENT
