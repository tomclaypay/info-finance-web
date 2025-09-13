import { MainLayout } from '../../components/main-layout'
import { Box, Container, Divider, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { useQuery } from '@apollo/client'
import GET_COMPLAINT_CATEGORIES from '@app/operations/queries/complaints/get-complaint-categories'
import { AuthContext } from '@app/contexts/amplify-context'
import { useContext } from 'react'
import GET_ONE_USER from '@app/operations/queries/users/get-one-user'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useDesktop, useMobile } from '@app/components/common'
import Head from 'next/head'
import ReviewCreateForm from '@app/components/exchange-review/ReviewCreateForm'

const CreateReview = () => {
  const { data: dataCategories } = useQuery(GET_COMPLAINT_CATEGORIES)
  const router = useRouter()
  const { query } = router
  const value = useContext(AuthContext)
  const isMobile = useMobile()
  const isDesktop = useDesktop()
  const { data: dataUser } = useQuery(GET_ONE_USER, {
    variables: {
      id: value?.user?.id,
    },
  })

  const { t } = useTranslation(['complaints', 'common', 'seo'])

  const contactArr = [
    {
      title: 'Hotline',
      detail: '+84969116052',
      image:
        'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Frame_80292_b7f81335a5.png?updated_at=2022-08-30T03:03:47.007Z',
    },
    {
      title: t('yourComplaint.right.bottom.t2'),
      detail: 'cs@infofinance.com',
      image:
        'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Frame_802921111_1be11adce1.png?updated_at=2022-08-30T03:03:47.003Z',
    },
    {
      title: t('yourComplaint.right.bottom.t3'),
      detail: '',
      image:
        'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Frame_802921111_1be11adce1.png?updated_at=2022-08-30T03:03:47.003Z',
    },
  ]

  return (
    <>
      <Head>
        <title>{t(`create-review.title`, { ns: 'seo' })}</title>
        <meta name="og:title" content={t(`create-review.title`, { ns: 'seo' })} />
        <meta name="description" content={t(`create-review.description`, { ns: 'seo' })} />
        <meta name="og:description" content={t(`create-review.description`, { ns: 'seo' })} />
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          pb: 7,
          top: isMobile ? 0 : '15px',
          position: 'relative',
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            overflow: 'hidden',
            position: 'relative',
            height: '300px',
            width: '100%',
            '& > span': {
              position: 'absolute!important',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            },
          }}
        >
          <Image
            src="https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Rectangle_4401_b392948a07.png?updated_at=2022-08-30T02:24:20.928Z"
            alt="Hình ảnh"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            loading="lazy"
          />
          <Container
            maxWidth="md"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Typography
              variant="h1"
              textTransform={'capitalize'}
              sx={{ textAlign: 'center', fontSize: '48px !important', fontWeight: 700, color: '#FFFFFF' }}
            >
              {t('banner1')}
            </Typography>
            <Typography
              variant="body1"
              sx={{ textAlign: 'center', color: 'subtitle.main', mt: 2, mb: isMobile ? 1 : 0 }}
            >
              {t('banner2')}
            </Typography>
          </Container>
        </Container>

        <Container maxWidth="lg" sx={{ mt: 5 }}>
          <Stack direction={!isDesktop ? 'column' : 'row'} sx={{ px: isDesktop ? 20 : 0 }}>
            <Stack sx={{ flex: '3' }}>
              {dataCategories && dataUser && (
                <ReviewCreateForm
                  dataCategories={dataCategories?.complaint_categories}
                  dataUser={dataUser.users[0]}
                  dataInput={query}
                />
              )}
            </Stack>
            {!isMobile && <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />}
            {!isMobile && (
              <Stack sx={{ flex: '2' }} mt={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Image
                    src={
                      'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/dot_Blue_2404e1c4fe.png?updated_at=2022-08-25T09:27:29.663Z'
                    }
                    alt="icon"
                    width={12}
                    height={24}
                    loading="lazy"
                  />
                  <Typography variant="h4" sx={{ flex: '1', ml: 1 }}>
                    {t('create.right')}
                  </Typography>
                </Box>
                <Stack spacing={4}>
                  {contactArr.map((item, index) => (
                    <Stack key={index} direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                      <Stack>
                        <Image src={item.image} alt="icon" width={48} height={48} loading="lazy" />
                      </Stack>
                      <Stack sx={{ ml: 2, flex: '1' }}>
                        <Typography variant="body1" sx={{ color: 'subtitle.main' }}>
                          {item.title}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ textAlign: 'justify', whiteSpace: 'pre' }}>
                          {item.detail}
                        </Typography>
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            )}
          </Stack>
        </Container>
      </Box>
    </>
  )
}

CreateReview.getLayout = (page: any) => <MainLayout>{page}</MainLayout>

export default CreateReview

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'complaints', 'home-page', 'seo'])),
      // Will be passed to the page component as props
    },
    revalidate: 30,
  }
}
