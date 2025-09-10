import { gql } from '@apollo/client'

const GET_COMPLAINTS_BY_USER = gql`
  query getComplaintsByUser($hidden: Boolean = false, $id: uuid!, $limit: Int) {
    complaints(
      where: { hidden: { _eq: $hidden }, user: { id: { _eq: $id } } }
      limit: $limit
      order_by: { updatedAt: desc }
    ) {
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
      slug
      title
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
  }
`

export default GET_COMPLAINTS_BY_USER
