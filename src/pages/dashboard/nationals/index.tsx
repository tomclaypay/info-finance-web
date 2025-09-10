import { useQuery } from '@apollo/client'
import { AuthGuard } from '@app/components/authentication/auth-guard'
import { DashboardLayout } from '@app/components/dashboard/dashboard-layout'
import NationalsFilter from '@app/components/dashboard/nationals/national-table/nationals-filter'
import NationalHeader from '@app/components/dashboard/nationals/national-table/nationals-header'
import NationalsListTableDataGrid from '@app/components/dashboard/nationals/national-table/nationals-list-table-data-grid'
import { NationalListResponse } from '@app/interfaces/national'
import { gtm } from '@app/lib/gtm'
import GET_NATIONALS from '@app/operations/queries/nationals/get-nationals'
import { useDebouncedState } from '@mantine/hooks'
import { Box, Card, Container } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ChangeEvent, ReactElement, useEffect, useState } from 'react'

interface DataFilterProps {
  nameContain?: string
  nameVnContain?: string
}

const defaultSortParams = {
  name: 'asc_nulls_first',
  name_vn: undefined,
  updated_at: undefined,
  created_at: undefined,
}

const ListNationals = () => {
  const router = useRouter()
  const { initialPage, initialLimit } = router.query

  const [filters, setFilters] = useState({
    page: initialPage ? parseInt(initialPage as string) : 0,
    limit: initialLimit ? parseInt(initialLimit as string) : 10,
    offset: initialPage && initialLimit ? parseInt(initialPage as string) * parseInt(initialLimit as string) : 0,
    sort: defaultSortParams,
  })

  const [fieldFilter, setFieldFilter] = useDebouncedState<DataFilterProps>({}, 500)

  const { data: nationalData } = useQuery<NationalListResponse>(GET_NATIONALS, {
    variables: {
      limit: filters.limit,
      offset: filters.offset,
      order_by: filters.sort,
      ...fieldFilter,
    },
  })

  const handlePageChange = (page: number) => {
    if (page !== 0 || (page === 0 && filters.page === 1)) {
      setFilters({
        ...filters,
        page: page,
        offset: page * filters.limit,
      })
    }
  }

  const handleRowsPerPageChange = (event: any) => {
    setFilters({
      ...filters,
      limit: event,
    })
  }

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setFieldFilter({
      ...fieldFilter,
      nameContain: `%${event.target.value.trim()}%`,
    })
  }

  const handleChangeNameVn = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setFieldFilter({
        ...fieldFilter,
        nameVnContain: `%${event.target.value.trim()}%`,
      })
    } else setFieldFilter({})
  }

  const handleSortFromServer = (column: any) => {
    if (column?.length > 0) {
      const resultSort = column.reduce((total: any, item: { field: any; sort: string }) => {
        return {
          ...defaultSortParams,
          name: undefined,
          [item.field]: item.sort === 'asc' ? 'asc_nulls_first' : 'desc_nulls_last',
        }
      }, {})
      setFilters({ ...filters, sort: resultSort })
    } else {
      setFilters({ ...filters, sort: defaultSortParams })
    }
  }

  const handleCreateNational = () => {
    router.push('/dashboard/nationals/create')
  }

  useEffect(() => {
    gtm.push({ event: 'page_view' })
  }, [])

  return (
    <>
      <Head>
        <title>Dashboard: Nationals | InfoFX</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <NationalHeader handleCreateNational={handleCreateNational} />
          <Card>
            <NationalsFilter onNameChange={handleChangeName} onNameVnChange={handleChangeNameVn} />

            <NationalsListTableDataGrid
              nationals={nationalData?.nationals}
              totalRows={nationalData?.nationals_aggregate?.aggregate.count}
              rowsPerPage={filters.limit}
              page={filters.page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              handleSortFromServer={handleSortFromServer}
            />
          </Card>
        </Container>
      </Box>
    </>
  )
}

ListNationals.getLayout = (page: ReactElement) => (
  <AuthGuard authorized={true}>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default ListNationals
