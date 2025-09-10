import { gql } from '@apollo/client'

const GET_GENERAL_EXCHANGE = gql`
  query getGeneralExchange {
    general_broker {
      id
      title
      title_en
      description
      description_en
    }
  }
`

export default GET_GENERAL_EXCHANGE
