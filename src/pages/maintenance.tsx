import { Box, Container, Stack, Typography } from '@mui/material'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useTranslation } from 'react-i18next'

const Maintenance = () => {
  return (
    <>
      <Head>
        <title>Trang bảo trì | Info Finance</title>
        <meta name="description" content="Thông báo bảo trì hệ thống Info Finance – Maintenance Notice" />
      </Head>

      <Box sx={{ backgroundColor: 'background.paper', pt: 20, pb: 10 }}>
        <Container maxWidth="lg">
          <Stack spacing={6}>
            <Typography variant="h3" sx={{ color: 'primary.main', textAlign: 'center', fontWeight: 700 }}>
              Thông báo bảo trì / Maintenance Notice
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: 6,
                alignItems: 'start',
              }}
            >
              {/* Tiếng Việt */}
              <Box>
                <Typography variant="h5" gutterBottom fontWeight={600}>
                  Tiếng Việt
                </Typography>
                <Typography sx={{ lineHeight: 1.7 }}>
                  Bạn đọc thân mến, <br />
                  Để không ngừng nâng cấp trải nghiệm tra cứu thông tin và cập nhật tin tức trên Info Finance, chúng tôi
                  trân trọng thông báo đến bạn đọc về việc bảo trì và nâng cấp hệ thống website.
                  <br />
                  Nếu bạn đọc có bất cứ câu hỏi, vui lòng gửi mail đến <strong>cs@infofinance.com</strong>, hoặc gọi đến
                  hotline <strong>0969 116 052</strong> để được hỗ trợ.
                  <br />
                  Trải nghiệm website Info Finance của bạn sẽ bị gián đoạn trong thời gian này.
                  <br />
                  Info Finance cảm ơn bạn đã thông cảm về sự bất tiện này.
                </Typography>
              </Box>

              {/* English */}
              <Box>
                <Typography variant="h5" gutterBottom fontWeight={600}>
                  English
                </Typography>
                <Typography sx={{ lineHeight: 1.7 }}>
                  Dear valued readers, <br />
                  To continuously improve your experience in accessing financial news and market updates on Info
                  Finance, we would like to inform you that our website is currently undergoing maintenance and system
                  upgrades.
                  <br />
                  If you have any questions, please email us at <strong>cs@infofinance.com</strong> or call our hotline
                  at <strong>0969 116 052</strong> for assistance.
                  <br />
                  Your experience on Info Finance may be temporarily interrupted during this period.
                  <br />
                  Thank you for your understanding and patience.
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default Maintenance
