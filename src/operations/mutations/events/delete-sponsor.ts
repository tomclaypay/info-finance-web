import { gql } from '@apollo/client'

const DELETE_SPONSOR = gql`
  mutation deleteSponsor($id: uuid!) {
    delete_event_sponsor_by_pk(id: $id) {
      name
    }
  }
`

export default DELETE_SPONSOR
