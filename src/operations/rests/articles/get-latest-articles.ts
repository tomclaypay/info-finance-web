import { gql } from '@apollo/client'

const GET_LATEST_ARTICLES = gql`
  query Articles($pagination: PaginationArg, $sort: [String], $filters: ArticleFiltersInput, $locale: I18NLocaleCode) {
    articles(pagination: $pagination, sort: $sort, filters: $filters, locale: $locale) {
      data {
        id
        attributes {
          title
          slug
          description
          createdAt
          publishedTime
          thumbnail {
            data {
              attributes {
                url
              }
            }
          }
          articleCategories {
            data {
              attributes {
                name
                slug
              }
            }
          }
        }
      }
      meta {
        pagination {
          total
        }
      }
    }
  }
`

export default GET_LATEST_ARTICLES
