import { Box, Button, Container, Divider, Stack, Typography } from '@mui/material'
import { MainLayout } from '@app/components/main-layout'
import NextLink from 'next/link'
import { useContext, useState } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useMobile } from '@app/components/common'
import { useTranslation } from 'next-i18next'
import Carousel from 'react-material-ui-carousel'
import { useQuery } from '@apollo/client'
import GET_COMPLAINTS_BY_USER from '@app/operations/queries/complaints/get-complaints-by-user'
import { AuthContext } from '@app/contexts/amplify-context'
import { format } from 'date-fns'
import Image from 'next/image'
import {
  CANCEL_REQUEST_STATUS,
  CANCEL_REQUEST_STATUS_BACKGROUND_COLOR,
  CANCEL_REQUEST_STATUS_COLOR,
  CANCEL_REQUEST_STATUS_LABEL,
  COMPLAINT_STATUS,
  COMPLAINT_STATUS_BACKGROUND_COLOR,
  COMPLAINT_STATUS_COLOR,
  COMPLAINT_STATUS_LABEL,
} from '@app/constants/userComplaint'
import { useRouter } from 'next/router'
import YourReviewSend from '@app/components/exchange-review/YourReviewSend'

const YourReview = () => {
  const isMobile = useMobile()
  const value = useContext(AuthContext)
  const [status, setStatus] = useState('send')
  const { t } = useTranslation('complaints')
  const { locale } = useRouter()
  const { data } = useQuery(GET_COMPLAINTS_BY_USER, {
    variables: {
      id: value?.user?.id,
      limit: 100,
    },
  })
  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        pt: isMobile ? 0 : 8,
        pb: isMobile ? 2 : 8,
        top: isMobile ? '5px' : '15px',
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        <Stack>
          <Typography variant="h1">{t('your.title')}</Typography>
          <Stack direction="row" spacing={3} sx={{ mt: 1 }}>
            <Box sx={{ flex: 1 }}>
              <Button
                sx={{
                  borderRadius: 4,
                  backgroundColor: status === 'send' ? '#F4F8FF' : 'transparent',
                  color: status === 'send' ? 'primary.main' : 'unactive.main',
                  fontSize: '14px',
                  fontWeight: '600',
                  '&:hover': {
                    backgroundColor: '#F4F8FF',
                    color: 'primary.main',
                  },
                }}
                variant="text"
                size="large"
                onClick={() => setStatus('send')}
              >
                {t('your.top.send')}
              </Button>
              <Button
                sx={{
                  borderRadius: 4,
                  backgroundColor: status === 'draft' ? '#F4F8FF' : 'transparent',
                  color: status === 'draft' ? 'primary.main' : 'unactive.main',
                  fontSize: '14px',
                  fontWeight: '600',
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: '#F4F8FF',
                  },
                }}
                variant="text"
                size="large"
                onClick={() => setStatus('draft')}
              >
                {t('your.top.draft')}
              </Button>
            </Box>
            <NextLink
              href={`${locale === 'vi' ? '/danh-gia-san/gui-danh-gia' : '/exchange-review/create-review'}`}
              passHref
            >
              <Button
                sx={{
                  borderRadius: 4,
                  backgroundColor: 'secondary.main',
                  color: 'text.primary',
                  fontSize: '16px',
                  fontWeight: '700',
                }}
                variant="contained"
                color="secondary"
                size="small"
              >
                {t('create.title')}
              </Button>
            </NextLink>
          </Stack>
          <Divider orientation="horizontal" flexItem sx={{ my: 2 }} />
        </Stack>

        {!isMobile && (
          <Stack
            direction="row"
            sx={{
              backgroundColor: '#FFFFFF',
              py: 2,
              px: 3,
              borderRadius: '8px 8px 0px 0px',
              color: 'subtitle.main',
              mb: 1,
            }}
          >
            <Typography sx={{ flex: '1', fontSize: '14px', color: '#000000' }}>{t('your.t1')}</Typography>
            <Typography sx={{ flex: '3', textAlign: 'center', fontSize: '14px', color: '#000000' }}>
              {t('your.t2')}
            </Typography>
            <Typography sx={{ flex: '2', textAlign: 'center', fontSize: '14px', color: '#000000' }}>
              {t('your.t3')}
            </Typography>
            <Typography sx={{ flex: '1.5', textAlign: 'start', fontSize: '14px', color: '#000000' }}>
              {t('your.t4')}
            </Typography>
            <Typography sx={{ flex: '2', textAlign: 'end', fontSize: '14px', color: '#000000' }}>
              {t('your.t5')}
            </Typography>
          </Stack>
        )}

        {status === 'send' && !isMobile && <YourReviewSend />}
        {isMobile && (
          <Carousel
            autoPlay={false}
            swipe
            animation="slide"
            // indicators={false}
            // onChange={handleSwipe}
            sx={{
              height: '370px',
            }}
            cycleNavigation={true}
            navButtonsAlwaysVisible={isMobile && false}
            indicatorContainerProps={{
              style: {
                zIndex: '10',
                position: 'absolute',
                bottom: isMobile ? '5px' : '70px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 'max-content',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            }}
            activeIndicatorIconButtonProps={{
              style: {
                backgroundColor: '#2A559C',
                border: '1px solid #2A559C',
              },
            }}
            indicatorIconButtonProps={{
              style: {
                width: '12px',
                margin: '0 5px',
                height: '12px',
                border: '1px solid #2A559C',
                color: 'transparent',
              },
            }}
          >
            {data?.complaints?.map((item: any) => (
              <NextLink
                href={`/${locale === 'vi' ? 'danh-gia-san/danh-gia-cua-ban' : 'exchange-review/your-review'}/${
                  item.id
                }`}
                key={item.id}
                passHref
              >
                <Stack direction="row" spacing={1}>
                  <Stack
                    sx={{
                      backgroundColor: '#FFFFFF',
                      p: 2,
                      color: 'subtitle.main',
                      borderRadius: 1,
                      flex: 2,
                    }}
                    spacing={1}
                  >
                    <Typography
                      sx={{
                        height: '40px',
                      }}
                    >
                      {t('your.t1')}
                    </Typography>
                    <Typography
                      sx={{
                        height: '75px',
                      }}
                    >
                      {t('your.t2')}
                    </Typography>
                    <Typography
                      sx={{
                        height: '50px',
                      }}
                    >
                      {t('your.t3')}
                    </Typography>
                    <Typography
                      sx={{
                        height: '70px',
                      }}
                    >
                      {t('your.t4')}
                    </Typography>
                    <Typography>{t('your.t5')}</Typography>
                  </Stack>
                  <Stack
                    sx={{
                      backgroundColor: '#FFFFFF',
                      p: 2,
                      borderRadius: 1,
                      flex: 4,
                    }}
                    spacing={1}
                  >
                    <Typography
                      sx={{
                        height: '40px',
                      }}
                    >
                      {' '}
                      {format(new Date(item.createdAt), 'dd/MM/yyyy')}
                    </Typography>
                    <Typography
                      sx={{
                        // color: 'text.main',
                        // ml: 1,
                        WebkitLineClamp: 3,
                        display: '-webkit-box',
                        // width: '400px',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        cursor: 'pointer',
                        height: '75px',
                        textTransform: 'capitalize',
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      sx={{
                        height: '50px',
                      }}
                    >
                      {item.category.name}
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{
                        height: '70px',
                      }}
                    >
                      {item?.exchange?.logo && (
                        <Box
                          sx={{
                            border: '0.5px solid #d0d0d0',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            height: '55px',
                            width: '80px',
                            position: 'relative',
                          }}
                        >
                          <Image
                            src={item?.exchange?.logo}
                            alt="logo sàn"
                            layout="fill"
                            objectFit="contain"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 60vw"
                            loading="lazy"
                          />
                        </Box>
                      )}
                      <Typography sx={{ fontWeight: '600' }}>{item.exchange.name}</Typography>
                    </Stack>
                    <Typography
                      sx={{
                        textAlign: 'center',
                        width: 'max-content',
                        py: 1,
                        px: 2,
                        borderRadius: '17px',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        backgroundColor:
                          (item.cancelRequests.length > 0 &&
                            item.cancelRequests[item.cancelRequests.length - 1].status === 'rejected') ||
                          item.cancelRequests.length <= 0
                            ? COMPLAINT_STATUS_BACKGROUND_COLOR[item.status as COMPLAINT_STATUS]
                            : CANCEL_REQUEST_STATUS_BACKGROUND_COLOR[
                                item.cancelRequests[item.cancelRequests.length - 1].status as CANCEL_REQUEST_STATUS
                              ],
                        color:
                          (item.cancelRequests.length > 0 &&
                            item.cancelRequests[item.cancelRequests.length - 1].status === 'rejected') ||
                          item.cancelRequests.length <= 0
                            ? COMPLAINT_STATUS_COLOR[item.status as COMPLAINT_STATUS]
                            : CANCEL_REQUEST_STATUS_COLOR[
                                item.cancelRequests[item.cancelRequests.length - 1].status as CANCEL_REQUEST_STATUS
                              ],
                      }}
                    >
                      {(item.cancelRequests.length > 0 &&
                        item.cancelRequests[item.cancelRequests.length - 1].status === 'rejected') ||
                      item.cancelRequests.length <= 0
                        ? COMPLAINT_STATUS_LABEL[item.status as COMPLAINT_STATUS]
                        : CANCEL_REQUEST_STATUS_LABEL[
                            item.cancelRequests[item.cancelRequests.length - 1].status as CANCEL_REQUEST_STATUS
                          ]}
                    </Typography>
                  </Stack>
                </Stack>
              </NextLink>
            ))}
          </Carousel>
        )}
      </Container>
    </Box>
  )
}

YourReview.getLayout = (page: any) => <MainLayout>{page}</MainLayout>

export default YourReview

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'vi', ['common', 'complaints', 'home-page'])),
      // Will be passed to the page component as props
    },
    revalidate: 30,
  }
}
