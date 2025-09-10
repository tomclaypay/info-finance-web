import { gql } from '@apollo/client'
const SAVE_LANGUAGE = gql`
  mutation UpdateLanguage($language: String!) {
    updateLanguage(language: $language) {
      message
      data
      code
    }
  }
`

export default SAVE_LANGUAGE
