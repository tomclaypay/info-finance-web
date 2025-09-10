import { useMutation, useQuery } from '@apollo/client'
import { useMobile } from '@app/components/common'
import ExchangeDetail from '@app/components/exchange/detail/ExchangeDetail'
import { MainLayout } from '@app/components/main-layout'
import { COMPLAINT_STATUS } from '@app/constants/complaint'
import { useAuth } from '@app/hooks/use-auth'
import { ComplaintListResponse } from '@app/interfaces/complaint'
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
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const ExchangeDetailPage = () => {
  const auth = useAuth()
  const router = useRouter()
  const { locale } = router
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
      },
    }
  )

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

  useEffect(() => {
    if (exchangeSlug) {
      router.push(`/${locale === 'vi' ? 'tra-cuu-san' : 'broker'}/${exchangeSlug}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exchangeSlug])

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        pt: isMobile ? 0 : 8,
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
          dataComplaints={dataComplaints}
          exchange={dataExchange?.exchanges?.[0]}
          handleOpenComment={handleOpenComment}
          handleCloseComment={handleCloseComment}
          openComment={openComment}
          valueTab={valueTab}
          handleChangeTab={handleChangeTab}
          dataFeedbacks={dataFeedbacks}
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
  )
}

ExchangeDetailPage.getLayout = (page: any) => <MainLayout>{page}</MainLayout>

export default ExchangeDetailPage

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'exchange', 'home-page'])),
      // Will be passed to the page component as props
    },
  }
}
