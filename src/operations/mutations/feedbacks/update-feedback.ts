import { gql } from '@apollo/client'

const UPDATE_FEEDBACK = gql`
  mutation updateFeedback($feedbackId: uuid!, $comment: String, $point: numeric, $hidden: Boolean) {
    update_feedbacks_by_pk(
      pk_columns: { id: $feedbackId }
      _set: { comment: $comment, point: $point, hidden: $hidden }
    ) {
      id
    }
  }
`

export default UPDATE_FEEDBACK
