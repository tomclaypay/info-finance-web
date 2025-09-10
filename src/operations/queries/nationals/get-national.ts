import { gql } from '@apollo/client'

const GET_NATIONAL = gql`
  query getNational($nationalId: uuid!) {
    national_by_pk(id: $nationalId) {
      id
      logo
      name
      name_vn
      created_at
      updated_at
    }
  }
`

export default GET_NATIONAL
