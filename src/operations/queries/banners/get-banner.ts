import { gql } from '@apollo/client'

const GET_BANNER = gql`
  query getBanner($bannerId: uuid!) {
    banner_by_pk(id: $bannerId) {
      position
      updated_at
      link
      language
      id
      created_at
      url
    }
  }
`

export default GET_BANNER
