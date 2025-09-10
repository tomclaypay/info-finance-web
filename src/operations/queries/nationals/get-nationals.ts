import { gql } from '@apollo/client'

const GET_NATIONALS = gql`
  query getNationals(
    $nameContain: String
    $nameVnContain: String
    $offset: Int
    $limit: Int
    $order_by: [national_order_by!]
  ) {
    nationals: national(
      where: { name: { _ilike: $nameContain }, name_vn: { _ilike: $nameVnContain } }
      offset: $offset
      limit: $limit
      order_by: $order_by
    ) {
      id
      logo
      name
      name_vn
      created_at
      updated_at
    }

    nationals_aggregate: national_aggregate(
      where: { name: { _ilike: $nameContain }, name_vn: { _ilike: $nameVnContain } }
    ) {
      aggregate {
        count
      }
    }
  }
`

export default GET_NATIONALS
