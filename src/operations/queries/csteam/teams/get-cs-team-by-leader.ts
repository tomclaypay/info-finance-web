import { gql } from '@apollo/client'

const GET_CS_TEAM_BY_LEADER = gql`
  query getCsTeamByLeader($userId: uuid) {
    cs_team(where: { cs_members: { user_id: { _eq: $userId } } }) {
      id
      name
      description
      updated_at
      created_at
      cs_members {
        id
        user {
          displayName
          email
          role
        }
      }
      cs_members_aggregate {
        aggregate {
          count
        }
      }
    }
    cs_team_aggregate(where: { cs_members: { user_id: { _eq: $userId } } }) {
      aggregate {
        count
      }
    }
  }
`

export default GET_CS_TEAM_BY_LEADER
