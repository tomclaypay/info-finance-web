import { gql } from '@apollo/client'

const GET_FEEDBACKS = gql`
  query getFeedbacks($offset: Int, $limit: Int, $order_by: [feedbacks_order_by!], $where: feedbacks_bool_exp) {
    feedbacks(where: $where, offset: $offset, limit: $limit, order_by: $order_by) {
      comment
      created_at
      hidden
      exchange_id
      user_id
      id
      point
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

export default GET_FEEDBACKS
