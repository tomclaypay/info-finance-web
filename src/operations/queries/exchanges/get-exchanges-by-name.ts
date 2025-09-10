import { gql } from '@apollo/client'

const GET_EXCHANGES_BY_NAME = gql`
  query getExchangesByName {
    exchanges(where: { hidden: { _eq: false } }, order_by: { name: asc_nulls_first }) {
      id
      name
      website
      logo
    }
  }
`

export default GET_EXCHANGES_BY_NAME
