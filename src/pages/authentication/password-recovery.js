import { useEffect } from 'react'
import Head from 'next/head'
import NextLink from 'next/link'
import { Box, Card, Container, Stack, Typography } from '@mui/material'
import { GuestGuard } from '../../components/authentication/guest-guard'
import { AmplifyPasswordRecovery } from '../../components/authentication/amplify-password-recovery'
import { gtm } from '../../lib/gtm'

const PasswordRecovery = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' })
  }, [])

  return (
    <>
      <Head>
        <title>Bạn quên mật khẩu | Info Finance</title>
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
          maxWidth="sm"
          sx={{
            position: 'relative',
            zIndex: 1,
            py: {
              xs: '60px',
              md: '120px',
            },
          }}
        >
          <Stack alignItems="center" justifyContent="center" spacing={4}>
            <NextLink href="/" passHref>
              <a>
                <img height={64} alt="" src={`/static/full-logo.png`} />
              </a>
            </NextLink>
            <Card elevation={16} sx={{ p: 4, width: '100%' }}>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h4">Bạn quên mật khẩu ?</Typography>
                <Typography
                  color="textSecondary"
                  sx={{ mt: 2 }}
                  variant="body2"
                >
                  Bạn vui lòng nhập email để nhận mã khôi phục
                </Typography>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  mt: 3,
                }}
              >
                <AmplifyPasswordRecovery />
              </Box>
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  )
}

PasswordRecovery.getLayout = (page) => <GuestGuard>{page}</GuestGuard>

export default PasswordRecovery
