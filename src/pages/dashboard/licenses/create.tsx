import { useMutation } from '@apollo/client'
import { AuthGuard } from '@app/components/authentication/auth-guard'
import { DashboardLayout } from '@app/components/dashboard/dashboard-layout'
import CreateEditLicenseSection from '@app/components/dashboard/licenses/create-edit-license-section'
import { FormActions } from '@app/constants/common'
import { License } from '@app/interfaces/license'
import { gtm } from '@app/lib/gtm'
import CREATE_DOCUMENTARY_EVIDENCE from '@app/operations/mutations/documentary-evidence/create-documentary-evidence'
import CREATE_LICENSE from '@app/operations/mutations/licenses/create-license'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { toast } from 'react-hot-toast'

const CreateSupervisor = () => {
  const [createLicense] = useMutation(CREATE_LICENSE)
  const [createDocumentaryEvidence] = useMutation(CREATE_DOCUMENTARY_EVIDENCE)
  const router = useRouter()

  const handleLicenseFormSubmit = async (formValues: Partial<License>) => {
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      exchange_name,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      supervisory_authority_name,
      documentary_evidences,
      effective_date,
      expiration_date,
      ...other
    } = formValues

    try {
      await createLicense({
        variables: {
          ...other,
          effective_date: effective_date !== null ? effective_date : undefined,
          expiration_date: expiration_date !== null ? expiration_date : undefined,
        },
        onCompleted: async (data) => {
          if (documentary_evidences && documentary_evidences?.length > 0) {
            documentary_evidences.map(async (documentary) => {
              await createDocumentaryEvidence({
                variables: {
                  file: documentary.file?.[0],
                  title: documentary.title,
                  license_id: data.insert_license_one.id,
                },
              })
            })
          }
        },
      })

      toast.success('Tạo giấy phép thành công!')
      router.push('/dashboard/licenses')
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
        <title>Dashboard: Tạo giấy phép sàn giao dịch | InfoFX</title>
      </Head>
      <CreateEditLicenseSection
        page="0"
        limit="10"
        type={FormActions.CREATE}
        handleLicenseFormSubmit={handleLicenseFormSubmit}
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
