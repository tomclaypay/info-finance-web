import { Box, Container, Grid, Link, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import NextLink from 'next/link'
import logo from '../../public/static/header/main-logo.png'
import { useDesktop, useMobile } from './common'
import { useRouter } from 'next/router'
import { EmailOutlined, LocationOn, PhoneAndroid, Telegram } from '@mui/icons-material'

const socials = [
  {
    link: 'https://www.linkedin.com/company/infofinancevn/',
    image:
      'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Linked_In_f80c622d67.png?updated_at=2022-10-25T09:03:04.736Z',
  },
  {
    link: 'https://www.facebook.com/infofinance.official',
    image:
      'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Facebook_de95c094ac.png?updated_at=2022-10-25T09:03:04.740Z',
  },
  {
    link: 'https://www.youtube.com/c/InfoFinanceVN',
    image:
      'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/You_Tube_e8b3d9ec01.png?updated_at=2022-10-26T04:32:35.720Z',
  },
  {
    link: 'https://www.tiktok.com/@infofinancevietnam',
    image:
      'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Tik_Tok_e950489fde.png?updated_at=2022-10-25T09:03:04.876Z',
  },
  {
    link: 'https://t.me/InfoFxVietnam',
    image:
      'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Telegram_f194e87613.png?updated_at=2022-10-25T09:03:04.869Z',
  },
]

// const partners = [
//   {
//     link: 'https://thebrokers.com/',
//     image: {
//       url: 'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/theborker_87e7ba9977.webp?updated_at=2022-10-31T03:47:35.820Z',
//       width: '77px',
//       height: '12px',
//     },
//   },
//   {
//     link: 'https://traderhub.net/',
//     image: {
//       url: 'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Frame2_b098838e1b.png?updated_at=2022-10-31T03:49:01.592Z',
//       width: '51px',
//       height: '27px',
//     },
//   },
//   {
//     link: 'https://merritrade.com/',
//     image: {
//       url: 'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/full_logo_dark_b7d4e23569.png?updated_at=2022-10-31T03:49:49.689Z',
//       width: '35px',
//       height: '32px',
//     },
//   },
// ]

export const Footer = () => {
  const { t } = useTranslation('common')
  const { locale } = useRouter()
  const isMobile = useMobile()
  const isDesktop = useDesktop()
  const sections = {
    left: [
      {
        title: t('footer.ground.t1'),
        href: locale === 'vi' ? '/gioi-thieu' : '/about',
      },
      {
        title: t('footer.ground.t7'),
        href: '/tin-tuc',
      },
      {
        title: t('footer.ground.t8'),
        href: `/${locale === 'vi' ? 'danh-gia-san/lua-dao' : 'exchange-review'}`,
      },
    ],
    right: [
      {
        title: t('footer.ground.t2'),
        href: locale === 'vi' ? '/hoi-dap' : '/faq',
      },
      {
        title: t('footer.ground.t3'),
        href: locale === 'vi' ? '/dieu-khoan-dieu-kien' : '/terms-and-conditions',
      },
      {
        title: t('footer.ground.t4'),
        href: locale === 'vi' ? '/chinh-sach-bao-mat' : '/privacy-policy',
      },
    ],
  }
  return (
    <Box
      sx={{
        backgroundColor: '#F4F8FF',
        padding: !isDesktop ? '48px 12px' : '48px 84px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1200,
      }}
    >
      <Container
        sx={{
          height: '100%',
          margin: '0',
          px: isMobile ? 0.5 : 1,
        }}
      >
        <Grid container spacing={isMobile ? 1 : 4}>
          <Grid item xs={12} md={2}>
            <NextLink href="/" passHref>
              <Box
                sx={{
                  justifyContent: isMobile ? 'center' : 'flex-start',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <Image src={logo} alt="logo" height={50} width={120} />
              </Box>
            </NextLink>
          </Grid>
          <Grid item xs={12} md={10}>
            <Grid container spacing={4}>
              <Grid
                item
                md={7}
                xs={12}
                sx={{
                  paddingTop: '5px',
                }}
              >
                <Stack spacing={1.5} mr={'0px'}>
                  <Stack>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontFamily: 'Montserrat',
                        fontWeight: '400',
                        fontSize: '14px',
                        fontStyle: 'normal',
                        lineHeight: '24px',
                        color: '#5C5C5C',
                        textAlign: 'justify',
                      }}
                    >
                      {t('footer.description2')}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>

              <Grid item md={5} xs={12}>
                <Box sx={{ display: 'flex' }}>
                  <Box sx={{ flex: '1' }}>
                    {sections.left.map((section, index) => (
                      <Grid item xs={12} key={index} sx={{ marginBottom: '7px' }}>
                        <NextLink href={section.href} passHref>
                          <Link>{section.title}</Link>
                        </NextLink>
                      </Grid>
                    ))}
                  </Box>
                  <Box>
                    {sections.right.map((section, index) => (
                      <Grid item xs={12} key={index} sx={{ marginBottom: '7px' }}>
                        <NextLink href={section.href} passHref>
                          <Link>{section.title}</Link>
                        </NextLink>
                      </Grid>
                    ))}
                  </Box>
                </Box>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '9px',
                  }}
                >
                  <Stack
                    direction={isMobile ? 'column' : 'row'}
                    width="100%"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={isMobile ? 2 : 4}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'Montserrat',
                        fontWeight: '600',
                        fontSize: '14px',
                        fontStyle: 'normal',
                        color: '#181433',
                        display: 'inline',
                      }}
                    >
                      Social Media:
                    </Typography>
                    <Stack gap={1.5} direction="row" alignItems="center">
                      {socials.map((item) => (
                        <NextLink href={item.link} passHref key={item.image}>
                          <Link target="_blank">
                            <Box
                              sx={{
                                cursor: 'pointer',
                              }}
                            >
                              <Image loading="lazy" src={item.image} alt="icon" width={24} height={24} />
                            </Box>
                          </Link>
                        </NextLink>
                      ))}
                    </Stack>
                  </Stack>
                </Grid>

                {/* <Stack gap={1} marginTop={2} paddingTop={2} borderTop={0.5} borderColor={'#D0D0D0'}>
                  <Typography style={{ fontSize: 14, fontWeight: 600 }}>{t('footer.contact.t1.t')}</Typography>
                  <Typography style={{ fontSize: 14 }}>
                    {t('footer.contact.t2.t')}{' '}
                    <NextLink href="mailto:cs@infofinance.com" style={{ fontSize: 14, fontWeight: 500 }}>
                      <Typography
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          display: 'inline',
                          color: '#2e569d',
                          cursor: 'pointer',
                        }}
                      >
                        {t(`footer.contact.t2.d`)}
                      </Typography>
                    </NextLink>
                  </Typography>

                  <Typography style={{ fontSize: 14 }}>
                    Hotline/Telegram/Zalo:{' '}
                    <Typography style={{ fontSize: 14, fontWeight: 600, display: 'inline', color: '#181433' }}>
                      +84969116052/@infofinancemanager
                    </Typography>
                  </Typography>
                </Stack> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={isMobile ? 1 : 2} mt={1}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              🏠 {t('footer.contact.t1.t')}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <LocationOn color="primary" />
              <Typography>{t('footer.contact.t1.d')}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              🤝 {t('footer.contact.t2.t')}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
              <EmailOutlined color="primary" />
              <Link href="mailto:cs@infofinance.com" underline="hover">
                cs@infofinance.com
              </Link>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <Telegram color="primary" />
              <Link href="https://t.me/infofinancemanager" underline="hover">
                @infofinancemanager
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container spacing={isMobile ? 1 : 2}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  📞 Hotline
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <PhoneAndroid color="primary" />
                  <Link href="tel:+84969116052" underline="hover">
                    +84 969 116 052
                  </Link>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Link
                  href="//www.dmca.com/Protection/Status.aspx?ID=77447f2a-9386-434a-a273-a6d94990d64d"
                  title="DMCA.com Protection Status"
                  className="dmca-badge"
                >
                  {' '}
                  <Image
                    src="https://images.dmca.com/Badges/dmca-badge-w150-5x1-04.png?ID=77447f2a-9386-434a-a273-a6d94990d64d"
                    alt="DMCA.com Protection Status"
                    width={150}
                    height={30}
                    style={{ cursor: 'pointer' }}
                    loading="lazy"
                    decoding="async"
                  />
                </Link>{' '}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
