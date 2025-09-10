import { useMutation, useQuery } from '@apollo/client'
import { AuthGuard } from '@app/components/authentication/auth-guard'
import { DashboardLayout } from '@app/components/dashboard/dashboard-layout'
import FeedbackFilter from '@app/components/dashboard/feedbacks/feedback-table/feedbacks-filter'
import FeedbacksHeader from '@app/components/dashboard/feedbacks/feedback-table/feedbacks-header'
import FeedbackListTableDataGrid from '@app/components/dashboard/feedbacks/feedback-table/feedbacks-list-table-data-grid'
import { ExchangeListResponse } from '@app/interfaces/exchange'
import { Feedback, FeedbackListResponse } from '@app/interfaces/feedback'
import { SeederListResponse, UserListResponse } from '@app/interfaces/user'
import { gtm } from '@app/lib/gtm'
import UPDATE_FEEDBACK from '@app/operations/mutations/feedbacks/update-feedback'
import GET_EXCHANGES_OPTIONS from '@app/operations/queries/exchanges/get-exchanges-options'
import GET_FEEDBACKS from '@app/operations/queries/feedbacks/get-feedbacks'
import GET_SEEDERS from '@app/operations/queries/seeder/get-seeders'
import GET_USERS from '@app/operations/queries/users/get-users'
import { formatOptions, formatSeederOptions, formatUserOptions } from '@app/utils/common'
import { Box, Card, Container, debounce } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

interface IFieldFilter {
  point?: any
  seeder?: any
  user?: any
  exchange?: any
  comment?: any
}

const defaultSortParams = {
  point: undefined,
  comment: undefined,
  updated_at: undefined,
  created_at: 'desc_nulls_last',
}

const ListFeedbacks = () => {
  const router = useRouter()
  const initialSearch = router.query
  const [fieldFilter, setFieldFilter] = useState<IFieldFilter>({})
  const [filters, setFilters] = useState({
    page: initialSearch?.initialPage ? parseInt(initialSearch.initialPage as string) : 0,
    limit: initialSearch?.initialLimit ? parseInt(initialSearch.initialLimit as string) : 10,
    offset:
      initialSearch?.initialPage && initialSearch?.initialLimit
        ? parseInt(initialSearch.initialPage as string) * parseInt(initialSearch.initialLimit as string)
        : 0,
    sort: defaultSortParams,
  })

  const { data: feedbackData, refetch: refetchFeedbacks } = useQuery<FeedbackListResponse>(GET_FEEDBACKS, {
    variables: {
      limit: filters.limit,
      offset: filters.offset,
      order_by: filters.sort,
      where: fieldFilter,
    },
  })

  const { data: exchangeData } = useQuery<ExchangeListResponse>(GET_EXCHANGES_OPTIONS)
  const { data: usersData } = useQuery<UserListResponse>(GET_USERS, {
    variables: {
      where: { role: { _eq: 'user' } },
    },
  })

  const { data: seedersData } = useQuery<SeederListResponse>(GET_SEEDERS)
  const [updateFeedback] = useMutation(UPDATE_FEEDBACK)

  const handleCreateFeedback = () => {
    router.push('/dashboard/feedbacks/create')
  }

  const handleChangeHiddenFeedback = async (feedback: Feedback) => {
    try {
      await updateFeedback({
        variables: {
          feedbackId: feedback.id,
          comment: feedback.comment,
          point: feedback.point,
          hidden: !feedback.hidden,
        },
      })
      refetchFeedbacks()
      toast.success('Thao tác thành công')
    } catch (error: any) {
      toast.error(error.message)
    }
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

  const handleSortFromServer = (column: any) => {
    if (column?.length > 0) {
      const resultSort = column.reduce((total: any, item: { field: any; sort: string }) => {
        return {
          ...defaultSortParams,
          created_at: undefined,
          [item.field]: item.sort === 'asc' ? 'asc_nulls_first' : 'desc_nulls_last',
        }
      }, {})
      setFilters({ ...filters, sort: resultSort })
    } else {
      setFilters({ ...filters, sort: defaultSortParams })
    }
  }

  const handleSearchChangeExchangeName = debounce((event: any) => {
    const name = event?.label ? `%${event?.label.trim()}%` : ''
    const exchangeChange = { name: { _ilike: name } }
    setFieldFilter((filters) => {
      const { exchange, ...removedExchange } = filters
      console.log(exchange)
      return name ? { ...filters, exchange: exchangeChange } : removedExchange
    })
  }, 10)

  const handleSearchChangeUserName = debounce((event: any) => {
    const name = event?.label ? `%${event?.label.trim()}%` : ''
    const userNameChange = { displayName: { _ilike: name } }
    setFieldFilter((filters) => {
      const { user, ...removedUser } = filters
      console.log(user)
      return name ? { ...filters, user: userNameChange } : removedUser
    })
  }, 10)

  const handleSearchChangeSeederName = debounce((event: any) => {
    const name = event?.label ? `%${event?.label.trim()}%` : ''
    const seederNameChange = { fullname: { _ilike: name } }
    setFieldFilter((filters) => {
      const { seeder, ...removedSeeder } = filters
      console.log(seeder)
      return name ? { ...filters, seeder: seederNameChange } : removedSeeder
    })
  }, 10)

  const handleSearchChangeComment = debounce((event: ChangeEvent<HTMLInputElement>) => {
    const name = event?.target?.value ? `%${event?.target?.value.trim()}%` : ''
    const commentChange = { _ilike: name }
    setFieldFilter((filters) => {
      const { comment, ...removedComment } = filters
      console.log(comment)
      return name ? { ...filters, comment: commentChange } : removedComment
    })
  }, 300)

  const handleSearchChangePoint = debounce((event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event?.target?.value)
    const pointChange = { _eq: value }
    setFieldFilter((filters) => {
      const { point, ...removedPoint } = filters
      console.log(point)
      return value ? { ...filters, point: pointChange } : removedPoint
    })
  }, 300)

  const exchangeOptions = formatOptions(exchangeData?.exchanges)
  const userNameOptions = formatUserOptions(usersData?.users)
  const seederNameOptions = formatSeederOptions(seedersData?.seeders)

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
          <FeedbacksHeader handleCreateFeedback={handleCreateFeedback} />
          <Card>
            <FeedbackFilter
              onSearchChangeExchangeName={handleSearchChangeExchangeName}
              onSearchChangeUserName={handleSearchChangeUserName}
              onSearchChangeSeederName={handleSearchChangeSeederName}
              onSearchChangePoint={handleSearchChangePoint}
              onSearchChangeComment={handleSearchChangeComment}
              initialSearch={initialSearch}
              exchangeOptions={exchangeOptions}
              userNameOptions={userNameOptions}
              seederNameOptions={seederNameOptions}
            />

            <FeedbackListTableDataGrid
              feedbacks={feedbackData?.feedbacks}
              totalRows={feedbackData?.feedbacks_aggregate?.aggregate.count}
              rowsPerPage={filters.limit}
              page={filters.page}
              handleSortFromServer={handleSortFromServer}
              onPaginationModelChange={handlePaginationModelChange}
              handleChangeHiddenFeedback={handleChangeHiddenFeedback}
            />
          </Card>
        </Container>
      </Box>
    </>
  )
}

ListFeedbacks.getLayout = (page: ReactElement) => (
  <AuthGuard authorized={true}>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default ListFeedbacks
