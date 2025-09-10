import { gql } from '@apollo/client'

const DELETE_FEEDBACK = gql`
  mutation delete_feedback($feedbackId: uuid!) {
    delete_feedbacks_by_pk(id: $feedbackId) {
      id
    }
  }
`

export default DELETE_FEEDBACK
