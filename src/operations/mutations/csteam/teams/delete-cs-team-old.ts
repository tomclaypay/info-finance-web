import { gql } from '@apollo/client'

const DELETE_CS_TEAM_OLD = gql`
  mutation deleteCsTeam($teamId: uuid!) {
    delete_cs_team_by_pk(id: $teamId) {
      name
    }
  }
`

export default DELETE_CS_TEAM_OLD
