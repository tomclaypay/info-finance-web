import { gql } from '@apollo/client'

const GET_HIGHLIGHT_EXCHANGES = gql`
  query getExchanges($where: exchanges_bool_exp = {}) {
    exchanges(where: $where) {
      headquarter
      icon
      id
      intro
      intro_en
      logo
      name
      operationYears
      phone
      license_point
      manage_point
      operation_point
      risk_point
      soft_point
      total_point
      trading_platform
      total_feedback_point
      trading_product
      is_top_broker
      rate_top_broker
      is_trader_all_choose
      rate_trader_all_choose
      updatedAt
      website
      email
      description
      createdAt
      country
      abbreviation
      national_id
      slug
      national {
        name
        logo
      }

      feedbacks {
        comment
        hidden
        point
        user {
          avatar
          displayName
          email
        }
      }
    }
  }
`

export default GET_HIGHLIGHT_EXCHANGES
