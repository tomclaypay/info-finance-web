import { gql } from '@apollo/client'

const REGISTER_ACCOUNT = gql`
  mutation registerAccount(
    $displayName: String!
    $email: String!
    $password: String!
  ) {
    register(email: $email, password: $password, displayName: $displayName) {
      code
      data
      message
    }
  }
`

export default REGISTER_ACCOUNT
