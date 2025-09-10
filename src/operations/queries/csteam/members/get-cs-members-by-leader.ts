import { gql } from '@apollo/client'

const GET_CS_MEMBERS_BY_LEADER = gql`
  query getCsMembersByLeader($userId: uuid, $limit: Int, $offset: Int) {
    cs_member(where: { cs_team: { cs_members: { user_id: { _eq: $userId } } } }, limit: $limit, offset: $offset) {
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
    cs_member_aggregate(where: { cs_team: { cs_members: { user_id: { _eq: $userId } } } }) {
      aggregate {
        count
      }
    }
  }
`

export default GET_CS_MEMBERS_BY_LEADER
