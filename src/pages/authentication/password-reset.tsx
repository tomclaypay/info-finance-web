import { useMobile } from '@app/components/common'
import { Box, Card, Container, Divider, Link, Stack, Typography } from '@mui/material'
import Head from 'next/head'
import NextLink from 'next/link'
import { useEffect } from 'react'
import { AmplifyPasswordReset } from '../../components/authentication/amplify-password-reset'
import { GuestGuard } from '../../components/authentication/guest-guard'
import { gtm } from '../../lib/gtm'
import {useRouter} from "next/router";
import {PASSWORD_RESET_TYPE} from "@app/constants";

const PasswordReset = () => {
  const isMobile = useMobile()
  const { query } = useRouter()
  useEffect(() => {
    gtm.push({ event: 'page_view' })
  }, [])

  return (
    <>
      <Head>
        <title>Tạo mật khẩu mới | InfoFX</title>
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
            <Card elevation={16} sx={{ p: 4, borderRadius: 2 }}>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h4">Tạo mật khẩu mới</Typography>
                <Typography color="textSecondary" sx={{ mt: 2, textAlign: "center" }} variant="body2">
                  {query?.type === PASSWORD_RESET_TYPE.PASSWORD_EXPIRED && 'Mật khẩu của bạn đã hết hạn.'} Đặt lại mật khẩu của bạn với mật mã gửi qua mail của bạn.
                </Typography>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  mt: 3,
                }}
              >
                <AmplifyPasswordReset />
              </Box>
              {/* <Divider sx={{ my: 3 }} />
              <NextLink href={'/authentication/password-recovery'} passHref>
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

PasswordReset.getLayout = (page) => <GuestGuard>{page}</GuestGuard>

export default PasswordReset
