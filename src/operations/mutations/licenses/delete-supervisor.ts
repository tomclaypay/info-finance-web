import { gql } from '@apollo/client'

const DELETE_SUPERVISOR = gql`
  mutation deleteSupervisor($supervisorId: uuid!) {
    delete_supervisory_authority_by_pk(id: $supervisorId) {
      id
    }
  }
`

export default DELETE_SUPERVISOR
