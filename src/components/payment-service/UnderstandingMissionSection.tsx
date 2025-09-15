import { useMobile } from '@app/components/common'
import { Banner } from '@app/interfaces/banner'
import { Box, Container, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

const UnderstandingMissionSection = ({
  leftPaymentServiceBanner,
  rightPaymentServiceBanner,
}: {
  leftPaymentServiceBanner?: Banner
  rightPaymentServiceBanner?: Banner
}) => {
  const { t } = useTranslation('payment-service')

  return (
    <>
      {/* Client Understanding Section */}
      <Box sx={{ width: '100%', py: 8, backgroundColor: 'white' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={leftPaymentServiceBanner?.link?.[0] || ''}
                  alt="Client Understanding"
                  width={600}
                  height={400}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                  loading="lazy"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 3 }}>
                {t('understandingMission.t1')}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Mission Statement Section */}
      <Box sx={{ width: '100%', py: 8, backgroundColor: '#f9fafb' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 3 }}>
                {t('understandingMission.t2')}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Box
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={rightPaymentServiceBanner?.link?.[0] || ''}
                  alt="Our Mission"
                  width={600}
                  height={400}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                  loading="lazy"
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default UnderstandingMissionSection
