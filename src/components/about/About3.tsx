import { Box, Container, Grid, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useDesktop, useMobile } from '../common'

const About3 = () => {
  const { t } = useTranslation('about-us')
  const isMobile = useMobile()
  const isDesktop = useDesktop()

  const aboutArr = [
    {
      detail: t(`vision.t1`),
      image:
        'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Vector_1_d749a2c801.png?updated_at=2022-10-21T08:35:54.371Z',
    },
    {
      detail: t(`vision.t2`),
      image:
        'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/People_956e0e1474.png?updated_at=2022-10-21T08:35:54.327Z',
    },
    {
      detail: t(`vision.t3`),
      image:
        'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Shield_Check_49bd53b0ca.png?updated_at=2022-10-21T08:35:54.399Z',
    },
  ]

  const valueArr = [
    {
      image:
        'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/icon_Blue1_a8cf9c2182.png?updated_at=2022-08-26T10:48:38.319Z',
      title: t(`coreValue.t1.t`),
      detail: t(`coreValue.t1.d`),
    },
    {
      image:
        'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/icon_Blue2_6c0db288c0.png?updated_at=2022-08-26T10:48:38.592Z',
      title: t(`coreValue.t2.t`),
      detail: t(`coreValue.t2.d`),
    },
    {
      image:
        'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/icon_Blue3_7ec30fb0a1.png?updated_at=2022-08-26T10:48:37.704Z',
      title: t(`coreValue.t3.t`),
      detail: t(`coreValue.t3.d`),
    },
    {
      image:
        'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/icon_Blue4_0224650be2.png?updated_at=2022-08-26T10:48:38.901Z',
      title: t(`coreValue.t4.t`),
      detail: t(`coreValue.t4.d`),
    },
    {
      image:
        'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/icon_Blue5_f757d22df5.png?updated_at=2022-08-26T10:48:38.903Z',
      title: t(`coreValue.t5.t`),
      detail: t(`coreValue.t5.d`),
    },
  ]
  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        pt: isMobile ? 0 : 7,
        pb: isMobile ? 3 : 7,
      }}
    >
      <Container maxWidth="lg">
        <Stack>
          <Typography variant="h2" sx={{ textAlign: 'center' }}>
            {t(`vision.title`)}
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: 'center', color: 'subtitle.main', mt: 2, px: isMobile ? 0 : !isDesktop ? 6 : 20 }}
          >
            {t(`vision.top`)}
          </Typography>
          <Stack
            direction={isMobile ? 'column' : 'row'}
            spacing={!isDesktop ? 3 : 6}
            sx={{ px: !isDesktop ? 1 : 4, pt: 4 }}
          >
            {aboutArr.map((item, index) => (
              <Stack
                key={index}
                sx={{
                  pb: 3,
                  pt: 3,
                  px: 4,
                  flex: '1',
                  boxShadow: isMobile ? '0px 4px 20px rgba(42,85,156, 0.5)' : '0px 4px 20px rgba(9, 10, 112, 0.05)',
                  position: 'relative',
                  borderRadius: '8px',
                  '&::after': {
                    position: 'absolute',
                    bottom: '0',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    content: '""',
                    width: '80px',
                    height: '4px',
                    backgroundColor: 'primary.main',
                  },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Image src={item.image} width="40px" height="40px" alt="icon" loading="lazy" />
                </Box>
                <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
                  {item.detail}
                </Typography>
              </Stack>
            ))}
          </Stack>

          <Typography variant="h2" sx={{ textAlign: 'center', pt: isMobile ? 5 : 7 }}>
            {t(`coreValue.title`)}
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: 'center', color: 'subtitle.main', mt: 2, px: isMobile ? 2 : 20 }}
          >
            {t(`coreValue.top`)}
          </Typography>
          <Grid container spacing={isMobile ? 0 : 3} justifyContent="center">
            {valueArr.map((item, index) => (
              <Grid key={index} item xs={12} sm={4} md={4}>
                <Stack
                  sx={{
                    pb: 3,
                    pt: isMobile ? 0 : 5,
                    flex: '1',
                  }}
                  paddingX={isDesktop ? 4 : 0}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Image src={item.image} width="84px" height="84px" alt="icon" loading="lazy" />
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{ color: 'primary.main', textDecoration: 'uppercase', mt: 2, mb: 1, textAlign: 'center' }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="body1" sx={{ textAlign: 'center' }}>
                    {item.detail}
                  </Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  )
}

export default About3
