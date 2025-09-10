import { useQuery } from '@apollo/client'
import { AuthGuard } from '@app/components/authentication/auth-guard'
import BannerFilter from '@app/components/dashboard/banners/banner-table/banner-filter'
import BannerHeader from '@app/components/dashboard/banners/banner-table/banners-header'
import BannersListTableDataGrid from '@app/components/dashboard/banners/banner-table/banners-list-table-data-grid'
import { DashboardLayout } from '@app/components/dashboard/dashboard-layout'
import { BannersListResponse } from '@app/interfaces/banner'
import { gtm } from '@app/lib/gtm'
import GET_BANNERS from '@app/operations/queries/banners/get-banners'
import { useDebouncedState } from '@mantine/hooks'
import { Box, Card, Container, SelectChangeEvent } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

interface DataFilterProps {
  languageContain?: string
  positionContain?: string
}

const defaultSortParams = {
  language: undefined,
  position: undefined,
  updated_at: undefined,
  created_at: 'desc_nulls_last',
}

const ListBanners = () => {
  const router = useRouter()
  const [filters, setFilters] = useState({
    page: 0,
    limit: 10,
    offset: 0,
    sort: defaultSortParams,
  })

  const [fieldFilter, setFieldFilter] = useDebouncedState<DataFilterProps>({}, 500)

  const { data: bannerData } = useQuery<BannersListResponse>(GET_BANNERS, {
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

  const handleChangeLanguage = (event: SelectChangeEvent<string>) => {
    setFieldFilter({
      ...filters,
      languageContain: `%${event.target.value.trim()}%`,
    })
  }

  const handleChangePosition = (event: SelectChangeEvent<string>) => {
    setFieldFilter({
      ...filters,
      positionContain: `%${event.target.value.trim()}%`,
    })
  }

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

  const handleCreateBanner = () => {
    router.push('/dashboard/banners/create')
  }

  useEffect(() => {
    gtm.push({ event: 'page_view' })
  }, [])

  return (
    <>
      <Head>
        <title>Dashboard: Banners | InfoFX</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <BannerHeader handleCreateBanner={handleCreateBanner} />
          <Card>
            <BannerFilter
              language={fieldFilter.languageContain}
              onLanguageChange={handleChangeLanguage}
              position={fieldFilter.positionContain}
              onPositionChange={handleChangePosition}
            />

            <BannersListTableDataGrid
              banners={bannerData?.banners}
              totalRows={bannerData?.banner_aggregate?.aggregate?.count}
              rowsPerPage={filters.limit}
              page={filters.page}
              onPaginationModelChange={handlePaginationModelChange}
              handleSortFromServer={handleSortFromServer}
            />
          </Card>
        </Container>
      </Box>
    </>
  )
}

ListBanners.getLayout = (page: ReactElement) => (
  <AuthGuard authorized={true}>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default ListBanners
