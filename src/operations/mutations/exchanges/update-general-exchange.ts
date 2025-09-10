import { gql } from '@apollo/client'

const UPDATE_GENERAL_EXCHANGE = gql`
  mutation updateGeneralExchange(
    $id: uuid!
    $title: String
    $description: String
    $title_en: String
    $description_en: String
  ) {
    update_general_broker_by_pk(
      pk_columns: { id: $id }
      _set: { title: $title, description: $description, title_en: $title_en, description_en: $description_en }
    ) {
      description
    }
  }
`

export default UPDATE_GENERAL_EXCHANGE
