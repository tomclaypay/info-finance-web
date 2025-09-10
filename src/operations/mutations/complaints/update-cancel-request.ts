import { gql } from '@apollo/client'

const UPDATE_CANCEL_REQUEST = gql`
  mutation updateCancelRequest($cancelRequestId: uuid!, $status: String) {
    updateCancelRequest(cancelRequestId: $cancelRequestId, status: $status) {
      message
      code
      data
    }
  }
`

export default UPDATE_CANCEL_REQUEST
