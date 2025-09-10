import { ApolloLink, createHttpLink, from, Operation } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { RestLink } from 'apollo-link-rest'

export const restLink = new RestLink({ uri: process.env.NEXT_PUBLIC_STRAPI_URL })
const hasuraHttpLink = createHttpLink({
  fetch,
  uri: process.env.NEXT_PUBLIC_HASURA_URL,
})

export const strapiHttpLink = createHttpLink({
  fetch,
  uri: process.env.NEXT_PUBLIC_STRAPI_URL,
})

const httpLink = ApolloLink.split(
  (operation: Operation) => operation.getContext().clientName === 'strapi',
  strapiHttpLink, //if above
  hasuraHttpLink
)

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  if (graphQLErrors) graphQLErrors.forEach(async () => {})
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

export const defaultLinks = from([restLink, errorLink, httpLink])
