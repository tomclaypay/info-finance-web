import { gql } from '@apollo/client'

const ADMIN_CREATE_USER = gql`
  mutation adminCreateUser($email: String!, $password: String!, $phone: String, $displayName: String, $role: String) {
    adminCreateUser(email: $email, password: $password, phone: $phone, displayName: $displayName, role: $role) {
      message
      data
      code
    }
  }
`

export default ADMIN_CREATE_USER
