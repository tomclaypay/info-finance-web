import { useMobile } from '@app/components/common'
import { Event } from '@app/interfaces/event'
import { Box, Container, Divider, Stack, Typography } from '@mui/material'
import { format } from 'date-fns'
import viLocale from 'date-fns/locale/vi'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Carousel from 'react-material-ui-carousel'
import ReactPlayer from 'react-player'
import EventChildCard from '../card/EventChildCard'
import toast from 'react-hot-toast'
import { FacebookShareButton, TelegramShareButton } from 'react-share'

interface EventEndDetailProps {
  event: Event
}

const EventEndDetail = ({ event }: EventEndDetailProps) => {
  const { t } = useTranslation('common')
  const { locale } = useRouter()
  const isMobile = useMobile()
  const router = useRouter()

  async function copyTextToClipboard(text: string) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text)
    } else {
      return document.execCommand('copy', true, text)
    }
  }
  const handleCopyUrl = () => {
    copyTextToClipboard(`${window.location.origin}/${router.asPath}`).then(() => {
      toast.success(t('text.copied'), {
        style: {
          backgroundColor: '#2A559C',
          padding: '10px',
          color: '#fff',
          boxShadow: '0px 0px 8px 0px #00000066',
        },
        iconTheme: {
          primary: '#2A559C',
          secondary: '#FFF',
        },
      })
    })
  }

  return (
    <>
      {event && (
        <Stack spacing={3}>
          <Container maxWidth="lg">
            <Stack pt={isMobile ? 2 : 5} pb={isMobile ? 0 : 5}>
              <Stack direction={isMobile ? 'column' : 'row'}>
                <Stack flex={3} spacing={1.5}>
                  <Typography variant="h2">{event?.title}</Typography>
                  <Stack direction="row" spacing={1} alignItems="flex-end">
                    <Image
                      src={
                        'https://infofx-dev.s3.ap-southeast-1.amazonaws.com/Clock_4dcbc13a36.png?updated_at=2023-02-23T13:44:10.929Z'
                      }
                      alt="icon"
                      width={24}
                      height={24}
                      loading="lazy"
                    />
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="body2" color="subtitle.main">
                        {format(new Date(event?.start), 'HH:mm', {
                          locale: viLocale,
                        })}{' '}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="flex-end">
                    <Image
                      src={
                        'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Calendar_fb8cf670c6.png?updated_at=2022-10-25T06:59:21.241Z'
                      }
                      alt="icon"
                      width={24}
                      height={24}
                      loading="lazy"
                    />
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="body2" color="subtitle.main">
                        {locale === 'vi'
                          ? format(new Date(event?.start), "dd 'tháng' L uuuu", {
                              locale: viLocale,
                            })
                          : format(new Date(event?.start), 'd MMM uuuu')}
                      </Typography>
                      {/* <Box
                        sx={{
                          width: '7px',
                          height: '7px',
                          borderRadius: '100%',
                          backgroundColor: '#67696E',
                          flex: '1',
                        }}
                      />
                      <Typography variant="body2" color="subtitle.main">
                        {format(new Date(event?.start), 'HH:mm', {
                          locale: viLocale,
                        })}{' '}
                      </Typography> */}
                    </Stack>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="flex-end">
                    <Image
                      src={
                        'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Map_Pin_ec69c8d7fd.png?updated_at=2022-10-25T06:56:56.317Z'
                      }
                      alt="icon"
                      width={24}
                      height={24}
                      loading="lazy"
                    />
                    <Typography
                      variant="body2"
                      color="subtitle.main"
                      sx={{
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 1,
                        flex: '1',
                      }}
                    >
                      {event?.location}
                    </Typography>
                  </Stack>
                  <Box
                    sx={{
                      backgroundColor: '#FFE9E6',
                      color: 'error.main',
                      padding: '10px',
                      borderRadius: '4px',
                      width: 'max-content',
                    }}
                    justifyContent="center"
                  >
                    <Typography variant="button">{t('event.finished')}</Typography>
                  </Box>
                </Stack>

                <Stack
                  flex={1}
                  p={2}
                  sx={{
                    boxShadow: '0px 0px 16px rgba(0, 0, 0, 0.05)',
                    borderRadius: '8px',
                    height: '150px',
                  }}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="h1">
                    {event?.fake_participant_num === null || event?.fake_participant_num === 0
                      ? event?.participant_num
                      : event?.fake_participant_num}
                  </Typography>
                  <Typography variant="body2">{t('event.participants')}</Typography>
                  <Stack direction="row" spacing={1}>
                    <Typography variant="body2" fontWeight="700" sx={{ mt: '2px' }}>
                      {t('event.share')}:
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <TelegramShareButton url={`${process.env.NEXT_PUBLIC_SITE_URL}/${router.asPath}`}>
                        <Box
                          sx={{
                            cursor: 'pointer',
                          }}
                        >
                          <Image
                            src="https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Telegram_f194e87613.png?updated_at=2022-10-25T09:03:04.869Z"
                            alt="icon"
                            width={24}
                            height={24}
                            loading="lazy"
                          />
                        </Box>
                      </TelegramShareButton>

                      <FacebookShareButton url={`${process.env.NEXT_PUBLIC_SITE_URL}/${router.asPath}`}>
                        <Box
                          sx={{
                            cursor: 'pointer',
                          }}
                          onClick={handleCopyUrl}
                        >
                          <Image
                            src="https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Facebook_de95c094ac.png?updated_at=2022-10-25T09:03:04.740Z"
                            alt="icon"
                            width={24}
                            height={24}
                            loading="lazy"
                          />
                        </Box>
                      </FacebookShareButton>

                      <Box
                        sx={{
                          cursor: 'pointer',
                        }}
                        onClick={handleCopyUrl}
                      >
                        <Image
                          src="https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Frame_1000003043_591f708030.png?updated_at=2022-10-25T09:03:04.738Z"
                          alt="icon"
                          width={24}
                          height={24}
                          loading="lazy"
                        />
                      </Box>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>

              <Divider sx={{ marginTop: isMobile ? '0px' : '30px' }} />

              <Stack pt={2}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box
                    sx={{
                      width: '10px',
                      height: '20px',
                      backgroundColor: 'primary.main',
                      borderRadius: '8px',
                    }}
                  />
                  <Typography variant="h4">{t('event.detail')}</Typography>
                </Stack>

                <Stack>
                  {/* <Stack direction="row" spacing={2} mb={3}>
                    {viewOptions.map((item) => (
                      <Button
                        onClick={() => setViewDetail(item.value)}
                        key={item.value}
                        sx={{
                          textTransform: 'capitalize',
                          flex: '1',
                          color: viewDetail === item.value ? 'primary.main' : '#ADADAD',
                          backgroundColor: viewDetail === item.value ? '#F4F8FF' : 'transparent',
                        }}
                      >
                        {item.display}
                      </Button>
                    ))}
                  </Stack> */}
                  {event && (
                    <Stack>
                      <Typography
                        variant="body2"
                        textAlign="justify"
                        dangerouslySetInnerHTML={{
                          __html: event.description,
                        }}
                        sx={{ '& > p > img': { width: 'auto' } }}
                      />
                      {/* <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Image
                          src={
                            'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/dot_Blue_2404e1c4fe.png?updated_at=2022-08-25T09:27:29.663Z'
                          }
                          alt="icon"
                          width={7}
                          height={14}
                        />
                        <Typography variant="h3" sx={{ flex: '1', ml: 1 }}>
                          {t('image')}
                        </Typography>
                      </Box> */}
                      {/* {!isMobile && (
                        <Stack direction="row" spacing={5}>
                          {event?.images?.length > 0 &&
                            event?.images?.map((image, index) => (
                              <CustomImage
                                internet={true}
                                key={image}
                                image={image}
                                index={index}
                                slides={event?.images}
                              />
                            ))}
                        </Stack>
                      )} */}

                      {event?.images?.length > 0 && isMobile && (
                        <Carousel
                          autoPlay={false}
                          sx={{
                            height: '100%',
                            mb: 1,
                            mt: 0,
                          }}
                          swipe
                          cycleNavigation={true}
                          animation="slide"
                          navButtonsAlwaysVisible={isMobile && false}
                          indicatorContainerProps={{
                            style: {
                              zIndex: '10',
                              position: 'absolute',
                              bottom: '0px',
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
                          {event?.images.map((image, index) => (
                            <Box key={index} pb={3}>
                              <Box
                                sx={{
                                  overflow: 'hidden',
                                  position: 'relative',
                                  paddingTop: '78.25%',
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
                                  src={image}
                                  alt="Hình ảnh"
                                  layout="fill"
                                  objectFit="contain"
                                  objectPosition="center"
                                  loading="lazy"
                                />
                              </Box>
                            </Box>
                          ))}
                        </Carousel>
                      )}
                    </Stack>
                  )}

                  {/* {viewDetail === 'sponsors' && event?.event_sponsors?.length > 0 && (
                    <Stack>
                      {event?.event_sponsors.map((item: EventChild, index: number) => (
                        <Stack key={index}>
                          <EventChildCard vertical={isMobile} eventChild={item} />
                          {index < event?.event_sponsors?.length - 1 && (
                            <Divider orientation="horizontal" flexItem sx={{ my: isMobile ? 2 : 4 }} />
                          )}
                        </Stack>
                      ))}
                    </Stack>
                  )}

                  {viewDetail === 'organizers' && event?.event_organizers?.length > 0 && (
                    <Stack>
                      {event?.event_organizers.map((item: EventChild, index: number) => (
                        <Stack key={index}>
                          <EventChildCard vertical={isMobile} eventChild={item} />
                          {index < event?.event_organizers?.length - 1 && (
                            <Divider orientation="horizontal" flexItem sx={{ my: isMobile ? 2 : 4 }} />
                          )}
                        </Stack>
                      ))}
                    </Stack>
                  )} */}
                </Stack>
              </Stack>
            </Stack>
          </Container>

          <Stack
            sx={{
              backgroundColor: '#F9F9F9',
            }}
          >
            <Container maxWidth="lg">
              <Stack
                direction={isMobile ? 'column' : 'row'}
                sx={{
                  backgroundColor: isMobile ? '#F4F4F4' : 'transparent',
                  mx: isMobile ? -2 : 0,
                  px: isMobile ? 2 : 0,
                }}
                py={isMobile ? 2 : 5}
              >
                <Stack flex={1}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: isMobile ? 2 : 3 }}>
                    <Image
                      src={
                        'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/dot_Yellow_67c6724d95.png?updated_at=2022-08-25T09:27:29.671Z'
                      }
                      alt="icon"
                      width={12}
                      height={24}
                      loading="lazy"
                    />
                    <Typography variant="h4" sx={{ flex: '1', ml: isMobile ? 1 : 2 }}>
                      {t('event.sponsor')}
                    </Typography>
                  </Box>
                  {event?.event_sponsors.length > 0 && (
                    <EventChildCard vertical={isMobile} eventChild={event?.event_sponsors[0]} />
                  )}
                </Stack>
                <Divider
                  flexItem
                  sx={{ mx: isMobile ? 0 : 2, my: isMobile ? 1 : 0 }}
                  orientation={isMobile ? 'horizontal' : 'vertical'}
                />
                <Stack flex={1}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: isMobile ? 2 : 3 }}>
                    <Image
                      src={
                        'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/dot_Yellow_67c6724d95.png?updated_at=2022-08-25T09:27:29.671Z'
                      }
                      alt="icon"
                      width={12}
                      height={24}
                      loading="lazy"
                    />
                    <Typography variant="h4" sx={{ flex: '1', ml: isMobile ? 1 : 2 }}>
                      {t('event.organization')}
                    </Typography>
                  </Box>
                  {event?.event_organizers.length > 0 && (
                    <EventChildCard vertical={isMobile} eventChild={event?.event_organizers[0]} />
                  )}
                </Stack>
              </Stack>
            </Container>
          </Stack>

          {event?.video_url !== '' && event?.video_url !== null && (
            <Stack>
              <Container maxWidth="lg">
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Image
                    src={
                      'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/dot_Blue_2404e1c4fe.png?updated_at=2022-08-25T09:27:29.663Z'
                    }
                    alt="icon"
                    width={12}
                    height={24}
                    loading="lazy"
                  />
                  <Typography variant="h4" sx={{ flex: '1', ml: isMobile ? 1 : 2 }}>
                    Video
                  </Typography>
                </Box>
                <Box borderRadius={1} bgcolor="common.black" overflow="hidden" width="100%" height="650px">
                  <ReactPlayer controls width="100%" height="100%" url={event.video_url} playing={true} />
                </Box>
              </Container>
            </Stack>
          )}

          {event?.images_event_end?.length > 0 && (
            <Stack>
              <Container maxWidth="lg">
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Image
                    src={
                      'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/dot_Blue_2404e1c4fe.png?updated_at=2022-08-25T09:27:29.663Z'
                    }
                    alt="icon"
                    width={12}
                    height={24}
                    loading="lazy"
                  />
                  <Typography variant="h4" sx={{ flex: '1', ml: isMobile ? 1 : 2 }}>
                    {t('event.image')}
                  </Typography>
                </Box>
                {!isMobile ? (
                  <Box
                    sx={{
                      height: 'fit-content',
                    }}
                  >
                    <Carousel
                      sx={{
                        height: 'fit-content',
                      }}
                      duration={1000}
                      swipe
                      cycleNavigation={true}
                      animation="slide"
                      navButtonsAlwaysVisible
                      stopAutoPlayOnHover={false}
                    >
                      {event?.images_event_end.map((item, index) => (
                        <Box
                          key={index}
                          sx={{
                            overflow: 'hidden',
                            position: 'relative',
                            height: '100%',
                            paddingTop: '48.25%',
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
                            loading="lazy"
                            src={item}
                            alt="Hình ảnh"
                            layout="fill"
                            objectFit="contain"
                            objectPosition="center"
                          />
                        </Box>
                      ))}
                    </Carousel>
                  </Box>
                ) : (
                  <Carousel
                    autoPlay={false}
                    sx={{
                      height: '100%',
                      mb: 1,
                      mt: 0,
                    }}
                    swipe
                    cycleNavigation={true}
                    animation="slide"
                    navButtonsAlwaysVisible={isMobile && false}
                    indicatorContainerProps={{
                      style: {
                        zIndex: '10',
                        position: 'absolute',
                        bottom: '0px',
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
                    {event?.images_event_end.map((image, index) => (
                      <Box key={index} pb={3}>
                        <Box
                          sx={{
                            overflow: 'hidden',
                            position: 'relative',
                            paddingTop: '78.25%',
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
                            loading="lazy"
                            src={image}
                            alt="Hình ảnh"
                            layout="fill"
                            objectFit="contain"
                            objectPosition="center"
                          />
                        </Box>
                      </Box>
                    ))}
                  </Carousel>
                )}
              </Container>
            </Stack>
          )}
        </Stack>
      )}
    </>
  )
}

export default EventEndDetail
