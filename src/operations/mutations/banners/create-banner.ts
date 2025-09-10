import { gql } from '@apollo/client'

const CREATE_BANNER = gql`
  mutation createBanner($language: String, $link: jsonb, $position: String, $url: jsonb) {
    insert_banner_one(object: { language: $language, link: $link, position: $position, url: $url }) {
      id
    }
  }
`

export default CREATE_BANNER
