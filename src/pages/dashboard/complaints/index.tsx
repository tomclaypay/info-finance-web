import { useMutation, useQuery } from '@apollo/client'
import { AuthGuard } from '@app/components/authentication/auth-guard'
import ComplaintFilter from '@app/components/dashboard/complaints/complaint-list/complaint-filter'
import ComplaintHeader from '@app/components/dashboard/complaints/complaint-list/complaint-header'
import ComplaintListTable from '@app/components/dashboard/complaints/complaint-list/complaint-list-table'
import { DashboardLayout } from '@app/components/dashboard/dashboard-layout'
import { Sort } from '@app/constants/common'
import { COMPLAINT_STATUS_LIST } from '@app/constants/complaint'
import { useAuth } from '@app/hooks/use-auth'
import { UpdatingCancelRequest } from '@app/interfaces/cancel-request'
import {
  ComplaintCategoryListResponse,
  ComplaintListResponse,
  UpdatingComplaintStatus,
  UploadingComplaintContract,
} from '@app/interfaces/complaint'
import { CsMembersListResponse } from '@app/interfaces/cs-member'
import { CsTeamsListResponse } from '@app/interfaces/cs-team'
import { ExchangeListResponse } from '@app/interfaces/exchange'
import { gtm } from '@app/lib/gtm'
import ADD_COMPLAINT_CONTRACT from '@app/operations/mutations/complaints/add-complaint-contract'
import DELETE_COMPLAINT from '@app/operations/mutations/complaints/delete-complaint'
import UPDATE_CANCEL_REQUEST from '@app/operations/mutations/complaints/update-cancel-request'
import UPDATE_COMPLAINT from '@app/operations/mutations/complaints/update-complaint'
import UPDATE_HIDDEN_COMPLAINT from '@app/operations/mutations/complaints/update-hidden-complaint'
import UPDATE_HIGHLIGHT_COMPLAINT from '@app/operations/mutations/complaints/update-highlight-complaint'
import GET_COMPLAINT_CATEGORIES from '@app/operations/queries/complaints/get-complaint-categories'
import GET_COMPLAINTS from '@app/operations/queries/complaints/get-complaints'
import GET_CS_MEMBERS from '@app/operations/queries/csteam/members/get-cs-members'
import GET_CS_TEAM_BY_LEADER from '@app/operations/queries/csteam/teams/get-cs-team-by-leader'
import GET_CS_TEAMS from '@app/operations/queries/csteam/teams/get-cs-teams'
import GET_EXCHANGES_OPTIONS from '@app/operations/queries/exchanges/get-exchanges-options'
import { formatOptions } from '@app/utils/common'
import { Box, Card, Container, debounce, Divider, SelectChangeEvent } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ChangeEvent, ReactElement, SyntheticEvent, useEffect, useMemo, useRef, useState } from 'react'
import toast from 'react-hot-toast'

export interface ComplaintFilters {
  page: number
  limit: number
  offset: number
  query: string
  sort: Sort
  status: string
  csTeam?: string
  handle_by?: string
  exchange?: string
  category?: string
  showCancelRequest: boolean
  showUnHandedBy: boolean
  showHighlight: boolean
}

export interface SearchRefTypes {
  handleClearSearch: () => void
}

const ComplaintList = () => {
  const auth = useAuth()
  const { data: exchangeData } = useQuery<ExchangeListResponse>(GET_EXCHANGES_OPTIONS)
  const { data: categoriesData } = useQuery<ComplaintCategoryListResponse>(GET_COMPLAINT_CATEGORIES)
  const { data: dataCsTeamsByAdmin } = useQuery<CsTeamsListResponse>(GET_CS_TEAMS, {
    skip: !auth.isAuthenticated || auth?.user?.role !== 'super_admin',
  })

  const { data: dataCsTeamByLeader } = useQuery<CsTeamsListResponse>(GET_CS_TEAM_BY_LEADER, {
    variables: {
      userId: auth?.user?.id,
    },
    skip: !auth.isAuthenticated || auth?.user?.role !== 'leader',
  })
  const [updateComplaintStatus, { loading: updateComplaintLoading }] =
    useMutation<UpdatingComplaintStatus>(UPDATE_COMPLAINT)
  const [addComplaintContract] = useMutation(ADD_COMPLAINT_CONTRACT)
  const [updateCancelRequest] = useMutation(UPDATE_CANCEL_REQUEST)
  const [updateHiddenComplaint] = useMutation(UPDATE_HIDDEN_COMPLAINT)
  const [updateHighlightComplaint] = useMutation(UPDATE_HIGHLIGHT_COMPLAINT)

  const [deleteComplaint] = useMutation(DELETE_COMPLAINT)

  const searchRef = useRef<SearchRefTypes>(null)

  const router = useRouter()

  const initialSearch = router.query

  const exchangeOptions = formatOptions(exchangeData?.exchanges)
  const categoryOptions = formatOptions(categoriesData?.complaint_categories)
  const csTeamOptions = formatOptions(
    auth?.user?.role === 'super_admin' ? dataCsTeamsByAdmin?.cs_team : dataCsTeamByLeader?.cs_team
  )
  const statusOptions = COMPLAINT_STATUS_LIST

  const initialFilter: ComplaintFilters = useMemo(
    () => ({
      page: initialSearch?.initialPage ? parseInt(initialSearch.initialPage as string) : 0,
      limit: initialSearch?.initialLimit ? parseInt(initialSearch.initialLimit as string) : 10,
      offset:
        initialSearch?.initialPage && initialSearch?.initialLimit
          ? parseInt(initialSearch.initialPage as string) * parseInt(initialSearch.initialLimit as string)
          : 0,
      query: '',
      sort: Sort.DESC,
      status: '',
      csTeam: '',
      handle_by: '',
      exchange: '',
      category: '',
      showCancelRequest: false,
      showUnHandedBy: false,
      showHighlight: false,
    }),
    [initialSearch.initialLimit, initialSearch.initialPage]
  )

  const [filters, setFilters] = useState<ComplaintFilters>(initialFilter)

  const { data, refetch: refetchComplaints } = useQuery<ComplaintListResponse>(GET_COMPLAINTS, {
    variables: {
      limit: filters.limit,
      offset: filters.offset,
      order_by: {
        createdAt: filters.sort,
      },
      where: {
        ...(filters.status ? { status: { _eq: filters.status } } : {}),
        ...(filters.query ? { title: { _like: `%${filters.query}%` } } : {}),
        ...(filters.category ? { complaintCategoryId: { _eq: filters.category } } : {}),
        ...(filters.csTeam ? { handle_by: { cs_team_id: { _eq: filters.csTeam } } } : {}),
        ...(filters.handle_by ? { handler_by_member_id: { _eq: filters.handle_by } } : {}),
        ...(filters.exchange ? { exchangeId: { _eq: filters.exchange } } : {}),
        ...(filters.showCancelRequest
          ? { cancelRequests: { status: { _eq: 'pending' } } }
          : { _not: { cancelRequests: { status: { _eq: 'pending' } } } }),
        ...(filters.showUnHandedBy ? { handler_by_member_id: { _is_null: true } } : {}),
        ...(filters.showHighlight ? { highlight_on_broker: { _eq: true } } : {}),
      },
      skip: !auth.isAuthenticated,
    },
  })

  const { data: dataComplaintByMemberId, refetch: refetchComplaintByMember } = useQuery<ComplaintListResponse>(
    GET_COMPLAINTS,
    {
      variables: {
        limit: filters.limit,
        offset: filters.offset,
        order_by: {
          createdAt: filters.sort,
        },
        where: {
          handle_by: { user_id: { _eq: auth?.user?.id } },
          ...(filters.status ? { status: { _eq: filters.status } } : {}),
          ...(filters.query ? { title: { _like: `%${filters.query}%` } } : {}),
          ...(filters.category ? { complaintCategoryId: { _eq: filters.category } } : {}),
          ...(filters.csTeam ? { handle_by: { cs_team_id: { _eq: filters.csTeam } } } : {}),
          ...(filters.handle_by ? { handler_by_member_id: { _eq: filters.handle_by } } : {}),
          ...(filters.exchange ? { exchangeId: { _eq: filters.exchange } } : {}),
          ...(filters.showCancelRequest
            ? { cancelRequests: { status: { _eq: 'pending' } } }
            : { _not: { cancelRequests: { status: { _eq: 'pending' } } } }),
          ...(filters.showUnHandedBy ? { handler_by_member_id: { _is_null: true } } : {}),
        },
      },
      skip: !auth.isAuthenticated,
    }
  )

  const { data: dataMembers, refetch: refetchDataMembers } = useQuery<CsMembersListResponse>(GET_CS_MEMBERS, {
    skip: !auth.isAuthenticated,
  })

  const { data: dataCsTeams } = useQuery<CsTeamsListResponse>(GET_CS_TEAM_BY_LEADER, {
    variables: {
      userId: auth?.user?.id,
    },
    skip: !auth.isAuthenticated,
  })

  useEffect(() => {
    if (auth?.user?.role === 'super_admin') {
      refetchDataMembers({
        where: {
          cs_team_id: {},
        },
      })
    }

    if (auth?.user?.role !== 'super_admin') {
      refetchDataMembers({
        where: {
          user_id: {
            _eq: auth?.user?.id,
          },
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.user])

  const handleByOptions = filters.csTeam
    ? dataMembers?.cs_member
        ?.filter((item) => item.cs_team?.id === filters.csTeam)
        ?.map((item) => {
          return {
            label: item?.user?.displayName as string,
            value: item?.id as string,
          }
        })
    : dataMembers?.cs_member?.map((item) => {
        return {
          label: item?.user?.displayName as string,
          value: item?.id as string,
        }
      })

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

  const { data: dataComplaintOutSideTeam } = useQuery<ComplaintListResponse>(GET_COMPLAINTS, {
    variables: {
      where: {
        handle_by: { _not: { cs_team: { cs_members: { user_id: { _eq: auth?.user?.id } } } } },
      },
    },
    skip: !auth.isAuthenticated || auth?.user?.role !== 'leader',
  })

  const handleUpdateComplaintStatus = async (complaint: UpdatingComplaintStatus) => {
    try {
      await updateComplaintStatus({
        variables: {
          ...complaint,
        },
        onCompleted: () => {
          auth?.user?.role !== 'member' ? refetchComplaints() : refetchComplaintByMember()
          toast.success('Cập nhật khiếu nại thành công!')
        },
      })
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleUploadContract = async (contract: UploadingComplaintContract) => {
    try {
      await addComplaintContract({
        variables: {
          ...contract,
        },
        onCompleted: () => {
          auth?.user?.role !== 'member' ? refetchComplaints() : refetchComplaintByMember()
          toast.success('Tải lên hợp đồng thành công!')
        },
      })
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleUpdateCancelRequest = async (cancelRequest: UpdatingCancelRequest) => {
    try {
      await updateCancelRequest({
        variables: {
          cancelRequestId: cancelRequest.id,
          status: cancelRequest.status,
        },
        onCompleted: () => {
          auth?.user?.role !== 'member' ? refetchComplaints() : refetchComplaintByMember()
          toast.success('Xử lý yêu cầu thành công!')
        },
      })
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleSearchChange = debounce((event: ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      query: event.target.value,
    })
  }, 300)

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setFilters({
      ...filters,
      sort: event.target.value as Sort,
    })
  }

  const handleExchangeChange = (event: any) => {
    setFilters({
      ...filters,
      exchange: event?.value,
    })
  }

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setFilters({
      ...filters,
      category: event.target.value,
    })
  }

  const handleByChange = (event: any) => {
    setFilters({
      ...filters,
      handle_by: event?.value,
    })
  }

  const handleCsTeamChange = (event: any) => {
    setFilters({
      ...filters,
      csTeam: event?.value,
    })
  }

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setFilters({
      ...filters,
      status: event.target.value,
    })
  }

  const handleCancelRequestStatusChange = (event: SyntheticEvent<Element, Event>, checked: boolean) => {
    setFilters({
      ...filters,
      showCancelRequest: checked,
    })
  }

  const handleUnHandledByStatusChange = (event: SyntheticEvent<Element, Event>, checked: boolean) => {
    setFilters({
      ...filters,
      showUnHandedBy: checked,
    })
  }

  const handleHighlightChange = (event: SyntheticEvent<Element, Event>, checked: boolean) => {
    setFilters({
      ...filters,
      showHighlight: checked,
    })
  }

  const handleClearFilters = () => {
    searchRef.current?.handleClearSearch()
    setFilters({
      ...initialFilter,
    })
  }

  const handlePageChange = (event: any, newPage: number) => {
    setFilters({
      ...filters,
      page: newPage,
      offset: newPage * filters.limit,
    })
  }

  const handleRowsPerPageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      page: 0,
      limit: parseInt(event.target.value, 10),
    })
  }

  const onChangeHiddenComplaint = async (complaintId: string, hidden: boolean) => {
    try {
      await updateHiddenComplaint({
        variables: {
          complaintId,
          hidden,
        },
        onCompleted: () => {
          auth?.user?.role !== 'member' ? refetchComplaints() : refetchComplaintByMember()
          toast.success('Thao tác thành công!')
        },
      })
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const onChangeHighlightComplaint = async (complaintId: string, highlight_on_broker: boolean) => {
    try {
      await updateHighlightComplaint({
        variables: {
          complaintId,
          highlight_on_broker,
        },
        onCompleted: () => {
          auth?.user?.role !== 'member' ? refetchComplaints() : refetchComplaintByMember()
          toast.success('Thao tác thành công!')
        },
      })
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const onDeleteComplaint = async (complaintId: string) => {
    try {
      await deleteComplaint({
        variables: {
          complaintId,
        },
        onCompleted: () => {
          auth?.user?.role !== 'member' ? refetchComplaints() : refetchComplaintByMember()
          toast.success('Thao tác thành công!')
        },
      })
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    setFilters({
      ...filters,
      query: (initialSearch?.complaintTile as string) || '',
      handle_by: (initialSearch?.handleById as string) || '',
      exchange: (initialSearch?.exchangeId as string) || '',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSearch])

  useEffect(() => {
    gtm.push({ event: 'page_view' })
  }, [])

  const isJoinedCsTeam = dataCsTeams?.cs_team.length === 0 ? false : true

  const dataComplaintsTransfer = () => {
    if (auth?.user?.role === 'super_admin') {
      return data?.complaints
    }
    if (auth?.user?.role === 'leader') {
      if (isJoinedCsTeam) {
        return data?.complaints
      } else return []
    }

    if (auth?.user?.role === 'member') {
      if (isJoinedCsTeam) {
        return dataComplaintByMemberId?.complaints
      } else return []
    }
  }

  const dataComplaintAggregateTransfer = () => {
    if (auth?.user?.role === 'super_admin') {
      return data?.complaints_aggregate?.aggregate?.count
    }
    if (auth?.user?.role === 'leader') {
      if (isJoinedCsTeam) {
        return data?.complaints_aggregate?.aggregate?.count
      } else return 0
    }

    if (auth?.user?.role === 'member') {
      if (isJoinedCsTeam) {
        return dataComplaintByMemberId?.complaints_aggregate?.aggregate?.count
      } else return 0
    }
  }

  return (
    <>
      <Head>
        <title>Dashboard: Danh sách khiếu nại | InfoFX</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            overflowX: 'scroll',
          }}
        >
          <ComplaintHeader isJoinedCsTeam={isJoinedCsTeam} />
          <Card
            sx={{
              overflowX: 'scroll',
            }}
          >
            <Divider />
            <ComplaintFilter
              ref={searchRef}
              initialSearch={initialSearch}
              filters={filters}
              exchangeOptions={exchangeOptions}
              csTeamOptions={csTeamOptions}
              handleByOptions={handleByOptions}
              categoryOptions={categoryOptions}
              statusOptions={statusOptions}
              onSearchChange={handleSearchChange}
              onCsTeamChange={handleCsTeamChange}
              onHandleByChange={handleByChange}
              onCategoryChange={handleCategoryChange}
              onExchangeChange={handleExchangeChange}
              onStatusChange={handleStatusChange}
              onSortChange={handleSortChange}
              onCancelRequestStatusChange={handleCancelRequestStatusChange}
              onClearFilters={handleClearFilters}
              onUnHandledByStatusChange={handleUnHandledByStatusChange}
              onHighlightChange={handleHighlightChange}
            />
            <ComplaintListTable
              dataComplaintOutSideTeam={dataComplaintOutSideTeam?.complaints}
              dataComplaintByMemberId={dataComplaintByMemberId?.complaints}
              complaints={dataComplaintsTransfer()}
              page={filters.page}
              totalRows={dataComplaintAggregateTransfer()}
              rowsPerPage={filters.limit}
              updateComplaintLoading={updateComplaintLoading}
              onPageChange={handlePageChange}
              onChangeHiddenComplaint={onChangeHiddenComplaint}
              onChangeHighlightComplaint={onChangeHighlightComplaint}
              onDeleteComplaint={onDeleteComplaint}
              onRowsPerPageChange={handleRowsPerPageChange}
              onUpdateComplaintStatus={handleUpdateComplaintStatus}
              onUploadContract={handleUploadContract}
              onUpdateCancelRequest={handleUpdateCancelRequest}
            />
          </Card>
        </Container>
      </Box>
    </>
  )
}

ComplaintList.getLayout = (page: ReactElement) => (
  <AuthGuard authorized={true}>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default ComplaintList
