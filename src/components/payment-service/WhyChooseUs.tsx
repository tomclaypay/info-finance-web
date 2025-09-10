import { Box, Container, Grid, Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useTranslation } from 'react-i18next'

const WhyChooseUs = () => {
  const { t } = useTranslation('payment-service')
  const reasons = [
    {
      title: t('reasons.t1'),
      description: t('reasons.d1'),
    },
    {
      title: t('reasons.t2'),
      description: t('reasons.d2'),
    },
    {
      title: t('reasons.t3'),
      description: t('reasons.d3'),
    },
    {
      title: t('reasons.t4'),
      description: t('reasons.d4'),
    },
  ]
  return (
    <Box id="why_us" sx={{ width: '100%', py: 10, px: 2 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '1.5rem', md: '2rem' },
            fontWeight: 600,
            mb: 6,
            textAlign: 'center',
          }}
        >
          {t('whyChooseUs')}
        </Typography>

        <Grid
          container
          spacing={6}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignContent: 'center',
          }}
        >
          {reasons.map((reason, index) => (
            <Grid item xs={12} md={8} key={index}>
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ mr: 2, mt: 0.5, color: 'primary.main' }}>
                  <CheckCircleIcon sx={{ fontSize: 28 }} />
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: '1rem', fontWeight: 600, textTransform: 'uppercase', mb: 1 }}
                  >
                    {reason.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    {reason.description}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default WhyChooseUs
