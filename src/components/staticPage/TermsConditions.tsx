import { Box, Container, Divider, Stack, Typography } from '@mui/material'
import { useMobile } from '../common'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

interface TermsConditionsProps {
  data: any
}

const TermsConditions = ({ data }: TermsConditionsProps) => {
  const isMobile = useMobile()
  const { t } = useTranslation(['seo'])
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{t(`term.title`, { ns: 'seo' })}</title>
        <meta name="description" content={t(`term.description`, { ns: 'seo' })} />
        <meta name="og:title" content={t(`term.title`, { ns: 'seo' })} />
        <meta name="og:description" content={t(`term.description`, { ns: 'seo' })} />
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
                width: isMobile ? '25px' : '15px',
                height: '30px',
                backgroundColor: '#FFC700',
                borderRadius: '10px',
              }}
            />
            <Typography variant="h1">
              {router.locale === 'vi'
                ? 'Điều khoản sử dụng dịch vụ Info Finance'
                : 'Terms of use of Info Finance service'}
            </Typography>
          </Stack>
          <Typography
            variant="body2"
            sx={{
              fontSize: '1rem',
              mt: 2,
            }}
          >
            {router.locale === 'vi' ? (
              <p>
                Cảm ơn bạn đã sử dụng sản phẩm và dịch vụ của chúng tôi (gọi tắt là “Dịch vụ”). Bằng việc đăng ký sử
                dụng Dịch vụ của Info Finance, bạn được hiểu là đồng ý với các điều khoản và điều kiện dưới đây (gọi tắt
                là “Điều khoản dịch vụ”). Info Finance có quyền hạn cập nhật và thay đổi điều khoản dịch vụ bằng cách
                cập nhật thông tin tại trang web Info Finance. Chúng tôi đề xuất bạn nên quay lại trang này để kiểm tra
                và cập nhật thông tin mỗi khi chúng tôi có thông báo mới.
              </p>
            ) : (
              <p>
                Thank you for using our products and services (&quot;Services&quot;). By registering for use Info
                Finance&apos;s services, you are understood to agree to the terms and conditions below (referred to as
                &quot;Article service clause&quot;). Info Finance reserves the right to update and change the terms of
                service by updating information information at the Info Finance website. We recommend that you return to
                this page to check and update information News every time we have a new announcement.
              </p>
            )}
          </Typography>
          <Stack
            sx={{
              marginTop: '20px',
            }}
          >
            {data?.map((item: any, index: number) => (
              <Stack key={index}>
                <Typography variant="h6" sx={{ flex: '1' }}>
                  {item?.attributes?.title}
                </Typography>
                <Box
                  dangerouslySetInnerHTML={{
                    __html: item?.attributes?.description,
                  }}
                  sx={{ width: '100%', '& img': { maxWidth: '100%' }, textAlign: 'justify' }}
                />
                {index < 4 && (
                  <Divider flexItem orientation="horizontal" sx={{ mt: isMobile ? 1 : 3, mb: isMobile ? 3 : 4 }} />
                )}
              </Stack>
            ))}
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default TermsConditions
