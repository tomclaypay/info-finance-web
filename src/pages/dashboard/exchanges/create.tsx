import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { AuthGuard } from '@app/components/authentication/auth-guard'
import { DashboardLayout } from '@app/components/dashboard/dashboard-layout'
import CreateEditExchangeSection from '@app/components/dashboard/exchanges/exchange-section/create-edit-exchange-section'
import { FormActions, OBJECT_TYPE, UPLOAD_TYPE } from '@app/constants/common'
import useUploadFile from '@app/hooks/use-upload-file'
import { Exchange } from '@app/interfaces/exchange'
import { gtm } from '@app/lib/gtm'
import CREATE_EXCHANGE from '@app/operations/mutations/exchanges/create-exchange'
import GET_AMOUNT_HIGHLIGHT_EXCHANGES from '@app/operations/queries/exchanges/get-amount-highlight-exchanges'
import GET_EXCHANGES_TO_COMPARE from '@app/operations/queries/exchanges/get-exchanges-to-check-duplicate'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { toast } from 'react-hot-toast'

export interface UploadFileRef {
  handleUploadFiles: () => Promise<string[] | undefined>
}

const ExchangeCreate = () => {
  const router = useRouter()

  const { handleUploadFiles } = useUploadFile({ objectType: OBJECT_TYPE.EXCHANGE, type: UPLOAD_TYPE.IMAGE })

  const [createExchange] = useMutation(CREATE_EXCHANGE)
  const { data: amountHighlightExchanges } = useQuery(GET_AMOUNT_HIGHLIGHT_EXCHANGES)
  const [getExchanges] = useLazyQuery(GET_EXCHANGES_TO_COMPARE)

  const handleExchangeFormSubmit = async (formValues: Partial<Exchange>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { logo, icon, national_name, ...other } = formValues
    const image = await handleUploadFiles(logo)
    const imageIcon = await handleUploadFiles(icon)

    await getExchanges({
      variables: {
        where: {
          abbreviation: { _eq: formValues.abbreviation },
          website: { _eq: formValues.website },
          slug: { _eq: formValues.slug },
        },
      },
      async onCompleted(exchangesToCheckDuplicate) {
        if (exchangesToCheckDuplicate?.exchanges?.length > 0) {
          toast.error('Sàn đã tồn tại')
        } else {
          try {
            await createExchange({
              variables: {
                ...other,
                logo: image?.[0],
                icon: imageIcon?.[0],
              },
            })
            toast.success('Tạo sàn giao dịch thành công!')
            router.push('/dashboard/exchanges')
          } catch (error: any) {
            toast.error(error.message)
          }
        }
      },
    })

    // try {
    //   await createExchange({
    //     variables: {
    //       ...other,
    //       logo: image?.[0],
    //       icon: imageIcon?.[0],
    //     },
    //   })
    //   toast.success('Tạo sàn giao dịch thành công!')
    //   router.push('/dashboard/exchanges')
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
        <title>Dashboard: Exchange Create | InfoFX</title>
      </Head>
      <CreateEditExchangeSection
        page="0"
        limit="10"
        amountHighlightExchanges={amountHighlightExchanges}
        type={FormActions.CREATE}
        handleExchangeFormSubmit={handleExchangeFormSubmit}
      />
    </>
  )
}

ExchangeCreate.getLayout = (page: ReactElement) => (
  <AuthGuard authorized={true}>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default ExchangeCreate
