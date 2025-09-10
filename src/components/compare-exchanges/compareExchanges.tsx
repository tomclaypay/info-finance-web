import { useQuery } from '@apollo/client'
import ExchangeItem from '@app/components/compare-exchanges/ExchangeItem'
import { Exchange, ExchangeListResponse } from '@app/interfaces/exchange'
import GET_EXCHANGES from '@app/operations/queries/exchanges/get-exchanges'
import { useDebouncedState } from '@mantine/hooks'
import { Container } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useState } from 'react'

interface DataFilterProps {
  nameContain?: string
}
const CompareExchanges = () => {
  const [exchangeA, setExchangeA] = useState<Exchange | null>(null)
  const [isLoadingA, setIsLoadingA] = useState<boolean>(false)
  const [isLoadingB, setIsLoadingB] = useState<boolean>(false)
  const [exchangeB, setExchangeB] = useState<Exchange | null>(null)
  const [fieldFilterA, setFieldFilterA] = useDebouncedState<DataFilterProps>({}, 500)
  const [fieldFilterB, setFieldFilterB] = useDebouncedState<DataFilterProps>({}, 500)
  const { data: exchangeDataA, refetch: refetchExchanges } = useQuery<ExchangeListResponse>(GET_EXCHANGES, {
    variables: {
      limit: 10,
      ...fieldFilterA,
      createdAt: 'desc_nulls_last',
      order_by: {
        total_point: 'desc_nulls_last',
      },
    },
  })

  const { data: exchangeDataB } = useQuery<ExchangeListResponse>(GET_EXCHANGES, {
    variables: {
      limit: 10,
      ...fieldFilterB,
      createdAt: 'desc_nulls_last',
      order_by: {
        total_point: 'desc_nulls_last',
      },
    },
  })

  return (
    <Container maxWidth="lg" sx={{ mb: '16px' }}>
      <Stack
        spacing={2}
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Stack
          sx={{
            display: 'flex',
            flex: 3,
            flexDirection: 'row',
            cursor: 'pointer',
            padding: '20px 0px',
            justifyContent: 'center',
          }}
        >
          <ExchangeItem
            exchangeData={exchangeDataA?.exchanges ?? []}
            selected={exchangeA}
            handleSelectExchange={setExchangeA}
            exclude={exchangeB?.id ?? null}
            isLoading={isLoadingA}
            setLoading={setIsLoadingA}
            handleSearchExchange={(value) => setFieldFilterA(value ? { nameContain: value } : {})}
          />
          <ExchangeItem
            exchangeData={exchangeDataB?.exchanges ?? []}
            selected={exchangeB}
            exclude={exchangeA?.id ?? null}
            handleSelectExchange={setExchangeB}
            isLoading={isLoadingB}
            setLoading={setIsLoadingB}
            handleSearchExchange={(value) => setFieldFilterB(value ? { nameContain: value } : {})}
          />
        </Stack>
        <Stack sx={{ flex: 1, padding: '0 20px' }}>Các cặp so sách phổ biến</Stack>
      </Stack>
    </Container>
  )
}
export default CompareExchanges
