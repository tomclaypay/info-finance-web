import { useQuery } from '@apollo/client'
import { AuthGuard } from '@app/components/authentication/auth-guard'
import { DashboardLayout } from '@app/components/dashboard/dashboard-layout'
import SupervisoriesFilter from '@app/components/dashboard/supervisories/supervisor-table/supervisories-filter'
import SupervisorHeader from '@app/components/dashboard/supervisories/supervisor-table/supervisories-header'
import SupervisoriesListTableDataGrid from '@app/components/dashboard/supervisories/supervisor-table/supervisories-list-table-data-grid'
import { SupervisoriesListResponse } from '@app/interfaces/supervisor'
import { gtm } from '@app/lib/gtm'
import GET_SUPERVISORIES from '@app/operations/queries/supervisories/get-supervisories'
import { useDebouncedState } from '@mantine/hooks'
import { Box, Card, Container } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ChangeEvent, ReactElement, useEffect, useState } from 'react'

interface DataFilterProps {
  nameContain?: string
}

const defaultSortParams = {
  name: undefined,
  updated_at: undefined,
  created_at: 'desc_nulls_last',
}

const ListSupervisories = () => {
  const router = useRouter()
  const { initialPage, initialLimit } = router.query
  const [filters, setFilters] = useState({
    page: initialPage ? parseInt(initialPage as string) : 0,
    limit: initialLimit ? parseInt(initialLimit as string) : 10,
    offset: initialPage && initialLimit ? parseInt(initialPage as string) * parseInt(initialLimit as string) : 0,
    sort: defaultSortParams,
  })

  const [fieldFilter, setFieldFilter] = useDebouncedState<DataFilterProps>({}, 500)

  const { data: supervisoriesData } = useQuery<SupervisoriesListResponse>(GET_SUPERVISORIES, {
    variables: {
      limit: filters.limit,
      offset: filters.offset,
      order_by: filters.sort,
      ...fieldFilter,
    },
  })

  // const handlePageChange = (page: number) => {
  //   if (page !== 0 || (page === 0 && filters.page === 1)) {
  //     setFilters({
  //       ...filters,
  //       page: page,
  //       offset: page * filters.limit,
  //     })
  //   }
  // }

  // const handleRowsPerPageChange = (event: any) => {
  //   setFilters({
  //     ...filters,
  //     limit: event,
  //   })
  // }

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

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setFieldFilter({
      nameContain: `%${event.target.value.trim()}%`,
    })
  }

  const handleSortFromServer = (column: any) => {
    if (column?.length > 0) {
      const resultSort = column.reduce((total: any, item: { field: any; sort: string }) => {
        return {
          ...defaultSortParams,
          created_at: undefined,
          [item.field]: item.sort === 'asc' ? 'asc_nulls_last' : 'desc_nulls_last',
        }
      }, {})
      setFilters({ ...filters, sort: resultSort })
    } else {
      setFilters({ ...filters, sort: defaultSortParams })
    }
  }

  const handleCreateSupervisor = () => {
    router.push('/dashboard/supervisories/create')
  }

  useEffect(() => {
    gtm.push({ event: 'page_view' })
  }, [])

  return (
    <>
      <Head>
        <title>Dashboard: Cơ quan giám sát quản lý | InfoFX</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <SupervisorHeader handleCreateSupervisor={handleCreateSupervisor} />
          <Card>
            <SupervisoriesFilter onNameChange={handleChangeName} />

            <SupervisoriesListTableDataGrid
              supervisories={supervisoriesData?.supervisories}
              totalRows={supervisoriesData?.supervisories_aggregate?.aggregate.count}
              rowsPerPage={filters.limit}
              page={filters.page}
              // onPageChange={handlePageChange}
              onPaginationModelChange={handlePaginationModelChange}
              // onRowsPerPageChange={handleRowsPerPageChange}
              handleSortFromServer={handleSortFromServer}
            />
          </Card>
        </Container>
      </Box>
    </>
  )
}

ListSupervisories.getLayout = (page: ReactElement) => (
  <AuthGuard authorized={true}>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default ListSupervisories
