import { useQuery } from '@apollo/client'
import { AuthGuard } from '@app/components/authentication/auth-guard'
import CsMemberFilter from '@app/components/dashboard/csteam/member/member-table/cs-member-filter'
import CsMemberHeader from '@app/components/dashboard/csteam/member/member-table/cs-member-header'
import CsMemberListTableDataGrid from '@app/components/dashboard/csteam/member/member-table/cs-member-list-table-data-grid'
import { DashboardLayout } from '@app/components/dashboard/dashboard-layout'
import { useAuth } from '@app/hooks/use-auth'
import { CsMembersListResponse } from '@app/interfaces/cs-member'
import { CsTeam, CsTeamsListResponse } from '@app/interfaces/cs-team'
import { gtm } from '@app/lib/gtm'
import GET_CS_MEMBERS from '@app/operations/queries/csteam/members/get-cs-members'
import GET_CS_TEAM_BY_LEADER from '@app/operations/queries/csteam/teams/get-cs-team-by-leader'
import GET_CS_TEAMS from '@app/operations/queries/csteam/teams/get-cs-teams'
import { useDebouncedState } from '@mantine/hooks'
import { Box, Card, Container, Divider } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

interface DataFilterProps {
  nameContain?: string
  nameEqual?: string
  descriptionContain?: string
  descriptionEqual?: string
}

const FilterVariable = (value: string, type: string) => {
  if (type === 'contains') {
    switch (value) {
      case 'name':
        return 'nameContain'
      case 'description':
        return 'descriptionContain'
      default:
        return ''
    }
  }

  if (type === 'equals') {
    switch (value) {
      case 'name':
        return 'nameEqual'
      case 'description':
        return 'descriptionEqual'
      default:
        return ''
    }
  }
}

const defaultFilterParams = {
  nameContain: undefined,
  nameEqual: undefined,
  descriptionContain: undefined,
  descriptionEqual: undefined,
}

const defaultSortParams = {
  user: undefined,
  cs_team: undefined,
  complaints_aggregate: undefined,
  created_at: 'desc_nulls_last',
}

const ListCsMembers = () => {
  const router = useRouter()
  const auth = useAuth()

  // const [initialTeamOption, setInitialTeamOption] = useState(router.query)

  const initialTeamOption = router.query

  const [fieldFilter, setFieldFilter] = useDebouncedState<DataFilterProps>({}, 500)
  const handleCsCreateMember = () => {
    router.push('/dashboard/csteam/members/create')
  }

  // const [filters, setFilters] = useState({
  //   page: 0,
  //   limit: 10,
  //   offset: 0,
  //   sort: defaultSortParams,
  // })

  const [filters, setFilters] = useState({
    page: initialTeamOption?.initialPage ? parseInt(initialTeamOption?.initialPage as string) : 0,
    limit: initialTeamOption?.initialLimit ? parseInt(initialTeamOption?.initialLimit as string) : 10,
    offset:
      initialTeamOption?.initialPage && initialTeamOption?.initialLimit
        ? parseInt(initialTeamOption?.initialPage as string) * parseInt(initialTeamOption?.initialLimit as string)
        : 0,
    sort: defaultSortParams,
  })

  const { data: dataCsTeamsByAdmin } = useQuery<CsTeamsListResponse>(GET_CS_TEAMS, {
    variables: {
      limit: filters.limit,
      offset: filters.offset,
      order_by: filters.sort,
      ...fieldFilter,
    },
    skip: !auth.isAuthenticated || auth?.user?.role !== 'super_admin',
  })

  const { data: dataCsTeamByLeader } = useQuery<CsTeamsListResponse>(GET_CS_TEAM_BY_LEADER, {
    variables: {
      limit: filters.limit,
      offset: filters.offset,
      order_by: filters.sort,
      userId: auth?.user?.id,
    },
    skip: !auth.isAuthenticated || auth?.user?.role !== 'leader',
  })

  const { data: dataMembers, refetch: refetchDataMembers } = useQuery<CsMembersListResponse>(GET_CS_MEMBERS, {
    variables: {
      limit: filters.limit,
      offset: filters.offset,
      order_by: filters.sort,
      where: { ...fieldFilter },
    },
    skip: !auth.isAuthenticated,
  })

  useEffect(() => {
    // setFieldFilter({
    //   cs_team_id: { _eq: initialTeamOption?.id },
    // })
    if (auth?.user?.role === 'super_admin') {
      refetchDataMembers({
        where: initialTeamOption?.id
          ? {
              cs_team_id: { _eq: initialTeamOption?.id },
            }
          : {
              cs_team_id: {},
            },
      })
    }

    if (auth?.user?.role !== 'super_admin') {
      refetchDataMembers({
        where: initialTeamOption?.id
          ? {
              cs_team_id: { _eq: initialTeamOption?.id },
            }
          : {
              user_id: {
                _eq: auth?.user?.id,
              },
            },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.user])

  useEffect(() => {
    if (auth?.user?.role === 'leader' && dataMembers?.cs_member && dataMembers?.cs_member?.[0]?.cs_team?.id) {
      refetchDataMembers({
        where: {
          cs_team: {
            cs_members: {
              user_id: {
                _eq: auth?.user.id,
              },
            },
          },
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataMembers?.cs_member, auth?.user])

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

  const handleFilterFromServer = (column: any) => {
    if (column) {
      // eslint-disable-next-line array-callback-return
      const resultFilter = column?.items?.reduce(
        (total: any, item: { value: string; columnField: string; operatorValue: string }) => {
          if (item.value) {
            return {
              ...defaultFilterParams,
              [FilterVariable(item.columnField, item.operatorValue) as any]:
                item.operatorValue === 'contains' ? `%${item?.value.trim()}%` : item?.value.trim(),
            }
          }

          if (!item.value) {
            return {
              ...defaultFilterParams,
              [FilterVariable(item.columnField, item.operatorValue) as any]: undefined,
            }
          }
        },
        {}
      )

      // setFieldFilter(resultFilter)
    } else {
      // setFieldFilter(defaultFilterParams)
    }
  }

  const handleSortFromServer = (column: any) => {
    if (column?.length > 0) {
      const resultSort = column.reduce((total: any, item: { field: any; sort: string }) => {
        if (item.field === 'phone') {
          return {
            ...defaultSortParams,
            user: { phone: item.sort === 'asc' ? 'asc_nulls_first' : 'desc_nulls_last' },
          }
        }
        if (item.field === 'cs_team') {
          return {
            ...defaultSortParams,
            cs_team: { name: item.sort === 'asc' ? 'asc_nulls_first' : 'desc_nulls_last' },
          }
        }
        if (item.field === 'role') {
          return {
            ...defaultSortParams,
            user: { role: item.sort === 'asc' ? 'asc_nulls_first' : 'desc_nulls_last' },
          }
        }
        if (item.field === 'complaints_aggregate') {
          return {
            ...defaultSortParams,
            created_at: undefined,
            complaints_aggregate: { count: item.sort === 'asc' ? 'asc_nulls_first' : 'desc_nulls_last' },
          }
        }
        if (item.field === 'created_at') {
          return {
            ...defaultSortParams,
            created_at: item.sort === 'asc' ? 'asc_nulls_first' : 'desc_nulls_last',
          }
        }
      }, {})
      setFilters({ ...filters, sort: resultSort })
    } else {
      setFilters({ ...filters, sort: defaultSortParams })
    }
  }

  const handleFilterHeader = (event: any) => {
    if (auth?.user?.role === 'super_admin') {
      setFieldFilter({
        cs_team_id: { _eq: event?.id },
      } as DataFilterProps)
    }
  }

  useEffect(() => {
    gtm.push({ event: 'page_view' })
  }, [])

  return (
    <>
      <Head>
        <title>Dashboard: CS Member | InfoFX</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <CsMemberHeader handleCsCreateMember={handleCsCreateMember} />
          <Card>
            <Divider />
            <CsMemberFilter
              handleFilterHeader={handleFilterHeader}
              initialTeamOption={initialTeamOption as CsTeam}
              dataCsTeamOptions={
                auth?.user?.role === 'super_admin' ? dataCsTeamsByAdmin?.cs_team : dataCsTeamByLeader?.cs_team
              }
            />
            {/* <CsMemberListTable
              csMembers={dataMembers?.cs_member}
              totalRows={dataMembers?.cs_member_aggregate?.aggregate.count}
              rowsPerPage={filters.limit}
              page={filters.page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              handleDeleteCsMember={handleDeleteCsMember}
            /> */}
            <CsMemberListTableDataGrid
              csMembers={dataMembers?.cs_member}
              totalRows={dataMembers?.cs_member_aggregate?.aggregate.count}
              rowsPerPage={filters.limit}
              page={filters.page}
              onPaginationModelChange={handlePaginationModelChange}
              // onPageChange={handlePageChange}
              // onRowsPerPageChange={handleRowsPerPageChange}
              handleFilterFromServer={handleFilterFromServer}
              handleSortFromServer={handleSortFromServer}
            />
          </Card>
        </Container>
      </Box>
    </>
  )
}

ListCsMembers.getLayout = (page: ReactElement) => (
  <AuthGuard authorized={true}>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default ListCsMembers
