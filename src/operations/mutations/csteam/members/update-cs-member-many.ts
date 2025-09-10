import { gql } from '@apollo/client'

const UPDATE_CS_MEMBER_MANY = gql`
  mutation updateCsMemberMany($updates: [cs_member_updates!]!) {
    update_cs_member_many(updates: $updates) {
      affected_rows
    }
  }
`

export default UPDATE_CS_MEMBER_MANY
