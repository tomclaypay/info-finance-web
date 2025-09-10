import { gql } from '@apollo/client'

const CREATE_SUPERVISOR = gql`
  mutation createSupervisor(
    $intro_en: String
    $intro_vn: String
    $logo: String
    $icon: String
    $abbreviation_name: String
    $name: String
    $national_id: uuid
  ) {
    insert_supervisory_authority_one(
      object: {
        intro_en: $intro_en
        intro_vn: $intro_vn
        logo: $logo
        name: $name
        national_id: $national_id
        icon: $icon
        abbreviation_name: $abbreviation_name
      }
    ) {
      id
    }
  }
`

export default CREATE_SUPERVISOR
