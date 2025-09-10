import { useQuery } from '@apollo/client'
import { AuthGuard } from '@app/components/authentication/auth-guard'
import BackButton from '@app/components/dashboard/common/back-button'
import { CsTeamDetails } from '@app/components/dashboard/csteam/team/team-details'
import { DashboardLayout } from '@app/components/dashboard/dashboard-layout'
import { useAuth } from '@app/hooks/use-auth'
import { Pencil as PencilIcon } from '@app/icons/pencil'
import GET_CS_TEAM_BY_PK from '@app/operations/queries/csteam/teams/get-cs-team-by-pk'
import { Box, Button, Container, Divider, Stack } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

export interface CreateLogRefTypes {
  handleClose: () => void
}

const CsTeam = () => {
  const router = useRouter()
  const { teamId } = router.query
  const auth = useAuth()

  const { data: dataCsTeam } = useQuery(GET_CS_TEAM_BY_PK, {
    variables: {
      teamId,
    },
  })

  const handleEditCsTeam = () => {
    router.push(`/dashboard/csteam/teams/${teamId}/edit`)
  }

  return (
    <>
      <Head>
        <title>Dashboard: Chi tiết Cs Team | Infofx</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            {auth?.user?.role !== 'member' && <BackButton title="Danh sách Cs teams" link="dashboard/csteam/teams" />}
            {auth?.user?.role === 'super_admin' && (
              <Button startIcon={<PencilIcon fontSize="small" />} variant="contained" onClick={handleEditCsTeam}>
                Chỉnh sửa
              </Button>
            )}
          </Stack>
          <Divider />
          <Box sx={{ mt: 3 }}>
            <CsTeamDetails csTeam={dataCsTeam?.cs_team_by_pk} />
          </Box>
        </Container>
      </Box>
    </>
  )
}

CsTeam.getLayout = (page: ReactElement) => (
  <AuthGuard authorized={true}>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default CsTeam
