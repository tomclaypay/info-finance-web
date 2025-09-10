import { Box, Container, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const AboutPaymentService = () => {
  const { t } = useTranslation('payment-service')

  return (
    <Box id="about" sx={{ width: '100%', py: 10, px: 2 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '1.5rem', md: '2rem' },
            fontWeight: 600,
            mb: 6,
            textAlign: 'center',
            textTransform: 'uppercase',
          }}
        >
          {t('whatIsEpay.title')}
        </Typography>
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: '1.125rem',
            maxWidth: '64rem',
            mx: 'auto',
            mb: 4,
          }}
        >
          {t('whatIsEpay.description1')}
        </Typography>
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: '1.125rem',
            maxWidth: '64rem',
            mx: 'auto',
          }}
        >
          {t('whatIsEpay.description2')}
        </Typography>
      </Container>
    </Box>
  )
}

export default AboutPaymentService
