import { gql } from '@apollo/client'

const CREATE_CS_TEAM = gql`
  mutation createCsTeam($name: String!, $description: String, $dataCsMembers: [ListUsersId]) {
    custom_create_cs_team(input: { name: $name, description: $description, list_users_id: $dataCsMembers }) {
      team {
        id
      }
    }
  }
`

export default CREATE_CS_TEAM
