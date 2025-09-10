import { useQuery } from '@apollo/client'
import { useMobile, useTablet } from '@app/components/common'
import ReviewCategory from '@app/components/exchange-review/ReviewCategory'
import { MainLayout } from '@app/components/main-layout'
import { COMPLAINT_STATUS } from '@app/constants/complaint'
import { SearchHeaderIcon } from '@app/icons'
import { Exchange } from '@app/interfaces/exchange'
import GET_COMPLAINTS_AGGREGATE from '@app/operations/queries/complaints/get-complaints-aggregate'
import GET_COMPLAINTS_WEBSITE from '@app/operations/queries/complaints/get-complaints-website'
import GET_EXCHANGES_WEBSITE from '@app/operations/queries/exchanges/get-exchanges-website'
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import GridViewIcon from '@mui/icons-material/GridView'
import { Autocomplete, Box, Chip, Divider, Stack, Tab, Tabs, TextField, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { domain } from '@app/constants/common'
import ReviewLayout from '@app/components/exchange-review/ReviewLayout'

const ReviewIndex = () => {
  const router = useRouter()
  const locale = router.locale
  const isMobile = useMobile()
  const isTablet = useTablet()
  const { t } = useTranslation(['complaints', 'common', 'seo'])

  const [currentExchanges, setCurrentExchanges] = useState<Exchange[]>([])
  const [exchangesOptions, setExchangesOptions] = useState<Exchange[]>([])

  const { data: exchangeData } = useQuery(GET_EXCHANGES_WEBSITE, {
    variables: {
      where: { hidden: { _eq: false } },
      order_by: { name: 'asc' },
    },
  })

  const {
    data: dataComplaints,
    fetchMore,
    refetch,
  } = useQuery(GET_COMPLAINTS_WEBSITE, {
    variables: {
      statuses: [
        { status: { _eq: COMPLAINT_STATUS.ACCEPTED } },
        { status: { _eq: COMPLAINT_STATUS.APPROVED } },
        { status: { _eq: COMPLAINT_STATUS.CONTRACT_REQUESTED } },
        { status: { _eq: COMPLAINT_STATUS.IN_PROGRESS } },
        { status: { _eq: COMPLAINT_STATUS.RESOLVED } },
      ],
      exchanges: [{ id: {} }],
      limit: 20,
      offset: 0,
    },
  })

  const { data: complaintsAggregate } = useQuery(GET_COMPLAINTS_AGGREGATE)

  const handleFetchMoreData = () => {
    fetchMore({
      variables: {
        offset: dataComplaints.complaints.length,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        fetchMoreResult.complaints = [...prevResult.complaints, ...fetchMoreResult.complaints]
        return fetchMoreResult
      },
    })
  }

  const handleAddCurrentExchange = (event: any, newValue: any) => {
    if (newValue) {
      setCurrentExchanges(currentExchanges.concat(newValue))
      setExchangesOptions(exchangesOptions?.filter((item) => item !== newValue?.[0]))
    }
  }

  const handleRemoveCurrentExchange = (exchange: Exchange) => {
    if (exchange) {
      setExchangesOptions([...exchangesOptions, exchange])
      setCurrentExchanges(currentExchanges.filter((item) => item !== exchange))
    }
  }

  useEffect(() => {
    if (exchangeData) {
      setExchangesOptions(exchangeData?.exchanges)
      setCurrentExchanges([])
    }
  }, [exchangeData])

  useEffect(() => {
    const searchExchanges = currentExchanges.map((item) => {
      return {
        id: {
          _eq: item.id,
        },
      }
    })
    if (searchExchanges && searchExchanges.length > 0) {
      refetch({
        exchanges: searchExchanges,
      })
    } else
      refetch({
        exchanges: [{ id: {} }],
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentExchanges])
  return (
    <>
      <Head>
        <title>{t(`exchange-review.title`, { ns: 'seo' })}</title>
        <meta name="og:title" content={t(`exchange-review.title`, { ns: 'seo' })} />
        <meta name="description" content={t(`exchange-review.description`, { ns: 'seo' })} />
        <meta name="og:description" content={t(`exchange-review.description`, { ns: 'seo' })} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: "${t(`exchange-review.title`, { ns: 'seo' })}",
              url: 'https://infofinance.com/tin-tuc',
              description: "${t(`exchange-review.description`, { ns: 'seo' })}",
              publisher: {
                '@type': 'Organization',
                name: 'CÔNG TY TNHH INFO FINANCE XTRA',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://infofinance.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmain-logo.07f32361.png&w=256&q=75',
                },
              },
              breadcrumb: {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Trang chủ',
                    item: 'https://infofinance.com/',
                  },
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: "${locale === 'en' ? "'Review'" : 'Đánh giá sàn'}",
                    item: "${locale === 'en' ? domain.en + 'exchange-review' : domain.vi + 'danh-gia-san'}",
                  },
                ],
              },
            }`,
          }}
        ></script>
        <link
          rel="canonical"
          href={`${locale === 'en' ? domain.en + 'exchange-review' : domain.vi + 'danh-gia-san'}`}
        />
      </Head>
      {/* {loading && (
        <Stack alignItems="center" justifyContent="center">
          <CircularProgress />
        </Stack>
      )} */}
      {(isMobile || isTablet) && (
        <>
          <Stack px={2} pb={2} spacing={2}>
            <Typography textAlign="justify">{t(`home.t1`)}</Typography>
            <Stack direction="row" spacing={1}>
              <Stack
                spacing={1}
                flex={1}
                sx={{
                  backgroundColor: '#F4F8FF',
                  borderLeft: '4px solid #2A559C',
                  borderRadius: '8px',
                  pl: 3,
                  pt: 2,
                  pb: 2,
                }}
              >
                <Typography sx={{ color: 'subtitle.main', fontSize: '14px', lineHeight: '20px' }}>
                  {t(`complaint.bottom.t1`, { ns: 'home-page' })}
                </Typography>
                <Typography variant="h4" sx={{ fontSize: '1.5rem' }}>
                  {complaintsAggregate?.complaints_aggregate?.aggregate?.count}
                </Typography>
              </Stack>
            </Stack>
            <Stack
              sx={{
                borderRadius: '80px',
                overflow: 'hidden',
                border: '1px solid rgba(0,0,0,0.5)',
                height: '46px',
                paddingLeft: '24px',
              }}
              direction="row"
              alignItems="center"
              spacing={1}
            >
              <SearchHeaderIcon />
              <Autocomplete
                multiple
                id="tags-outlined"
                options={exchangesOptions || []}
                getOptionLabel={(item: any) => item?.name}
                renderOption={(props, option) => {
                  return (
                    <Box component="li" {...props} key={option.id}>
                      <Stack direction={'row'} gap={'8px'} alignItems={'center'}>
                        <Image
                          src={option?.logo || ''}
                          alt="thumb"
                          height={48}
                          width={64}
                          loading="lazy"
                          objectFit="contain"
                        />
                        {option.name}
                      </Stack>
                    </Box>
                  )
                }}
                filterSelectedOptions
                value={[]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{
                      // remove underline text field
                      '& .mui-style-1hv5d1g-MuiInputBase-root-MuiInput-root:before': { border: 'none' },
                      '& .mui-style-1hv5d1g-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled):before': {
                        border: 'none',
                      },
                      '& .mui-style-1q60rmi-MuiAutocomplete-endAdornment': {
                        display: 'none',
                      },
                      '& .mui-style-1gp7h1z::before': { border: 'none' },
                      '& .mui-style-1gp7h1z:hover:not(.Mui-disabled):before': {
                        border: 'none',
                      },
                      '& .mui-style-2iz2x6': {
                        display: 'none',
                      },
                    }}
                    placeholder={t('home.searchText')}
                    variant="standard"
                  />
                )}
                onChange={(event, newValue) => {
                  handleAddCurrentExchange(event, newValue)
                }}
                sx={{
                  flex: '105%',
                }}
                renderTags={(tagValue) =>
                  tagValue.map((option) => (
                    <Chip
                      sx={{
                        cursor: 'pointer',
                      }}
                      key={option?.id}
                      label={option?.name}
                    />
                  ))
                }
              />
            </Stack>
          </Stack>
          <Tabs sx={{ pl: 1 }} variant="scrollable" scrollButtons={false}>
            <Tab
              sx={{
                color: '#2A559C',
                fontWeight: 600,
                backgroundColor: '#F4F8FF',
                padding: '0 16px',
                borderRadius: '12px',
                mx: 1,
                '> a': {
                  height: '200px',
                },
              }}
              icon={
                <GridViewIcon
                  sx={{
                    color: 'primary.main',
                  }}
                />
              }
              iconPosition="start"
              href={`/${locale === 'vi' ? 'danh-gia-san' : 'exchange-review'}`}
              label={
                <Typography sx={{ color: 'primary.main' }}>{router.locale === 'vi' ? 'Tất cả ' : 'All'}</Typography>
              }
            />
            {/* <Tab
              sx={{
                color: '#A0A4AB',
                fontWeight: 600,
                backgroundColor: 'transparent',
                padding: '0 16px ',
                borderRadius: '12px',
                mx: 1,
                '> a': {
                  height: '200px',
                },
              }}
              icon={<WarningAmberRoundedIcon />}
              iconPosition="start"
              href={`/${locale === 'vi' ? 'danh-gia-san/lua-dao' : 'exchange-review/scam'}`}
              label={
                <Typography sx={{ color: 'primary.main' }}>{router.locale === 'vi' ? 'Lừa đảo' : 'Scam'}</Typography>
              }
            /> */}
            <Tab
              sx={{
                color: '#A0A4AB',
                backgroundColor: 'transparent',
                padding: '0 16px ',
                mx: 1,
                borderRadius: '12px',
              }}
              icon={<TrendingUpIcon />}
              href={`/${locale === 'vi' ? 'danh-gia-san/danh-gia-tong-quat' : 'exchange-review/general-review'}`}
              iconPosition="start"
              label={router.locale === 'vi' ? 'Đánh giá tổng quát' : 'General Review'}
            />
            <Tab
              sx={{
                color: '#A0A4AB',
                backgroundColor: 'transparent',
                padding: '0 16px ',
                mx: 1,
                borderRadius: '12px',
              }}
              icon={<MonetizationOnOutlinedIcon />}
              href={`/${
                locale === 'vi'
                  ? 'danh-gia-san/hop-thu-danh-gia-va-gop-y-tu-nha-dau-tu'
                  : 'exchange-review/investor-feedback-and-comments-mailbox'
              }`}
              iconPosition="start"
              label={
                router.locale === 'vi'
                  ? 'Hộp thư đánh giá và góp ý từ nhà đầu tư'
                  : 'Investor feedback and comments mailbox'
              }
            />

            {/* <Tab
              sx={{
                color: '#A0A4AB',
                backgroundColor: 'transparent',
                padding: '0 16px ',
                ml: 1,
                borderRadius: '12px',
              }}
              icon={<FormatListBulletedRoundedIcon />}
              href={`/${locale === 'vi' ? 'danh-gia-san/ly-do-khac' : 'exchange-review/other-problems'}`}
              iconPosition="start"
              label={router.locale === 'vi' ? 'Lý do khác' : 'Other problems'}
            /> */}
          </Tabs>
          <Divider sx={{ m: 2 }} />
        </>
      )}
      <ReviewCategory
        data={dataComplaints?.complaints}
        total={dataComplaints?.complaints_aggregate?.aggregate?.count as number}
        description={t(`home.t0`)}
        handleFetchMoreData={handleFetchMoreData}
        exchangeDataOptions={exchangesOptions}
        currentExchanges={currentExchanges}
        handleAddCurrentExchange={handleAddCurrentExchange}
        handleRemoveCurrentExchange={handleRemoveCurrentExchange}
        complaintAggregate={complaintsAggregate?.complaints_aggregate?.aggregate?.count}
      />

      {/* {isDesktop &&
        dataComplaints &&
        dataComplaints.complaints.length > 0 &&
        dataComplaints?.complaints_aggregate?.aggregate?.count && (
          <Container maxWidth="lg">
            <Box
              sx={{
                width: '66.67%',
                pt: 15,
                display: 'flex',
                pb: 6,
                justifyContent: 'center',
              }}
            >
              {dataComplaints?.complaints?.length < dataComplaints?.complaints_aggregate?.aggregate?.count && (
                <Button
                  onClick={() => handleFetchMoreData()}
                  variant="contained"
                  sx={{
                    borderRadius: '100px',
                    fontWeight: '600',
                    fontSize: '14px',
                    lineHeight: '20px',
                    padding: '14px 24px',
                    minWidth: '124px',
                  }}
                >
                  {t('text.seeMore', { ns: 'common' })}
                </Button>
              )}
            </Box>
          </Container>
        )} */}
    </>
  )
}

ReviewIndex.getLayout = (page: ReactElement) => (
  <MainLayout>
    <ReviewLayout>{page}</ReviewLayout>
  </MainLayout>
)

export default ReviewIndex

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'vi', ['common', 'complaints', 'home-page', 'seo'])),
      // Will be passed to the page component as props
    },
    revalidate: 30,
  }
}
