import { gql } from '@apollo/client'

const GET_COMPLAINT_DETAILS = gql`
  query getComplaintDetails($id: uuid!) {
    complaints(where: { id: { _eq: $id } }) {
      id
      createdAt
      createdBy
      fullname
      title
      email
      status
      closeReason
      description
      phone
      website
      slug
      images
      highlight_on_broker
      title
      hidden
      handle_by {
        user {
          displayName
          id
        }
        cs_team {
          id
          name
        }
        id
      }
      category {
        icon
        id
        name
      }
      exchange {
        name
        id
        website
      }
      attachments {
        files
      }
      log: logs(where: { type: { _eq: "log" } }, order_by: { createdAt: desc }) {
        newStatus
        type
        note
        name
        createdAt
        updatedAt
        attachments
        user {
          fullname
          displayName
        }
      }
      logs(where: { type: { _eq: "history" } }, order_by: { createdAt: asc }) {
        newStatus
        oldStatus
        createdAt
        attachments
      }
      user {
        id
        email
        avatar
        phone
        displayName
      }
      cancelRequests {
        status
        reason
      }
    }
  }
`

export default GET_COMPLAINT_DETAILS
