import { gql } from '@apollo/client'

const CREATE_FEEDBACK = gql`
  mutation CreateFeedback($name: String!, $email: String!, $phone: String, $comments: String) {
    createFeedback(data: { Name: $name, Email: $email, Phone: $phone, Comments: $comments }) {
      data {
        id
      }
    }
  }
`

export default CREATE_FEEDBACK
