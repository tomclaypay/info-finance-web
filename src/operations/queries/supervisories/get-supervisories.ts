import { gql } from '@apollo/client'

const GET_SUPERVISORIES = gql`
  query getSupervisories(
    $nameContain: String
    $shortName: String
    $offset: Int
    $limit: Int
    $order_by: [supervisory_authority_order_by!]
  ) {
    supervisories: supervisory_authority(
      where: { name: { _ilike: $nameContain }, abbreviation_name: { _ilike: $shortName } }
      offset: $offset
      limit: $limit
      order_by: $order_by
    ) {
      id
      updated_at
      created_at
      name
      national_id
      intro_vn
      intro_en
      logo
      abbreviation_name
      icon

      national {
        id
        logo
        name
      }
    }

    supervisories_aggregate: supervisory_authority_aggregate(
      where: { name: { _ilike: $nameContain }, abbreviation_name: { _ilike: $shortName } }
    ) {
      aggregate {
        count
      }
    }
  }
`

export default GET_SUPERVISORIES
