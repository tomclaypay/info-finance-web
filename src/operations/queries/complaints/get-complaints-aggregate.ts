import { gql } from '@apollo/client'

const GET_COMPLAINTS_AGGREGATE = gql`
  query getComplaintsAggregate($where: complaints_bool_exp) {
    complaints_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`

export default GET_COMPLAINTS_AGGREGATE
