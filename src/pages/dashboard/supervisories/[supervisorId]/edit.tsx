import { useMutation, useQuery } from '@apollo/client'
import { AuthGuard } from '@app/components/authentication/auth-guard'
import { DashboardLayout } from '@app/components/dashboard/dashboard-layout'
import CreateEditSupervisorSection from '@app/components/dashboard/supervisories/create-edit-supervisor-section'
import { FormActions, OBJECT_TYPE, UPLOAD_TYPE } from '@app/constants/common'
import useUploadFile from '@app/hooks/use-upload-file'
import { Supervisor } from '@app/interfaces/supervisor'
import { gtm } from '@app/lib/gtm'
import UPDATE_SUPERVISOR from '@app/operations/mutations/supervisories/update-supervisor'
import GET_SUPERVISOR from '@app/operations/queries/supervisories/get-supervisor'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { toast } from 'react-hot-toast'

const NationalEdit = () => {
  const router = useRouter()
  const { supervisorId, page, limit } = router.query

  const { data } = useQuery(GET_SUPERVISOR, {
    variables: {
      supervisorId,
    },
  })

  const [updateSupervisor] = useMutation(UPDATE_SUPERVISOR)

  const { handleUploadFiles } = useUploadFile({ objectType: OBJECT_TYPE.BANNER, type: UPLOAD_TYPE.IMAGE })

  const handleSupervisorFormSubmit = async (formValues: Partial<Supervisor>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { logo, icon, ...other } = formValues
    const newLogo = typeof logo !== 'string' && (await handleUploadFiles(logo))
    const newIcon = typeof icon !== 'string' && (await handleUploadFiles(icon))

    try {
      await updateSupervisor({
        variables: {
          ...other,
          logo: newLogo ? newLogo?.[0] : logo,
          icon: newIcon ? newIcon?.[0] : icon,
          supervisorId,
        },
      })

      toast.success('Chỉnh sửa cơ sở quản lý giám sát thành công!')
      router.push({
        pathname: '/dashboard/supervisories',
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
        <title>Dashboard: Cập nhập cơ sở quản lý giám sát| InfoFX</title>
      </Head>

      <CreateEditSupervisorSection
        type={FormActions.UPDATE}
        supervisor={data?.supervisory_authority_by_pk}
        handleSupervisorFormSubmit={handleSupervisorFormSubmit}
        page={page as string}
        limit={limit as string}
      />
    </>
  )
}

NationalEdit.getLayout = (page: ReactElement) => (
  <AuthGuard authorized={true}>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default NationalEdit
