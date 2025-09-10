import { useMutation, useQuery } from '@apollo/client'
import { AuthGuard } from '@app/components/authentication/auth-guard'
import CreateEditCsTeamSection from '@app/components/dashboard/csteam/team/team-section/create-edit-team-section'
import { DashboardLayout } from '@app/components/dashboard/dashboard-layout'
import { FormActions } from '@app/constants/common'
import { CsMembersListResponse } from '@app/interfaces/cs-member'
import { gtm } from '@app/lib/gtm'
import CREATE_CS_TEAM from '@app/operations/mutations/csteam/teams/create-cs-team'
import GET_CS_MEMBERS from '@app/operations/queries/csteam/members/get-cs-members'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import toast from 'react-hot-toast'

const CsTeamCreate = () => {
  const [createCsTeam] = useMutation(CREATE_CS_TEAM)
  const router = useRouter()

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

  const handleCsTeamFormSubmit = async (formValues: any) => {
    const dataCsMembers = transferDataCsMembers(formValues)
    try {
      await createCsTeam({
        variables: {
          name: formValues.name,
          description: formValues.description,
          dataCsMembers,
        },
      })
      toast.success('Tạo Cs team thành công!')
      router.push('/dashboard/csteam/teams')
    } catch (error) {
      console.log(error)
    }
  }

  const { data } = useQuery<CsMembersListResponse>(GET_CS_MEMBERS, {
    variables: {
      where: { cs_team_id: { _is_null: true } },
    },
  })

  useEffect(() => {
    gtm.push({ event: 'page_view' })
  }, [])

  return (
    <>
      <Head>
        <title>Dashboard: Tạo cs team | InfoFX</title>
      </Head>
      <CreateEditCsTeamSection
        page="0"
        limit="10"
        type={FormActions.CREATE}
        csMemberOptions={data && data?.cs_member}
        handleCsTeamFormSubmit={handleCsTeamFormSubmit}
      />
    </>
  )
}

CsTeamCreate.getLayout = (page: ReactElement) => (
  <AuthGuard authorized>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default CsTeamCreate
