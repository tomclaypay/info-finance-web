import { gql } from '@apollo/client'

const GET_SUPERVISOR = gql`
  query getSupervisor($supervisorId: uuid!) {
    supervisory_authority_by_pk(id: $supervisorId) {
      abbreviation_name
      created_at
      icon
      id
      intro_en
      intro_vn
      logo
      name
      national_id
      updated_at

      national {
        id
        logo
        name
      }
    }
  }
`

export default GET_SUPERVISOR
