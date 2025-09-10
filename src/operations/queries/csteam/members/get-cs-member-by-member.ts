import { gql } from '@apollo/client'

const GET_CS_MEMBER_BY_MEMBER = gql`
  query getCsMemberByMember($userId: uuid, $limit: Int, $offset: Int) {
    cs_member(where: { user_id: { _eq: $userId } }, limit: $limit, offset: $offset) {
      user {
        birthday
        city
        address
        avatar
        bio
        cover
        displayName
        id
        email
        fullname
        gender
        joinedAt
        phone
        role
      }
      cs_team {
        id
        name
      }
      id
    }
    cs_member_aggregate(where: { user_id: { _eq: $userId } }) {
      aggregate {
        count
      }
    }
  }
`

export default GET_CS_MEMBER_BY_MEMBER
