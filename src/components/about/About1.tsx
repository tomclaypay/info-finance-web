import { Box, Container, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { useDesktop } from '../common'

const About1 = () => {
  const { t } = useTranslation('about-us')
  // const isMobile = useMobile()
  const isDesktop = useDesktop()
  const aboutArr = [
    {
      title: t(`aboutInfo.t1`),
      image:
        'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/search1_23986104b1.png?updated_at=2022-10-21T07:53:41.845Z',
    },
    {
      title: t(`aboutInfo.t2`),
      image:
        'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Frame_80543_0f34cfa977.png?updated_at=2022-10-21T07:53:41.819Z',
    },
    {
      title: t(`aboutInfo.t3`),
      image:
        'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Frame_80544_1a8a296bbc.png?updated_at=2022-10-21T07:53:41.814Z',
    },
  ]

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        pt: !isDesktop ? 3 : 8,
        pb: !isDesktop ? 5 : 7,
      }}
    >
      <Container maxWidth="lg">
        <Stack direction={!isDesktop ? 'column' : 'row'}>
          <Stack sx={{ flex: '1' }}>
            {!isDesktop && (
              <Stack sx={{ flex: '1' }}>
                <Box
                  sx={{
                    borderRadius: '8px',
                    overflow: 'hidden',
                    position: 'relative',
                    height: '100%',
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
                    src="https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/search_d8ba8c7751.png?updated_at=2022-08-26T10:48:41.311Z"
                    alt="Hình ảnh"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="center"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                    loading="lazy"
                  />
                </Box>
              </Stack>
            )}
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  backgroundColor: 'secondary.main',
                  width: '18px',
                  height: '36px',
                  borderRadius: '10px',
                }}
              />
              <Typography variant="h2">{t(`aboutInfo.title`)}</Typography>
            </Stack>
            <Typography variant="body1" sx={{ textAlign: 'justify', mt: 3, mb: 2 }}>
              <b style={{ color: '#2A559C' }}> Info Finance</b> {t('aboutInfo.top')}
            </Typography>
            {aboutArr.map((item, index) => (
              <Stack key={index} direction="row" sx={{ mt: 2, mb: 2, alignItems: 'center' }}>
                <Image src={item.image} alt="icon" width="48px" height="48px" loading="lazy" />
                <Typography variant="body1" sx={{ ml: 2 }}>
                  {item.title}
                </Typography>
              </Stack>
            ))}
            <Typography variant="body1" sx={{ mt: 2 }}>
              {t(`aboutInfo.bottom`)}
            </Typography>
          </Stack>
          {isDesktop && (
            <Stack sx={{ flex: '1' }}>
              <Box
                sx={{
                  borderRadius: '8px',
                  overflow: 'hidden',
                  position: 'relative',
                  height: '100%',
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
                  src="https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/search_d8ba8c7751.png?updated_at=2022-08-26T10:48:41.311Z"
                  alt="Hình ảnh"
                  layout="fill"
                  objectFit="contain"
                  objectPosition="center"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  loading="lazy"
                />
              </Box>
            </Stack>
          )}
        </Stack>
      </Container>
    </Box>
  )
}

export default About1
