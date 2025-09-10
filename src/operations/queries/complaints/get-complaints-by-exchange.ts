import { gql } from '@apollo/client'

const GET_COMPLAINTS_BY_EXCHANGE = gql`
  query getComplaintsByExchange(
    $where: complaints_bool_exp
    $limit: Int
    $offset: Int
    $orderBy: [complaints_order_by!]
  ) {
    complaints(where: $where, limit: $limit, offset: $offset, order_by: $orderBy) {
      id
      user {
        email
        displayName
        avatar
      }
      handle_by {
        user {
          displayName
          id
        }
        id
      }
      fullname
      title
      slug
      highlight_on_broker
      description
      createdAt
      category {
        name
      }
      exchange {
        id
        logo
        name
        website
      }
      images
      status
      cancelRequests {
        status
      }
    }
    complaints_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`

export default GET_COMPLAINTS_BY_EXCHANGE
