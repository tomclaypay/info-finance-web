import { Box, Container, Grid, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useDesktop, useMobile } from '../common'

const About2 = () => {
  const { t } = useTranslation('about-us')
  const isDesktop = useDesktop()
  const isMobile = useMobile()

  const aboutArr = [
    {
      title: t(`support.t1.t`),
      detail: t(`support.t1.d`),
      image:
        'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Frame_80531_8d772654a3.png?updated_at=2022-10-21T07:56:53.994Z',
    },
    {
      title: t(`support.t2.t`),
      detail: t(`support.t2.d`),
      image:
        'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Nut_1d5eb3e87a.png?updated_at=2022-10-21T07:56:53.988Z',
    },
    {
      title: t(`support.t3.t`),
      detail: t(`support.t3.d`),
      image:
        'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Frame_80302_343d5ac6ec.png?updated_at=2022-10-21T07:56:53.982Z',
    },
    {
      title: t(`support.t4.t`),
      detail: t(`support.t4.d`),
      image:
        'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Frame_80303_0526858969.png?updated_at=2022-10-21T07:56:53.973Z',
    },
  ]
  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        pt: !isDesktop ? 0 : 5,
        pb: !isDesktop ? 5 : 7,
      }}
    >
      <Container maxWidth="lg">
        <Stack direction={!isDesktop ? 'column' : 'row'}>
          {isDesktop && (
            <Stack sx={{ flex: '1', position: 'relative', mr: 8, minHeight: '364px' }}>
              <Box
                sx={{
                  borderRadius: '8px',
                  overflow: 'hidden',
                  position: 'absolute',
                  left: '0px',
                  top: '50px',
                  maxHeight: '337px',
                  width: '90%',
                  paddingTop: '56.25%',
                  '& > span': {
                    position: 'absolute!important',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  },
                }}
              >
                <Image
                  src="https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/background_yellow_82869cbf7c.png?updated_at=2022-08-26T15:13:24.341Z"
                  alt="Hình ảnh"
                  layout="fill"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  objectFit="fill"
                  objectPosition="left"
                  loading="lazy"
                />
              </Box>
              <Box
                sx={{
                  borderRadius: '8px',
                  overflow: 'hidden',
                  position: 'absolute',
                  right: '0',
                  maxHeight: '337px',
                  width: '90%',
                  paddingTop: '56.25%',
                  '& > span': {
                    position: 'absolute!important',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  },
                }}
              >
                <Image
                  src="https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/hero_ff87145c73.jpg?updated_at=2022-08-26T10:48:37.494Z"
                  alt="Hình ảnh"
                  layout="fill"
                  objectFit="fill"
                  objectPosition="top"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  loading="lazy"
                />
              </Box>
            </Stack>
          )}

          <Stack sx={{ flex: '1' }}>
            {(isDesktop || isMobile) && (
              <Stack direction="row">
                <Stack>
                  <Box
                    sx={{
                      backgroundColor: 'secondary.main',
                      width: '18px',
                      height: '36px',
                      borderRadius: '10px',
                    }}
                  />
                </Stack>
                <Stack sx={{ ml: 2, flex: '1' }}>
                  {<Typography variant="h1">{t(`support.title`)}</Typography>}
                  {isDesktop && (
                    <Typography variant="body1" sx={{ mt: 2, textAlign: 'justify' }}>
                      {t(`support.top`)}
                    </Typography>
                  )}
                </Stack>
              </Stack>
            )}
          </Stack>
          {!isDesktop && (
            <Stack sx={{ flex: '1', position: 'relative', minHeight: '250px', mt: 3 }}>
              <Box
                sx={{
                  borderRadius: '8px',
                  overflow: 'hidden',
                  position: 'absolute',
                  left: '0px',
                  top: '20px',
                  maxHeight: '337px',
                  width: '70%',
                  paddingTop: '56.25%',
                  '& > span': {
                    position: 'absolute!important',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  },
                }}
              >
                <Image
                  src="https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/background_yellow_82869cbf7c.png?updated_at=2022-08-26T15:13:24.341Z"
                  alt="Hình ảnh"
                  layout="fill"
                  objectFit="fill"
                  objectPosition="left"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  loading="lazy"
                />
              </Box>
              <Box
                sx={{
                  borderRadius: '8px',
                  overflow: 'hidden',
                  position: 'absolute',
                  right: '0',
                  maxHeight: '337px',
                  width: '90%',
                  paddingTop: '56.25%',
                  '& > span': {
                    position: 'absolute!important',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  },
                }}
              >
                <Image
                  src="https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/hero_ff87145c73.jpg?updated_at=2022-08-26T10:48:37.494Z"
                  alt="Hình ảnh"
                  layout="fill"
                  objectFit="fill"
                  objectPosition="top"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  loading="lazy"
                />
              </Box>
            </Stack>
          )}
          {!isDesktop && !isMobile && (
            <Stack direction="row" marginTop={30}>
              <Stack>
                <Box
                  sx={{
                    backgroundColor: 'secondary.main',
                    width: '18px',
                    height: '36px',
                    borderRadius: '10px',
                  }}
                />
              </Stack>
              <Stack sx={{ ml: 2, flex: '1' }}>
                <Typography variant="h1">{t(`support.title`)}</Typography>
                <Typography variant="body1" sx={{ mt: 2, textAlign: 'justify' }}>
                  {t(`support.top`)}
                </Typography>
              </Stack>
            </Stack>
          )}
          {isMobile && (
            <Typography variant="body1" sx={{ mt: 2, textAlign: 'justify' }}>
              {t(`support.top`)}
            </Typography>
          )}
        </Stack>
        <Grid container spacing={3} sx={{ mt: !isDesktop ? 0 : 10 }}>
          {aboutArr.map((item, index) => (
            <Grid key={index} item xs={12} md={6}>
              <Stack direction="row" spacing={3} sx={{ px: !isDesktop ? 1 : 7 }}>
                <Stack>
                  <Image src={item.image} alt="icon" width="40px" height="40px" loading="lazy" />
                </Stack>
                <Stack sx={{ ml: 2, flex: '1' }}>
                  <Typography variant="h4" sx={{ color: 'primary.main' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 2, textAlign: 'justify' }}>
                    {item.detail}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default About2
