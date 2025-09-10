import { gql } from '@apollo/client'

const DELETE_COMPLAINT = gql`
  mutation deleteComplaint($complaintId: uuid!) {
    delete_complaints_by_pk(id: $complaintId) {
      id
    }
  }
`

export default DELETE_COMPLAINT
