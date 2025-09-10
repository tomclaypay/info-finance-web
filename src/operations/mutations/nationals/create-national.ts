import { gql } from '@apollo/client'

const CREATE_NATIONAL = gql`
  mutation createNational($name: String, $name_vn: String, $logo: String) {
    insert_national_one(object: { name: $name, name_vn: $name_vn, logo: $logo }) {
      id
    }
  }
`

export default CREATE_NATIONAL
