import { useMutation, useQuery } from '@apollo/client'
import { useMobile } from '@app/components/common'
import ExchangeDetail from '@app/components/exchange/detail/ExchangeDetail'
import { MainLayout } from '@app/components/main-layout'
import { domain } from '@app/constants/common'
import { COMPLAINT_STATUS } from '@app/constants/complaint'
import { client } from '@app/contexts/apollo-client-context'
import { useAuth } from '@app/hooks/use-auth'
import { ComplaintListResponse, OrderComplaintType } from '@app/interfaces/complaint'
import { FeedbackListResponse } from '@app/interfaces/feedback'
import DELETE_FEEDBACK from '@app/operations/mutations/exchanges/delete-feedback'
import CREATE_FEEDBACK from '@app/operations/mutations/feedbacks/create-feedback'
import UPDATE_FEEDBACK from '@app/operations/mutations/feedbacks/update-feedback'
import GET_COMPLAINTS_BY_EXCHANGE from '@app/operations/queries/complaints/get-complaints-by-exchange'
import GET_EXCHANGE_BY_SLUG from '@app/operations/queries/exchanges/get-exchange-by-slug'
import GET_FEEDBACKS_BY_EXCHANGE_ID from '@app/operations/queries/feedbacks/get-feedbacks-by-exchangeId'
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from '@mui/material'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

const ExchangeDetailPage = ({ exchangeSEO }: any) => {
  const auth = useAuth()
  const router = useRouter()
  const locale = router.locale
  const { exchangeSlug } = router.query
  const { t } = useTranslation(['exchange', 'common'])
  const isMobile = useMobile()
  const [openComment, setOpenComment] = useState(false)
  const [valueTab, setValueTab] = useState('overview')
  const [notify, setNotify] = useState({
    open: false,
    title: 'Gửi đánh giá thành công',
    message: 'Cảm ơn bạn đã chia sẻ đánh giá của mình',
  })

  const [createFeedback] = useMutation(CREATE_FEEDBACK)
  const [updateFeedback] = useMutation(UPDATE_FEEDBACK)
  const [deleteFeedback] = useMutation(DELETE_FEEDBACK)

  const {
    data: dataExchange,
    loading: loadingExchange,
    refetch: refetchExchange,
  } = useQuery(GET_EXCHANGE_BY_SLUG, {
    variables: {
      exchangeSlug,
    },
  })

  const { data: dataFeedbacks, refetch: refetchFeedback } = useQuery<FeedbackListResponse>(
    GET_FEEDBACKS_BY_EXCHANGE_ID,
    {
      variables: {
        where: { exchange_id: { _eq: dataExchange?.exchanges?.[0]?.id }, hidden: { _eq: false } },
      },
    }
  )

  const [orderComplaintType, setOrderComplaintType] = useState<OrderComplaintType>('LATEST')
  const { data: dataComplaints, fetchMore: fetchMoreComplaints } = useQuery<ComplaintListResponse>(
    GET_COMPLAINTS_BY_EXCHANGE,
    {
      variables: {
        where: {
          exchangeId: { _eq: dataExchange?.exchanges?.[0]?.id },
          status: {
            _nin: [
              COMPLAINT_STATUS.PENDING,
              COMPLAINT_STATUS.ACCEPTED,
              COMPLAINT_STATUS.REJECTED,
              COMPLAINT_STATUS.DECLINED,
            ],
          },
          hidden: {
            _eq: false,
          },
        },
        limit: 5,
        offset: 0,
        orderBy:
          orderComplaintType === 'OLDEST'
            ? [
                {
                  createdAt: 'asc_nulls_last',
                },
              ]
            : [
                {
                  createdAt: 'desc_nulls_last',
                },
              ],
      },
    }
  )
  const handleChangeFilterComplaintType = (orderType: OrderComplaintType) => {
    setOrderComplaintType(orderType)
  }

  const handleOpenComment = () => {
    setOpenComment(true)
  }

  const handleCloseComment = () => {
    setOpenComment(false)
  }

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValueTab(newValue)
  }

  const handleFetchMoreComplaints = () => {
    fetchMoreComplaints({
      variables: {
        offset: dataComplaints?.complaints.length,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        fetchMoreResult.complaints = [...prevResult.complaints, ...fetchMoreResult.complaints]
        return fetchMoreResult
      },
    })
  }

  const handleCreateCommentSubmit = async (formValue: { rating: any; comment: string; hidden: boolean }) => {
    if (formValue && dataExchange?.exchanges?.[0]?.id && auth.user.id) {
      try {
        await createFeedback({
          variables: {
            exchangeId: dataExchange?.exchanges?.[0]?.id,
            userId: auth.user.id,
            point: formValue.rating,
            comment: formValue.comment,
            hidden: formValue.hidden,
          },
        })
        setValueTab('review')
        refetchFeedback()
        refetchExchange()
        setOpenComment(false)
        setNotify({ open: true, title: t('comment.sendSuccess'), message: t('comment.editThanks') })
      } catch (error) {
        console.log(error)
        setNotify({ open: true, title: t('comment.sendFailed'), message: t('comment.editAgain') })
      }
    }
  }

  const handleUpdateCommentSubmit = async (
    formValue: { rating: any; comment: string; hidden: boolean },
    feedbackId: string
  ) => {
    if (formValue && dataExchange?.exchanges?.[0]?.id && auth.user.id && feedbackId) {
      try {
        await updateFeedback({
          variables: {
            feedbackId,
            point: formValue.rating,
            comment: formValue.comment,
            hidden: formValue.hidden,
          },
        })
        setValueTab('review')
        refetchFeedback()
        refetchExchange()
        setOpenComment(false)
        setNotify({
          open: true,
          title: t('comment.editSuccess'),
          message: t('comment.editThanks'),
        })
      } catch (error) {
        console.log(error)
        setNotify({ open: true, title: t('comment.editFailed'), message: t('comment.editAgain') })
      }
    }
  }

  const handleDeleteCommentSubmit = async (feedbackId: string) => {
    if (feedbackId) {
      try {
        await deleteFeedback({
          variables: {
            feedbackId,
          },
        })
        setValueTab('review')
        refetchFeedback()
        refetchExchange()
        setOpenComment(false)
        setNotify({ open: true, title: t('comment.deleteSuccess'), message: t('comment.deleteThanks') })
      } catch (error) {
        console.log(error)
        setNotify({ open: true, title: t('comment.deleteFailed'), message: t('comment.deleteAgain') })
      }
    }
  }

  if (loadingExchange || dataExchange?.exchanges?.[0]) {
    return (
      <>
        <Head>
          {router.locale === 'vi' ? (
            <title>{`Tổng hợp các đánh giá về sàn ${exchangeSEO?.name} chi tiết nhất. - Info Finance`}</title>
          ) : (
            <title>{`Compiling Most Detailed Information of ${exchangeSEO?.name} - Info Finance`}</title>
          )}
          <meta
            name="description"
            content={
              router.locale === 'vi'
                ? `Info Finance tổng hợp thông tin đánh giá về sàn giao dịch ${exchangeSEO?.name} chi tiết nhất và các phản ánh từ người dùng.`
                : `Info Finance aggregates most relevant assessments regarding ${exchangeSEO?.name} exchange along with users' complaints.`
            }
          />
          <meta
            name="og:title"
            content={
              router.locale === 'vi'
                ? `Đánh giá về sàn ${exchangeSEO?.name} có lừa đảo không? Tổng hợp thông tin về sàn ${exchangeSEO?.name} chi tiết nhất.`
                : `Assessing the probability of fraudulent acts performed by ${exchangeSEO?.name} exchange. Compiling most detailed information of ${exchangeSEO?.name} exchange.`
            }
          />
          <meta property="og:image" content={`${exchangeSEO?.logo}`} key="image" />
          <link
            rel="canonical"
            href={`${locale === 'vi' ? domain.vi + 'tra-cuu-san' : domain.en + 'broker'}/${
              router.query?.exchangeSlug || ''
            }`}
          />
        </Head>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: isMobile ? 0 : 3,
            pb: 8,
          }}
        >
          {loadingExchange && (
            <Stack alignItems="center" justifyContent="center">
              <CircularProgress />
            </Stack>
          )}

          {dataExchange?.exchanges?.[0] && (
            <ExchangeDetail
              handleCreateCommentSubmit={handleCreateCommentSubmit}
              handleUpdateCommentSubmit={handleUpdateCommentSubmit}
              handleDeleteCommentSubmit={handleDeleteCommentSubmit}
              handleFetchMoreComplaints={handleFetchMoreComplaints}
              handleChangeFilterComplaintType={handleChangeFilterComplaintType}
              dataComplaints={dataComplaints}
              exchange={dataExchange?.exchanges?.[0]}
              handleOpenComment={handleOpenComment}
              handleCloseComment={handleCloseComment}
              openComment={openComment}
              valueTab={valueTab}
              handleChangeTab={handleChangeTab}
              dataFeedbacks={dataFeedbacks}
              orderComplaintType={orderComplaintType}
              // dataSupervisories={dataSupervisories?.supervisories}
            />
          )}
          <Dialog
            open={notify.open}
            onClose={() => setNotify({ open: false, message: '', title: '' })}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle sx={{ textTransform: 'capitalize', textAlign: 'center' }}>{notify?.title}</DialogTitle>
            <DialogContent>
              <DialogContentText>{notify.message}</DialogContentText>
            </DialogContent>

            <DialogActions>
              <Button fullWidth variant="outlined" onClick={() => setNotify({ open: false, message: '', title: '' })}>
                {t('comment.close')}
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </>
    )
  } else {
    router.push('/404')
  }
}

ExchangeDetailPage.getLayout = (page: any) => <MainLayout>{page}</MainLayout>

export default ExchangeDetailPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale = '', params } = context
  try {
    const exchangeSlug = params?.exchangeSlug
    const exchangeResponse = await client.query({ query: GET_EXCHANGE_BY_SLUG, variables: { exchangeSlug } })
    const { name, logo, hidden } = exchangeResponse?.data?.exchanges?.[0] ?? {}

    if (hidden) {
      return {
        notFound: true,
      }
    }
    const exchangeSEO = {
      name,
      logo:
        logo ||
        'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Screenshot_2018_12_16_at_21_06_29_f07726afef.png?updated_at=2022-11-30T08:25:12.500Z',
    }
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common', 'exchange', 'home-page'])),
        exchangeSEO,
      },
    }
  } catch (e) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common', 'exchange', 'home-page'])),
      },
    }
  }
}
