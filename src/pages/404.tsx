import { useMobile } from '@app/components/common'
import { MainLayout } from '@app/components/main-layout'
import { Box, Button, Container, Stack } from '@mui/material'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Image from 'next/image'
import NextLink from 'next/link'
import { ReactElement, useEffect } from 'react'
import { gtm } from '../lib/gtm'

const NotFound = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' })
  }, [])

  const isMobile = useMobile()

  return (
    <>
      <Head>
        <title>Error: Not found - Info Finance</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          backgroundColor: 'background.paper',
          display: 'flex',
          flexGrow: 1,
          py: '80px',
        }}
      >
        <Container maxWidth="lg">
          <Stack alignItems="center">
            <Box>
              <Image
                src={
                  'https://infofx-prod.s3.ap-southeast-1.amazonaws.com/pana_55c5b27a06.png?updated_at=2023-03-08T07:15:46.253Z'
                }
                alt="404"
                width={isMobile ? 500 : 700}
                height={isMobile ? 350 : 474}
                loading="lazy"
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 6,
              }}
            >
              <NextLink href="/" passHref>
                <Button component="a" variant="contained">
                  Quay lại trang chủ
                </Button>
              </NextLink>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  )
}

NotFound.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>

export default NotFound

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'exchange'])),
      // Will be passed to the page component as props
    },
  }
}
