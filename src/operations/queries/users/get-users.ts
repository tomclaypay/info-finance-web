import { gql } from '@apollo/client'

const GET_USERS = gql`
  query getUsers($limit: Int, $offset: Int, $where: users_bool_exp) {
    users(where: $where, limit: $limit, offset: $offset) {
      birthday
      city
      address
      avatar
      bio
      cover
      displayName
      email
      fullname
      gender
      id
      joinedAt
      phone
      role
    }
    users_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`

export default GET_USERS
