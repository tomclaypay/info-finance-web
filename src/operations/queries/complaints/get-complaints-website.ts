import { gql } from '@apollo/client'

const GET_COMPLAINTS_WEBSITE = gql`
  query getComplaintsWebsite(
    $limit: Int
    $offset: Int
    $createdAt: order_by = desc
    $statuses: [complaints_bool_exp!]
    $exchanges: [exchanges_bool_exp!]
  ) {
    complaints(
      where: { hidden: { _eq: false }, exchange: { _or: $exchanges }, _or: $statuses }
      limit: $limit
      offset: $offset
      order_by: { createdAt: $createdAt }
    ) {
      id
      slug
      user {
        email
        displayName
        avatar
      }
      fullname
      title
      description
      highlight_on_broker
      createdAt
      category {
        name
      }
      exchange {
        id
        logo
        name
        website
        abbreviation
      }
      images
      status
    }
    complaints_aggregate(where: { hidden: { _eq: false }, exchange: { _or: $exchanges }, _or: $statuses }) {
      aggregate {
        count
      }
    }
  }
`

export default GET_COMPLAINTS_WEBSITE
