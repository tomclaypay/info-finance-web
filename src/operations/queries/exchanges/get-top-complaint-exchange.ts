import { gql } from '@apollo/client'
const GET_TOP_COMPLAINT = gql`
  query getExchanges($where: exchanges_bool_exp, $complaint_where: complaints_bool_exp) {
    exchanges(where: $where) {
      # complaints_aggregate {
      #   aggregate {
      #     count
      #   }
      # }
      name
      logo
      id
      icon
      slug
      complaints(where: $complaint_where) {
        id
      }
    }
  }
`
export default GET_TOP_COMPLAINT
