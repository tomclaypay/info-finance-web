import { Box, Container, Divider, Stack, Typography } from '@mui/material'
import { useMobile } from '../common'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

interface PrivacyPolicyProps {
  data: any
}

const PrivacyPolicy = ({ data }: PrivacyPolicyProps) => {
  const isMobile = useMobile()
  const { t } = useTranslation(['seo'])
  const router = useRouter()
  return (
    <>
      <Head>
        <title>{t(`policy.title`, { ns: 'seo' })}</title>
        <meta name="description" content={t(`policy.description`, { ns: 'seo' })} />
        <meta name="og:title" content={t(`policy.title`, { ns: 'seo' })} />
        <meta name="og:description" content={t(`policy.description`, { ns: 'seo' })} />
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          my: isMobile ? 0 : 3,
        }}
      >
        <Container maxWidth="lg">
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                width: isMobile ? '20px' : '15px',
                height: '30px',
                backgroundColor: '#FFC700',
                borderRadius: '10px',
              }}
            />
            <Typography variant="h1">
              {router.locale === 'vi' ? 'Chính sách bảo mật Info Finance' : 'Info Finance privacy policy'}
            </Typography>
          </Stack>
          <Stack
            sx={{
              marginTop: '20px',
            }}
          >
            {data?.map((item: any, index: number) => (
              <Stack key={index}>
                <Typography variant="h6" sx={{ flex: '1' }}>
                  {index + 1}
                  {`. ${item?.attributes?.title}`}
                </Typography>
                <Box
                  dangerouslySetInnerHTML={{
                    __html: item?.attributes?.description,
                  }}
                  sx={{ width: '100%', '& img': { maxWidth: '100%' }, textAlign: 'justify' }}
                />
                {index < 2 && <Divider flexItem orientation="horizontal" sx={{ my: isMobile ? 1 : 4 }} />}
              </Stack>
            ))}
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default PrivacyPolicy
