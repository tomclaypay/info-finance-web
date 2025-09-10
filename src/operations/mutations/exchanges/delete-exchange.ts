import { gql } from '@apollo/client'

const DELETE_EXCHANGE = gql`
  mutation MyMutation($exchangeId: uuid!) {
    delete_exchanges_by_pk(id: $exchangeId) {
      id
    }
  }
`

export const DELETE_SOFT_EXCHANGE = gql`
  mutation updateExchange($exchangeId: uuid!, $_set: exchanges_set_input) {
    update_exchanges_by_pk(pk_columns: { id: $exchangeId }, _set: $_set) {
      id
    }
  }
`

export default DELETE_EXCHANGE
