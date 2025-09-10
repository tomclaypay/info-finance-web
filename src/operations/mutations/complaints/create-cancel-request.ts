import { gql } from '@apollo/client'

const CREATE_CANCEL_REQUEST = gql`
  mutation createCancelRequest($complaintId: uuid!, $reason: String!) {
    createCancelRequest(complaintId: $complaintId, reason: $reason) {
      message
      data
      code
    }
  }
`

export default CREATE_CANCEL_REQUEST
