import { gql } from '@apollo/client'

const UPDATE_BANNER = gql`
  mutation updateBanner($bannerId: uuid!, $language: String, $link: jsonb, $position: String, $url: jsonb) {
    update_banner_by_pk(
      pk_columns: { id: $bannerId }
      _set: { language: $language, link: $link, position: $position, url: $url }
    ) {
      id
    }
  }
`

export default UPDATE_BANNER
