import { gql } from '@apollo/client'

const CREATE_FEEDBACK = gql`
  mutation createFeedback($exchangeId: uuid, $userId: uuid, $point: numeric, $comment: String, $hidden: Boolean) {
    insert_feedbacks_one(
      object: { exchange_id: $exchangeId, user_id: $userId, point: $point, comment: $comment, hidden: $hidden }
    ) {
      point
    }
  }
`

export default CREATE_FEEDBACK
