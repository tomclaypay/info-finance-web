import { useMutation, useQuery } from '@apollo/client'
import { AuthGuard } from '@app/components/authentication/auth-guard'
import CreateEditCsTeamSection from '@app/components/dashboard/csteam/team/team-section/create-edit-team-section'
import { DashboardLayout } from '@app/components/dashboard/dashboard-layout'
import { FormActions } from '@app/constants/common'
import { useAuth } from '@app/hooks/use-auth'
import { CsMembersListResponse } from '@app/interfaces/cs-member'
import { gtm } from '@app/lib/gtm'
import UPDATE_CS_TEAM from '@app/operations/mutations/csteam/teams/update-cs-team'
import GET_CS_MEMBERS from '@app/operations/queries/csteam/members/get-cs-members'
import GET_CS_TEAM_BY_PK from '@app/operations/queries/csteam/teams/get-cs-team-by-pk'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import toast from 'react-hot-toast'

const CsTeamEdit = () => {
  const router = useRouter()
  const auth = useAuth()
  const { teamId, page, limit } = router.query

  useEffect(() => {
    if (auth?.user?.role !== 'super_admin') {
      router.push('/dashboard/csteam/members')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.user?.role])

  const [updateCsTeam] = useMutation(UPDATE_CS_TEAM)

  const { data: dataTeam } = useQuery(GET_CS_TEAM_BY_PK, {
    variables: {
      teamId,
    },
  })

  const { data: dataCsMembers } = useQuery<CsMembersListResponse>(GET_CS_MEMBERS, {
    variables: {
      where: { cs_team_id: { _is_null: true } },
    },
  })

  const transferDataCsMembers = (formValues: any) => {
    const dataCsMembers = formValues?.csMembers?.reduce(
      (total: any, current: { user: { id: string } }) => [...total, { user_id: current.user.id }],
      [{ user_id: formValues?.csLeader?.user?.id }]
    )

    const dataCsMembersNoLeader = formValues?.csMembers?.reduce(
      (total: any, current: { user: { id: string } }) => [...total, { user_id: current.user.id }],
      []
    )

    if (formValues?.csLeader?.user?.id) {
      return dataCsMembers
    } else return dataCsMembersNoLeader
  }

  const handleCsTeamUpdateFormSubmit = async (formValues: any) => {
    const dataCsMembers = transferDataCsMembers(formValues)
    try {
      await updateCsTeam({
        variables: { name: formValues.name, teamId, dataCsMembers },
      })
      toast.success('Cập nhập thông tin thành công!')
      router.push({
        pathname: '/dashboard/csteam/teams',
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
        <title>Dashboard: Cs Team Update | InfoFX</title>
      </Head>
      <CreateEditCsTeamSection
        type={FormActions.UPDATE}
        csTeam={dataTeam?.cs_team_by_pk}
        csMemberOptions={dataCsMembers && dataCsMembers?.cs_member}
        handleCsTeamFormSubmit={handleCsTeamUpdateFormSubmit}
        page={page as string}
        limit={limit as string}
      />
    </>
  )
}

CsTeamEdit.getLayout = (page: ReactElement) => (
  <AuthGuard authorized={true}>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default CsTeamEdit
