import { useQuery } from '@apollo/client'
import { useDesktop } from '@app/components/common'
import ExchangeContainer from '@app/components/exchange/container/ExchangeContainer'
import { MainLayout } from '@app/components/main-layout'
import { domain } from '@app/constants/common'
import { COMPLAINT_STATUS } from '@app/constants/complaint'
import { FILTER_KEY, SCORE_RANGE } from '@app/constants/exchange'
import { client } from '@app/contexts/apollo-client-context'
import { ComplaintListResponse } from '@app/interfaces/complaint'
import { ExchangeListResponse, GeneralExchangeResponse } from '@app/interfaces/exchange'
import GET_BANNERS from '@app/operations/queries/banners/get-banners'
import GET_COMPLAINTS from '@app/operations/queries/complaints/get-complaints'
import GET_EXCHANGES_WEBSITE from '@app/operations/queries/exchanges/get-exchanges-website'
import GET_GENERAL_EXCHANGE from '@app/operations/queries/exchanges/get-general-exchange'
import GET_HIGHLIGHT_EXCHANGES from '@app/operations/queries/exchanges/get-highlight-exchanges'
import { getParamScoreFromKey } from '@app/utils/exchange'
import { Box, debounce } from '@mui/material'
import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'

const Exchanges = () => {
  const router = useRouter()
  const { query } = router
  const isDesktop = useDesktop()
  const [hidden, setHidden] = useState(false)
  const { t } = useTranslation('seo')
  const locale = router.locale

  const scoreRange = query[FILTER_KEY.SCORE_RANGE] as string
  const [keyword, setKeyword] = useState('')
  const {
    data: dataExchanges,
    previousData: prevDataExchange,
    loading: loadingExchange,
    fetchMore,
  } = useQuery<ExchangeListResponse>(GET_EXCHANGES_WEBSITE, {
    variables: {
      limit: 20,
      where: {
        hidden: {
          _eq: false,
        },
        name: { _ilike: `%${keyword}%` },
        total_point: getParamScoreFromKey(scoreRange),
      },
      order_by: [{ total_point: 'desc_nulls_last' }, { id: 'asc' }],
    },
  })

  const offset = dataExchanges?.exchanges?.length ?? 0

  const { data: dataGeneralExchange } = useQuery<GeneralExchangeResponse>(GET_GENERAL_EXCHANGE)

  const { data: dataHighlightTradersAllChooseExchanges } = useQuery<ExchangeListResponse>(GET_HIGHLIGHT_EXCHANGES, {
    variables: {
      where: { is_trader_all_choose: { _eq: true } },
    },
  })

  const { data: dataComplaints } = useQuery<ComplaintListResponse>(GET_COMPLAINTS, {
    variables: {
      where: {
        _or: [
          { highlight_on_broker: { _eq: true } },
          { status: { _eq: COMPLAINT_STATUS.ACCEPTED } },
          { status: { _eq: COMPLAINT_STATUS.APPROVED } },
          { status: { _eq: COMPLAINT_STATUS.CONTRACT_REQUESTED } },
          { status: { _eq: COMPLAINT_STATUS.IN_PROGRESS } },
          { status: { _eq: COMPLAINT_STATUS.RESOLVED } },
        ],
      },
      limit: 4,
    },
  })

  const handleSearchChangeName = debounce((event: ChangeEvent<HTMLInputElement>) => {
    const value = event?.target?.value?.trim()
    setKeyword(value)
    if (value !== '') {
      setHidden(true)
    } else setHidden(false)
  }, 500)

  const handleFetchMore = async () => {
    await fetchMore({
      variables: {
        offset: offset,
        limit: 12,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        fetchMoreResult.exchanges = [...prevResult.exchanges, ...fetchMoreResult.exchanges]
        return fetchMoreResult
      },
    })
  }

  return (
    <>
      <Head>
        <title>{t(`broker.title`, { ns: 'seo' })}</title>
        <meta name="og:title" content={t(`broker.title`, { ns: 'seo' })} />
        <meta name="description" content={t(`broker.description`, { ns: 'seo' })} />
        <meta name="og:description" content={t(`broker.description`, { ns: 'seo' })} />
        <link rel="canonical" href={`${locale === 'vi' ? domain.vi + 'tra-cuu-san' : domain.en + 'broker'}`} />
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          py: !isDesktop ? 0 : 10,
        }}
      >
        <ExchangeContainer
          handleFetchMore={handleFetchMore}
          handleSearchChangeName={handleSearchChangeName}
          dataExchanges={loadingExchange ? prevDataExchange : dataExchanges}
          dataHighlightTradersAllChooseExchanges={dataHighlightTradersAllChooseExchanges}
          dataComplaints={dataComplaints}
          dataGeneralExchange={dataGeneralExchange}
          hidden={hidden}
          isFilter={scoreRange !== SCORE_RANGE.ALL || keyword !== ''}
        />
      </Box>
    </>
  )
}

Exchanges.getLayout = (page: any) => <MainLayout>{page}</MainLayout>

export default Exchanges

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'vi', ['common', 'exchange', 'seo'])),
    },
  }
}
