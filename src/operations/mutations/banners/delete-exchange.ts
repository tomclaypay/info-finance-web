import { gql } from '@apollo/client'

const DELETE_EXCHANGE = gql`
  mutation MyMutation($exchangeId: uuid!) {
    delete_exchanges_by_pk(id: $exchangeId) {
      id
    }
  }
`

export default DELETE_EXCHANGE
