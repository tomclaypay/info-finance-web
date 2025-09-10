import { gql } from '@apollo/client'

const GET_LOCALIZATION = gql`
  query Article($filters: ArticleFiltersInput, $locale: I18NLocaleCode) {
    articles(filters: $filters, locale: $locale) {
      data {
        attributes {
          localizations {
            data {
              attributes {
                slug
              }
            }
          }
        }
      }
    }
  }
`

export default GET_LOCALIZATION
