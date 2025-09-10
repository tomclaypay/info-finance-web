import { useQuery } from '@apollo/client'
import { AuthGuard } from '@app/components/authentication/auth-guard'
import BackButtonInitial from '@app/components/dashboard/common/back-button-initial'
import { DashboardLayout } from '@app/components/dashboard/dashboard-layout'
import { ExchangeDashboardDetail } from '@app/components/dashboard/exchanges/exchange-details'
import { useAuth } from '@app/hooks/use-auth'
import { Pencil as PencilIcon } from '@app/icons/pencil'
import GET_EXCHANGE from '@app/operations/queries/exchanges/get-exchange'
import { Box, Button, Container, Divider } from '@mui/material'
import { Stack } from '@mui/system'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

export interface CreateLogRefTypes {
  handleClose: () => void
}

const ExchangePage = () => {
  const router = useRouter()
  const { exchangeId, page, limit } = router.query
  const auth = useAuth()
  const { data } = useQuery(GET_EXCHANGE, {
    variables: {
      exchangeId,
    },
    skip: !exchangeId,
  })

  const handleEditExchange = () => {
    router.push({
      pathname: `/dashboard/exchanges/${exchangeId}/edit`,
      query: {
        page,
        limit,
      },
    })
  }

  return (
    <>
      <Head>
        <title>Dashboard: Chi tiết sàn giao dịch | Infofx</title>
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
            {/* <BackButton title="Danh sách sàn giao dịch" link="dashboard/exchanges" /> */}
            <BackButtonInitial
              title="Danh sách sàn giao dịch"
              link="dashboard/exchanges"
              page={page as string}
              limit={limit as string}
            />
            {auth?.user?.role === 'super_admin' && (
              <Button startIcon={<PencilIcon fontSize="small" />} variant="contained" onClick={handleEditExchange}>
                Chỉnh sửa
              </Button>
            )}
          </Stack>
          <Divider />
          <Box sx={{ mt: 3 }}>
            <ExchangeDashboardDetail exchange={data?.exchanges_by_pk} />
          </Box>
        </Container>
      </Box>
    </>
  )
}

ExchangePage.getLayout = (page: ReactElement) => (
  <AuthGuard authorized={true}>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default ExchangePage
