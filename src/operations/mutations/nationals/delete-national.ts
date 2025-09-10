import { gql } from '@apollo/client'

const DELETE_NATIONAL = gql`
  mutation deleteNational($nationalId: uuid!) {
    delete_national_by_pk(id: $nationalId) {
      id
    }
  }
`

export default DELETE_NATIONAL
