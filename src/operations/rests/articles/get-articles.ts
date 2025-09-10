import { gql } from '@apollo/client'

const GET_ARTICLES = gql`
  query getArticles {
    articles {
      data {
        id
        attributes {
          title
          description
          content
          thumbnail {
            data {
              attributes {
                url
              }
            }
          }
          slug
          seoTitle
          seoDescription
          seoImg {
            data {
              attributes {
                url
              }
            }
          }
          articleCategories {
            data {
              id
              attributes {
                name
                slug
                description
              }
            }
          }
          createdAt
          publishedTime
          updatedAt
          publishedAt
        }
      }
    }
  }
`

export default GET_ARTICLES
