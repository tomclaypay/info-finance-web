import { gql } from '@apollo/client'

const GET_CS_TEAMS = gql`
  query getCsTeams(
    $nameContain: String
    $nameEqual: String
    $descriptionContain: String
    $descriptionEqual: String
    $offset: Int
    $limit: Int
    $order_by: [cs_team_order_by!]
  ) {
    cs_team(
      where: {
        name: { _ilike: $nameContain, _eq: $nameEqual }
        description: { _eq: $descriptionEqual, _ilike: $descriptionContain }
      }
      offset: $offset
      limit: $limit
      order_by: $order_by
    ) {
      id
      name
      description
      updated_at
      created_at
      cs_members {
        user {
          displayName
          email
          role
        }
        id
      }
      cs_members_aggregate {
        aggregate {
          count
        }
      }
    }
    cs_team_aggregate(
      where: {
        name: { _ilike: $nameContain, _eq: $nameEqual }
        description: { _eq: $descriptionEqual, _ilike: $descriptionContain }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`

export default GET_CS_TEAMS
