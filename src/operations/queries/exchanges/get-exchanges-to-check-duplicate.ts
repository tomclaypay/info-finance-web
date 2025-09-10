import { gql } from '@apollo/client'

const GET_EXCHANGES_TO_CHECK_DUPLICATE = gql`
  query getExchangesToCheckDuplicate($where: exchanges_bool_exp) {
    exchanges(where: $where) {
      abbreviation
      website
    }
  }
`

export default GET_EXCHANGES_TO_CHECK_DUPLICATE
