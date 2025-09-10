import { gql } from '@apollo/client'

const GET_COMPLAINTS = gql`
  query getComplaints($limit: Int, $offset: Int, $order_by: [complaints_order_by!], $where: complaints_bool_exp) {
    complaints(where: $where, limit: $limit, offset: $offset, order_by: $order_by) {
      id
      createdAt
      updatedAt
      fullname
      email
      status
      title
      closeReason
      description
      phone
      images
      title
      slug
      hidden
      website
      highlight_on_broker
      user {
        email
        displayName
        avatar
      }
      handle_by {
        user {
          displayName
          id
          email
        }
        id
      }
      category {
        icon
        name
      }
      exchange {
        name
        website
      }
      logs(where: { type: { _eq: "history" } }, order_by: { createdAt: asc }) {
        newStatus
        oldStatus
        createdAt
        attachments
      }
      cancelRequests {
        id
        reason
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

export default GET_COMPLAINTS
