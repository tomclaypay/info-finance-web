import { gql } from '@apollo/client'

const GET_CS_MEMBER_BY_PK = gql`
  query getCsMemberByPk($memberId: uuid!) {
    cs_member_by_pk(id: $memberId) {
      id
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
      complaints(limit: 10) {
        title
        description
        status
        cancelRequests {
          id
          reason
          status
        }
      }
      complaints_aggregate {
        aggregate {
          count
        }
      }
      cs_team {
        name
        id
        csLeader: cs_members(where: { user: { role: { _eq: "leader" } } }) {
          user {
            displayName
            id
          }
          id
        }
        csMembers: cs_members(where: { user: { role: { _eq: "member" } } }) {
          user {
            displayName
            id
          }
          id
        }
      }
    }
  }
`

export default GET_CS_MEMBER_BY_PK
