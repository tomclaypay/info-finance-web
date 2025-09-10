import { useMutation } from '@apollo/client'
import { AuthGuard } from '@app/components/authentication/auth-guard'
import { DashboardLayout } from '@app/components/dashboard/dashboard-layout'
import CreateEditSupervisorSection from '@app/components/dashboard/supervisories/create-edit-supervisor-section'
import { FormActions, OBJECT_TYPE, UPLOAD_TYPE } from '@app/constants/common'
import useUploadFile from '@app/hooks/use-upload-file'
import { Supervisor } from '@app/interfaces/supervisor'
import { gtm } from '@app/lib/gtm'
import CREATE_SUPERVISOR from '@app/operations/mutations/supervisories/create-supervisor'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { toast } from 'react-hot-toast'

const CreateSupervisor = () => {
  const { handleUploadFiles } = useUploadFile({ objectType: OBJECT_TYPE.BANNER, type: UPLOAD_TYPE.IMAGE })
  const [createSupervisor] = useMutation(CREATE_SUPERVISOR)
  const router = useRouter()

  const handleSupervisorFormSubmit = async (formValues: Partial<Supervisor>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { logo, icon, ...other } = formValues
    const imageLogo = await handleUploadFiles(logo)
    const imageIcon = await handleUploadFiles(icon)

    try {
      await createSupervisor({
        variables: {
          ...other,
          logo: imageLogo?.[0],
          icon: imageIcon?.[0],
        },
      })

      toast.success('Tạo cơ quan giám sát quản lý thành công!')
      router.push('/dashboard/supervisories')
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
        <title>Dashboard: Tạo cơ quan giám sát | InfoFX</title>
      </Head>
      <CreateEditSupervisorSection
        page="0"
        limit="10"
        type={FormActions.CREATE}
        handleSupervisorFormSubmit={handleSupervisorFormSubmit}
      />
    </>
  )
}

CreateSupervisor.getLayout = (page: ReactElement) => (
  <AuthGuard authorized>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default CreateSupervisor
