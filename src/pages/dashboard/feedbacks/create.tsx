import { useMutation } from '@apollo/client'
import { AuthGuard } from '@app/components/authentication/auth-guard'
import { DashboardLayout } from '@app/components/dashboard/dashboard-layout'
import CreateEditFeedbackSection from '@app/components/dashboard/feedbacks/feedback-section/create-edit-feedback-section'
import { FormActions } from '@app/constants/common'
import { Feedback } from '@app/interfaces/feedback'
import { gtm } from '@app/lib/gtm'
import CREATE_FEEDBACK from '@app/operations/mutations/feedbacks/create-feedback'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { toast } from 'react-hot-toast'

export interface UploadFileRef {
  handleUploadFiles: () => Promise<string[] | undefined>
}

const FeedbackCreate = () => {
  const router = useRouter()

  const [createFeedback] = useMutation(CREATE_FEEDBACK)

  const handleFeedbackFormSubmit = async (formValues: Partial<Feedback>) => {
    const { exchangeId, userId, seederId, point, comment, hidden } = formValues
    try {
      await createFeedback({
        variables: {
          exchangeId,
          userId,
          seederId,
          point,
          comment,
          hidden,
        },
      })

      toast.success('Tạo review thành công!')
      router.push('/dashboard/feedbacks')
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
        <title>Dashboard: Feedback Create | InfoFX</title>
      </Head>
      <CreateEditFeedbackSection
        page="0"
        limit="10"
        type={FormActions.CREATE}
        handleFeedbackFormSubmit={handleFeedbackFormSubmit}
      />
    </>
  )
}

FeedbackCreate.getLayout = (page: ReactElement) => (
  <AuthGuard authorized={true}>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default FeedbackCreate
