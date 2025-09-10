import { gql } from '@apollo/client'

const UPDATE_HIGHLIGHT_COMPLAINT = gql`
  mutation updateHighlightComplaint($highlight_on_broker: Boolean, $complaintId: uuid!) {
    update_complaints_by_pk(pk_columns: { id: $complaintId }, _set: { highlight_on_broker: $highlight_on_broker }) {
      highlight_on_broker
    }
  }
`

export default UPDATE_HIGHLIGHT_COMPLAINT
