import { gql } from '@apollo/client'

const RESET_PASSWORD = gql`
  mutation resetPassword(
    $email: String!
    $code: String!
    $newPassword: String!
  ) {
    resetPassword(code: $code, email: $email, newPassword: $newPassword) {
      code
      data
      message
    }
  }
`

export default RESET_PASSWORD
