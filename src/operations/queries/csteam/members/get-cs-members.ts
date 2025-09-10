import { gql } from '@apollo/client'

const GET_CS_MEMBERS = gql`
  query getCsMembers($where: cs_member_bool_exp, $limit: Int, $offset: Int, $order_by: [cs_member_order_by!]) {
    cs_member(where: $where, limit: $limit, offset: $offset, order_by: $order_by) {
      id
      created_at
      updated_at
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
      complaints {
        fullname
        title
        description
        createdAt
        category {
          name
        }
        cancelRequests {
          id
          reason
          status
        }
      }
      cs_team {
        id
        name
      }
      complaints_aggregate {
        aggregate {
          count
        }
      }
    }
    cs_member_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`

export default GET_CS_MEMBERS
