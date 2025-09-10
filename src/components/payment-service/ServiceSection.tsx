import { Box, Container, Grid, Typography } from '@mui/material'
import PaymentIcon from '@mui/icons-material/Payment'
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions'
import BuildIcon from '@mui/icons-material/Build'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import CampaignIcon from '@mui/icons-material/Campaign'
import { useTranslation } from 'react-i18next'

const ServicesSection = () => {
  const { t } = useTranslation('payment-service')
  const services = [
    {
      title: t('service.t1'),
      icon: <PaymentIcon sx={{ fontSize: 64, color: 'primary.main' }} />,
    },
    {
      title: t('service.t2'),
      icon: <IntegrationInstructionsIcon sx={{ fontSize: 64, color: 'primary.main' }} />,
    },
    {
      title: t('service.t3'),
      icon: <BuildIcon sx={{ fontSize: 64, color: 'primary.main' }} />,
    },
    {
      title: t('service.t4'),
      icon: <SupportAgentIcon sx={{ fontSize: 64, color: 'primary.main' }} />,
    },
    {
      title: t('service.t5'),
      icon: <AdminPanelSettingsIcon sx={{ fontSize: 64, color: 'primary.main' }} />,
    },
    {
      title: t('service.t6'),
      icon: <CampaignIcon sx={{ fontSize: 64, color: 'primary.main' }} />,
    },
  ]
  return (
    <Box id="services" sx={{ width: '100%', py: 10, px: 2, backgroundColor: '#f5f5f5' }}>
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
          {t('whatWeOffer')}
        </Typography>

        <Grid container spacing={5}>
          {services.map((service, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <Box sx={{ mb: 2 }}>{service.icon}</Box>
                <Typography variant="h6" sx={{ fontSize: '1.125rem', fontWeight: 500 }}>
                  {service.title}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default ServicesSection
