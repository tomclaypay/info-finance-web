import { gql } from '@apollo/client'

const GET_COMPLAINT_BY_ID_USER = gql`
  query getComplaintsByIdUser($id: uuid!) {
    complaints_by_pk(id: $id) {
      category {
        name
        slug
      }
      user {
        avatar
        displayName
        email
      }
      createdAt
      fullname
      closeReason
      slug
      title
      description
      highlight_on_broker
      images
      status
      exchange {
        logo
        name
        operationYears
        id
        website
      }
      cancelRequests {
        status
      }
      attachments {
        files
      }
    }
  }
`

export default GET_COMPLAINT_BY_ID_USER
