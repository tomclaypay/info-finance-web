import React, { createContext, ReactNode, useMemo, useState } from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { defaultLinks } from '@app/apolloConfig'
import { create } from 'domain'

export const client = new ApolloClient({
  link: defaultLinks,
  cache: new InMemoryCache(),
  devtools: { enabled: process.env.NODE_ENV === 'development' && typeof window !== 'undefined' },
  ssrMode: typeof window === 'undefined',
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
})

function createApolloClient() {
  return new ApolloClient({
    link: defaultLinks,
    cache: new InMemoryCache(),
    ssrMode: typeof window === 'undefined',
    // Trì hoãn 100ms để tránh refetch lúc hydrate (Next 15  React 18)
    ssrForceFetchDelay: typeof window !== 'undefined' ? 100 : undefined,
    connectToDevTools: process.env.NODE_ENV === 'development' && typeof window !== 'undefined',
    queryDeduplication: true,
  })
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const ApolloClientContext = createContext<
  [
    ApolloClient<NormalizedCacheObject> | null,
    React.Dispatch<React.SetStateAction<ApolloClient<NormalizedCacheObject> | null>>
  ]
>([null, () => {}])

interface ApolloClientProviderProps {
  children: ReactNode
}

export const ApolloClientContextProvider = ({ children }: ApolloClientProviderProps) => {
  const [apolloClient, setApolloClient] = useState<ApolloClient<any> | null>(client)
  // Chỉ tạo 1 client trên browser; server sẽ được tạo mới mỗi request
  const client = useMemo(() => apolloClient ?? createApolloClient(), [apolloClient])
  return (
    <ApolloClientContext.Provider value={[apolloClient, setApolloClient]}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </ApolloClientContext.Provider>
  )
}
