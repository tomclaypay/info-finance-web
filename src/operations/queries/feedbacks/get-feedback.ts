import { gql } from '@apollo/client'

const GET_FEEDBACK = gql`
  query getFeedback($feedbackId: uuid!) {
    feedbacks_by_pk(id: $feedbackId) {
      comment
      created_at
      hidden
      id
      point
      updated_at
      exchange_id
      user_id
      user {
        avatar
        email
        displayName
        id
      }
      seeder_id
      seeder {
        fullname
        id
        email
      }
      exchange {
        name
      }
    }
  }
`

export default GET_FEEDBACK
