import { gql } from '@apollo/client'

const CREATE_COMPLAINT = gql`
  mutation createComplaint(
    $fullname: String
    $title: String
    $email: String!
    $phone: String!
    $exchangeId: uuid!
    $website: String
    $complaintCategoryId: uuid!
    $description: String
    $images: jsonb
  ) {
    createComplaint(
      fullname: $fullname
      title: $title
      email: $email
      phone: $phone
      exchangeId: $exchangeId
      website: $website
      complaintCategoryId: $complaintCategoryId
      description: $description
      images: $images
    ) {
      message
      data
      code
    }
  }
`

export default CREATE_COMPLAINT
