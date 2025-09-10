import { gql } from '@apollo/client'

const VERIFY_EMAIL = gql`
  mutation verifyEmail($code: String!, $email: String!) {
    verifyEmail(code: $code, email: $email) {
      data
      code
      message
    }
  }
`

export default VERIFY_EMAIL
