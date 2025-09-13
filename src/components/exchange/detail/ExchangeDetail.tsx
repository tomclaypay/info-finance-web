import { useQuery } from '@apollo/client'
import { useDesktop, useMobile } from '@app/components/common'
import CustomizedSlider from '@app/components/common/CustomSlider'
import SelectField from '@app/components/dashboard/common/form-fields/select-field'
import { SortOptions } from '@app/constants/common'
import { useAuth } from '@app/hooks/use-auth'
import { ComplaintListResponse, OrderComplaintType } from '@app/interfaces/complaint'
import { Exchange } from '@app/interfaces/exchange'
import { FeedbackListResponse } from '@app/interfaces/feedback'
import { SupervisoriesListResponse } from '@app/interfaces/supervisor'
import GET_SUPERVISORIES from '@app/operations/queries/supervisories/get-supervisories'
import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/avatars-initials-sprites'
import { useDebouncedState } from '@mantine/hooks'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Rating,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ChangeEvent, SetStateAction, useEffect, useState } from 'react'
import ComplaintCard from './ComplaintCard'
import FeedbackCard from './FeedbackCard'
import LicenseCard from './LicenseCard'
import { activeLayoutButtonStyle, normalLayoutButtonStyle } from '../filter/style'
import { formatScore, getColorDetailExchangeFromScore, getDomainFromUrl } from '@app/utils/exchange'
import starExchange from '../../../../public/static/star-exchange.png'
import GET_NATIONALS from '@app/operations/queries/nationals/get-nationals'
import ratedBanner from '../../../../public/static/exchange/logo-infofx-exchange.png'
import { ArrowBack } from '@mui/icons-material'
interface ExchangeDetailProps {
  exchange?: Exchange
  dataComplaints?: ComplaintListResponse
  openComment: boolean
  handleCreateCommentSubmit: (formValue: { rating: any; comment: string; hidden: boolean }) => void
  handleDeleteCommentSubmit: (feedbackId: string) => void
  handleUpdateCommentSubmit: (formValue: { rating: any; comment: string; hidden: boolean }, feedbackId: string) => void
  handleOpenComment?: () => void
  handleFetchMoreComplaints: () => void
  handleCloseComment: () => void
  handleChangeFilterComplaintType: (orderType: OrderComplaintType) => void
  handleChangeTab: (event: React.SyntheticEvent, newValue: string) => void
  valueTab: string
  dataFeedbacks?: FeedbackListResponse
  orderComplaintType: OrderComplaintType
  // dataSupervisories?: Supervisor[]
}

interface DataFilterProps {
  shortName?: string
}

const tabList = [
  {
    value: 'overview',
    label: 'Giới thiệu',
    label_en: 'Introduce',
  },

  {
    value: 'license',
    label: 'Giấy phép',
    label_en: 'License',
  },

  {
    value: 'review',
    label: 'Đánh giá từ Trader',
    label_en: 'Reviews',
  },

  {
    value: 'complaint',
    label: 'Khiếu nại về sàn',
    label_en: 'Complaints',
  },
]

const ExchangeDetail = ({
  exchange,
  dataComplaints,
  openComment,
  valueTab,
  handleCreateCommentSubmit,
  handleUpdateCommentSubmit,
  handleDeleteCommentSubmit,
  handleFetchMoreComplaints,
  handleChangeFilterComplaintType,
  handleCloseComment,
  handleOpenComment,
  handleChangeTab,
  dataFeedbacks,
  orderComplaintType,
}: // dataSupervisories,
ExchangeDetailProps) => {
  const { t } = useTranslation(['exchange', 'common'])
  const { data: dataNationals } = useQuery(GET_NATIONALS)
  const [fieldFilter, setFieldFilter] = useDebouncedState<DataFilterProps>({}, 500)
  const isMobile = useMobile()
  const isDesktop = useDesktop()

  const { locale } = useRouter()
  const [sort, setSort] = useState('desc')
  const [popup, setPopup] = useState({ open: false, title: '', des: '' })
  const [comment, setComment] = useState<{ rating: any; comment: string; hidden: boolean }>({
    rating: 0,
    comment: '',
    hidden: false,
  })
  const router = useRouter()
  const auth = useAuth()

  const { data: dataSupervisories } = useQuery<SupervisoriesListResponse>(GET_SUPERVISORIES, {
    variables: {
      ...fieldFilter,
    },
  })

  const defaultAvatar = createAvatar(style, {
    seed: auth.user ? auth.user?.displayName || auth?.user?.fullname : '',
    dataUri: true,
  })

  const onSortChange = (e: { target: { value: SetStateAction<string> } }) => {
    setSort(e.target.value)
  }

  const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setComment({ ...comment, comment: event.target.value })
  }

  const handleRatingChange = (event: any) => {
    setComment({ ...comment, rating: event.target.value * 2 })
  }

  const ownerFeedback = dataFeedbacks?.feedbacks?.find((feedback) => feedback?.user?.id === auth?.user?.id)

  useEffect(() => {
    if (ownerFeedback) {
      setComment({
        rating: ownerFeedback.point,
        comment: ownerFeedback.comment as string,
        hidden: ownerFeedback.hidden as boolean,
      })
    }
  }, [dataFeedbacks, ownerFeedback])

  const handleChangeSupervisorName = (event: ChangeEvent<HTMLInputElement>) => {
    setFieldFilter({
      shortName: `%${event.target.value.trim()}%`,
    })
  }
  return (
    <Container maxWidth="lg">
      <Button
        onClick={() => router.back()}
        sx={{ display: 'flex', gap: 1, justifyContent: 'start', width: 'fit-content' }}
      >
        <ArrowBack />
        {locale === 'vi' ? 'Quay lại' : 'Back'}
      </Button>
      <Stack>
        <Stack mb={2} direction={!isDesktop ? 'column' : 'row'} spacing={2}>
          <Stack
            sx={{
              flex: 1.1,
            }}
          >
            <Box
              sx={{
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <Image
                src={
                  exchange?.logo ||
                  'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Screenshot_2018_12_16_at_21_06_29_f07726afef.png?updated_at=2022-11-30T08:25:12.500Z'
                }
                alt="icon"
                width="400px"
                height="226px"
                loading="lazy"
              />
            </Box>
          </Stack>

          <Stack sx={{ flex: 3 }}>
            <Stack spacing={0.5}>
              <Typography variant="h1" sx={{ fontSize: 32, color: '#0E0E2C' }}>
                {exchange?.name}
              </Typography>
              <Stack direction="row" alignItems="center">
                <Typography variant="body2" sx={{ fontSize: 16, color: '#000' }} mr={1}>
                  {t('country')}:
                </Typography>
                {exchange?.national?.logo && (
                  <Image src={exchange?.national.logo} alt="icon" width={24} height="18px" loading="lazy" />
                )}
                <Typography variant="body2" sx={{ fontSize: 16, color: '#000' }} ml={0.5}>
                  {router.locale === 'vi' && exchange?.national?.name_vn !== '' && exchange?.national?.name_vn !== null
                    ? exchange?.national?.name_vn
                    : exchange?.national?.name}
                </Typography>
              </Stack>
              {router.locale === 'vi' && exchange?.supervision_time && (
                <Typography
                  sx={{ fontSize: 16, color: '#000' }}
                  variant="body2"
                >{`Thời gian giám sát: ${exchange?.supervision_time}`}</Typography>
              )}

              {router.locale !== 'vi' && (
                <Typography sx={{ fontSize: 16, color: '#000' }} variant="body2">{`Regulated time: ${
                  exchange?.supervision_time_en ? exchange?.supervision_time_en : exchange?.supervision_time
                }`}</Typography>
              )}

              <Box>
                <Stack direction="row" gap={1} marginBottom={3} flexWrap="wrap">
                  {exchange?.website?.map((web) => (
                    <a href={web.url} target="_blank" rel="noreferrer" key={web.url}>
                      <Stack
                        key={web.url}
                        direction="row"
                        sx={{
                          backgroundColor: '#F4F8FF',
                          px: 3,
                          py: 2,
                          borderRadius: '10px',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        <Image
                          src={dataNationals?.nationals?.find((e: any) => e.id === web.national_id)?.logo ?? ''}
                          alt="icon"
                          width={25.2}
                          height={18}
                          style={{ borderRadius: '4px' }}
                          loading="lazy"
                        />
                        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#2A559C' }}>
                          {getDomainFromUrl(web.url)}
                        </Typography>
                      </Stack>
                    </a>
                  ))}
                </Stack>
              </Box>
              <Stack
                direction="row"
                px={3}
                py={2}
                sx={{
                  backgroundColor: getColorDetailExchangeFromScore(exchange?.total_point ?? 0)?.second,
                  borderRadius: '12px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {exchange?.total_point && exchange?.total_point >= 7 ? (
                  <Box sx={{ position: 'absolute', top: 40 }}>
                    <Image src={ratedBanner} width={129} height={119} objectFit="cover" alt="icon" loading="lazy" />
                  </Box>
                ) : (
                  <></>
                )}
                <Typography
                  variant="body2"
                  sx={{
                    flex: 1,
                    fontWeight: 600,
                    fontSize: 16,
                    color: getColorDetailExchangeFromScore(exchange?.total_point ?? 0)?.primary,
                  }}
                >
                  {t('ratePoint')}{' '}
                </Typography>
                <Stack
                  sx={{
                    backgroundColor: getColorDetailExchangeFromScore(exchange?.total_point ?? 0)?.primary,
                    borderRadius: '14px',
                    px: isMobile ? 3 : 12,
                    py: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 'bold',
                      fontSize: 48,
                      color: '#ffffff',
                    }}
                  >
                    {formatScore(exchange?.total_point ?? 0)}
                  </Typography>
                  {exchange?.total_point && exchange?.total_point >= 7 ? (
                    <Box sx={{ position: 'absolute', top: '6px', right: '16px' }}>
                      <Image src={starExchange} width={32} height={32} alt="Star" loading="lazy" />
                    </Box>
                  ) : (
                    <></>
                  )}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        <Stack direction={!isDesktop ? 'column' : 'row'} spacing={3}>
          <Stack
            flex={2}
            spacing={1}
            justifyContent="space-between"
            sx={{
              border: '0.5px solid rgba(0,0,0,0.2)',
              borderRadius: '12px',
              py: 2,
              px: 3,
            }}
          >
            <Stack
              direction={isMobile ? 'column' : 'row'}
              justifyContent="space-between"
              alignItems={isMobile ? 'flex-start' : 'center'}
            >
              <Typography sx={{ fontSize: '16px', color: '#A0A4AB', fontWeight: 500 }}>
                {t('detail.fullName')}
              </Typography>
              <Typography sx={{ fontSize: '16px', color: '#000', fontWeight: 600 }}>
                {exchange?.abbreviation}
              </Typography>
            </Stack>
            <Divider />

            <Stack
              direction={isMobile ? 'column' : 'row'}
              justifyContent="space-between"
              alignItems={isMobile ? 'flex-start' : 'center'}
            >
              <Typography sx={{ fontSize: '16px', color: '#A0A4AB', fontWeight: 500 }}>
                {t('detail.tradingProduct')}
              </Typography>
              <Typography
                flex={1}
                textAlign={isMobile ? 'start' : 'end'}
                sx={{ fontSize: '16px', color: '#000', fontWeight: 600 }}
              >
                {/* {routerexchange?.trading_product?.join(', ')} */}
                {router.locale === 'en' && exchange?.trading_product_en && exchange?.trading_product_en?.length > 0
                  ? exchange?.trading_product_en?.join(', ')
                  : exchange?.trading_product?.join(', ')}
              </Typography>
            </Stack>
            <Divider />

            <Stack
              direction={isMobile ? 'column' : 'row'}
              justifyContent="space-between"
              alignItems={isMobile ? 'flex-start' : 'center'}
            >
              <Typography sx={{ fontSize: '16px', color: '#A0A4AB', fontWeight: 500 }}>
                {t('detail.tradingPlatform')}
              </Typography>
              <Typography sx={{ fontSize: '16px', color: '#000', fontWeight: 600 }}>
                {router.locale === 'en' && exchange?.trading_platform_en && exchange?.trading_platform_en?.length > 0
                  ? exchange?.trading_platform_en?.join(', ')
                  : exchange?.trading_platform?.join(', ')}
              </Typography>
            </Stack>
            <Divider />

            <Stack
              direction={isMobile ? 'column' : 'row'}
              justifyContent="space-between"
              alignItems={isMobile ? 'flex-start' : 'center'}
            >
              <Typography sx={{ fontSize: '16px', color: '#A0A4AB', fontWeight: 500 }}>{t('detail.status')}</Typography>
              <Typography flex={1} textAlign="end" sx={{ fontSize: '16px', color: '#000', fontWeight: 600 }}>
                {router.locale === 'en' &&
                exchange?.supervision_status_en !== '' &&
                exchange?.supervision_status_en !== null
                  ? exchange?.supervision_status_en
                  : exchange?.supervision_status}
              </Typography>
            </Stack>
            <Divider />

            <Stack
              direction={isMobile ? 'column' : 'row'}
              justifyContent="space-between"
              alignItems={isMobile ? 'flex-start' : 'center'}
            >
              <Typography sx={{ fontSize: '16px', color: '#A0A4AB', fontWeight: 500 }}>
                {t('detail.supportEmail')}
              </Typography>
              <Typography sx={{ fontSize: '16px', color: '#000', fontWeight: 600 }}>{exchange?.email}</Typography>
            </Stack>
            <Divider />

            <Stack
              direction={isMobile ? 'column' : 'row'}
              justifyContent="space-between"
              alignItems={isMobile ? 'flex-start' : 'center'}
            >
              <Typography sx={{ fontSize: '16px', color: '#A0A4AB', fontWeight: 500 }}>
                {t('detail.supportPhone')}
              </Typography>
              <Typography sx={{ fontSize: '16px', color: '#000', fontWeight: 600 }}>{exchange?.phone}</Typography>
            </Stack>
          </Stack>

          <Stack
            flex={3}
            spacing={1}
            sx={{
              border: '0.5px solid rgba(0,0,0,0.2)',
              borderRadius: '12px',
              py: 2,
              px: 3,
            }}
            justifyContent="space-between"
          >
            {isMobile && (
              <Stack direction="row" spacing={1}>
                <Typography variant="body2" color="unactive.main">
                  {t('detail.license')}
                </Typography>
                <InfoOutlinedIcon
                  style={{
                    color: 'rgba(0,0,0,0.5)',
                    cursor: 'pointer',
                  }}
                  onClick={() => setPopup({ open: true, title: t('detail.license'), des: t('pointStandard.license') })}
                />
              </Stack>
            )}
            <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
              {!isMobile && (
                <Stack direction="row" flex={1.5} spacing={1}>
                  <Typography sx={{ fontSize: '16px', color: '#A0A4AB', fontWeight: 500 }}>
                    {t('detail.license')}
                  </Typography>
                  <InfoOutlinedIcon
                    style={{
                      color: 'rgba(0,0,0,0.5)',
                      cursor: 'pointer',
                    }}
                    onClick={() =>
                      setPopup({ open: true, title: t('detail.license'), des: t('pointStandard.license') })
                    }
                  />
                </Stack>
              )}
              <Stack direction="row" flex={2} justifyContent="center" alignItems="center" spacing={1}>
                <CustomizedSlider defaultValue={exchange?.license_point as number} />
                <Typography sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  {formatScore(exchange?.license_point ?? 0)}
                </Typography>
              </Stack>

              {/* <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={20} /> */}
            </Stack>

            <Divider />

            {isMobile && (
              <Stack direction="row" spacing={1}>
                <Typography variant="body2" color="unactive.main">
                  {t('detail.rateRisk')}
                </Typography>
                <InfoOutlinedIcon
                  style={{
                    color: 'rgba(0,0,0,0.5)',
                    cursor: 'pointer',
                  }}
                  onClick={() => setPopup({ open: true, title: t('detail.rateRisk'), des: t('pointStandard.risk') })}
                />
              </Stack>
            )}
            <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
              {!isMobile && (
                <Stack direction="row" flex={1.5} spacing={1}>
                  <Typography sx={{ fontSize: '16px', color: '#A0A4AB', fontWeight: 500 }}>
                    {t('detail.rateRisk')}
                  </Typography>
                  <InfoOutlinedIcon
                    style={{
                      color: 'rgba(0,0,0,0.5)',
                      cursor: 'pointer',
                    }}
                    onClick={() => setPopup({ open: true, title: t('detail.rateRisk'), des: t('pointStandard.risk') })}
                  />
                </Stack>
              )}
              <Stack direction="row" flex={2} justifyContent="center" alignItems="center" spacing={1}>
                <CustomizedSlider defaultValue={exchange?.risk_point as number} />
                <Typography sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  {formatScore(exchange?.risk_point ?? 0)}
                </Typography>
              </Stack>
            </Stack>

            <Divider />

            {isMobile && (
              <Stack direction="row" spacing={1}>
                <Typography variant="body2" color="unactive.main">
                  {t('detail.rateManage')}
                </Typography>
                <InfoOutlinedIcon
                  style={{
                    color: 'rgba(0,0,0,0.5)',
                    cursor: 'pointer',
                  }}
                  onClick={() =>
                    setPopup({ open: true, title: t('detail.rateManage'), des: t('pointStandard.business') })
                  }
                />
              </Stack>
            )}
            <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
              {!isMobile && (
                <Stack direction="row" flex={1.5} spacing={1}>
                  <Typography sx={{ fontSize: '16px', color: '#A0A4AB', fontWeight: 500 }}>
                    {t('detail.rateManage')}
                  </Typography>
                  <InfoOutlinedIcon
                    style={{
                      color: 'rgba(0,0,0,0.5)',
                      cursor: 'pointer',
                    }}
                    onClick={() =>
                      setPopup({ open: true, title: t('detail.rateManage'), des: t('pointStandard.business') })
                    }
                  />
                </Stack>
              )}

              <Stack direction="row" flex={2} justifyContent="center" alignItems="center" spacing={1}>
                <CustomizedSlider defaultValue={exchange?.manage_point as number} />
                <Typography sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  {formatScore(exchange?.manage_point ?? 0)}
                </Typography>
              </Stack>
            </Stack>

            <Divider />

            {isMobile && (
              <Stack direction="row" spacing={1}>
                <Typography variant="body2" color="unactive.main">
                  {t('detail.rateOperator')}
                </Typography>
                <InfoOutlinedIcon
                  style={{
                    color: 'rgba(0,0,0,0.5)',
                    cursor: 'pointer',
                  }}
                  onClick={() =>
                    setPopup({ open: true, title: t('detail.rateOperator'), des: t('pointStandard.market') })
                  }
                />
              </Stack>
            )}
            <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
              {!isMobile && (
                <Stack direction="row" flex={1.5} spacing={1}>
                  <Typography sx={{ fontSize: '16px', color: '#A0A4AB', fontWeight: 500 }}>
                    {t('detail.rateOperator')}
                  </Typography>
                  <InfoOutlinedIcon
                    style={{
                      color: 'rgba(0,0,0,0.5)',
                      cursor: 'pointer',
                    }}
                    onClick={() =>
                      setPopup({ open: true, title: t('detail.rateOperator'), des: t('pointStandard.market') })
                    }
                  />
                </Stack>
              )}
              <Stack direction="row" flex={2} justifyContent="center" alignItems="center" spacing={1}>
                <CustomizedSlider defaultValue={exchange?.operation_point as number} />
                <Typography sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  {formatScore(exchange?.operation_point ?? 0)}
                </Typography>
              </Stack>
            </Stack>

            <Divider />

            {isMobile && (
              <Stack direction="row" spacing={1}>
                <Typography variant="body2" color="unactive.main">
                  {t('detail.rateSoftware')}
                </Typography>
                <InfoOutlinedIcon
                  style={{
                    color: 'rgba(0,0,0,0.5)',
                    cursor: 'pointer',
                  }}
                  onClick={() =>
                    setPopup({ open: true, title: t('detail.rateSoftware'), des: t('pointStandard.software') })
                  }
                />
              </Stack>
            )}
            <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
              {!isMobile && (
                <Stack direction="row" flex={1.5} spacing={1}>
                  <Typography sx={{ fontSize: '16px', color: '#A0A4AB', fontWeight: 500 }}>
                    {t('detail.rateSoftware')}
                  </Typography>
                  <InfoOutlinedIcon
                    style={{
                      color: 'rgba(0,0,0,0.5)',
                      cursor: 'pointer',
                    }}
                    onClick={() =>
                      setPopup({ open: true, title: t('detail.rateSoftware'), des: t('pointStandard.software') })
                    }
                  />
                </Stack>
              )}
              <Stack direction="row" flex={2} justifyContent="center" alignItems="center" spacing={1}>
                <CustomizedSlider defaultValue={exchange?.soft_point as number} />
                <Typography sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  {formatScore(exchange?.soft_point ?? 0)}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        <Stack mt={isMobile ? 0 : 10}>
          <TabContext value={valueTab}>
            {!isMobile && (
              <Box sx={{ borderBottom: 1, borderColor: 'divider', paddingBottom: 2 }}>
                <TabList
                  sx={{
                    justifyContent: 'space-between',
                    display: 'flex',
                  }}
                  TabIndicatorProps={{
                    style: { display: 'none' },
                  }}
                  onChange={(event, newValue) => handleChangeTab(event, newValue)}
                  aria-label="lab API tabs example"
                  variant="fullWidth"
                >
                  {tabList.map((item: any, index: number) => (
                    <Tab
                      sx={{
                        color: valueTab === item.value ? '#2A559C' : '#777777',
                        backgroundColor: valueTab === item.value ? '#F4F8FF' : 'transparent',
                        borderRadius: 1.25,
                        fontWeight: 600,
                      }}
                      key={index}
                      value={item.value}
                      label={router.locale === 'vi' ? item.label : item.label_en}
                    />
                  ))}
                </TabList>
              </Box>
            )}

            {isMobile && (
              <Box sx={{ borderBottom: 1, borderColor: 'divider', maxWidth: '400px' }}>
                <Tabs
                  scrollButtons={false}
                  variant="scrollable"
                  onChange={(event, newValue) => handleChangeTab(event, newValue)}
                >
                  {tabList.map((item: any, index: number) => (
                    <Tab
                      sx={{
                        color: valueTab === item.value ? '#2a559c' : '#353455',
                        px: '14px!important',
                        backgroundColor: valueTab === item.value ? '#F4F8FF' : 'transparent',
                        borderRadius: 2,
                        mx: '0px!important',
                        my: 1,
                      }}
                      key={index}
                      value={item.value}
                      label={router.locale === 'vi' ? item.label : item.label_en}
                    />
                  ))}
                </Tabs>
              </Box>
            )}

            <TabPanel
              value="overview"
              sx={{
                padding: 0,
                // mt: 2,
              }}
            >
              {exchange?.intro && (
                <Typography
                  dangerouslySetInnerHTML={{
                    __html:
                      router.locale === 'en' && exchange?.intro_en && exchange?.intro_en !== ''
                        ? exchange.intro_en
                        : exchange.intro,
                  }}
                  color="textSecondary"
                  variant="body2"
                  sx={{ fontSize: '16px' }}
                />
              )}
            </TabPanel>

            <TabPanel
              sx={{
                padding: 0,
                mt: 2,
              }}
              value="license"
            >
              <Stack spacing={2}>
                {exchange?.licenses &&
                  exchange?.licenses?.map((license, index) => (
                    <>
                      <LicenseCard
                        dataSupervisories={dataSupervisories?.supervisories}
                        key={license.id}
                        license={license}
                        onNameSupervisorChange={handleChangeSupervisorName}
                      />
                      {isMobile && exchange?.licenses && index < exchange?.licenses.length - 1 && <Divider />}
                    </>
                  ))}
              </Stack>
            </TabPanel>

            <TabPanel
              sx={{
                padding: 0,
                mt: 2,
              }}
              value="review"
            >
              <Stack spacing={4}>
                <Stack direction="row" spacing={isMobile ? 1 : 3}>
                  <Stack
                    sx={{
                      backgroundColor: 'rgba(42, 85, 156, 0.1)',
                      color: 'primary.main',
                      borderRadius: '8px',
                      py: 1,
                      px: 4,
                    }}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography variant="body2" sx={{ fontWeight: '600', textAlign: 'center' }}>
                      {t('comment.exchangePoint')}
                    </Typography>
                    <Typography variant="h2" sx={{ color: 'primary.main' }}>
                      {exchange?.total_feedback_point &&
                        parseFloat(exchange.total_feedback_point as unknown as string).toFixed(2)}
                    </Typography>
                  </Stack>

                  <Stack sx={{ flex: isMobile ? 2.5 : 6 }} spacing={isMobile ? 0.5 : 1}>
                    <Typography>
                      {t('comment.have')} {dataFeedbacks?.feedbacks_aggregate.aggregate.count} {t('comment.total')}
                    </Typography>
                    <Rating
                      precision={0.5}
                      name="simple-controlled"
                      value={(exchange?.total_feedback_point as number) / 2}
                      readOnly
                      size="large"
                    />
                    <Box
                      sx={{
                        width: isMobile ? '100%' : '50%',
                      }}
                    >
                      <SelectField
                        name="sort"
                        options={SortOptions}
                        english={router.locale === 'en' ? true : false}
                        value={sort}
                        all={false}
                        onChange={onSortChange}
                      />
                    </Box>
                  </Stack>
                  {!isMobile && (
                    <Button variant="contained" sx={{ flex: 2, height: 'max-content' }} onClick={handleOpenComment}>
                      {t('comment.write')}
                    </Button>
                  )}
                </Stack>
                {isMobile && (
                  <Button variant="contained" sx={{ flex: 2, height: 'max-content' }} onClick={handleOpenComment}>
                    {t('comment.write')}
                  </Button>
                )}
                <Stack divider={<Divider sx={{ my: 2 }} />}>
                  {ownerFeedback && (
                    <FeedbackCard
                      handleOpenComment={handleOpenComment}
                      handleDeleteCommentSubmit={handleDeleteCommentSubmit}
                      data={ownerFeedback}
                      edit={true}
                    />
                  )}
                  {dataFeedbacks?.feedbacks
                    .filter((feedback) => feedback?.user?.id !== auth?.user?.id)
                    .map((feedback) => (
                      <FeedbackCard data={feedback} key={feedback.id} />
                    ))}
                </Stack>
              </Stack>
            </TabPanel>

            <TabPanel
              sx={{
                padding: 0,
                mt: 2,
              }}
              value="complaint"
            >
              <Stack spacing={3}>
                <Stack
                  direction={isMobile ? 'column' : 'row'}
                  alignItems="center"
                  justifyContent="space-between"
                  gap={3}
                >
                  <Typography>{t('complaint.list')}</Typography>

                  <Stack direction="row" alignItems="center" spacing={1} width="100%" justifyContent="flex-end">
                    <Typography>{t('filter.name')}</Typography>

                    <Divider sx={{ height: 24 }} orientation="vertical" />
                    <Stack flexGrow={[1, 0]}>
                      <Button
                        sx={
                          orderComplaintType === 'LATEST'
                            ? { ...activeLayoutButtonStyle, paddingX: 3 }
                            : { ...normalLayoutButtonStyle, paddingX: 3 }
                        }
                        variant="contained"
                        startIcon={<KeyboardArrowDownRoundedIcon />}
                        onClick={() => {
                          handleChangeFilterComplaintType('LATEST')
                        }}
                      >
                        {t('filter.latest')}
                      </Button>
                    </Stack>
                    <Stack flexGrow={[1, 0]}>
                      <Button
                        sx={
                          orderComplaintType === 'OLDEST'
                            ? { ...activeLayoutButtonStyle, paddingX: 3 }
                            : { ...normalLayoutButtonStyle, paddingX: 3 }
                        }
                        variant="contained"
                        startIcon={<KeyboardArrowUpRoundedIcon />}
                        onClick={() => handleChangeFilterComplaintType('OLDEST')}
                      >
                        {t('filter.oldest')}
                      </Button>
                    </Stack>
                  </Stack>
                </Stack>
                <Stack sx={{ mt: 2 }} divider={<Divider sx={{ my: 2 }} />}>
                  {dataComplaints?.complaints?.map((complaint) => (
                    <ComplaintCard data={complaint} key={complaint.id} />
                  ))}
                </Stack>
                {dataComplaints?.complaints &&
                  dataComplaints?.complaints_aggregate &&
                  dataComplaints?.complaints?.length < dataComplaints?.complaints_aggregate?.aggregate?.count && (
                    <Stack alignItems="center">
                      <Button
                        onClick={() => handleFetchMoreComplaints()}
                        // handleFetchMoreComplaints
                        variant="contained"
                        sx={{ borderRadius: '22px', fontWeight: '500', width: 'max-content' }}
                      >
                        {t('text.seeMore', { ns: 'common' })}
                      </Button>
                    </Stack>
                  )}
              </Stack>
            </TabPanel>
          </TabContext>
        </Stack>
      </Stack>

      <Dialog
        sx={{
          p: 2,
        }}
        open={openComment}
        onClose={handleCloseComment}
        fullWidth={true}
        maxWidth={isMobile ? 'lg' : 'sm'}
      >
        {!auth.isAuthenticated ? (
          <Stack
            sx={{
              maxWidth: '400px',
              textAlign: 'center',
            }}
            spacing={1}
          >
            <DialogTitle>{t('comment.loginRequest')}</DialogTitle>
            <DialogActions>
              <Button
                variant="contained"
                sx={{ flex: 2, height: 'max-content' }}
                onClick={() => router.push('/authentication/login')}
              >
                {t('comment.login')}
              </Button>
            </DialogActions>
          </Stack>
        ) : (
          <>
            <DialogContent>
              <Stack spacing={1}>
                <Stack direction="row" sx={{ alignItems: 'center' }} spacing={1}>
                  <Image
                    src={auth.user.avatar || defaultAvatar}
                    style={{ borderRadius: 40 }}
                    alt="image of user"
                    width="40px"
                    height="40px"
                    loading="lazy"
                  />
                  <Stack sx={{ flex: '1' }}>
                    <Typography>{auth.user.displayName}</Typography>
                  </Stack>
                </Stack>

                <Stack alignItems="center">
                  <Typography>{t('comment.comment')}</Typography>
                  <Rating
                    sx={{ width: 'max-content' }}
                    precision={0.5}
                    name="rating"
                    value={comment.rating / 2}
                    onChange={handleRatingChange}
                  />
                </Stack>

                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={4}
                  value={comment.comment}
                  onChange={handleCommentChange}
                  sx={{
                    '&::placeholder': {
                      color: '#ffffff',
                    },
                  }}
                  placeholder={t('comment.placeholder')}
                />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                sx={{ flex: 2, height: 'max-content' }}
                onClick={() => {
                  if (ownerFeedback) {
                    handleUpdateCommentSubmit(comment, ownerFeedback.id as string)
                  } else handleCreateCommentSubmit(comment)
                }}
              >
                {ownerFeedback ? t('comment.edit') : t('comment.send')}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <Dialog
        sx={{
          p: 2,
        }}
        open={popup.open}
        onClose={() => setPopup({ open: false, title: '', des: '' })}
      >
        <DialogTitle>
          <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 600, fontSize: 20, color: '#0E0E2C' }}>{popup.title}</Typography>
            <CloseRoundedIcon
              sx={{ cursor: 'pointer' }}
              fontSize="medium"
              onClick={() => setPopup({ open: false, title: '', des: '' })}
            />
          </Stack>
        </DialogTitle>

        <DialogContent>
          <Typography color="#0E0E2C" fontSize={16} textAlign="justify">
            {popup.des}
          </Typography>
        </DialogContent>
      </Dialog>
    </Container>
  )
}

export default ExchangeDetail
