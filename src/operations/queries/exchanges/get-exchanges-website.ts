import { gql } from '@apollo/client'

const GET_EXCHANGES_WEBSITE = gql`
  query getExchanges($where: exchanges_bool_exp, $offset: Int, $limit: Int, $order_by: [exchanges_order_by!]) {
    exchanges(where: $where, offset: $offset, limit: $limit, order_by: $order_by) {
      headquarter
      icon
      id
      intro
      intro_en
      logo
      name
      operationYears
      hidden
      phone
      license_point
      manage_point
      operation_point
      risk_point
      soft_point
      total_point
      trading_platform
      trading_platform_en
      total_feedback_point
      trading_product
      trading_product_en
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
        name_vn
        logo
      }

      complaints_aggregate {
        aggregate {
          count
        }
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

      feedbacks_aggregate {
        aggregate {
          count
        }
      }
    }

    exchanges_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`

export default GET_EXCHANGES_WEBSITE
