import { useQuery } from '@apollo/client'
import { useDesktop, useMobile } from '@app/components/common'
import { Exchange } from '@app/interfaces/exchange'
import GET_NATIONALS from '@app/operations/queries/nationals/get-nationals'
import { getColorFromScore } from '@app/utils/exchange'
import { Link, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

interface IExchangeHorizontalCardProps {
  exchange: Exchange
  showInfo?: boolean
}

const ExchangeHorizontalCard = ({ exchange, showInfo }: IExchangeHorizontalCardProps) => {
  const { t } = useTranslation('exchange')
  const { locale } = useRouter()
  const isMobile = useMobile()
  const isDesktop = useDesktop()
  const { data: dataNationals } = useQuery(GET_NATIONALS)

  return (
    <NextLink href={`/${locale === 'vi' ? 'tra-cuu-san' : 'broker'}/${exchange.slug}`} passHref>
      <Link>
        {!isDesktop && (
          <Stack
            spacing={1}
            direction="column"
            p={2}
            sx={{ width: '100%', borderRadius: '8px', border: '0.5px solid rgba(0,0,0,0.12)' }}
          >
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
              <Stack
                justifyContent={'space-between'}
                sx={{
                  borderRadius: '8px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={
                    exchange?.logo ||
                    'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Screenshot_2018_12_16_at_21_06_29_f07726afef.png?updated_at=2022-11-30T08:25:12.500Z'
                  }
                  alt="logo"
                  // layout="fill"
                  objectFit="contain"
                  width={160}
                  height={88}
                  loading="lazy"
                />
              </Stack>

              <Stack
                sx={{
                  ...getColorFromScore(exchange.total_point ?? 0),
                  borderRadius: '8px',
                }}
                alignItems="center"
                justifyContent="center"
                p={'12px'}
              >
                <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                  {exchange.total_point}
                </Typography>
              </Stack>
            </Stack>

            <Stack>
              <Stack spacing={0.5}>
                <Stack direction={'row'} gap={1} alignItems={'center'}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: 'primary.main',
                    }}
                  >
                    {exchange?.name}
                  </Typography>
                  {!showInfo && (
                    <Box marginTop={1}>
                      {exchange?.website?.map((web) => (
                        <a href={web.url} target="_blank" rel="noreferrer" key={web.url}>
                          <Image
                            src={dataNationals?.nationals?.find((e: any) => e.id === web.national_id)?.logo ?? ''}
                            alt="country icon"
                            width={25.2}
                            height={18}
                            loading="lazy"
                          />
                        </a>
                      ))}
                    </Box>
                  )}
                </Stack>
              </Stack>
              <Typography variant="body2" marginBottom={2}>
                {t('products')}:{' '}
                {locale === 'en' && exchange?.trading_product_en && exchange?.trading_product_en?.length > 0
                  ? exchange?.trading_product_en?.join(', ')
                  : exchange?.trading_product?.join(', ')}
                .
              </Typography>

              {exchange?.intro && (
                <Typography
                  variant="body2"
                  dangerouslySetInnerHTML={{
                    __html:
                      locale === 'en' && exchange?.intro_en && exchange?.intro_en !== ''
                        ? exchange.intro_en.replace(/<[^>]*>?/gm, '')
                        : exchange.intro.replace(/<[^>]*>?/gm, ''),
                  }}
                  sx={{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 3,
                  }}
                />
              )}

              {showInfo && exchange?.intro && isMobile && (
                <Typography
                  variant="body2"
                  dangerouslySetInnerHTML={{
                    __html:
                      locale === 'en' && exchange?.intro_en && exchange?.intro_en !== ''
                        ? exchange.intro_en.replace(/<[^>]*>?/gm, '')
                        : exchange.intro.replace(/<[^>]*>?/gm, ''),
                  }}
                  sx={{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 3,
                    maxHeight: '130px',
                  }}
                />
              )}
            </Stack>
          </Stack>
        )}

        {isDesktop && (
          <Stack
            spacing={1}
            direction="row"
            p={'16px 16px 24px 16px'}
            sx={{ width: '100%', border: 'solid rgba(0,0,0,0.12)', borderWidth: '0 0 1px 0' }}
          >
            <Stack sx={{ width: '200px', borderRadius: '8px', position: 'relative', overflow: 'hidden' }}>
              <Image
                src={
                  exchange?.logo ||
                  'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Screenshot_2018_12_16_at_21_06_29_f07726afef.png?updated_at=2022-11-30T08:25:12.500Z'
                }
                alt="logo"
                layout="fill"
                objectFit="contain"
                loading="lazy"
              />
            </Stack>

            <Stack sx={{ flex: '3', pl: 2, pb: 1 }} justifyContent="space-between">
              <Stack spacing={0.5}>
                <Stack direction="row" alignItems={'center'} gap={1}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: 'primary.main',
                    }}
                  >
                    {exchange?.name}
                  </Typography>
                  {!showInfo && (
                    <Box>
                      <Stack direction="row" gap={1} flexWrap="wrap">
                        {exchange?.website?.map((web) => (
                          <a href={web.url} target="_blank" rel="noreferrer" key={web.url}>
                            <Stack key={web.url} direction="row">
                              <Image
                                src={dataNationals?.nationals?.find((e: any) => e.id === web.national_id)?.logo ?? ''}
                                alt="country icon"
                                width={21.33}
                                height={16}
                                loading="lazy"
                              />
                            </Stack>
                          </a>
                        ))}
                      </Stack>
                    </Box>
                  )}
                </Stack>
                <Typography variant="body2" marginBottom={2}>
                  {t('products')}:{' '}
                  {locale === 'en' && exchange?.trading_product_en && exchange?.trading_product_en?.length > 0
                    ? exchange?.trading_product_en?.join(', ')
                    : exchange?.trading_product?.join(', ')}
                  .
                </Typography>
                <Typography
                  variant="body2"
                  dangerouslySetInnerHTML={{
                    __html:
                      locale === 'en' && exchange?.intro_en && exchange?.intro_en !== ''
                        ? exchange.intro_en.replace(/<[^>]*>?/gm, '')
                        : exchange.intro?.replace(/<[^>]*>?/gm, ''),
                  }}
                  sx={{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 3,
                  }}
                />
              </Stack>

              {showInfo && exchange?.intro && (
                <Typography
                  variant="body2"
                  dangerouslySetInnerHTML={{
                    __html:
                      locale === 'en' && exchange?.intro_en && exchange?.intro_en !== ''
                        ? exchange.intro_en.replace(/<[^>]*>?/gm, '')
                        : exchange.intro.replace(/<[^>]*>?/gm, ''),
                  }}
                  sx={{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 5,
                  }}
                />
              )}
            </Stack>

            <Stack
              sx={{
                ...getColorFromScore(exchange.total_point ?? 0),
                borderRadius: '16px',
                height: '100%',
                padding: '12px',
              }}
              alignItems="center"
              justifyContent="center"
            >
              <Typography fontSize={'24px'} sx={{ fontWeight: 600 }}>
                {exchange.total_point}
              </Typography>
            </Stack>
          </Stack>
        )}
      </Link>
    </NextLink>
  )
}

export default ExchangeHorizontalCard
