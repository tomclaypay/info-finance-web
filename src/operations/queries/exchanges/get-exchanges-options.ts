import { gql } from '@apollo/client'

const GET_EXCHANGES_OPTIONS = gql`
  query getExchanges {
    exchanges(order_by: { name: asc_nulls_first }) {
      id
      name
      website
    }
  }
`

export default GET_EXCHANGES_OPTIONS
