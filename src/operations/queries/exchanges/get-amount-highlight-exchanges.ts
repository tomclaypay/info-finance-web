import { gql } from '@apollo/client'

const GET_AMOUNT_HIGHLIGHT_EXCHANGES = gql`
  query getExchanges {
    amount_top_broker: exchanges_aggregate(where: { is_top_broker: { _eq: true } }) {
      aggregate {
        count
      }
    }

    amount_traders_all_choose: exchanges_aggregate(where: { is_trader_all_choose: { _eq: true } }) {
      aggregate {
        count
      }
    }
  }
`

export default GET_AMOUNT_HIGHLIGHT_EXCHANGES
