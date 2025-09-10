import { gql } from '@apollo/client'

const GET_COMPLAINT_CATEGORIES = gql`
  query getReviewCategories {
    complaint_categories {
      id
      name
      slug
      updatedAt
      description
      createdAt
    }
  }
`

export default GET_COMPLAINT_CATEGORIES
