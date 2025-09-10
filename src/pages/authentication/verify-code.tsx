import { Box, Card, Container, Stack, Typography } from '@mui/material'
import Head from 'next/head'
import NextLink from 'next/link'
import { ReactElement, useEffect } from 'react'
import { AmplifyVerifyCode } from '../../components/authentication/amplify-verify-code'
import { GuestGuard } from '../../components/authentication/guest-guard'
import { gtm } from '../../lib/gtm'

const VerifyCode = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' })
  }, [])

  return (
    <>
      <Head>
        <title>Verify Code | InfoFX</title>
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
            <Card elevation={16} sx={{ p: 4 }}>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h4">Nhập mã xác thực</Typography>
                <Typography color="textSecondary" sx={{ mt: 2 }} variant="body2">
                  Vui lòng nhập mã xác thực đã được gửi đến email của bạn.
                </Typography>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  mt: 3,
                }}
              >
                <AmplifyVerifyCode />
              </Box>
              {/* <Divider sx={{ my: 3 }} />
              <NextLink href={'/authentication/login'} passHref>
                <Link fontWeight={500} variant="body2">
                  Bạn chưa nhận được mật mã?
                </Link>
              </NextLink> */}
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  )
}

VerifyCode.getLayout = (page: ReactElement) => <GuestGuard>{page}</GuestGuard>

export default VerifyCode
