import { gql } from '@apollo/client'

const UPDATE_HIDDEN_COMPLAINT = gql`
  mutation updateHiddenComplaint($hidden: Boolean, $complaintId: uuid!) {
    update_complaints_by_pk(pk_columns: { id: $complaintId }, _set: { hidden: $hidden }) {
      hidden
    }
  }
`

export default UPDATE_HIDDEN_COMPLAINT
