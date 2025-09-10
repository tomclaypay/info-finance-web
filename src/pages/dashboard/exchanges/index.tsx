import { useMutation, useQuery } from '@apollo/client'
import { AuthGuard } from '@app/components/authentication/auth-guard'
import { DashboardLayout } from '@app/components/dashboard/dashboard-layout'
import ExchangeFilter from '@app/components/dashboard/exchanges/exchange-table/exchanges-filter'
import ExchangesHeader from '@app/components/dashboard/exchanges/exchange-table/exchanges-header'
import ExchangesListTableDataGrid from '@app/components/dashboard/exchanges/exchange-table/exchanges-list-table-data-grid'
import { Exchange, ExchangeListResponse } from '@app/interfaces/exchange'
import { gtm } from '@app/lib/gtm'
// import DELETE_EXCHANGE from '@app/operations/mutations/banners/delete-exchange'
import { DELETE_SOFT_EXCHANGE } from '@app/operations/mutations/exchanges/delete-exchange'
import UPDATE_EXCHANGE from '@app/operations/mutations/exchanges/update-exchange'
import GET_EXCHANGES from '@app/operations/queries/exchanges/get-exchanges'
import { useDebouncedState } from '@mantine/hooks'
import { Box, Card, Container, debounce } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
interface DataFilterProps {
  nameContain?: string
  nameEqual?: string
  websiteContain?: string
}

const defaultSortParams = {
  name: undefined,
  website: undefined,
  updatedAt: undefined,
  createdAt: 'desc_nulls_last',
}

const defaultFilterParams = {
  nameContain: undefined,
  nameEqual: undefined,
  descriptionContain: undefined,
  descriptionEqual: undefined,
}

const ListExchanges = () => {
  const router = useRouter()
  const { initialPage, initialLimit } = router.query
  const [fieldFilter, setFieldFilter] = useDebouncedState<DataFilterProps>({}, 500)
  const [filters, setFilters] = useState({
    page: initialPage ? parseInt(initialPage as string) : 0,
    limit: initialLimit ? parseInt(initialLimit as string) : 10,
    offset: initialLimit && initialPage ? parseInt(initialLimit as string) * parseInt(initialPage as string) : 0,
    sort: defaultSortParams,
  })

  const { data: exchangeData, refetch: refetchExchanges } = useQuery<ExchangeListResponse>(GET_EXCHANGES, {
    variables: {
      limit: filters.limit,
      offset: filters.offset,
      order_by: filters.sort,
      ...fieldFilter,
    },
  })

  const [updateExchange] = useMutation(UPDATE_EXCHANGE)
  const [deleteExchange] = useMutation(DELETE_SOFT_EXCHANGE)
  // const [deleteExchange] = useMutation(DELETE_EXCHANGE)

  const handleCreateExchange = () => {
    router.push('/dashboard/exchanges/create')
  }

  const handlePaginationModelChange = (model: any, details: any) => {
    if (details.reason === 'setPaginationModel') {
      setFilters({
        ...filters,
        page: model.page,
        offset: model.page * filters.limit,
        limit: model.pageSize,
      })
    }
  }

  // const handleRowsPerPageChange = (event: any) => {
  //   setFilters({
  //     ...filters,
  //     limit: event,
  //   })
  // }

  const handleSortFromServer = (column: any) => {
    if (column?.length > 0) {
      const resultSort = column.reduce((total: any, item: { field: any; sort: string }) => {
        return {
          ...defaultSortParams,
          [item.field]: item.sort === 'asc' ? 'asc_nulls_first' : 'desc_nulls_last',
        }
      }, {})
      setFilters({ ...filters, sort: resultSort })
    } else {
      setFilters({ ...filters, sort: defaultSortParams })
    }
  }

  const handleDeleteExchange = async (exchangeId: string) => {
    try {
      await deleteExchange({
        variables: {
          exchangeId,
          _set: { deleted_at: new Date().toISOString() },
        },
      })
      refetchExchanges()
      toast.success('Thao tác thành công')
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  const handleChangeHiddenExchange = async (exchange: Exchange) => {
    try {
      await updateExchange({
        variables: {
          exchangeId: exchange.id,
          ...exchange,
          hidden: !exchange.hidden,
        },
      })
      refetchExchanges()
      toast.success('Thao tác thành công')
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleSearchChangeName = debounce((event: ChangeEvent<HTMLInputElement>) => {
    setFieldFilter({ ...defaultFilterParams, nameContain: `%${event?.target?.value.trim()}%` })
  }, 300)

  const handleSearchChangeWebsite = debounce((event: ChangeEvent<HTMLInputElement>) => {
    setFieldFilter({ ...defaultFilterParams, websiteContain: `[{"url": "%${event?.target?.value.trim()}%` })
  }, 300)

  useEffect(() => {
    gtm.push({ event: 'page_view' })
  }, [])

  return (
    <>
      <Head>
        <title>Dashboard: Sàn giao dịch | InfoFX</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <ExchangesHeader handleCreateExchange={handleCreateExchange} />
          <Card>
            <ExchangeFilter
              onSearchChangeName={handleSearchChangeName}
              onSearchChangeWebsite={handleSearchChangeWebsite}
              // initialCsTeamName={initialCsTeamName?.csTeamName || ''}
            />

            <ExchangesListTableDataGrid
              exchanges={exchangeData?.exchanges}
              totalRows={exchangeData?.exchanges_aggregate?.aggregate.count}
              rowsPerPage={filters.limit}
              page={filters.page}
              onPaginationModelChange={handlePaginationModelChange}
              // onRowsPerPageChange={handleRowsPerPageChange}
              handleSortFromServer={handleSortFromServer}
              handleChangeHiddenExchange={handleChangeHiddenExchange}
              handleDeleteExchange={handleDeleteExchange}
            />
          </Card>
        </Container>
      </Box>
    </>
  )
}

ListExchanges.getLayout = (page: ReactElement) => (
  <AuthGuard authorized={true}>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default ListExchanges
