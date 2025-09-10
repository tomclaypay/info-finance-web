import { gql } from '@apollo/client'

const GET_CUSTOMER_SERVICE = gql`
  query getCustomerService($pagination: PaginationArg, $sort: [String], $locale: I18NLocaleCode) {
    customerServices(pagination: $pagination, sort: $sort, locale: $locale) {
      data {
        attributes {
          type
          title
          title
          description
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

export default GET_CUSTOMER_SERVICE
