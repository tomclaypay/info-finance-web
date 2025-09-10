import { gql } from '@apollo/client'

const ADD_COMPLAINT_CONTRACT = gql`
  mutation addComplaintContract($complaintId: uuid!, $name: String, $files: jsonb) {
    addComplaintContract(complaintId: $complaintId, name: $name, files: $files) {
      message
      code
      data
    }
  }
`

export default ADD_COMPLAINT_CONTRACT
