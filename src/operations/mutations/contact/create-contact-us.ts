import { gql } from '@apollo/client'

const CREATE_CONTACT_US = gql`
  mutation createContactUs($message: String!, $fullname: String!, $email: String!) {
    custom_create_contact_us(input: { email: $email, fullname: $fullname, message: $message }) {
      fullname
      message
      email
    }
  }
`

export default CREATE_CONTACT_US
