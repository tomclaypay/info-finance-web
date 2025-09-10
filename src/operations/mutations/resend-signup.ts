import { gql } from '@apollo/client'

const RESEND_SIGNUP = gql`
  mutation resendConfirm($email: String!) {
    resendConfirm(email: $email) {
      code
      data
      message
    }
  }
`

export default RESEND_SIGNUP
