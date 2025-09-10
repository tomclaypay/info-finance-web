import { useMutation, useQuery } from '@apollo/client'
import { AuthGuard } from '@app/components/authentication/auth-guard'
import CsTeamHeader from '@app/components/dashboard/csteam/team/team-table/cs-team-header'
import CsTeamListTableDataGrid from '@app/components/dashboard/csteam/team/team-table/cs-team-list-table-data-grid'
import { DashboardLayout } from '@app/components/dashboard/dashboard-layout'
import { useAuth } from '@app/hooks/use-auth'
import { CsTeam, CsTeamsListResponse } from '@app/interfaces/cs-team'
import { gtm } from '@app/lib/gtm'
import DELETE_CS_TEAM from '@app/operations/mutations/csteam/teams/delete-cs-team'
import GET_CS_TEAM_BY_LEADER from '@app/operations/queries/csteam/teams/get-cs-team-by-leader'
import GET_CS_TEAMS from '@app/operations/queries/csteam/teams/get-cs-teams'
import { Box, Card, Container, debounce } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import { useDebouncedState } from '@mantine/hooks'
import toast from 'react-hot-toast'
import CsTeamFilter from '@app/components/dashboard/csteam/team/team-table/cs-team-filter'

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
  name: undefined,
  description: undefined,
  cs_members_aggregate: undefined,
  user: undefined,
  updated_at: undefined,
  created_at: 'desc_nulls_last',
}

const ListTeams = () => {
  const router = useRouter()
  const auth = useAuth()

  const initialCsTeamName = router.query

  const [dataTeams, setDataTeams] = useState<CsTeamsListResponse>({ cs_team: [] })
  const [fieldFilter, setFieldFilter] = useDebouncedState<DataFilterProps>({}, 500)

  const [deleteCsTeam] = useMutation(DELETE_CS_TEAM)

  const [openPopupVerify, setOpenPopupVerify] = useState<{ csTeam: CsTeam; open: boolean }>({
    csTeam: { id: '', name: '', description: '', cs_members: [] },
    open: false,
  })

  const handleOpenPopupVerify = (csTeam: CsTeam) => {
    setOpenPopupVerify({ csTeam, open: true })
  }

  const handleClosePopupVerify = () => {
    setOpenPopupVerify({
      csTeam: { id: '', name: '', description: '', cs_members: [] },
      open: false,
    })
  }

  const [filters, setFilters] = useState({
    page: initialCsTeamName?.initialPage ? parseInt(initialCsTeamName?.initialPage as string) : 0,
    limit: initialCsTeamName?.initialLimit ? parseInt(initialCsTeamName?.initialLimit as string) : 10,
    offset:
      initialCsTeamName?.initialPage && initialCsTeamName?.initialLimit
        ? parseInt(initialCsTeamName?.initialPage as string) * parseInt(initialCsTeamName?.initialLimit as string)
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

  useEffect(() => {
    if (auth?.user?.role === 'super_admin' && dataCsTeamsByAdmin) {
      setDataTeams(dataCsTeamsByAdmin)
    }
    if (auth?.user?.role === 'leader' && dataCsTeamByLeader) {
      setDataTeams(dataCsTeamByLeader)
    }
  }, [dataCsTeamByLeader, dataCsTeamsByAdmin, auth])

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

  const handleCreateCsTeam = () => {
    router.push('/dashboard/csteam/teams/create')
  }

  const handleDeleteCsTeam = async (csTeam: CsTeam) => {
    const csMembers = csTeam.cs_members.reduce((total: string[], current) => [...total, current.id], [])
    try {
      deleteCsTeam({
        variables: {
          teamId: csTeam.id,
          csMembers,
        },
      })
      toast.success('Xoá Cs team thành công')
      setOpenPopupVerify({
        csTeam: { id: '', name: '', description: '', cs_members: [] },
        open: false,
      })
    } catch (error) {
      console.error(error)
      toast.error('Xoá Cs team thất bại')
      setOpenPopupVerify({
        csTeam: { id: '', name: '', description: '', cs_members: [] },
        open: false,
      })
    }
  }

  const handleSortFromServer = (column: any) => {
    if (column?.length > 0) {
      const resultSort = column.reduce((total: any, item: { field: any; sort: string }) => {
        if (item.field !== 'members') {
          return {
            ...defaultSortParams,
            [item.field]: item.sort === 'asc' ? 'asc_nulls_first' : 'desc_nulls_last',
          }
        } else {
          return {
            ...defaultSortParams,
            cs_members_aggregate: { count: item.sort === 'asc' ? 'asc_nulls_first' : 'desc_nulls_last' },
          }
        }
      }, {})
      setFilters({ ...filters, sort: resultSort })
    } else {
      setFilters({ ...filters, sort: defaultSortParams })
    }
  }

  const handleFilterFromServer = (column: { items: any[] }) => {
    if (column) {
      // eslint-disable-next-line array-callback-return
      const resultFilter = column?.items?.reduce((total, item) => {
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
      }, {})
      setFieldFilter(resultFilter)
    } else {
      setFieldFilter(defaultFilterParams)
    }
  }

  const handleSearchChangeName = debounce((event: ChangeEvent<HTMLInputElement>) => {
    setFieldFilter({ ...defaultFilterParams, nameContain: `%${event?.target?.value.trim()}%` })
  }, 300)

  useEffect(() => {
    if (initialCsTeamName?.csTeamName) {
      setFieldFilter({
        ...defaultFilterParams,
        nameContain: `%${initialCsTeamName?.csTeamName}%`,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCsTeamName?.csTeamName])

  useEffect(() => {
    gtm.push({ event: 'page_view' })
  }, [])

  return (
    <>
      <Head>
        <title>Dashboard: Cs Team | InfoFX</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <CsTeamHeader handleCreateCsTeam={handleCreateCsTeam} />
          <Card>
            <CsTeamFilter
              onSearchChangeName={handleSearchChangeName}
              initialCsTeamName={initialCsTeamName?.csTeamName || ''}
            />
            {/* <CsTeamListTable
              teams={dataTeams?.cs_team}
              totalRows={dataTeams?.cs_team_aggregate?.aggregate.count}
              rowsPerPage={filters.limit}
              page={filters.page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              handleDeleteCsTeam={handleDeleteCsTeam}
              openPopupVerify={openPopupVerify}
              handleOpenPopupVerify={handleOpenPopupVerify}
              handleClosePopupVerify={handleClosePopupVerify}
            /> */}
            <CsTeamListTableDataGrid
              teams={dataTeams?.cs_team}
              totalRows={dataTeams?.cs_team_aggregate?.aggregate?.count}
              rowsPerPage={filters.limit}
              page={filters.page}
              onPaginationModelChange={handlePaginationModelChange}
              // onPageChange={handlePageChange}
              // onRowsPerPageChange={handleRowsPerPageChange}
              handleDeleteCsTeam={handleDeleteCsTeam}
              openPopupVerify={openPopupVerify}
              handleFilterFromServer={handleFilterFromServer}
              handleSortFromServer={handleSortFromServer}
              handleOpenPopupVerify={handleOpenPopupVerify}
              handleClosePopupVerify={handleClosePopupVerify}
            />
          </Card>
        </Container>
      </Box>
    </>
  )
}

ListTeams.getLayout = (page: ReactElement) => (
  <AuthGuard authorized={true}>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default ListTeams
