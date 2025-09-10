import { useMutation, useQuery } from '@apollo/client'
import { AuthGuard } from '@app/components/authentication/auth-guard'
import { DashboardLayout } from '@app/components/dashboard/dashboard-layout'
import CreateEditNationalSection from '@app/components/dashboard/nationals/create-edit-national-section'
import { FormActions, OBJECT_TYPE, UPLOAD_TYPE } from '@app/constants/common'
import useUploadFile from '@app/hooks/use-upload-file'
import { National } from '@app/interfaces/national'
import { gtm } from '@app/lib/gtm'
import UPDATE_NATIONAL from '@app/operations/mutations/nationals/update-national'
import GET_NATIONAL from '@app/operations/queries/nationals/get-national'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { toast } from 'react-hot-toast'

const NationalEdit = () => {
  const router = useRouter()
  const { nationalId, page, limit } = router.query
  const { data } = useQuery(GET_NATIONAL, {
    variables: {
      nationalId,
    },
  })

  const [updateNational] = useMutation(UPDATE_NATIONAL)

  const { handleUploadFiles } = useUploadFile({ objectType: OBJECT_TYPE.BANNER, type: UPLOAD_TYPE.IMAGE })

  const handleNationalFormSubmit = async (formValues: Partial<National>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { logo, ...other } = formValues
    const newLogo = typeof logo !== 'string' && (await handleUploadFiles(logo))

    try {
      await updateNational({
        variables: {
          ...other,
          logo: newLogo ? newLogo?.[0] : logo,
          nationalId,
        },
      })

      toast.success('Chỉnh sửa thông quốc gia thành công!')
      router.push('/dashboard/nationals')
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
        <title>Dashboard: Cập nhập quốc gia | InfoFX</title>
      </Head>

      <CreateEditNationalSection
        page={page as string}
        limit={limit as string}
        type={FormActions.UPDATE}
        national={data?.national_by_pk}
        handleNationalFormSubmit={handleNationalFormSubmit}
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
