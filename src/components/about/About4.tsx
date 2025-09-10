import { Box, Container, Stack, Typography, Link, Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import NextLink from 'next/link'
import { useDesktop, useMobile } from '../common'

const partners = [
  {
    link: 'https://thebrokers.com/',
    image: {
      url: 'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/theborker_87e7ba9977.webp?updated_at=2022-10-31T03:47:35.820Z',
      width: '198px',
      height: '31px',
    },
  },
  {
    link: 'https://traderhub.net/',
    image: {
      url: 'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Frame_Large1_f3a4853ff6.png?updated_at=2022-10-31T04:28:27.381Z',
      width: '127px',
      height: '71px',
    },
  },
  {
    link: 'https://merritrade.com/',
    image: {
      url: 'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/full_logo_dark_b7d4e23569.png?updated_at=2022-10-31T03:49:49.689Z',
      width: '100px',
      height: '71px',
    },
  },
]

const About4 = () => {
  const { t } = useTranslation('about-us')
  const isMobile = useMobile()
  const isDesktop = useDesktop()

  return (
    <Box
      sx={{
        backgroundColor: '#F4F8FF',
        pt: isMobile ? 6 : 7,
        pb: 7,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={7}>
          <Stack spacing={isMobile ? 1 : 3}>
            <Typography variant="h2" sx={{ textAlign: 'center', pb: isMobile ? 2 : 0 }}>
              {t(`partner.title`)}
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center', px: !isDesktop ? 2 : 20 }}>
              {t(`partner.top`)}
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center', px: !isDesktop ? 2 : 20 }}>
              {t(`partner.bottom`)}
            </Typography>
          </Stack>

          <Grid
            container
            alignItems="center"
            py={isMobile ? 0 : !isDesktop ? 0 : 5}
            px={isMobile ? 0 : !isDesktop ? 6 : 30}
            justifyContent="space-between"
            sx={{
              borderRadius: '8px',
              backgroundColor: '#11223E',
            }}
          >
            {partners.map((partner) => (
              <Grid key={partner.link} item xs={4} sm={4} md={3} p={3.5}>
                <NextLink href={partner.link} passHref>
                  <Link target="_blank">
                    <Image
                      src={partner.image.url}
                      alt="Hình ảnh"
                      width={partner.image.width}
                      height={partner.image.height}
                      loading="lazy"
                    />
                  </Link>
                </NextLink>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  )
}

export default About4
