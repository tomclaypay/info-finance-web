import { gql } from '@apollo/client'

const GET_USAGE_PAGE = gql`
  query getUsagePage($filters: CustomerServiceFiltersInput, $locale: I18NLocaleCode) {
    customerServices(filters: $filters, locale: $locale) {
      data {
        attributes {
          type
          title
          title
          description
        }
      }
    }
  }
`

export default GET_USAGE_PAGE
