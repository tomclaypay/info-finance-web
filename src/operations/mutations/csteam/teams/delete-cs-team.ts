import { gql } from '@apollo/client'

const DELETE_CS_TEAM = gql`
  mutation deleteCsTeam($teamId: uuid, $csMembers: [uuid!]) {
    update_complaints(where: { handler_by_member_id: { _in: $csMembers } }, _set: { handler_by_member_id: null }) {
      affected_rows
    }
    delete_cs_team(where: { id: { _eq: $teamId } }) {
      affected_rows
    }
  }
`

export default DELETE_CS_TEAM
