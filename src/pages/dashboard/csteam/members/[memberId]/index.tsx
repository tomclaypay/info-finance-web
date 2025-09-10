import { useQuery } from '@apollo/client'
import { AuthGuard } from '@app/components/authentication/auth-guard'
import BackButtonInitial from '@app/components/dashboard/common/back-button-initial'
import { CsMemberDetails } from '@app/components/dashboard/csteam/member/member-details'
import { DashboardLayout } from '@app/components/dashboard/dashboard-layout'
import { useAuth } from '@app/hooks/use-auth'
import { Pencil as PencilIcon } from '@app/icons/pencil'
import GET_CS_MEMBER_BY_PK from '@app/operations/queries/csteam/members/get-cs-member-by-pk'
import { Box, Button, Container, Divider } from '@mui/material'
import { Stack } from '@mui/system'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

export interface CreateLogRefTypes {
  handleClose: () => void
}

const CsMember = () => {
  const router = useRouter()
  const { memberId, page, limit } = router.query
  const auth = useAuth()
  const { data } = useQuery(GET_CS_MEMBER_BY_PK, {
    variables: {
      memberId,
    },
    skip: !memberId,
  })

  const handleEditCsMember = () => {
    router.push({
      pathname: `/dashboard/csteam/members/${memberId}/edit`,
      query: {
        page,
        limit,
      },
    })
  }

  return (
    <>
      <Head>
        <title>Dashboard: Chi tiết Cs Member | Infofx</title>
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
            {/* <BackButton title="Danh sách Cs members" link="dashboard/csteam/members" /> */}
            <BackButtonInitial
              title="Danh sách Cs members"
              link="dashboard/csteam/members"
              page={page as string}
              limit={limit as string}
            />
            {auth?.user?.role === 'super_admin' && (
              <Button startIcon={<PencilIcon fontSize="small" />} variant="contained" onClick={handleEditCsMember}>
                Chỉnh sửa
              </Button>
            )}
          </Stack>
          <Divider />
          <Box sx={{ mt: 3 }}>
            <CsMemberDetails csMember={data?.cs_member_by_pk} />
          </Box>
        </Container>
      </Box>
    </>
  )
}

CsMember.getLayout = (page: ReactElement) => (
  <AuthGuard authorized={true}>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default CsMember
