import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Divider,
  Link,
  Stack,
  Typography,
} from '@mui/material'
import NextLink from 'next/link'
import Image from 'next/image'
import { useMobile } from '../common'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

interface FAQProps {
  data: any
}

const socials = [
  {
    icon: 'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Facebook_511a4c96e1.png?updated_at=2022-12-12T21:19:14.239Z',
    href: 'https://www.facebook.com/InfoFx.com.vn',
    text: 'InfoFx.com.vn',
  },
  {
    icon: 'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/youtube_2080cbe122.png?updated_at=2022-12-12T21:19:14.267Z',
    href: 'https://youtube.com/InfoFinanceVN',
    text: 'InfoFinanceVN',
  },
  {
    icon: 'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/png_clipart_berkeley_design_business_association_computer_icons_research_world_wide_web_miscellaneous_blue_3746fdc389.png?updated_at=2022-12-13T09:11:42.512Z',
    href: 'https://infofx.com.vn/',
    text: 'infofx.com.vn',
  },
  {
    icon: 'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/telegram_f36f766c93.png?updated_at=2022-12-12T21:19:14.232Z',
    href: 'https://t.me/infofxvietnam',
    text: 'infofxvietnam',
  },
  {
    icon: 'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/zalo_icon_ab07b48e3c.png?updated_at=2022-12-13T09:07:20.705Z',
    href: 'https://zalo.me/84769133639',
    text: '+84 7691 336 39',
  },
]

const FAQ = ({ data }: FAQProps) => {
  const isMobile = useMobile()
  const { t } = useTranslation(['seo'])
  const router = useRouter()
  return (
    <>
      <Head>
        <title>{t(`faq.title`, { ns: 'seo' })}</title>
        <meta name="description" content={t(`faq.description`, { ns: 'seo' })} />
        <meta name="og:title" content={t(`faq.title`, { ns: 'seo' })} />
        <meta name="og:description" content={t(`faq.description`, { ns: 'seo' })} />
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          my: isMobile ? 0 : 3,
        }}
      >
        <Container maxWidth="lg">
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                width: '15px',
                height: '30px',
                backgroundColor: '#FFC700',
                borderRadius: '10px',
              }}
            />
            <Typography variant="h1">
              FAQ – {router.locale === 'vi' ? 'Câu hỏi thường gặp' : 'Frequently asked question'}
            </Typography>
          </Stack>

          {data?.map((item: any, index: number) => (
            <Accordion
              key={index}
              sx={{
                marginTop: '20px',
                paddingRight: '20px',
                backgroundColor: 'rgba(0,0,0,0.025)',
                borderRadius: '10px',
                boxShadow: '0px 1px 0px  #D0D0D0',
                '&::before': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                  pl: '0!important',
                  pr: '0!important',
                  '&>div': {
                    alignItems: 'center',
                  },
                }}
              >
                <Typography variant="h6" sx={{ flex: '1', marginLeft: '20px' }}>
                  {index + 1}
                  {`. ${item?.attributes?.title}`}
                </Typography>
              </AccordionSummary>
              <Divider sx={{ borderColor: '#d0d0d0', ml: 2 }} />
              <AccordionDetails>
                {item?.attributes?.description === '' ? (
                  <Stack direction={isMobile ? 'column' : 'row'} spacing={3} mt={1.5}>
                    {socials.map((social) => (
                      <Link component={NextLink} target="_blank" href={social.href} passHref key={social.icon}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Image loading="lazy" src={social.icon} width={24} height={24} alt="icon-social" />
                          <Typography>{social.text}</Typography>
                        </Stack>
                      </Link>
                    ))}
                  </Stack>
                ) : (
                  <Box
                    dangerouslySetInnerHTML={{
                      __html: item?.attributes?.description,
                    }}
                    sx={{ width: '100%', '& img': { maxWidth: '100%' } }}
                  />
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>
    </>
  )
}

export default FAQ
