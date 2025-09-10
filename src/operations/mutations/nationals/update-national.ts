import { gql } from '@apollo/client'

const UPDATE_NATIONAL = gql`
  mutation updateNational($nationalId: uuid!, $name: String, $name_vn: String, $logo: String) {
    update_national_by_pk(pk_columns: { id: $nationalId }, _set: { name: $name, name_vn: $name_vn, logo: $logo }) {
      id
    }
  }
`

export default UPDATE_NATIONAL
