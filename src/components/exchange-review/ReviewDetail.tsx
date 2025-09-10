import { useQuery } from '@apollo/client'
import ReviewDetailSlider from '@app/components/exchange-review/ReviewDetailSlider'
import { MainLayout } from '@app/components/main-layout'
import GET_COMPLAINTS_BY_EXCHANGE from '@app/operations/queries/complaints/get-complaints-by-exchange'
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined'
import { Box, CircularProgress, Container, Divider, Link, Stack, Typography } from '@mui/material'
import { format } from 'date-fns'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import NextLink from 'next/link'
import { useRef, useState } from 'react'
import { useDesktop, useMobile } from '../common'
import ReviewDetailItem from './ReviewDetailItem'
import ReviewId from './ReviewId'
import { COMPLAINT_STATUS } from '@app/constants/complaint'
import { useRouter } from 'next/router'
import PhotoSwipeGallery from '@app/components/PhotoSwipeGallery'

interface ReviewDetailProps {
  complaintDetail: any
}

const ReviewDetail = ({ complaintDetail }: ReviewDetailProps) => {
  const router = useRouter()
  const locale = router.locale
  const isMobile = useMobile()
  const isDesktop = useDesktop()
  const { t } = useTranslation(['complaints', 'common'])
  const { loading, data } = useQuery(GET_COMPLAINTS_BY_EXCHANGE, {
    variables: {
      where: {
        exchangeId: {
          _eq: complaintDetail?.exchange?.id,
        },
        status: {
          _nin: [
            COMPLAINT_STATUS.PENDING,
            COMPLAINT_STATUS.ACCEPTED,
            COMPLAINT_STATUS.REJECTED,
            COMPLAINT_STATUS.DECLINED,
          ],
        },
        hidden: {
          _eq: false,
        },
      },
      limit: 2,
    },
  })
  const refDescription = useRef()
  const idSplitted = (complaintDetail?.id as string)?.split('-')
  const [expand, setExpand] = useState(false)

  return (
    <Box component="main">
      {isMobile ? (
        <Stack>
          <Stack p={2} spacing={1}>
            <Stack direction={'row'} spacing={0} alignItems="center">
              <NextLink href={`/${locale === 'vi' ? 'danh-gia-san/lua-dao' : 'exchange-review/scam'}`} passHref>
                <Typography variant="body2" sx={{ whiteSpace: 'nowrap', color: 'unactive.main', cursor: 'pointer' }}>
                  {t('report')}
                </Typography>
              </NextLink>

              {complaintDetail?.category?.slug && <ChevronRightOutlinedIcon color="disabled" />}
              <NextLink
                href={`/${locale === 'vi' ? 'danh-gia-san' : 'exchange-review'}/${complaintDetail?.category?.slug}`}
                passHref
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: 'unactive.main',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                  }}
                >
                  {complaintDetail?.category?.slug === 'lua-dao' && (router.locale === 'vi' ? 'Lừa đảo' : 'Scam')}

                  {complaintDetail?.category?.slug === 'hop-thu-danh-gia-va-gop-y-tu-nha-dau-tu' &&
                    (router.locale === 'vi'
                      ? 'Hộp thư đánh giá và góp ý từ nhà đầu tư'
                      : 'Investor feedback and comments mailbox')}

                  {complaintDetail?.category?.slug === 'danh-gia-tong-quat' &&
                    (router.locale === 'vi' ? 'Đánh giá tổng quát' : 'General Review')}

                  {complaintDetail?.category?.slug === 'ly-do-khac' &&
                    (router.locale === 'vi' ? 'Lý do khác' : 'Other problems')}
                </Typography>
              </NextLink>
              <ChevronRightOutlinedIcon color="disabled" />

              <Typography
                variant="body2"
                sx={{
                  color: '#2A559C',
                  WebkitLineClamp: 1,
                  display: '-webkit-box',
                  width: '400px',
                  overflow: 'hidden',
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {complaintDetail.title}
              </Typography>
            </Stack>
            <Stack direction="row" sx={{ alignItems: 'center' }} spacing={1}>
              <ReviewId idSplitted={idSplitted} />
              <Stack sx={{ flex: '1', alignItems: 'flex-end' }}>
                <Typography variant="body2" sx={{ color: 'subtitle.main' }}>
                  {format(new Date(complaintDetail?.createdAt), 'dd/MM/yyyy')}
                </Typography>
              </Stack>
            </Stack>
            <Typography variant="h1">{complaintDetail.title}</Typography>
            <Box
              dangerouslySetInnerHTML={{
                __html: complaintDetail?.description,
              }}
              sx={{
                textAlign: 'justify',
                display: '-webkit-box',
                overflow: 'hidden',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: expand || complaintDetail.images?.length < 1 ? 'none' : 5,
              }}
            />
            {complaintDetail.images && complaintDetail.images?.length > 0 && (
              <Typography
                onClick={() => setExpand(!expand)}
                sx={{
                  marginTop: '0!important',
                  color: 'primary.main',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontWeight: '600',
                }}
              >
                {!expand ? t('text.seeMore', { ns: 'common' }) : t('text.seeLess', { ns: 'common' })}
              </Typography>
            )}
          </Stack>
          {complaintDetail.images?.length > 0 && (
            <ReviewDetailSlider isMobile={isMobile} data={complaintDetail.images} />
          )}

          <Stack p={2} spacing={1}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Image
                src={
                  'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/dot_Blue_2404e1c4fe.png?updated_at=2022-08-25T09:27:29.663Z'
                }
                alt="icon"
                width={12}
                height={24}
                loading="lazy"
              />
              <Typography variant="h4" sx={{ flex: '1', ml: 1 }}>
                {t('detail.detail.t1')}
              </Typography>
            </Box>

            <Box sx={{ backgroundColor: '#F4F8FF', p: 2, borderRadius: 2, width: '100%' }}>
              {complaintDetail?.exchange?.logo && (
                <Link href={`/${locale === 'vi' ? 'tra-cuu-san' : 'broker'}/${complaintDetail?.exchange?.slug}`}>
                  <Box
                    sx={{
                      overflow: 'hidden',
                      mb: 1,
                      borderRadius: '8px',
                      border: '1px solid #d0d0d0',
                      width: 'full',
                      height: '166px',
                      position: 'relative',
                    }}
                  >
                    <Image
                      src={complaintDetail?.exchange?.logo}
                      alt="hình ảnh"
                      layout="fill"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 60vw"
                      loading="lazy"
                    />
                  </Box>
                </Link>
              )}
              <Link href={`/${locale === 'vi' ? 'tra-cuu-san' : 'broker'}/${complaintDetail?.exchange?.slug}`}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Image
                    loading="lazy"
                    src={complaintDetail?.exchange?.national?.logo}
                    width={42}
                    height={25}
                    alt="logo"
                  />

                  <Typography sx={{ flex: '1', fontWeight: '600', ml: 1, fontSize: '20px' }}>
                    {complaintDetail?.exchange?.name}
                  </Typography>
                </Box>
              </Link>
              {router.locale === 'vi' && complaintDetail?.exchange?.supervision_time && (
                <Typography
                  sx={{ fontSize: 14, color: '#A0A4AB' }}
                  variant="body2"
                >{`Thời gian giám sát: ${complaintDetail?.exchange?.supervision_time}`}</Typography>
              )}

              {router.locale !== 'vi' && (
                <Typography sx={{ fontSize: 14, color: '#A0A4AB' }} variant="body2">{`Regulated time: ${
                  complaintDetail?.exchange?.supervision_time_en
                    ? complaintDetail?.exchange?.supervision_time_en
                    : complaintDetail?.exchange?.supervision_time
                }`}</Typography>
              )}
            </Box>
          </Stack>
          <Divider />
          <Stack p={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Image
                src={
                  'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/dot_Blue_2404e1c4fe.png?updated_at=2022-08-25T09:27:29.663Z'
                }
                alt="icon"
                width={12}
                height={24}
                loading="lazy"
              />
              <Typography variant="h4" sx={{ flex: '1', ml: 1 }}>
                {t('detail.detail.t2')}
              </Typography>
            </Box>
            <Stack spacing={3} divider={<Divider orientation="horizontal" flexItem sx={{}} />}>
              {loading && (
                <Stack alignItems="center" justifyContent="center">
                  <CircularProgress />
                </Stack>
              )}
              {data &&
                data.complaints
                  .filter((item: any) => item.id !== complaintDetail?.id)
                  .map((item: any) => <ReviewDetailItem isMobile={isMobile} data={item} key={item.id} />)}
            </Stack>
          </Stack>
        </Stack>
      ) : (
        <Container maxWidth="lg">
          <Stack>
            <Stack flex={1} direction="row" spacing={1} alignItems="center">
              <NextLink href={`/${locale === 'vi' ? 'danh-gia-san/lua-dao' : 'exchange-review/scam'}`} passHref>
                <Typography variant="body2" sx={{ whiteSpace: 'nowrap', color: 'unactive.main', cursor: 'pointer' }}>
                  {t('report')}
                </Typography>
              </NextLink>

              {complaintDetail?.category?.slug && <ChevronRightOutlinedIcon color="disabled" />}
              <NextLink
                href={`/${locale === 'vi' ? 'danh-gia-san' : 'exchange-review'}/${complaintDetail?.category?.slug}`}
                passHref
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: 'unactive.main',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                  }}
                >
                  {complaintDetail?.category?.slug === 'lua-dao' && (router.locale === 'vi' ? 'Lừa đảo' : 'Scam')}

                  {complaintDetail?.category?.slug === 'hop-thu-danh-gia-va-gop-y-tu-nha-dau-tu' &&
                    (router.locale === 'vi'
                      ? 'Hộp thư đánh giá và góp ý từ nhà đầu tư'
                      : 'Investor feedback and comments mailbox')}

                  {complaintDetail?.category?.slug === 'danh-gia-tong-quat' &&
                    (router.locale === 'vi' ? 'Đánh giá tổng quát' : 'General Review')}

                  {complaintDetail?.category?.slug === 'ly-do-khac' &&
                    (router.locale === 'vi' ? 'Lý do khác' : 'Other problems')}
                </Typography>
              </NextLink>
              <ChevronRightOutlinedIcon color="disabled" />

              <Typography
                variant="body2"
                sx={{
                  color: 'text.main',
                  WebkitLineClamp: 1,
                  display: '-webkit-box',
                  width: '400px',
                  overflow: 'hidden',
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {complaintDetail?.title}
              </Typography>
            </Stack>

            <Stack direction={isDesktop ? 'row' : 'column'} width="100%">
              <Stack sx={{ flex: '3', position: 'relative' }} width={isDesktop ? '70%' : '100%'} spacing={2}>
                <Stack direction="row" sx={{ alignItems: 'center' }} spacing={1}>
                  <ReviewId idSplitted={idSplitted} />
                  <Stack sx={{ flex: '1', alignItems: 'flex-end' }}>
                    <Typography variant="body2" sx={{ color: 'subtitle.main' }}>
                      {complaintDetail?.createdAt && format(new Date(complaintDetail?.createdAt), 'dd/MM/yyyy')}
                    </Typography>
                  </Stack>
                </Stack>
                <Typography variant="h1">{complaintDetail?.title}</Typography>
                <Box
                  dangerouslySetInnerHTML={{
                    __html: complaintDetail?.description,
                  }}
                  ref={refDescription}
                  sx={{
                    textAlign: 'justify',
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: expand || complaintDetail?.images?.length < 1 ? 'none' : 5,
                  }}
                />
                {complaintDetail.images &&
                  complaintDetail.images?.length > 0 &&
                  refDescription?.current?.clientHeight > 120 && (
                    <Typography
                      onClick={() => setExpand(!expand)}
                      sx={{
                        marginTop: '0!important',
                        color: 'primary.main',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        fontWeight: '600',
                      }}
                    >
                      {!expand ? t('text.seeMore', { ns: 'common' }) : ''}
                    </Typography>
                  )}
                <PhotoSwipeGallery photos={complaintDetail?.images} status={complaintDetail?.status} />
              </Stack>

              <Divider orientation="vertical" variant="inset" flexItem sx={{ ml: 2, mr: 2 }} component="div" />

              <Stack sx={{ flex: '1' }} width={isDesktop ? '30%' : '100%'}>
                <Stack width={'100%'}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Image
                      src={
                        'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/dot_Blue_2404e1c4fe.png?updated_at=2022-08-25T09:27:29.663Z'
                      }
                      alt="icon"
                      width={12}
                      height={24}
                      loading="lazy"
                    />
                    <Typography variant="h4" sx={{ flex: '1', ml: 1 }} my={isDesktop ? 0 : 3}>
                      {t('detail.detail.t1')}
                    </Typography>
                  </Box>

                  <Box
                    sx={{ backgroundColor: '#F4F8FF', p: 2, borderRadius: 2 }}
                    width={isDesktop ? 'fit-content' : '100%'}
                  >
                    {complaintDetail?.exchange?.logo && (
                      <Link href={`/${locale === 'vi' ? 'tra-cuu-san' : 'broker'}/${complaintDetail?.exchange?.slug}`}>
                        <Box
                          sx={{
                            overflow: 'hidden',
                            mb: 1,
                            borderRadius: '8px',
                            border: '1px solid #d0d0d0',
                            position: 'relative',
                          }}
                          width={isDesktop ? '278px' : '100%'}
                          height={isDesktop ? '156px' : '355px'}
                        >
                          <Image
                            src={complaintDetail?.exchange?.logo}
                            alt="hình ảnh"
                            layout="fill"
                            objectFit="cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 60vw"
                            loading="lazy"
                          />
                        </Box>
                      </Link>
                    )}
                    <Link href={`/${locale === 'vi' ? 'tra-cuu-san' : 'broker'}/${complaintDetail?.exchange?.slug}`}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Image
                          loading="lazy"
                          src={complaintDetail?.exchange?.national?.logo}
                          width={42}
                          height={25}
                          alt="hình ảnh"
                        />

                        <Typography sx={{ flex: '1', fontWeight: '600', ml: 1, fontSize: '20px' }}>
                          {complaintDetail?.exchange?.name}
                        </Typography>
                      </Box>
                    </Link>
                    {router.locale === 'vi' && complaintDetail?.exchange?.supervision_time && (
                      <Typography
                        sx={{ fontSize: 14, color: '#000000' }}
                        variant="body2"
                      >{`Thời gian giám sát: ${complaintDetail?.exchange?.supervision_time}`}</Typography>
                    )}

                    {router.locale !== 'vi' && (
                      <Typography sx={{ fontSize: 14, color: '#A0A4AB' }} variant="body2">{`Regulated time: ${
                        complaintDetail?.exchange?.supervision_time_en
                          ? complaintDetail?.exchange?.supervision_time_en
                          : complaintDetail?.exchange?.supervision_time
                      }`}</Typography>
                    )}
                  </Box>
                </Stack>

                <Divider orientation="horizontal" flexItem sx={{ my: 2 }} component="div" />
                <Stack>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Image
                      src={
                        'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/dot_Blue_2404e1c4fe.png?updated_at=2022-08-25T09:27:29.663Z'
                      }
                      alt="icon"
                      width={12}
                      height={24}
                      loading="lazy"
                    />
                    <Typography variant="h4" sx={{ flex: '1', ml: 1 }}>
                      {t('detail.detail.t2')}
                    </Typography>
                  </Box>
                  <Stack spacing={3} direction="column" divider={<Divider orientation="horizontal" flexItem sx={{}} />}>
                    {loading && (
                      <Stack alignItems="center" justifyContent="center">
                        <CircularProgress />
                      </Stack>
                    )}
                    {data &&
                      data.complaints
                        .filter((item: any) => item.id !== complaintDetail?.id)
                        .map((item: any) => <ReviewDetailItem data={item} key={item.id} />)}
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      )}
    </Box>
  )
}

ReviewDetail.getLayout = (page: any) => <MainLayout>{page}</MainLayout>

export default ReviewDetail
