import { gql } from '@apollo/client'

const GET_COMPLAINT_BY_SLUG = gql`
  query getComplaintsBySlug($exposureSlug: String) {
    complaints(where: { slug: { _eq: $exposureSlug } }) {
      id
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
      title
      highlight_on_broker
      description
      images
      status
      id

      exchange {
        logo
        name
        operationYears
        supervision_time
        supervision_time_en
        id
        website
        hidden
        slug
        national {
          logo
        }
      }
    }
  }
`

export default GET_COMPLAINT_BY_SLUG
