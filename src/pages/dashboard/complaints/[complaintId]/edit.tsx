import { useMutation, useQuery } from '@apollo/client'
import { AuthGuard } from '@app/components/authentication/auth-guard'
import CreateEditComplaintSection from '@app/components/dashboard/complaints/create-edit-complaint-section'
import { DashboardLayout } from '@app/components/dashboard/dashboard-layout'
import { FormActions, OBJECT_TYPE, UPLOAD_TYPE } from '@app/constants/common'
import { useAuth } from '@app/hooks/use-auth'
import useUploadFile from '@app/hooks/use-upload-file'
import { Complaint, ComplaintListResponse } from '@app/interfaces/complaint'
import { CsMembersListResponse } from '@app/interfaces/cs-member'
import { CsTeamsListResponse } from '@app/interfaces/cs-team'
import { gtm } from '@app/lib/gtm'
import UPDATE_COMPLAINT from '@app/operations/mutations/complaints/update-complaint'
import GET_COMPLAINT_DETAILS from '@app/operations/queries/complaints/get-complaint-details'
import GET_CS_MEMBERS from '@app/operations/queries/csteam/members/get-cs-members'
import GET_CS_TEAM_BY_LEADER from '@app/operations/queries/csteam/teams/get-cs-team-by-leader'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export interface ImageFiles {
  images: any[]
}

const ComplaintEdit = () => {
  const router = useRouter()
  const { handleUploadFiles } = useUploadFile({ objectType: OBJECT_TYPE.COMPLAINT, type: UPLOAD_TYPE.IMAGE })
  const { complaintId, handledByMemberId, page, limit } = router.query
  const auth = useAuth()

  const handler = handledByMemberId === 'true' ? true : false

  const [imageFiles, setImageFiles] = useState<ImageFiles>({
    images: [],
  })

  const { data } = useQuery<ComplaintListResponse>(GET_COMPLAINT_DETAILS, {
    variables: {
      id: complaintId,
    },
    skip: !complaintId,
  })

  const { data: dataCsHandleByOptions, refetch: refetchDataMembers } = useQuery<CsMembersListResponse>(GET_CS_MEMBERS, {
    variables: {
      where: {},
    },
    skip: !auth.isAuthenticated,
  })

  const { data: dataCsTeams } = useQuery<CsTeamsListResponse>(GET_CS_TEAM_BY_LEADER, {
    variables: {
      userId: auth?.user?.id,
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

  const [updateComplaint] = useMutation<Partial<Complaint>>(UPDATE_COMPLAINT)

  const handleComplaintFormSubmit = async (formValues: Partial<Complaint>) => {
    try {
      const {
        description,
        title,
        fullname,
        email,
        phone,
        exchangeId,
        website,
        complaintCategoryId,
        images,
        handle_by,
        hidden,
        highlight_on_broker,
        slug,
      } = formValues

      const newImages = imageFiles?.images?.length > 0 && (await handleUploadFiles(imageFiles?.images))

      await updateComplaint({
        variables: {
          complaintId,
          description,
          title,
          fullname,
          email,
          phone,
          exchangeId,
          website,
          hidden,
          highlight_on_broker,
          complaintCategoryId,
          slug,
          images: newImages ? images?.concat(newImages) : images,
          handler_by_member_id: handle_by?.id || null,
        },
      })
      toast.success('Cập nhật khiếu nại thành công!')
      router.push({
        pathname: '/dashboard/complaints',
        query: {
          initialPage: page,
          initialLimit: limit,
        },
      })
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

  useEffect(() => {
    gtm.push({ event: 'page_view' })
  }, [])

  return (
    <>
      <Head>
        <title>Dashboard: Cập nhật khiếu nại | InfoFX</title>
      </Head>
      <CreateEditComplaintSection
        isJoinedCsTeam={auth?.user?.role !== 'super_admin' && dataCsTeams?.cs_team.length === 0 ? false : true}
        type={FormActions.UPDATE}
        page={page as string}
        limit={limit as string}
        handler={handler}
        complaint={data?.complaints[0]}
        handleComplaintFormSubmit={handleComplaintFormSubmit}
        dataCsHandleByOptions={dataCsHandleByOptions?.cs_member}
        handleChangeFiles={handleChangeFiles}
        imageFiles={imageFiles}
      />
    </>
  )
}

ComplaintEdit.getLayout = (page: ReactElement) => (
  <AuthGuard authorized={true}>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default ComplaintEdit
