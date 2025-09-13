/* eslint-disable @next/next/no-img-element */
import { useQuery } from '@apollo/client'
import { useDesktop, useMobile, useTablet } from '@app/components/common'
import { COMPLAINT_STATUS } from '@app/constants/complaint'
import { AuthContext } from '@app/contexts/amplify-context'
import { Exchange } from '@app/interfaces/exchange'
import GET_COMPLAINT_BY_SLUG from '@app/operations/queries/complaints/get-complaint-by-slug'
import GET_COMPLAINTS_AGGREGATE from '@app/operations/queries/complaints/get-complaints-aggregate'
import GET_COMPLAINTS_BY_CATEGORY from '@app/operations/queries/complaints/get-complaints-by-category'
import GET_EXCHANGES_WEBSITE from '@app/operations/queries/exchanges/get-exchanges-website'
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Link,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Image from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { MainLayout } from '../../components/main-layout'
import { client } from '@app/contexts/apollo-client-context'
import { GetServerSideProps } from 'next'
import { mappedReviewCategorySlug, mappedReviewCategoryStatusBySlug } from '@app/utils/common'
import GridViewIcon from '@mui/icons-material/GridView'
import { domain } from '@app/constants/common'
import ReviewDetail from '@app/components/exchange-review/ReviewDetail'
import ReviewDetailItem from '@app/components/exchange-review/ReviewDetailItem'
import ReviewLayout from '@app/components/exchange-review/ReviewLayout'
import ReviewCategory from '@app/components/exchange-review/ReviewCategory'

const ReviewCategorySlug = ({ exchangeSEO }: any) => {
  const { t } = useTranslation(['complaints', 'common', 'seo'])
  const isMobile = useMobile()
  const isDesktop = useDesktop()
  const isTablet = useTablet()
  const { locale } = useRouter()
  const [currentExchanges, setCurrentExchanges] = useState<Exchange[]>([])
  const [exchangesOptions, setExchangesOptions] = useState<Exchange[]>([])
  const descriptions = [
    {
      category: 'lua-dao',
      text: t(`home.t1`),
      titleSeo: t(`exchange-review-fraud.title`, { ns: 'seo' }),
      desSeo: t(`exchange-review-fraud.description`, { ns: 'seo' }),
    },
    {
      category: 'hop-thu-danh-gia-va-gop-y-tu-nha-dau-tu',
      text: t(`home.t2`),
      titleSeo: t(`exchange-review-lose-cash.title`, { ns: 'seo' }),
      desSeo: t(`exchange-review-lose-cash.description`, { ns: 'seo' }),
    },

    {
      category: 'danh-gia-tong-quat',
      text: t(`home.t3`),
      titleSeo: t(`exchange-review-price-mainpulation.title`, { ns: 'seo' }),
      desSeo: t(`exchange-review-price-mainpulation.description`, { ns: 'seo' }),
    },

    {
      category: 'ly-do-khac',
      text: t(`home.t4`),
      titleSeo: t(`exchange-review-problems.title`, { ns: 'seo' }),
      desSeo: t(`exchange-review-problems.description`, { ns: 'seo' }),
    },
  ]
  const router = useRouter()
  const { reviewCategorySlug } = router.query
  const mapReviewCategorySlug = mappedReviewCategorySlug(reviewCategorySlug as string)
  const { data: exchangeData } = useQuery(GET_EXCHANGES_WEBSITE, {
    variables: {
      where: { hidden: { _eq: false } },
      order_by: { name: 'asc' },
    },
  })
  const { loading, data, fetchMore, refetch } = useQuery(GET_COMPLAINTS_BY_CATEGORY, {
    variables: {
      // slug: mapReviewCategorySlug,
      statuses:
        reviewCategorySlug === 'hop-thu-danh-gia-va-gop-y-tu-nha-dau-tu' ||
        reviewCategorySlug === 'investor-feedback-and-comments-mailbox'
          ? [
              { status: { _eq: COMPLAINT_STATUS.ACCEPTED } },
              { status: { _eq: COMPLAINT_STATUS.CONTRACT_REQUESTED } },
              { status: { _eq: COMPLAINT_STATUS.IN_PROGRESS } },
              { status: { _eq: COMPLAINT_STATUS.RESOLVED } },
            ]
          : reviewCategorySlug === 'danh-gia-tong-quat' || reviewCategorySlug === 'general-review'
          ? [{ status: { _eq: COMPLAINT_STATUS.APPROVED } }]
          : [],
      exchanges: [{ id: {} }],
      limit: 20,
      offset: 0,
    },
  })

  const handleFetchMoreData = () => {
    fetchMore({
      variables: {
        offset: data.complaints.length,
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
  }, [exchangeData, mapReviewCategorySlug])

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

  // change

  const value = useContext(AuthContext)
  const { loading: loadingGetComplaintBySlug, data: complaintBySlug } = useQuery(GET_COMPLAINT_BY_SLUG, {
    variables: {
      exposureSlug: mapReviewCategorySlug,
    },
  })
  const { data: complaintsAggregate } = useQuery(GET_COMPLAINTS_AGGREGATE)

  const { data: dataAnotherComplaints } = useQuery(GET_COMPLAINTS_BY_CATEGORY, {
    variables: {
      slug: complaintBySlug && complaintBySlug.complaints?.[0]?.category?.slug,
      statuses: [
        { status: { _eq: COMPLAINT_STATUS.ACCEPTED } },
        { status: { _eq: COMPLAINT_STATUS.APPROVED } },
        { status: { _eq: COMPLAINT_STATUS.CONTRACT_REQUESTED } },
        { status: { _eq: COMPLAINT_STATUS.IN_PROGRESS } },
        { status: { _eq: COMPLAINT_STATUS.RESOLVED } },
      ],
      exchanges: [{ id: {} }],
      limit: 6,
      offset: 0,
    },
  })

  const conditionsRenderLayout = descriptions?.find((item: any) => item.category === mapReviewCategorySlug)

  if (conditionsRenderLayout) {
    return (
      <>
        <Head>
          <title>{descriptions.filter((item) => item.category === mapReviewCategorySlug)?.[0]?.titleSeo}</title>
          <meta
            name="description"
            content={descriptions.filter((item) => item.category === mapReviewCategorySlug)?.[0]?.desSeo}
          />
          <meta
            name="og:description"
            content={descriptions.filter((item) => item.category === mapReviewCategorySlug)?.[0]?.desSeo}
          />
          <link
            rel="canonical"
            href={`${locale === 'vi' ? domain.vi + 'danh-gia-san' : domain.en + 'exchange-review'}/${
              router.query.reviewCategorySlug || ''
            }`}
          />
        </Head>

        {(isMobile || isTablet) && (
          <>
            <Stack px={2} pb={2} spacing={2}>
              <Typography textAlign="justify">
                {descriptions.filter((item) => item.category === mapReviewCategorySlug)?.[0].text}
              </Typography>
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
                  <Typography sx={{ color: 'subtitle.main' }}>
                    {t(`complaint.bottom.t1`, { ns: 'home-page' })}
                  </Typography>
                  <Typography variant="h4" sx={{ fontSize: '1.5rem' }}>
                    {complaintsAggregate?.complaints_aggregate?.aggregate?.count}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Tabs variant="scrollable" scrollButtons={false}>
              <Tab
                tabIndex={0}
                sx={{
                  color: mapReviewCategorySlug === '' ? '#2A559C' : '#A0A4AB',
                  backgroundColor: mapReviewCategorySlug === '' ? '#F4F8FF' : 'transparent',
                  padding: '0 16px ',
                  borderRadius: '12px',
                  mx: 1,
                  '> a': {
                    height: '200px',
                  },
                }}
                iconPosition="start"
                href={`/${locale === 'vi' ? 'danh-gia-san' : 'exchange-review'}`}
                label={
                  <Typography
                    sx={{
                      fontSize: '1rem !important',
                      fontWeight: 'medium',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <GridViewIcon />
                    {router.locale === 'vi' ? 'Tất cả ' : 'All'}
                  </Typography>
                }
              />
              <Tab
                sx={{
                  color: mapReviewCategorySlug === 'lua-dao' ? '#2A559C' : '#A0A4AB',
                  backgroundColor: mapReviewCategorySlug === 'lua-dao' ? '#F4F8FF' : 'transparent',
                  padding: '0 16px ',
                  borderRadius: '12px',
                  mx: 1,
                  '> a': {
                    height: '200px',
                  },
                }}
                iconPosition="start"
                href={`/${locale === 'vi' ? 'danh-gia-san/lua-dao' : 'exchange-review/scam'}`}
                label={
                  <Typography
                    variant={mapReviewCategorySlug === ('lua-dao' || 'scam') ? 'h1' : 'h2'}
                    sx={{
                      fontSize: '1rem !important',
                      fontWeight: 'medium',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <WarningAmberRoundedIcon />
                    {router.locale === 'vi' ? 'Lừa đảo' : 'Scam'}
                  </Typography>
                }
              />

              <Tab
                sx={{
                  color: mapReviewCategorySlug === 'hop-thu-danh-gia-va-gop-y-tu-nha-dau-tu' ? '#2A559C' : '#A0A4AB',
                  backgroundColor:
                    mapReviewCategorySlug === 'hop-thu-danh-gia-va-gop-y-tu-nha-dau-tu' ? '#F4F8FF' : 'transparent',
                  padding: '0 16px ',
                  mx: 1,
                  borderRadius: '12px',
                }}
                href={`/${
                  locale === 'vi'
                    ? 'danh-gia-san/hop-thu-danh-gia-va-gop-y-tu-nha-dau-tu'
                    : 'exchange-review/investor-feedback-and-comments-mailbox'
                }`}
                iconPosition="start"
                label={
                  <Typography
                    variant={
                      mapReviewCategorySlug ===
                      ('hop-thu-danh-gia-va-gop-y-tu-nha-dau-tu' || 'investor-feedback-and-comments-mailbox')
                        ? 'h1'
                        : 'h2'
                    }
                    sx={{
                      fontSize: '1rem !important',
                      fontWeight: 'medium',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <MonetizationOnOutlinedIcon />
                    {router.locale === 'vi'
                      ? 'Hộp thư đánh giá và góp ý từ nhà đầu tư'
                      : 'Investor feedback and comments mailbox'}
                  </Typography>
                }
              />
              <Tab
                sx={{
                  color: mapReviewCategorySlug === 'danh-gia-tong-quat' ? '#2A559C' : '#A0A4AB',
                  backgroundColor: mapReviewCategorySlug === 'danh-gia-tong-quat' ? '#F4F8FF' : 'transparent',
                  padding: '0 16px ',
                  mx: 1,
                  borderRadius: '12px',
                }}
                href={`/${locale === 'vi' ? 'danh-gia-san/danh-gia-tong-quat' : 'exchange-review/general-review'}`}
                iconPosition="start"
                label={
                  <Typography
                    variant={mapReviewCategorySlug === ('danh-gia-tong-quat' || 'general-review') ? 'h1' : 'h2'}
                    sx={{
                      fontSize: '1rem !important',
                      fontWeight: 'medium',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <SentimentDissatisfiedIcon />
                    {router.locale === 'vi' ? 'Đánh giá tổng quát' : 'General Review'}
                  </Typography>
                }
              />
              <Tab
                sx={{
                  color: mapReviewCategorySlug === 'ly-do-khac' ? '#2A559C' : '#A0A4AB',
                  backgroundColor: mapReviewCategorySlug === 'ly-do-khac' ? '#F4F8FF' : 'transparent',
                  padding: '0 16px ',
                  ml: 1,
                  borderRadius: '12px',
                }}
                href={`/${locale === 'vi' ? 'danh-gia-san/ly-do-khac' : 'exchange-review/other-problems'}`}
                iconPosition="start"
                label={
                  <Typography
                    variant={mapReviewCategorySlug === ('ly-do-khac' || 'other-problems') ? 'h1' : 'h2'}
                    sx={{
                      fontSize: '1rem !important',
                      fontWeight: 'medium',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <FormatListBulletedRoundedIcon />
                    {router.locale === 'vi' ? 'Lý do khác' : 'Other problems'}
                  </Typography>
                }
              />
            </Tabs>
            <Divider sx={{ m: 2 }} />
          </>
        )}
        {loading && (
          <Stack alignItems="center" justifyContent="center">
            <CircularProgress />
          </Stack>
        )}

        {data && (
          <ReviewCategory
            data={data.complaints}
            total={data?.complaints_aggregate?.aggregate?.count}
            description={descriptions.filter((item) => item.category === mapReviewCategorySlug)?.[0]?.text}
            handleFetchMoreData={handleFetchMoreData}
            exchangeDataOptions={exchangesOptions}
            currentExchanges={currentExchanges}
            handleAddCurrentExchange={handleAddCurrentExchange}
            handleRemoveCurrentExchange={handleRemoveCurrentExchange}
            complaintAggregate={complaintsAggregate?.complaints_aggregate?.aggregate?.count}
          />
        )}

        {/* {isDesktop && data && data.complaints.length > 0 && (
          <Container maxWidth="lg">
            <Box
              sx={{
                width: '66.67%',
                pt: 15,
                display: 'flex',
                pb: 12,
                justifyContent: 'center',
              }}
            >
              {data?.complaints?.length < data?.complaints_aggregate?.aggregate?.count && (
                <Button
                  onClick={() => handleFetchMoreData()}
                  variant="contained"
                  sx={{ borderRadius: '22px', fontWeight: '500' }}
                >
                  {t('text.seeMore', { ns: 'common' })}
                </Button>
              )}
            </Box>
          </Container>
        )} */}
      </>
    )
  } else if (loadingGetComplaintBySlug || (!loadingGetComplaintBySlug && complaintBySlug?.complaints?.[0])) {
    return (
      <>
        <Head>
          <title>
            {router.locale === 'vi'
              ? `${complaintBySlug?.complaints?.[0]?.title}`
              : `${complaintBySlug?.complaints?.[0]?.title}`}
          </title>
          <meta
            name="description"
            content={`${router.locale === 'vi' ? 'Khiếu nại của khách là' : 'A complaint that'} ${
              complaintBySlug?.complaints?.[0]?.description?.split('<p>')[1]?.split('</p>')?.[0]
            }`?.slice(0, 160)}
          />
          <meta
            name="og:title"
            content={
              router.locale === 'vi'
                ? `Info Finance | Khiếu nại của sàn ${exchangeSEO?.exchangeName}`
                : `Info Finance | The Complaint of ${exchangeSEO?.exchangeName}`
            }
          />
          <meta
            name="og:description"
            content={
              router.locale === 'vi'
                ? `Info Finance tổng hợp các thông tin khiếu nại sàn ${exchangeSEO?.exchangeName} được gửi trực tiếp từ người dùng`
                : `Info Finance compiles complaints toward ${exchangeSEO?.exchangeName} sent from trusted users.`
            }
          />
          <link
            rel="canonical"
            href={`${locale === 'vi' ? domain.vi + 'danh-gia-san' : domain.en + 'exchange-review'}/${
              router.query.reviewCategorySlug
            }`}
          />
        </Head>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: isMobile ? 0 : 8,
          }}
        >
          {loadingGetComplaintBySlug && (
            <Stack alignItems="center" justifyContent="center">
              <CircularProgress />
            </Stack>
          )}

          {complaintBySlug?.complaints?.[0] && <ReviewDetail complaintDetail={complaintBySlug?.complaints?.[0]} />}

          <Box
            sx={{
              height: 'max-content',
              py: 7,
              my: isMobile ? 0 : 10,
              background:
                'url(https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/8856aed597671d41b6d564d0b4d9a825_85f7397e0e.png?updated_at=2022-08-29T08:22:27.899Z)  center no-repeat',
            }}
          >
            <Container maxWidth="lg">
              <Stack
                spacing={!isDesktop ? 2 : 0}
                direction={!isDesktop ? 'column' : 'row'}
                alignItems={!isDesktop ? 'end' : 'center'}
                sx={{ justifyContent: 'space-between' }}
              >
                <Stack spacing={2}>
                  <Typography fontSize={[32, 40]} lineHeight={isMobile ? '39px' : '49px'} fontWeight={700}>
                    {t('detail.middle1a')}
                    <b style={{ color: '#ffc700' }}>{t('detail.middle1b')}</b>
                    {t('detail.middle1c')}
                  </Typography>
                  <Typography fontSize={[32, 40]} lineHeight={isMobile ? '39px' : '49px'} fontWeight={700}>
                    {t('detail.middle2a')}
                    <b style={{ color: '#ffc700' }}>{t('detail.middle2b')}</b>
                    {t('detail.middle2c')}
                  </Typography>
                </Stack>
                <NextLink
                  href={
                    value.user
                      ? locale === 'vi'
                        ? '/danh-gia-san/gui-danh-gia'
                        : '/exchange-review/create-review'
                      : '/authentication/login'
                  }
                  passHref
                >
                  <Button
                    sx={{
                      position: 'static',
                      borderRadius: 4,
                      backgroundColor: 'secondary.main',
                      color: 'text.primary',
                      fontSize: '16px',
                      fontWeight: '700',
                      width: isMobile ? 'none' : 'max-content',
                      textTransform: 'uppercase',
                      padding: '10px 56px',
                    }}
                    fullWidth
                    variant="contained"
                    color="secondary"
                    size="large"
                  >
                    {t('button.complaint.send', { ns: 'common' })}
                  </Button>
                </NextLink>
              </Stack>
            </Container>
          </Box>

          <Container maxWidth="lg">
            <Stack direction="row" mb={3} alignItems="center" pt={[3, 0]}>
              <img
                src={
                  'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/dot_Blue_2404e1c4fe.png?updated_at=2022-08-25T09:27:29.663Z'
                }
                alt="icon"
                width={12}
                height={24}
              />
              <Typography sx={{ flex: '1', ml: 2, fontSize: '24px', fontWeight: 700, lineHeight: '28.8px' }}>
                {t('complaints.different', { ns: 'common' })}
              </Typography>
              {!isMobile && (
                <Link
                  component={NextLink}
                  href={`/${locale === 'vi' ? 'danh-gia-san/lua-dao' : 'exchange-review/scam'}`}
                  passHref
                  sx={{
                    color: 'primary.main',
                    marginRight: '5px',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="button" sx={{ mr: 1 }}>
                    {t('text.seeMore', { ns: 'common' })}
                  </Typography>
                  <Box sx={{ '& > span > img': { position: 'static' } }}>
                    <img
                      src={
                        'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Arrow_Right_18e705d65a.png?updated_at=2022-08-25T09:28:40.108Z'
                      }
                      alt="icon"
                      width={24}
                      height={24}
                    />
                  </Box>
                </Link>
              )}
            </Stack>

            <Grid container spacing={3} sx={{ mt: 0, mb: '40px' }}>
              {dataAnotherComplaints &&
                dataAnotherComplaints.complaints
                  .filter((item: any) => item.slug !== reviewCategorySlug)
                  .map((item: any, index: any) => (
                    <Grid key={item.id} item xs={12} sm={6} md={4} sx={{ paddingTop: '0px!important' }}>
                      <ReviewDetailItem data={item} owner={false} />
                      {index < dataAnotherComplaints.complaints.length - 2 && (
                        <Divider flexItem sx={{ mt: '59px', mb: 2 }} />
                      )}
                    </Grid>
                  ))}
            </Grid>
            {isMobile && (
              <Stack justifyContent="center" alignItems="center">
                <Link
                  component={NextLink}
                  href={`/${locale === 'vi' ? 'danh-gia-san/lua-dao' : 'exchange-review/scam'}`}
                  passHref
                  sx={{
                    color: 'primary.main',
                    marginRight: '5px',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <Typography variant="button" sx={{ mr: 1 }}>
                    {t('text.seeMore', { ns: 'common' })}
                  </Typography>
                  <Image
                    src={
                      'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Arrow_Right_18e705d65a.png?updated_at=2022-08-25T09:28:40.108Z'
                    }
                    alt="icon"
                    width={24}
                    height={24}
                    loading="lazy"
                  />
                </Link>
              </Stack>
            )}
          </Container>
        </Box>
      </>
    )
  } else {
    router.push('/404')
  }
}

ReviewCategorySlug.getLayout = (page: any) => {
  return (
    <MainLayout>
      <ReviewLayout>{page}</ReviewLayout>
    </MainLayout>
  )
}

export default ReviewCategorySlug

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale = '', params } = context
  const reviewCategorySlug = params?.reviewCategorySlug
  // const mapReviewCategorySlug = mappedReviewCategorySlug(reviewCategorySlug as string)
  const mapReviewCategorySlug = mappedReviewCategoryStatusBySlug(reviewCategorySlug as string)
  try {
    const complaintResponse = await client.query({
      query: GET_COMPLAINT_BY_SLUG,
      variables: {
        // exposureSlug: mapReviewCategorySlug,
        status: {
          $in: mapReviewCategorySlug,
        },
      },
    })

    const exchangeName = complaintResponse?.data?.complaints?.[0]?.exchange?.name ?? ''

    return {
      props: {
        ...(await serverSideTranslations(locale, ['common', 'complaints', 'home-page', 'seo'])),
        exchangeSEO: {
          exchangeName,
        },
      },
    }
  } catch (e) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common', 'complaints', 'home-page', 'seo'])),
      },
    }
  }
}
