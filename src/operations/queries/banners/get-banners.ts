import { gql } from '@apollo/client'

const GET_BANNERS = gql`
  query getBanners(
    $offset: Int
    $positionContain: String
    $positionEqual: String
    $languageEqual: String
    $languageContain: String
    $limit: Int
    $order_by: [banner_order_by!]
  ) {
    banners: banner(
      where: {
        position: { _ilike: $positionContain, _eq: $positionEqual }
        language: { _eq: $languageEqual, _ilike: $languageContain }
      }
      offset: $offset
      limit: $limit
      order_by: $order_by
    ) {
      position
      updated_at
      link
      language
      id
      created_at
      url
    }

    banner_aggregate {
      aggregate {
        count
      }
    }
  }
`

export default GET_BANNERS
