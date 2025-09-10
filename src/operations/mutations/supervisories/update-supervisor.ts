import { gql } from '@apollo/client'

const UPDATE_SUPERVISOR = gql`
  mutation MyMutation(
    $supervisorId: uuid!
    $intro_en: String
    $intro_vn: String
    $logo: String
    $name: String
    $national_id: uuid
    $icon: String
    $abbreviation_name: String
  ) {
    update_supervisory_authority_by_pk(
      pk_columns: { id: $supervisorId }
      _set: {
        intro_en: $intro_en
        icon: $icon
        abbreviation_name: $abbreviation_name
        intro_vn: $intro_vn
        logo: $logo
        name: $name
        national_id: $national_id
      }
    ) {
      id
    }
  }
`

export default UPDATE_SUPERVISOR
