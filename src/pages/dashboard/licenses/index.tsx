import { useQuery } from '@apollo/client'
import { AuthGuard } from '@app/components/authentication/auth-guard'
import { DashboardLayout } from '@app/components/dashboard/dashboard-layout'
import LicensesFilter from '@app/components/dashboard/licenses/license-table/licenses-filter'
import LicensesHeader from '@app/components/dashboard/licenses/license-table/licenses-header'
import LicensesListTableDataGrid from '@app/components/dashboard/licenses/license-table/licenses-list-table-data-grid'
import { LicensesListResponse } from '@app/interfaces/license'
import { gtm } from '@app/lib/gtm'
import GET_LICENSES from '@app/operations/queries/licenses/get-licenses'
import { useDebouncedState } from '@mantine/hooks'
import { Box, Card, Container } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ChangeEvent, ReactElement, useEffect, useState } from 'react'

interface DataFilterProps {
  licenseNumber?: string
  exchangeName?: string
  supervisoryName?: string
}

const defaultSortParams = {
  supervision_license: undefined,
  updated_at: undefined,
  created_at: 'desc_nulls_last',
}

const defaultFilterParams = {
  licenseNumber: undefined,
  exchangeName: undefined,
  supervisoryName: undefined,
}

const ListLicenses = () => {
  const router = useRouter()
  const initialSearch = router.query

  const [filters, setFilters] = useState({
    page: initialSearch?.initialPage ? parseInt(initialSearch?.initialPage as string) : 0,
    limit: initialSearch?.initialLimit ? parseInt(initialSearch?.initialLimit as string) : 10,
    offset:
      initialSearch?.initialPage && initialSearch?.initialLimit
        ? parseInt(initialSearch?.initialPage as string) * parseInt(initialSearch?.initialLimit as string)
        : 0,
    sort: defaultSortParams,
  })

  const [fieldFilter, setFieldFilter] = useDebouncedState<DataFilterProps>({}, 500)

  const { data: licensesData } = useQuery<LicensesListResponse>(GET_LICENSES, {
    variables: {
      limit: filters.limit,
      offset: filters.offset,
      order_by: filters.sort,
      ...fieldFilter,
    },
  })

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

  const onLicenseNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFieldFilter({
      ...defaultFilterParams,
      licenseNumber: `%${event.target.value.trim()}%`,
    })
  }

  const onExchangeNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFieldFilter({
      ...defaultFilterParams,
      exchangeName: `%${event.target.value.trim()}%`,
    })
  }

  const onSupervisoryNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFieldFilter({
      ...defaultFilterParams,
      supervisoryName: `%${event.target.value.trim()}%`,
    })
  }

  const handleSortFromServer = (column: any) => {
    if (column?.length > 0) {
      const resultSort = column.reduce((total: any, item: { field: any; sort: string }) => {
        return {
          ...defaultSortParams,
          [item.field]: item.sort === 'asc' ? 'asc_nulls_first' : 'desc_nulls_last',
          created_at: undefined,
        }
      }, {})
      setFilters({ ...filters, sort: resultSort })
    } else {
      setFilters({ ...filters, sort: defaultSortParams })
    }
  }

  const handleCreateLicense = () => {
    router.push('/dashboard/licenses/create')
  }

  useEffect(() => {
    if (initialSearch?.licenseNumber) {
      setFieldFilter({
        ...defaultFilterParams,
        licenseNumber: `%${initialSearch?.licenseNumber}%`,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSearch?.licenseNumber])

  useEffect(() => {
    gtm.push({ event: 'page_view' })
  }, [])

  return (
    <>
      <Head>
        <title>Dashboard: Giấy phép sàn giao dịch | InfoFX</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <LicensesHeader handleCreateLicense={handleCreateLicense} />
          <Card>
            <LicensesFilter
              onSupervisoryNameChange={onSupervisoryNameChange}
              onLicenseNumberChange={onLicenseNumberChange}
              onExchangeNameChange={onExchangeNameChange}
              initialSearch={initialSearch}
            />

            <LicensesListTableDataGrid
              licenses={licensesData?.licenses}
              totalRows={licensesData?.licenses_aggregate?.aggregate.count}
              rowsPerPage={filters.limit}
              page={filters.page}
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

ListLicenses.getLayout = (page: ReactElement) => (
  <AuthGuard authorized={true}>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default ListLicenses
