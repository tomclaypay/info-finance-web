import { useDesktop } from '@app/components/common'
import { Box, Card, Container, Grid, Link, Stack, Typography } from '@mui/material'
import Head from 'next/head'
import NextLink from 'next/link'
import { useEffect } from 'react'
import { AmplifyLogin } from '../../components/authentication/amplify-login'
import { GuestGuard } from '../../components/authentication/guest-guard'
import { gtm } from '../../lib/gtm'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Login = () => {
  const isDesktop = useDesktop()
  const { t } = useTranslation('common')
  useEffect(() => {
    gtm.push({ event: 'page_view' })
  }, [])

  return (
    <>
      <Head>
        <title>Login | Info Finance</title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: '#F4F8FF',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          position: 'relative',
          height: '100vh',
        }}
      >
        <Box
          sx={{ position: 'absolute', bottom: '10%', right: 0, zIndex: 0 }}
          component="img"
          alt=""
          src={`/static/auth-graphic.png`}
        />
        <Container
          maxWidth="lg"
          sx={{
            position: 'relative',
            zIndex: 1,
            height: '100%',
            py: {
              xs: '60px',
              md: '120px',
            },
          }}
        >
          {!isDesktop ? (
            <Stack alignItems="center" spacing={5} pb={5}>
              <Stack alignItems="center" spacing={1}>
                <NextLink href="/" passHref>
                  <NextLink href="/" passHref>
                    <img height={64} alt="" src={`/static/full-logo.png`} />
                  </NextLink>
                </NextLink>
                <img width={300} alt="" src={`/static/login-graphic.png`} />
              </Stack>
              <Card elevation={16} sx={{ p: 4, width: '100%', borderRadius: 2 }}>
                <Box
                  sx={{
                    alignItems: 'flex-start',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h4">{t('authen.login')}</Typography>
                  <Stack sx={{ mt: 2 }} direction="row" spacing={0.75}>
                    <Typography color="textSecondary" variant="body2">
                      Bạn chưa có tài khoản?
                    </Typography>
                    <NextLink href={'/authentication/register'} passHref>
                      <Link fontWeight={500} variant="body2">
                        Đăng ký
                      </Link>
                    </NextLink>
                  </Stack>
                </Box>
                <Box
                  sx={{
                    flexGrow: 1,
                    mt: 3,
                  }}
                >
                  <AmplifyLogin />
                </Box>
              </Card>
            </Stack>
          ) : (
            <Grid container spacing={12} sx={{ width: '100%', height: '100%' }}>
              <Grid
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                item
                xs={12}
                md={6}
              >
                <Stack spacing={4} alignItems="center">
                  <NextLink href="/" passHref>
                    <NextLink href="/" passHref>
                      <img height={64} alt="" src={`/static/full-logo.png`} />
                    </NextLink>
                  </NextLink>
                  <img width={472} alt="" src={`/static/login-graphic.png`} />
                </Stack>
              </Grid>
              <Grid
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                item
                xs={12}
                md={6}
              >
                <Card elevation={16} sx={{ p: 4, width: '100%', borderRadius: 2 }}>
                  <Box
                    sx={{
                      alignItems: 'flex-start',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="h4">{t('authen.login')}</Typography>
                    <Stack sx={{ mt: 2 }} direction="row" spacing={0.75}>
                      <Typography color="textSecondary" variant="body2">
                        {t('authen.questions')}
                      </Typography>
                      <NextLink href={'/authentication/register'} passHref>
                        <Link fontWeight={500} variant="body2">
                          {t('authen.signup')}
                        </Link>
                      </NextLink>
                    </Stack>
                  </Box>
                  <Box
                    sx={{
                      flexGrow: 1,
                      mt: 3,
                    }}
                  >
                    <AmplifyLogin />
                  </Box>
                </Card>
              </Grid>
            </Grid>
          )}
        </Container>
      </Box>
    </>
  )
}

Login.getLayout = (page: any) => <GuestGuard>{page}</GuestGuard>

export default Login

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  }
}
