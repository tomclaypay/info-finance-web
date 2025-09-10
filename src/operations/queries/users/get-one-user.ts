import { gql } from '@apollo/client'

const GET_ONE_USER = gql`
  query getOneUser($id: uuid!) {
    users(where: { id: { _eq: $id } }) {
      address
      avatar
      bio
      birthday
      city
      cover
      displayName
      email
      gender
      id
      joinedAt
      role
      phone
      id
    }
  }
`

export default GET_ONE_USER
