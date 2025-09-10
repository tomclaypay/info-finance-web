import { gql } from '@apollo/client'

const ADMIN_CREATE_COMPLAINT = gql`
  mutation adminCreateComplaint(
    $userId: uuid!
    $fullname: String
    $slug: String
    $email: String!
    $phone: String!
    $exchangeId: uuid!
    $website: String
    $complaintCategoryId: uuid!
    $description: String
    $title: String
    $images: jsonb
    $handler_by_member_id: uuid
    $hidden: Boolean
    $highlight_on_broker: Boolean
  ) {
    adminCreateComplaint(
      userId: $userId
      fullname: $fullname
      email: $email
      slug: $slug
      phone: $phone
      exchangeId: $exchangeId
      website: $website
      hidden: $hidden
      highlight_on_broker: $highlight_on_broker
      complaintCategoryId: $complaintCategoryId
      description: $description
      title: $title
      images: $images
      handler_by_member_id: $handler_by_member_id
    ) {
      message
      data
      code
    }
  }
`

export default ADMIN_CREATE_COMPLAINT
