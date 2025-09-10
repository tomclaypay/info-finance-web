import { gql } from '@apollo/client'

const GET_CS_TEAM_BY_PK = gql`
  query getCsTeamByPk($teamId: uuid!) {
    cs_team_by_pk(id: $teamId) {
      name
      description
      id
      cs_members {
        user {
          birthday
          city
          address
          avatar
          bio
          cover
          displayName
          email
          id
          fullname
          gender
          joinedAt
          phone
          role
        }
        id
      }
    }
  }
`

export default GET_CS_TEAM_BY_PK
