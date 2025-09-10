import { useMutation, useQuery } from '@apollo/client'
import { AuthGuard } from '@app/components/authentication/auth-guard'
import CreateEditComplaintSection from '@app/components/dashboard/complaints/create-edit-complaint-section'
import { DashboardLayout } from '@app/components/dashboard/dashboard-layout'
import { FormActions, OBJECT_TYPE, UPLOAD_TYPE } from '@app/constants/common'
import { useAuth } from '@app/hooks/use-auth'
import useUploadFile from '@app/hooks/use-upload-file'
import { Complaint } from '@app/interfaces/complaint'
import { CsMembersListResponse } from '@app/interfaces/cs-member'
import { CsTeamsListResponse } from '@app/interfaces/cs-team'
import { gtm } from '@app/lib/gtm'
import ADMIN_CREATE_COMPLAINT from '@app/operations/mutations/complaints/admin-create-complaint'
import GET_CS_MEMBERS from '@app/operations/queries/csteam/members/get-cs-members'
import GET_CS_TEAM_BY_LEADER from '@app/operations/queries/csteam/teams/get-cs-team-by-leader'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export interface ImageFiles {
  images: any[]
}

const ComplaintCreate = () => {
  const router = useRouter()
  const auth = useAuth()
  const { handleUploadFiles } = useUploadFile({ objectType: OBJECT_TYPE.COMPLAINT, type: UPLOAD_TYPE.IMAGE })
  const [imageFiles, setImageFiles] = useState<ImageFiles>({
    images: [],
  })
  const [adminCreateComplaint] = useMutation<Partial<Complaint>>(ADMIN_CREATE_COMPLAINT)

  const { data: dataCsHandleByOptions, refetch: refetchDataMembers } = useQuery<CsMembersListResponse>(GET_CS_MEMBERS, {
    variables: {
      where: {},
    },
    skip: !auth.isAuthenticated,
  })

  useEffect(() => {
    if (auth?.user?.role === 'super_admin') {
      refetchDataMembers({
        where: { cs_team_id: { _is_null: false } },
      })
    }

    if (auth?.user?.role === 'leader') {
      refetchDataMembers({
        where: {
          cs_team: {
            cs_members: {
              user_id: {
                _eq: auth?.user.id,
              },
            },
          },
        },
      })
    }

    if (auth?.user?.role === 'member') {
      refetchDataMembers({
        where: { user_id: { _eq: auth?.user.id } },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.user])

  const handleComplaintFormSubmit = async (formValues: Partial<Complaint>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { handle_by, exchangeName, ...other } = formValues

    try {
      const images = (imageFiles?.images?.length > 0 && (await handleUploadFiles(imageFiles?.images))) || []

      await adminCreateComplaint({
        variables: {
          ...other,
          handler_by_member_id: handle_by?.id,
          images,
        },
      })

      toast.success('Tạo khiếu nại thành công!')
      router.push('/dashboard/complaints')
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleChangeFiles = (event: any, type: string, name: string) => {
    if (type === 'addImg' && event.target.files.length > 0) {
      const files = event.target.files as FileList
      setImageFiles({ ...imageFiles, [name]: imageFiles[name as keyof typeof imageFiles].concat([...(files || [])]) })
    }

    if (type === 'removeImg') {
      const files = event?.images as FileList
      setImageFiles({ ...imageFiles, [name]: [...(files || [])] })
    }
  }

  const { data: dataCsTeams } = useQuery<CsTeamsListResponse>(GET_CS_TEAM_BY_LEADER, {
    variables: {
      userId: auth?.user?.id,
    },
    skip: !auth.isAuthenticated,
  })

  useEffect(() => {
    gtm.push({ event: 'page_view' })
  }, [])

  return (
    <>
      <Head>
        <title>Dashboard: Complaint Create | InfoFX</title>
      </Head>
      <CreateEditComplaintSection
        isJoinedCsTeam={auth?.user?.role !== 'super_admin' && dataCsTeams?.cs_team.length === 0 ? false : true}
        type={FormActions.CREATE}
        handleComplaintFormSubmit={handleComplaintFormSubmit}
        dataCsHandleByOptions={dataCsHandleByOptions?.cs_member}
        imageFiles={imageFiles}
        handleChangeFiles={handleChangeFiles}
        page="0"
        limit="10"
      />
    </>
  )
}

ComplaintCreate.getLayout = (page: ReactElement) => (
  <AuthGuard authorized={true}>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default ComplaintCreate
