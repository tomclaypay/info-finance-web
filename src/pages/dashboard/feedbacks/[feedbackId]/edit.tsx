import { useMutation, useQuery } from '@apollo/client'
import { AuthGuard } from '@app/components/authentication/auth-guard'
import { DashboardLayout } from '@app/components/dashboard/dashboard-layout'
import CreateEditFeedbackSection from '@app/components/dashboard/feedbacks/feedback-section/create-edit-feedback-section'
import { FormActions } from '@app/constants/common'
import { Feedback } from '@app/interfaces/feedback'
import { gtm } from '@app/lib/gtm'
import UPDATE_FEEDBACK from '@app/operations/mutations/feedbacks/update-feedback'
import GET_FEEDBACK from '@app/operations/queries/feedbacks/get-feedback'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { toast } from 'react-hot-toast'

export interface ImageFiles {
  images: any[]
}

const FeedbackEdit = () => {
  const router = useRouter()
  const { feedbackId, page, limit } = router.query

  const { data } = useQuery(GET_FEEDBACK, {
    variables: {
      feedbackId,
    },
  })

  const [updateFeedback] = useMutation(UPDATE_FEEDBACK)

  const handleFeedbackFormSubmit = async (formValues: Partial<Feedback>) => {
    const { comment, point, hidden } = formValues
    try {
      await updateFeedback({
        variables: {
          feedbackId,
          point,
          comment,
          hidden,
        },
      })

      toast.success('Tạo review thành công!')
      router.push({
        pathname: '/dashboard/feedbacks',
        query: {
          initialPage: page,
          initialLimit: limit,
        },
      })
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    gtm.push({ event: 'page_view' })
  }, [])

  return (
    <>
      <Head>
        <title>Dashboard: Cập nhật sàn giao dịch | InfoFX</title>
      </Head>

      <CreateEditFeedbackSection
        feedback={data?.feedbacks_by_pk}
        type={FormActions.UPDATE}
        page={page as string}
        limit={limit as string}
        handleFeedbackFormSubmit={handleFeedbackFormSubmit}
      />
    </>
  )
}

FeedbackEdit.getLayout = (page: ReactElement) => (
  <AuthGuard authorized={true}>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default FeedbackEdit
