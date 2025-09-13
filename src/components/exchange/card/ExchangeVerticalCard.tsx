import { useDesktop, useMobile } from '@app/components/common'
import { Exchange } from '@app/interfaces/exchange'
import { Box, Button, Link, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

interface ExchangeVerticalCardProps {
  exchange: Exchange
  small?: boolean
  home?: boolean
}

const ExchangeVerticalCard = ({ exchange, small, home }: ExchangeVerticalCardProps) => {
  const { t } = useTranslation('exchange')
  const isMobile = useMobile()
  const isDesktop = useDesktop()
  const { locale } = useRouter()

  return (
    <Link
      component={NextLink}
      href={`/${locale === 'vi' ? 'tra-cuu-san' : 'broker'}/${exchange.slug}`}
      passHref
      sx={{
        flex: 1,
        ':hover': {
          transform: 'scale(1.1)',
        },
        transition: 'transform 0.5s ease',
      }}
    >
      <Stack
        spacing={1.5}
        alignItems="center"
        p={small ? 0 : 2}
        pb={2}
        sx={{
          background: '#FCFCFC',
          boxShadow: home ? '4px 4px 40px rgba(0, 0, 0, 0.05)' : '0px 0px 10px 2px rgba(0, 0, 0, 0.12)',
          borderRadius: '8px',
          height: '100%',
          border: small || home ? 'none' : '0.5px solid rgba(0, 0, 0, 0.12)',
        }}
      >
        <Box
          sx={{
            borderRadius: small ? '0' : '8px',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            overflow: 'hidden',
            position: 'relative',
            width: '100%',
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
            src={
              exchange?.logo ||
              'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Screenshot_2018_12_16_at_21_06_29_f07726afef.png?updated_at=2022-11-30T08:25:12.500Z'
            }
            alt="icon"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 60vw"
            loading="lazy"
          />
        </Box>

        {home && (
          <Stack
            sx={{
              backgroundColor: '#FFF9E6',
              borderRadius: 3,
            }}
            direction="row"
            px={isDesktop ? 3 : 0.75}
            spacing={0.5}
            py={1.5}
          >
            <Image src="/static/home/metal.png" alt="icon" width={20} height={16} loading="lazy" />
            <Typography
              sx={{
                fontSize: isMobile ? '12px' : '16px',
                fontWeight: 600,
                lineHeight: '18px',
                color: 'secondary.main',
              }}
            >
              Best online broker
            </Typography>
          </Stack>
        )}

        <Typography
          variant="subtitle2"
          sx={{
            fontSize: small ? '16px' : '24px',
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 1,
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          {exchange?.name}
        </Typography>

        {!small && (
          <>
            {/* {exchange?.intro && !isMobile && (
                <Typography
                  variant="body2"
                  dangerouslySetInnerHTML={{
                    __html:
                      locale === 'en' && exchange?.intro_en && exchange?.intro_en !== ''
                        ? exchange.intro_en
                        : exchange.intro,
                  }}
                  sx={{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2,
                  }}
                />
              )} */}

            {/* {exchange?.intro && isMobile && (
                <Typography
                  variant="body2"
                  dangerouslySetInnerHTML={{
                    __html:
                      locale === 'en' && exchange?.intro_en && exchange?.intro_en !== ''
                        ? exchange.intro_en
                        : exchange.intro,
                  }}
                  sx={{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    maxHeight: '108px',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 3,
                  }}
                />
              )} */}

            <Button
              fullWidth
              sx={{
                backgroundColor: 'primary.main',
                color: '#ffffff',
                '&: hover': {
                  color: '#ffffff',
                  backgroundColor: 'rgba(42, 85, 156, 0.8)',
                },
                fontSize: '14px',
              }}
            >
              {t('readRate')}
            </Button>
            {exchange?.website ? (
              <Link component={NextLink} href={exchange.website} passHref>
                <Button
                  fullWidth
                  sx={{
                    fontSize: '14px',
                  }}
                >
                  {t('toWebsite')}
                </Button>
              </Link>
            ) : (
              <Button
                fullWidth
                sx={{
                  fontSize: '14px',
                }}
              >
                {t('toWebsite')}
              </Button>
            )}
          </>
        )}
      </Stack>
    </Link>
  )
}

export default ExchangeVerticalCard
