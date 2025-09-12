import { ApolloLink, createHttpLink, from, Operation } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { RestLink } from 'apollo-link-rest'
import { BatchHttpLink } from '@apollo/client/link/batch-http'
import { RetryLink } from '@apollo/client/link/retry'

export const restLink = new RestLink({ uri: process.env.NEXT_PUBLIC_STRAPI_URL })
const hasuraHttpLink = new BatchHttpLink({
  fetch,
  uri: process.env.NEXT_PUBLIC_HASURA_URL,
  batchInterval: 20,
  batchMax: 20,
  credentials: 'include',
})

export const strapiHttpLink = new BatchHttpLink({
  fetch,
  uri: process.env.NEXT_PUBLIC_STRAPI_URL,
  batchInterval: 20,
  batchMax: 20,
  credentials: 'include',
})

const httpLink = ApolloLink.split(
  (operation: Operation) => operation.getContext().clientName === 'strapi',
  strapiHttpLink, //if above
  hasuraHttpLink
)

const retryLink = new RetryLink({ attempts: { max: 2 }, delay: { initial: 150, jitter: true } })

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  if (graphQLErrors) graphQLErrors.forEach(async () => {})
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

export const defaultLinks = from([restLink, retryLink, errorLink, httpLink])
