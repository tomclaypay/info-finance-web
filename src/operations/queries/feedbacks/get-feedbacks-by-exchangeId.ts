import { gql } from '@apollo/client'

const GET_FEEDBACKS_BY_EXCHANGE_ID = gql`
  query getFeedbacksByExchangeId($where: feedbacks_bool_exp, $created_at: order_by = desc) {
    feedbacks(where: $where, order_by: { created_at: $created_at }) {
      comment
      created_at
      hidden
      id
      point
      exchange_id
      user_id
      updated_at
      user {
        avatar
        email
        displayName
        id
      }
      seeder {
        email
        fullname
        id
      }
      exchange {
        name
      }
    }
    feedbacks_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`

export default GET_FEEDBACKS_BY_EXCHANGE_ID
