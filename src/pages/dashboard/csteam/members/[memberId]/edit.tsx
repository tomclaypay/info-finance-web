import { useMutation, useQuery } from '@apollo/client'
import { AuthGuard } from '@app/components/authentication/auth-guard'
import CreateEditCsMemberSection from '@app/components/dashboard/csteam/member/member-section/create-edit-member-section'
import { DashboardLayout } from '@app/components/dashboard/dashboard-layout'
import { FormActions } from '@app/constants/common'
import { useAuth } from '@app/hooks/use-auth'
import { Complaint } from '@app/interfaces/complaint'
import { gtm } from '@app/lib/gtm'
import UPDATE_CS_MEMBER from '@app/operations/mutations/csteam/members/update-cs-member'
import GET_CS_MEMBER from '@app/operations/queries/csteam/members/get-cs-member-by-pk'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import toast from 'react-hot-toast'

const CsMemberEdit = () => {
  const router = useRouter()
  const auth = useAuth()
  const { memberId, page, limit } = router.query

  useEffect(() => {
    if (auth?.user?.role !== 'super_admin') {
      router.push('/dashboard/csteam/members')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.user?.role])

  const [updateCsMember] = useMutation(UPDATE_CS_MEMBER)
  const { data } = useQuery(GET_CS_MEMBER, {
    variables: {
      memberId,
    },
    skip: !memberId,
  })

  const handleCsMemberFormSubmit = async (formValues: Partial<Complaint>) => {
    try {
      await updateCsMember({
        variables: {
          ...formValues,
          id: data?.cs_member_by_pk?.user?.id,
        },
      })
      toast.success('Cập nhập thông tin thành công!')
      router.push({
        pathname: '/dashboard/csteam/members',
        query: {
          initialPage: page,
          initialLimit: limit,
        },
      })
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleOpenCreateCsMember = () => {
    router.push({
      pathname: '/dashboard/csteam/members/create',
      query: {
        initialPage: page,
        initialLimit: limit,
      },
    })
  }

  useEffect(() => {
    gtm.push({ event: 'page_view' })
  }, [])

  return (
    <>
      <Head>
        <title>Dashboard: User Update | InfoFX</title>
      </Head>
      <CreateEditCsMemberSection
        type={FormActions.UPDATE}
        leader={data?.cs_member_by_pk?.cs_team?.csLeader}
        user={data?.cs_member_by_pk?.user}
        handleCsMemberFormSubmit={handleCsMemberFormSubmit}
        handleOpenCreateCsMember={handleOpenCreateCsMember}
        page={page as string}
        limit={limit as string}
      />
    </>
  )
}

CsMemberEdit.getLayout = (page: ReactElement) => (
  <AuthGuard authorized={true}>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default CsMemberEdit
