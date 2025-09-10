import { gql } from '@apollo/client'

const GET_SEARCH = gql`
  query getSearch($key: String, $type: String!, $limit: Int, $offset: Int) {
    search(key: $key, type: $type, limit: $limit, offset: $offset) {
      result
      count
    }
  }
`

export default GET_SEARCH
