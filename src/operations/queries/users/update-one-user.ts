import { gql } from '@apollo/client'

const UPDATE_ONE_USER = gql`
  mutation updateOneUser($id: uuid!, $changes: users_set_input!) {
    update_users_by_pk(pk_columns: { id: $id }, _set: $changes) {
      id
      displayName
      phone
      birthday
      gender
      address
      avatar
    }
  }
`

export default UPDATE_ONE_USER
