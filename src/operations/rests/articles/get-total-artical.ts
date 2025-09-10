import { gql } from '@apollo/client'

const GET_TOTAL_ARTICLE = gql`
  query getTotalArticle {
    articles {
      meta {
        pagination {
          total
        }
      }
    }
  }
`
export default GET_TOTAL_ARTICLE
