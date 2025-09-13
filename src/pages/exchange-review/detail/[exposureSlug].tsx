import { Box, Button, CircularProgress, Container, Divider, Grid, Link, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import NextLink from 'next/link'
import GET_COMPLAINT_BY_SLUG from '@app/operations/queries/complaints/get-complaint-by-slug'
import { MainLayout } from '@app/components/main-layout'
import { AuthContext } from '@app/contexts/amplify-context'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import GET_COMPLAINTS_BY_CATEGORY from '@app/operations/queries/complaints/get-complaints-by-category'
import ReviewDetailItem from '@app/components/exchange-review/ReviewDetailItem'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { COMPLAINT_STATUS } from '@app/constants/complaint'
import { useMobile } from '@app/components/common'
import ReviewDetail from '@app/components/exchange-review/ReviewDetail'

const ReviewDetailPage = () => {
  const router = useRouter()
  const { locale } = router
  const value = useContext(AuthContext)
  const { exposureSlug } = router.query
  const isMobile = useMobile()
  const { t } = useTranslation(['common', 'complaints'])
  const { loading, data } = useQuery(GET_COMPLAINT_BY_SLUG, {
    variables: {
      exposureSlug,
    },
  })

  const { data: dataAnotherComplaints } = useQuery(GET_COMPLAINTS_BY_CATEGORY, {
    variables: {
      slug: data && data.complaints?.[0]?.category?.slug,
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

  useEffect(() => {
    if (exposureSlug) {
      router.push(`/${locale === 'vi' ? 'danh-gia-san' : 'exchange-review'}/${exposureSlug}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exposureSlug])

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        pt: isMobile ? 0 : 8,
      }}
    >
      {loading && (
        <Stack alignItems="center" justifyContent="center">
          <CircularProgress />
        </Stack>
      )}

      {data && <ReviewDetail complaintDetail={data.complaints?.[0]} />}

      <Box
        sx={{
          position: 'relative',
          height: 'max-content',
          py: 7,
          my: isMobile ? 0 : 10,
          background:
            'url(https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/8856aed597671d41b6d564d0b4d9a825_85f7397e0e.png?updated_at=2022-08-29T08:22:27.899Z)  center no-repeat',
        }}
      >
        <Container maxWidth="lg">
          <Stack
            spacing={isMobile ? 2 : 0}
            direction={isMobile ? 'column' : 'row'}
            sx={{ justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Stack spacing={2}>
              <Typography variant="h1" sx={{ fontSize: '2.25rem' }}>
                {t('detail.middle1a', { ns: 'complaints' })}
                <b style={{ color: '#ffc700' }}>{t('detail.middle1b', { ns: 'complaints' })}</b>
                {t('detail.middle1c', { ns: 'complaints' })}
              </Typography>
              <Typography variant="h1" sx={{ fontSize: '2.25rem' }}>
                {t('detail.middle2a', { ns: 'complaints' })}
                <b style={{ color: '#ffc700' }}>{t('detail.middle2b', { ns: 'complaints' })}</b>
                {t('detail.middle2c', { ns: 'complaints' })}
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
                  borderRadius: 4,
                  backgroundColor: 'secondary.main',
                  color: 'text.primary',
                  fontSize: '16px',
                  fontWeight: '700',
                  width: isMobile ? 'none' : 'max-content',
                  minWidth: '300px',
                  height: 'max-content',
                  textTransform: 'uppercase',
                }}
                fullWidth
                variant="contained"
                color="secondary"
                size="large"
              >
                {t('button.complaint.send')}
              </Button>
            </NextLink>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Stack direction="row" sx={{ alignItems: 'center', mb: 3 }}>
          <Image
            src={
              'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/dot_Blue_2404e1c4fe.png?updated_at=2022-08-25T09:27:29.663Z'
            }
            alt="icon"
            width={12}
            height={24}
            loading="lazy"
          />
          <Typography variant="h2" sx={{ flex: '1', ml: 2 }}>
            {t('complaints.different')}
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
                {t('text.seeMore')}
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
          )}
        </Stack>

        <Grid container spacing={3} sx={{ mt: 0 }}>
          {dataAnotherComplaints &&
            dataAnotherComplaints.complaints
              .filter((item: any) => item.slug !== exposureSlug)
              .map((item: any) => (
                <Grid key={item.id} item xs={12} md={4} sx={{ paddingTop: '0px!important' }}>
                  <ReviewDetailItem data={item} owner={false} />
                  <Divider flexItem sx={{ mt: 4, mb: 2 }} />
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
                {t('text.seeMore')}
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
  )
}

ReviewDetailPage.getLayout = (page: any) => <MainLayout>{page}</MainLayout>

export default ReviewDetailPage

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'complaints', 'home-page'])),
      // Will be passed to the page component as props
    },
  }
}
