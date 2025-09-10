import { useMutation, useQuery } from '@apollo/client'
import { AuthGuard } from '@app/components/authentication/auth-guard'
import { DashboardLayout } from '@app/components/dashboard/dashboard-layout'
import CreateEditLicenseSection from '@app/components/dashboard/licenses/create-edit-license-section'
import { FormActions } from '@app/constants/common'
import { useAuth } from '@app/hooks/use-auth'
import { DocumentaryEvidence } from '@app/interfaces/documentary-evidence'
import { License } from '@app/interfaces/license'
import { gtm } from '@app/lib/gtm'
import CREATE_DOCUMENTARY_EVIDENCE from '@app/operations/mutations/documentary-evidence/create-documentary-evidence'
import DELETE_DOCUMENTARY_EVIDENCE from '@app/operations/mutations/documentary-evidence/delete-documentary-evidence'
import UPDATE_LICENSE from '@app/operations/mutations/licenses/update-license'
import GET_LICENSE from '@app/operations/queries/licenses/get-license'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { toast } from 'react-hot-toast'

const LicenseEdit = () => {
  const router = useRouter()
  const auth = useAuth()
  const { licenseId, page, limit } = router.query

  const { data } = useQuery(GET_LICENSE, {
    variables: {
      licenseId,
    },
  })

  const [updateLicense] = useMutation(UPDATE_LICENSE)
  const [createDocumentaryEvidence] = useMutation(CREATE_DOCUMENTARY_EVIDENCE)
  const [deleteDocumentaryEvidence] = useMutation(DELETE_DOCUMENTARY_EVIDENCE)

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

    const addDocumentaryEvidences = documentary_evidences?.filter(
      (documentaryEvidence) => !documentaryEvidence.created_at
    )
    const removeDocumentaryEvidences = data?.license_by_pk?.documentary_evidences?.filter(
      (documentaryEvidence1: DocumentaryEvidence) =>
        !documentary_evidences?.some((documentaryEvidence2) => documentaryEvidence1 === documentaryEvidence2)
    )

    try {
      await updateLicense({
        variables: {
          ...other,
          licenseId,
          updated_by: auth.user.id,
          effective_date: effective_date !== '' ? effective_date : undefined,
          expiration_date: expiration_date !== '' ? expiration_date : undefined,
        },
        onCompleted: async () => {
          if (addDocumentaryEvidences && addDocumentaryEvidences?.length > 0) {
            addDocumentaryEvidences.map(async (documentaryEvidence) => {
              await createDocumentaryEvidence({
                variables: {
                  title: documentaryEvidence.title,
                  file: documentaryEvidence.file,
                  license_id: licenseId,
                },
              })
            })
          }

          if (removeDocumentaryEvidences && removeDocumentaryEvidences?.length > 0) {
            removeDocumentaryEvidences?.map(async (documentaryEvidence: { id: any }) => {
              await deleteDocumentaryEvidence({
                variables: {
                  id: documentaryEvidence.id,
                },
              })
            })
          }
        },
      })

      toast.success('Chỉnh sửa giấy phép thành công!')
      router.push({
        pathname: '/dashboard/licenses',
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
        <title>Dashboard: Cập nhập giấy phép| InfoFX</title>
      </Head>

      <CreateEditLicenseSection
        page={page as string}
        limit={limit as string}
        type={FormActions.UPDATE}
        license={data?.license_by_pk}
        handleLicenseFormSubmit={handleLicenseFormSubmit}
      />
    </>
  )
}

LicenseEdit.getLayout = (page: ReactElement) => (
  <AuthGuard authorized={true}>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default LicenseEdit
