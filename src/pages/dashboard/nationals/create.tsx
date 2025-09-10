import { useMutation } from '@apollo/client'
import { AuthGuard } from '@app/components/authentication/auth-guard'
import { DashboardLayout } from '@app/components/dashboard/dashboard-layout'
import CreateEditNationalSection from '@app/components/dashboard/nationals/create-edit-national-section'
import { FormActions, OBJECT_TYPE, UPLOAD_TYPE } from '@app/constants/common'
import useUploadFile from '@app/hooks/use-upload-file'
import { National } from '@app/interfaces/national'
import { gtm } from '@app/lib/gtm'
import CREATE_NATIONAL from '@app/operations/mutations/nationals/create-national'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { toast } from 'react-hot-toast'

const CreateNational = () => {
  const { handleUploadFiles } = useUploadFile({ objectType: OBJECT_TYPE.BANNER, type: UPLOAD_TYPE.IMAGE })
  const [createNational] = useMutation(CREATE_NATIONAL)
  const router = useRouter()

  const handleNationalFormSubmit = async (formValues: Partial<National>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { logo, ...other } = formValues
    const image = await handleUploadFiles(logo)

    try {
      await createNational({
        variables: {
          ...other,
          logo: image?.[0],
        },
      })

      toast.success('Tạo quốc gia thành công!')
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
        <title>Dashboard: Tạo quốc gia | InfoFX</title>
      </Head>
      <CreateEditNationalSection
        page="0"
        limit="10"
        type={FormActions.CREATE}
        handleNationalFormSubmit={handleNationalFormSubmit}
      />
    </>
  )
}

CreateNational.getLayout = (page: ReactElement) => (
  <AuthGuard authorized>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default CreateNational
