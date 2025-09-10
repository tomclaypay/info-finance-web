import { gql } from '@apollo/client'

const UPDATE_COMPLAINT = gql`
  mutation updateComplaint(
    $complaintId: uuid!
    $status: String
    $description: String
    $closeReason: String
    $title: String
    $slug: String
    $fullname: String
    $email: String
    $phone: String
    $exchangeId: uuid
    $hidden: Boolean
    $highlight_on_broker: Boolean
    $website: String
    $complaintCategoryId: uuid
    $images: jsonb
    $handler_by_member_id: uuid
  ) {
    updateComplaint(
      complaintId: $complaintId
      status: $status
      description: $description
      closeReason: $closeReason
      slug: $slug
      title: $title
      fullname: $fullname
      email: $email
      hidden: $hidden
      highlight_on_broker: $highlight_on_broker
      phone: $phone
      exchangeId: $exchangeId
      website: $website
      complaintCategoryId: $complaintCategoryId
      images: $images
      handler_by_member_id: $handler_by_member_id
    ) {
      message
      data
      code
    }
  }
`

export default UPDATE_COMPLAINT
