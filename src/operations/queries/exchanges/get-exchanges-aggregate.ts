import { gql } from '@apollo/client'

const GET_EXCHANGES_AGGREGATE = gql`
  query getExchangesAggregate($where: exchanges_bool_exp) {
    exchanges_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`

export default GET_EXCHANGES_AGGREGATE
