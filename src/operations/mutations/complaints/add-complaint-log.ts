import { gql } from '@apollo/client'

const ADD_COMPLAINT_LOG = gql`
  mutation addComplaintLog($complaintId: uuid!, $name: String, $note: String, $attachments: jsonb) {
    addComplaintLog(complaintId: $complaintId, name: $name, note: $note, attachments: $attachments) {
      message
      data
      code
    }
  }
`

export default ADD_COMPLAINT_LOG
