import { gql } from '@apollo/client'

const UPDATE_CS_MEMBER = gql`
  mutation updateCsMember($id: uuid!, $email: String, $phone: String, $displayName: String, $role: String) {
    update_users_by_pk(
      pk_columns: { id: $id }
      _set: { email: $email, phone: $phone, displayName: $displayName, role: $role }
    ) {
      id
    }
  }
`

export default UPDATE_CS_MEMBER
