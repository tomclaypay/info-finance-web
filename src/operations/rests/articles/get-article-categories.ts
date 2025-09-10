import { gql } from '@apollo/client'

const GET_ARTICLE_CATEGORIES = gql`
  query getArticleCategories($filters: ArticleCategoryFiltersInput, $sort: [String], $locale: I18NLocaleCode) {
    articleCategories(filters: $filters, sort: $sort, locale: $locale) {
      data {
        id
        attributes {
          slug
          name
        }
      }
    }
  }
`

export default GET_ARTICLE_CATEGORIES
