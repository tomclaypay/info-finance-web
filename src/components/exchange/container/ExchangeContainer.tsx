import { useDesktop, useMobile } from '@app/components/common'
import { ComplaintListResponse } from '@app/interfaces/complaint'
import { ExchangeListResponse, GeneralExchangeResponse } from '@app/interfaces/exchange'
import { Button, Container, Divider, Grid, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { ChangeEvent } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ExchangeHorizontalCard from '../card/ExchangeHorizontalCard'
import ExchangeVerticalCard from '../card/ExchangeVerticalCard'
import Filter from '../filter'
import ExchangeGridCard from '../card/ExchangeGridCard'
import { FILTER_KEY, LAYOUT_TYPE } from '@app/constants/exchange'
import ExchangeMobileCard from '../card/ExchangeMobileCard'
import BrokerSidebarBanner from '@app/components/banner/BrokerSidebarBanner'
import TopBrokerBanner from '@app/components/banner/TopBrokerBanner'
import { Banner } from '@app/interfaces/banner'

interface ExchangesProps {
  dataExchanges?: ExchangeListResponse
  dataHighlightTradersAllChooseExchanges?: ExchangeListResponse
  handleSearchChangeName: (event: ChangeEvent<HTMLInputElement>) => void
  handleFetchMore: () => void
  dataComplaints?: ComplaintListResponse
  dataGeneralExchange?: GeneralExchangeResponse
  hidden?: boolean
  isFilter?: boolean
  dataListTopBanner: Banner
}

const ExchangeFavourites = ({
  dataHighlightTradersAllChooseExchanges,
}: {
  dataHighlightTradersAllChooseExchanges?: ExchangeListResponse
}) => {
  const { t } = useTranslation('exchange')
  const isMobile = useMobile()
  const topleftTopBroker = dataHighlightTradersAllChooseExchanges?.exchanges.find(
    (exchange) => exchange.rate_trader_all_choose === 1
  )
  const toprightTopBroker = dataHighlightTradersAllChooseExchanges?.exchanges.find(
    (exchange) => exchange.rate_trader_all_choose === 2
  )
  const bottomrightTopBroker = dataHighlightTradersAllChooseExchanges?.exchanges.find(
    (exchange) => exchange.rate_trader_all_choose === 3
  )
  const bottomleftTopBroker = dataHighlightTradersAllChooseExchanges?.exchanges.find(
    (exchange) => exchange.rate_trader_all_choose === 4
  )

  return (
    <Stack>
      <Typography fontSize={'20px'} fontWeight={600}>
        {t('userChoosing')}
      </Typography>
      <Grid
        container
        spacing={2}
        mt={0.5}
        flexWrap={isMobile ? 'nowrap' : 'wrap'}
        overflow={isMobile ? 'auto' : 'visible'}
      >
        {topleftTopBroker && (
          <Grid item xs={12} md={6}>
            {isMobile ? (
              <ExchangeMobileCard exchange={topleftTopBroker} />
            ) : (
              <ExchangeVerticalCard exchange={topleftTopBroker} small={true} />
            )}
          </Grid>
        )}

        {toprightTopBroker && (
          <Grid item xs={12} md={6}>
            {isMobile ? (
              <ExchangeMobileCard exchange={toprightTopBroker} />
            ) : (
              <ExchangeVerticalCard exchange={toprightTopBroker} small={true} />
            )}
          </Grid>
        )}

        {bottomleftTopBroker && (
          <Grid item xs={12} md={6}>
            {isMobile ? (
              <ExchangeMobileCard exchange={bottomleftTopBroker} />
            ) : (
              <ExchangeVerticalCard exchange={bottomleftTopBroker} small={true} />
            )}
          </Grid>
        )}
        {bottomrightTopBroker && (
          <Grid item xs={12} md={6}>
            {isMobile ? (
              <ExchangeMobileCard exchange={bottomrightTopBroker} />
            ) : (
              <ExchangeVerticalCard exchange={bottomrightTopBroker} small={true} />
            )}
          </Grid>
        )}
      </Grid>
    </Stack>
  )
}

const ExchangeContainer = ({
  dataExchanges,
  handleFetchMore,
  handleSearchChangeName,
  dataHighlightTradersAllChooseExchanges,
  dataGeneralExchange,
  isFilter,
  dataListTopBanner,
}: ExchangesProps) => {
  const { t } = useTranslation(['exchange', 'common'])
  const { locale, query } = useRouter()
  const isMobile = useMobile()
  const isDesktop = useDesktop()

  const layout = query[FILTER_KEY.LAYOUT] as string

  const countResult = dataExchanges?.exchanges_aggregate?.aggregate?.count ?? 0
  return (
    <>
      {!isDesktop && (
        <Stack sx={{ mb: 4 }}>
          <TopBrokerBanner dataListTopBanner={dataListTopBanner} />
        </Stack>
      )}
      <Container maxWidth="lg">
        <Stack direction={!isDesktop ? 'column' : 'row'}>
          <Stack spacing={3} width={isDesktop ? '75%' : '100%'}>
            {isDesktop && <TopBrokerBanner dataListTopBanner={dataListTopBanner} />}

            <Stack spacing={1}>
              <Typography variant="h1" sx={{ fontSize: 32, fontWeight: 700, color: '#0E0E2C' }}>
                {t('intro')}
              </Typography>
              <Typography variant="body2" textAlign="justify">
                {locale === 'vi'
                  ? dataGeneralExchange?.general_broker?.[0]?.title
                  : dataGeneralExchange?.general_broker?.[0]?.title_en}
              </Typography>
            </Stack>

            {isMobile && (
              <ExchangeFavourites dataHighlightTradersAllChooseExchanges={dataHighlightTradersAllChooseExchanges} />
            )}
            <Filter handleSearchChangeName={handleSearchChangeName} />
            <Divider />
            {locale === 'vi' &&
              // (isFilter ? (
              //   <Typography sx={{ textAlign: 'center', fontSize: 16, color: '#A0A4AB' }}>
              //     Có{' '}
              //     <Typography sx={{ fontWeight: 700, display: 'inline', fontSize: 16, color: '#060612' }}>
              //       {dataExchanges?.exchanges_aggregate?.aggregate?.count}
              //     </Typography>{' '}
              //     kết quả phù hợp
              //   </Typography>
              // ) : (
              //   <Typography sx={{ textAlign: 'center', fontSize: 16, color: '#A0A4AB' }}>
              //     Info Finance hân hạnh đánh giá{' '}
              //     <Typography sx={{ fontWeight: 700, display: 'inline', fontSize: 16, color: '#060612' }}>
              //       {dataExchanges?.exchanges_aggregate?.aggregate?.count}
              //     </Typography>{' '}
              //     sàn
              //   </Typography>
              // ))
              isFilter && (
                <Typography sx={{ textAlign: 'center', fontSize: 16, color: '#A0A4AB' }}>
                  Có{' '}
                  <Typography sx={{ fontWeight: 700, display: 'inline', fontSize: 16, color: '#060612' }}>
                    {dataExchanges?.exchanges_aggregate?.aggregate?.count}
                  </Typography>{' '}
                  kết quả phù hợp
                </Typography>
              )}

            {locale === 'en' &&
              // (isFilter ? (
              //   <Typography sx={{ textAlign: 'center', fontSize: 16, color: '#A0A4AB' }}>
              //     There {countResult > 1 ? 'are' : 'is'}{' '}
              //     <Typography sx={{ fontWeight: 700, display: 'inline', fontSize: 16, color: '#060612' }}>
              //       {countResult}
              //     </Typography>{' '}
              //     suitable results
              //   </Typography>
              // ) : (
              //   <Typography sx={{ textAlign: 'center', fontSize: 16, color: '#A0A4AB' }}>
              //     There are{' '}
              //     <Typography sx={{ fontWeight: 700, display: 'inline', fontSize: 16, color: '#060612' }}>
              //       {countResult}
              //     </Typography>{' '}
              //     brokers rated by Info Finance
              //   </Typography>
              // ))
              isFilter && (
                <Typography sx={{ textAlign: 'center', fontSize: 16, color: '#A0A4AB' }}>
                  There {countResult > 1 ? 'are' : 'is'}{' '}
                  <Typography sx={{ fontWeight: 700, display: 'inline', fontSize: 16, color: '#060612' }}>
                    {countResult}
                  </Typography>{' '}
                  suitable results
                </Typography>
              )}

            <Stack spacing={1.5}>
              {layout === LAYOUT_TYPE.GRID ? (
                <Grid container spacing={2}>
                  {dataExchanges?.exchanges?.map((exchange, index) => (
                    <Grid item key={index} md={3} xs={isMobile ? 6 : 4}>
                      <ExchangeGridCard key={index} exchange={exchange} />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Stack spacing={1.5}>
                  {dataExchanges?.exchanges?.map((exchange, index) => (
                    <ExchangeHorizontalCard key={index} exchange={exchange} />
                  ))}
                </Stack>
              )}
            </Stack>
            <Stack alignItems="center">
              {dataExchanges && dataExchanges.exchanges.length < countResult && (
                <Button
                  onClick={() => handleFetchMore()}
                  variant="contained"
                  sx={{
                    borderRadius: '40px',
                    fontWeight: '600',
                    width: 'max-content',
                    fontSize: '14px',
                    padding: '14px 24px',
                  }}
                >
                  {t('text.seeMore', {
                    ns: 'common',
                  })}
                </Button>
              )}
            </Stack>
          </Stack>
          {!isDesktop && <BrokerSidebarBanner />}

          <Divider flexItem orientation="vertical" sx={{ mx: 2 }} />

          {isDesktop && (
            <Stack width={'25%'}>
              <Stack>
                <Typography fontSize={'20px'} fontWeight={600}>
                  {t('supervisors')}
                </Typography>
                <Typography variant="body2" mt={1.5}>
                  {locale === 'vi'
                    ? dataGeneralExchange?.general_broker?.[0]?.description
                    : dataGeneralExchange?.general_broker?.[0]?.description_en}
                </Typography>
              </Stack>

              <Divider sx={{ my: 2 }} />
              <ExchangeFavourites dataHighlightTradersAllChooseExchanges={dataHighlightTradersAllChooseExchanges} />

              {/* <Divider sx={{ my: 2 }} /> */}
              {/* <Stack spacing={1}>
              <Typography fontSize={'20px'} fontWeight={600}>
                {t('cheatComplaint')}
              </Typography>
              {dataComplaints?.complaints?.map((complaint: Complaint) => (
                <NextLink key={complaint.id} href={`exchange-review/${complaint.slug}`} passHref>
                  <Link>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: '400',
                        fontSize: 16,
                        '&: hover': {
                          textDecoration: 'underline',
                          color: 'primary.main',
                        },
                      }}
                    >
                      {complaint.title}
                    </Typography>
                  </Link>
                </NextLink>
              ))}
            </Stack> */}
              <BrokerSidebarBanner />
            </Stack>
          )}
        </Stack>
      </Container>
    </>
  )
}

export default ExchangeContainer
