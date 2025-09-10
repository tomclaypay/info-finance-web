import { gql } from '@apollo/client'

const GET_EXCHANGE = gql`
  query getExchange($exchangeId: uuid!) {
    exchanges_by_pk(id: $exchangeId) {
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
      total_feedback_point
      trading_platform
      trading_platform_en
      trading_product
      trading_product_en
      updatedAt
      website
      email
      supervision_status
      supervision_status_en
      supervision_time
      supervision_time_en
      description
      hidden
      createdAt
      country
      abbreviation
      is_top_broker
      rate_top_broker
      is_trader_all_choose
      rate_trader_all_choose
      rate
      national_id
      slug

      national {
        name
        logo
        name_vn
      }

      complaints(limit: 10) {
        fullname
        title
        description
        status
        createdAt
        category {
          name
        }
        cancelRequests {
          id
          reason
          status
        }
      }
      complaints_aggregate {
        aggregate {
          count
        }
      }

      feedbacks(limit: 10) {
        comment
        hidden
        point
        created_at
        user {
          avatar
          displayName
          email
          id
        }
      }

      feedbacks_aggregate {
        aggregate {
          count
        }
      }

      licenses {
        authority_address
        authority_email
        authority_phone
        authority_website
        created_at
        updated_at
        supervision_license
        status
        regulatory_license_agency
        license_type_vn
        license_type_en
        id
        expiration_date
        effective_date

        documentary_evidences {
          created_at
          file
          id
          title
          updated_at
        }

        exchange_id
        exchange {
          id
          name
          logo
        }

        supervisory_authority_id
        supervisory_authority {
          abbreviation_name
          name
          logo
          id
          intro_vn
          national {
            logo
            name
            id
          }
        }
      }

      licenses_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`

export default GET_EXCHANGE
