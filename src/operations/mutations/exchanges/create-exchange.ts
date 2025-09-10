import { gql } from '@apollo/client'

const CREATE_EXCHANGE = gql`
  mutation createExchange(
    $abbreviation: String
    $country: String
    $email: String
    $intro: String
    $intro_en: String
    $name: String
    $phone: String
    $license_point: numeric
    $manage_point: numeric
    $operation_point: numeric
    $risk_point: numeric
    $soft_point: numeric
    $total_point: numeric
    $trading_platform: jsonb
    $trading_platform_en: jsonb
    $trading_product: jsonb
    $trading_product_en: jsonb
    $supervision_time: String
    $supervision_time_en: String
    $supervision_status: String
    $supervision_status_en: String
    $slug: String
    $website: jsonb
    $logo: String
    $icon: String
    $rate_trader_all_choose: Int
    $rate_top_broker: Int
    $is_top_broker: Boolean
    $is_trader_all_choose: Boolean
    $hidden: Boolean
    $national_id: uuid
  ) {
    insert_exchanges_one(
      object: {
        abbreviation: $abbreviation
        country: $country
        logo: $logo
        icon: $icon
        email: $email
        intro: $intro
        intro_en: $intro_en
        name: $name
        hidden: $hidden
        phone: $phone
        license_point: $license_point
        supervision_time: $supervision_time
        supervision_time_en: $supervision_time
        supervision_status: $supervision_status
        supervision_status_en: $supervision_status
        slug: $slug
        manage_point: $manage_point
        risk_point: $risk_point
        soft_point: $soft_point
        operation_point: $operation_point
        total_point: $total_point
        trading_platform: $trading_platform
        trading_platform_en: $trading_platform
        trading_product: $trading_product
        trading_product_en: $trading_product
        website: $website
        rate_top_broker: $rate_top_broker
        rate_trader_all_choose: $rate_trader_all_choose
        is_top_broker: $is_top_broker
        is_trader_all_choose: $is_trader_all_choose
        national_id: $national_id
      }
    ) {
      name
    }
  }
`

export default CREATE_EXCHANGE
