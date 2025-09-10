import { gql } from '@apollo/client'

const UPDATE_CS_TEAM = gql`
  mutation updateCsTeam($teamId: String!, $description: String, $name: String!, $dataCsMembers: [listUserId]) {
    custom_update_team(
      input: {
        cs_team_id: $teamId
        update_info_team: { description: $description, name: $name }
        list_user_id: $dataCsMembers
      }
    ) {
      cs_team_id
    }
  }
`

export default UPDATE_CS_TEAM
