import { gql } from '@apollo/client'

const GET_SEEDERS = gql`
  query getSeeders($limit: Int, $offset: Int) {
    seeders(limit: $limit, offset: $offset) {
      email
      fullname
      id
    }
  }
`

export default GET_SEEDERS
