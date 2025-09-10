import React, { createContext, ReactNode, useState } from 'react'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { defaultLinks } from '@app/apolloConfig'

export const client = new ApolloClient({
  link: defaultLinks,
  cache: new InMemoryCache(),
  devtools: { enabled: process.env.NODE_ENV === 'development' && typeof window !== 'undefined' },
  ssrMode: typeof window === 'undefined',
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
})

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const ApolloClientContext = createContext<
  [ApolloClient<any> | null, React.Dispatch<React.SetStateAction<ApolloClient<any> | null>>]
>([null, () => {}])

interface ApolloClientProviderProps {
  children: ReactNode
}

export const ApolloClientContextProvider = ({ children }: ApolloClientProviderProps) => {
  const [apolloClient, setApolloClient] = useState<ApolloClient<any> | null>(client)

  return <ApolloClientContext.Provider value={[apolloClient, setApolloClient]}>{children}</ApolloClientContext.Provider>
}
