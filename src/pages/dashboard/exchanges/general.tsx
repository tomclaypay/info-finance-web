import { useMutation, useQuery } from '@apollo/client'
import { AuthGuard } from '@app/components/authentication/auth-guard'
import { DashboardLayout } from '@app/components/dashboard/dashboard-layout'
import { GeneralExchangeForm } from '@app/components/dashboard/exchanges/general-exchange/general-exchange-form'
import { GeneralExchange } from '@app/interfaces/exchange'
import { gtm } from '@app/lib/gtm'
import UPDATE_GENERAL_EXCHANGE from '@app/operations/mutations/exchanges/update-general-exchange'
import GET_GENERAL_EXCHANGE from '@app/operations/queries/exchanges/get-general-exchange'
import { Box, Container } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { toast } from 'react-hot-toast'

const ListExchanges = () => {
  const router = useRouter()

  const { data } = useQuery(GET_GENERAL_EXCHANGE)
  const [updateGeneralExchange] = useMutation(UPDATE_GENERAL_EXCHANGE)

  const handleGeneralExchangeFormSubmit = async (formValues: Partial<GeneralExchange>) => {
    try {
      await updateGeneralExchange({
        variables: {
          ...formValues,
        },
      })
      toast.success('Thay đổi thông tin thành công!')
      router.push('/dashboard/exchanges')
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const initialValues: GeneralExchange = {
    id: data?.general_broker?.[0]?.id || '',
    title: data?.general_broker?.[0]?.title || '',
    title_en: data?.general_broker?.[0]?.title_en || '',
    description: data?.general_broker?.[0]?.description || '',
    description_en: data?.general_broker?.[0]?.description_en || '',
  }

  useEffect(() => {
    gtm.push({ event: 'page_view' })
  }, [])

  return (
    <>
      <Head>
        <title>Dashboard: Cs Team | InfoFX</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <GeneralExchangeForm initialValues={initialValues} onSubmit={handleGeneralExchangeFormSubmit} />
        </Container>
      </Box>
    </>
  )
}

ListExchanges.getLayout = (page: ReactElement) => (
  <AuthGuard authorized={true}>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default ListExchanges
