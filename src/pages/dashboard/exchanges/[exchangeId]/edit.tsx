import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { AuthGuard } from '@app/components/authentication/auth-guard'
import { DashboardLayout } from '@app/components/dashboard/dashboard-layout'
import CreateEditExchangeSection from '@app/components/dashboard/exchanges/exchange-section/create-edit-exchange-section'
import { FormActions, OBJECT_TYPE, UPLOAD_TYPE } from '@app/constants/common'
import useUploadFile from '@app/hooks/use-upload-file'
import { Exchange } from '@app/interfaces/exchange'
import { gtm } from '@app/lib/gtm'
import UPDATE_EXCHANGE from '@app/operations/mutations/exchanges/update-exchange'
import GET_AMOUNT_HIGHLIGHT_EXCHANGES from '@app/operations/queries/exchanges/get-amount-highlight-exchanges'
import GET_EXCHANGE from '@app/operations/queries/exchanges/get-exchange'
import GET_EXCHANGES_TO_COMPARE from '@app/operations/queries/exchanges/get-exchanges-to-check-duplicate'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { toast } from 'react-hot-toast'

export interface ImageFiles {
  images: any[]
}

const ExchangeEdit = () => {
  const router = useRouter()
  const { exchangeId, page, limit } = router.query
  const { data } = useQuery(GET_EXCHANGE, {
    variables: {
      exchangeId,
    },
  })

  const { data: amountHighlightExchanges } = useQuery(GET_AMOUNT_HIGHLIGHT_EXCHANGES)
  const [getExchanges] = useLazyQuery(GET_EXCHANGES_TO_COMPARE)

  const [updateExchange] = useMutation(UPDATE_EXCHANGE)

  const { handleUploadFiles } = useUploadFile({ objectType: OBJECT_TYPE.COMPLAINT, type: UPLOAD_TYPE.IMAGE })
  const handleExchangeFormSubmit = async (formValues: Partial<Exchange>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { logo, icon, national_name, ...other } = formValues
    const newLogo = typeof logo !== 'string' && (await handleUploadFiles(logo))
    const newIcon = typeof icon !== 'string' && (await handleUploadFiles(icon))

    await getExchanges({
      variables: {
        where: {
          abbreviation: { _eq: formValues.abbreviation },
          id: { _neq: exchangeId },
          website: { _eq: formValues.website },
          slug: { _eq: formValues.slug },
        },
      },
      async onCompleted(exchangesToCheckDuplicate) {
        if (exchangesToCheckDuplicate?.exchanges?.length > 0) {
          toast.error('Sàn đã tồn tại')
        } else {
          try {
            await updateExchange({
              variables: {
                ...other,
                logo: newLogo ? newLogo?.[0] : logo,
                icon: newIcon ? newIcon?.[0] : icon,
                exchangeId,
              },
            })
            toast.success('Cập nhật sàn giao dịch thành công!')
            router.push({
              pathname: '/dashboard/exchanges',
              query: {
                initialPage: page,
                initialLimit: limit,
              },
            })
          } catch (error: any) {
            toast.error(error.message)
          }
        }
      },
    })

    // try {
    //   await updateExchange({
    //     variables: {
    //       ...other,
    //       logo: newLogo ? newLogo?.[0] : logo,
    //       icon: newIcon ? newIcon?.[0] : icon,
    //       exchangeId,
    //     },
    //   })

    //   toast.success('Cập nhật sàn giao dịch thành công!')
    //   router.push({
    //     pathname: '/dashboard/exchanges',
    //     query: {
    //       initialPage: page,
    //       initialLimit: limit,
    //     },
    //   })
    // } catch (error: any) {
    //   toast.error(error.message)
    // }
  }

  useEffect(() => {
    gtm.push({ event: 'page_view' })
  }, [])

  return (
    <>
      <Head>
        <title>Dashboard: Cập nhật sàn giao dịch | InfoFX</title>
      </Head>

      <CreateEditExchangeSection
        page={page as string}
        limit={limit as string}
        type={FormActions.UPDATE}
        exchange={data?.exchanges_by_pk}
        handleExchangeFormSubmit={handleExchangeFormSubmit}
        amountHighlightExchanges={amountHighlightExchanges}
      />
    </>
  )
}

ExchangeEdit.getLayout = (page: ReactElement) => (
  <AuthGuard authorized={true}>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default ExchangeEdit
