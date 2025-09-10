import { gql } from '@apollo/client'

const GET_EXCHANGES = gql`
  query getExchanges(
    $nameContain: String
    $nameEqual: String
    $websiteContain: String
    $offset: Int
    $limit: Int
    $order_by: [exchanges_order_by!]
  ) {
    exchanges(
      where: {
        name: { _ilike: $nameContain, _eq: $nameEqual }
        website: { _cast: { String: { _ilike: $websiteContain } } }
        deleted_at: { _is_null: true }
      }
      offset: $offset
      limit: $limit
      order_by: $order_by
    ) {
      headquarter
      icon
      id
      intro
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
      supervision_status
      supervision_status_en
      supervision_time_en
      abbreviation
      national_id
      slug

      national {
        name
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

      licenses_aggregate {
        aggregate {
          count
        }
      }
    }

    exchanges_aggregate(
      where: {
        name: { _ilike: $nameContain, _eq: $nameEqual }
        website: { _cast: { String: { _ilike: $websiteContain } } }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`

export default GET_EXCHANGES
