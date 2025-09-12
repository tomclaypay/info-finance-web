import { Exchange, ExchangeListResponse } from '@app/interfaces/exchange'
import { event } from '@app/lib/ga'
import { Box, Container, Divider, Link, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import NextLink from 'next/link'
import { useDesktop, useMobile } from '../common'
import ExchangeVerticalCard from '../exchange/card/ExchangeVerticalCard'
// import SupportForm from './home-support-form'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useRouter } from 'next/router'
import HomeMiddleBanner from '../banner/HomeMiddleBanner'
import { getColorFromScore } from '@app/utils/exchange'
import LatestNewsItem from '@app/components/news/LatestNews-item'
import HomeSliderHotNews from '@app/components/home/HomeSliderHotNews'
import { Banner } from '@app/operations/queries/banners/home-banners'

const HomeSupport = ({
  dataLatestArticles,
  dataExchanges,
  dataHighlightTopBrokerExchanges,
  dataPinArticles,
  dataBanner,
}: {
  dataLatestArticles: any
  dataExchanges: ExchangeListResponse
  dataHighlightTopBrokerExchanges: ExchangeListResponse
  dataPinArticles: any
  dataBanner: Banner[]
}) => {
  const router = useRouter()
  const { t } = useTranslation(['home-page', 'common'])
  const isMobile = useMobile()
  const isDesktop = useDesktop()
  const locale = router.locale

  return (
    <Box
      sx={{
        backgroundColor: '#FFFFFF',
        objectFit: 'contain',
      }}
    >
      <Box
        sx={{
          paddingTop: isDesktop ? '20px' : '20px',
          paddingBottom: '40px',
          paddingX: isMobile ? '0 !important' : '0',
        }}
      >
        <Container
          component="div"
          maxWidth={!isMobile && 'lg'}
          sx={{
            position: 'relative',
            zIndex: 2,
            paddingRight: '0px !important',
            paddingLeft: '0px !important',
          }}
        >
          <Stack
            direction={'row'}
            // flexWrap={!isDesktop ? 'wrap' : 'nowrap'}
            flexWrap={'wrap'}
            justifyContent="center"
            alignItems="center"
            gap={isMobile ? '0' : '10px'}
          >
            {dataExchanges?.exchanges.map((exchange, index) => (
              <Stack
                onClick={() => {
                  event({
                    action: 'access',
                    params: {
                      access: 'access-test',
                    },
                  })
                }}
                key={index}
                minHeight={isMobile ? '200px' : '332px'}
                sx={{
                  ':hover': {
                    transform: 'scale(1.1)',
                  },
                  transition: 'transform 0.5s ease',
                  width: isMobile ? '45%' : '310px',
                  boxShadow: '0px 0px 24px rgba(42, 85, 156, 0.15)',
                  borderRadius: '16px',
                  padding: index < 4 ? '0px' : isMobile ? '20px !important' : '32px',
                  zIndex: '2',
                  marginY: 1,
                  marginX: 1,
                }}
                spacing={2}
                justifyContent="space-between"
              >
                <NextLink href={`/${locale === 'vi' ? 'tra-cuu-san' : 'broker'}/${exchange.slug}`} passHref>
                  <Stack
                    sx={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '8px',
                      cursor: 'pointer',
                    }}
                    position="relative"
                    padding={0}
                  >
                    <Box sx={{ padding: index < 4 ? '0px' : 2 }}>
                      <Image
                        src={
                          exchange?.logo ||
                          'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Screenshot_2018_12_16_at_21_06_29_f07726afef.png?updated_at=2022-11-30T08:25:12.500Z'
                        }
                        alt="logo"
                        objectFit="contain"
                        width={index < 4 ? 310 : 200}
                        height={index < 4 ? 296 : 200}
                        loading="lazy"
                      />
                    </Box>
                    <Divider />

                    <Stack sx={{ padding: 2, height: '100%' }} spacing={2}>
                      <Typography
                        sx={{
                          ...getColorFromScore(exchange.total_point ?? 0),
                          fontWeight: 600,
                          fontSize: isMobile ? 16 : 14,
                          borderRadius: isMobile ? 1 : 2,
                          paddingX: isMobile ? 1 : 3,
                          paddingY: isMobile ? 1 : 0.75,
                          textAlign: 'center',
                          width: isMobile ? 'fit-content' : 'none',
                          position: isMobile ? 'absolute' : 'none',
                          top: '8px',
                          right: '8.5px',
                        }}
                      >
                        <Typography sx={{ display: 'inline', fontSize: 16, fontWeight: 700 }}>
                          {exchange.total_point}
                        </Typography>
                      </Typography>
                      <Stack direction="row" alignItems={'center'} justifyContent={'center'} gap={'12px'}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: 'primary.main',
                          }}
                        >
                          {exchange?.name}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </NextLink>
              </Stack>
            ))}
          </Stack>
        </Container>
      </Box>

      <Container
        maxWidth={!isMobile && 'lg'}
        sx={{
          px: isMobile ? 0 : 1,
        }}
      >
        <Box
          flexWrap={isDesktop ? 'nowrap' : 'wrap'}
          sx={{
            display: 'flex',
            gap: '40px',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginTop: '50px',
            flexDirection: 'row',
            px: 0,
          }}
        >
          <Box
            width={'50%'}
            padding={isMobile ? 0 : '24px'}
            sx={{ flex: 1, backgroundColor: '#FAFAFA', borderRadius: '16px' }}
          >
            <Typography
              sx={{
                fontWeight: '700',
                fontSize: isMobile ? '24px' : '26px',
                textAlign: isMobile ? 'center' : 'left',
                lineHeight: '26px',
                color: 'text.primary',
                paddingX: isMobile ? '5px' : 'none',
                paddingBottom: '16px',
              }}
            >
              {t(`complaint.left.title`)}
            </Typography>
            <Stack
              width={'100%'}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
            >
              {dataLatestArticles?.articles.data.map((article: any) => (
                <Box
                  key={article.id}
                  sx={{
                    width: isMobile ? '100%' : '25%',
                    padding: '4px',
                  }}
                >
                  <LatestNewsItem data={article} key={article.id} />
                </Box>
              ))}
              <Box width={'100%'} sx={{ display: 'flex', justifyContent: isMobile ? 'center' : 'flex-end' }}>
                <NextLink href="/news" passHref>
                  <Link
                    sx={{
                      color: 'primary.main',
                      marginRight: '5px',
                      fontSize: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="button" sx={{ mr: 1 }}>
                      {t('text.seeMore', { ns: 'common' })}
                    </Typography>
                    <Image
                      src={
                        'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Arrow_Right_18e705d65a.png?updated_at=2022-08-25T09:28:40.108Z'
                      }
                      alt="icon"
                      width={24}
                      height={24}
                      loading="lazy"
                    />
                  </Link>
                </NextLink>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Container>

      <HomeSliderHotNews dataPinArticles={dataPinArticles?.articles?.data} />

      <HomeMiddleBanner dataBanner={dataBanner} />

      <Container maxWidth={!isMobile && 'lg'} sx={{ padding: 0 }}>
        <Stack
          sx={{
            p: !isDesktop ? 1.5 : 4,
            pt: isMobile ? '16px' : '16px',
            backgroundColor: '#FAFAFA',
            borderRadius: 2,
            boxShadow: 'inset 0px 0px 24px rgba(0, 0, 0, 0.08)',
            my: isMobile ? 5 : 10,
          }}
        >
          <Typography
            sx={{
              fontWeight: '700',
              fontSize: isMobile ? '24px' : '32px',
              lineHeight: isMobile ? '29px' : '39px',
              color: 'text.primary',
              textAlign: 'center',
            }}
          >
            Info Finance {t(`complaint.recommend`)}
          </Typography>
          {isMobile ? (
            <Slider speed={200} autoplay slidesToShow={1} slidesToScroll={1} dots>
              {dataHighlightTopBrokerExchanges?.exchanges.map((exchange: Exchange) => (
                <Box key={exchange.id} p={'0'}>
                  <ExchangeVerticalCard home={true} exchange={exchange} />
                </Box>
              ))}
            </Slider>
          ) : (
            <Stack direction="row" spacing={isDesktop ? 5 : 2} mt={2}>
              {dataHighlightTopBrokerExchanges?.exchanges.map((exchange: Exchange) => (
                <ExchangeVerticalCard home={true} exchange={exchange} key={exchange.id} />
              ))}
            </Stack>
          )}
        </Stack>
      </Container>
    </Box>
  )
}

export default HomeSupport

export async function getServerSideProps({ locale }: any) {
  return {
    props: {},
  }
}
