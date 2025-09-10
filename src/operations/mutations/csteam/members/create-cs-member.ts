import { gql } from '@apollo/client'

const CREATE_CS_MEMBER = gql`
  mutation createCsMember($user_id: uuid) {
    insert_cs_member_one(object: { user_id: $user_id }) {
      id
    }
  }
`

export default CREATE_CS_MEMBER
