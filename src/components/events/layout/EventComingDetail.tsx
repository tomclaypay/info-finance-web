import { useQuery } from '@apollo/client'
import { useMobile } from '@app/components/common'
import { AuthContext } from '@app/contexts/amplify-context'
import { Event, EventChild, RegisterEvent, STATUS_OF_EVENT } from '@app/interfaces/event'
import GET_ONE_USER from '@app/operations/queries/users/get-one-user'
import { Box, Button, Container, Divider, Stack, Typography } from '@mui/material'
import { format } from 'date-fns'
import viLocale from 'date-fns/locale/vi'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import EventChildCard from '../card/EventChildCard'
import RegisterEventForm from '../form/RegisterCancelEventForm'
import toast from 'react-hot-toast'

interface EventComingDetailProps {
  event: Event
  registered: boolean
  modalRegister: boolean
  openAlertModal: boolean
  handleSubmitRegisterEvent: (formValues: RegisterEvent) => void
  handleCloseModalRegister: () => void
  handleCloseAlertModal: () => void
  handleOpenModalRegister: () => void
}

const EventComingDetail = ({
  event,
  registered,
  handleSubmitRegisterEvent,
  modalRegister,
  openAlertModal,
  handleCloseAlertModal,
  handleCloseModalRegister,
  handleOpenModalRegister,
}: EventComingDetailProps) => {
  const value = useContext(AuthContext)
  const { locale } = useRouter()
  const { t } = useTranslation('common')
  const isMobile = useMobile()

  const { data: dataUser } = useQuery(GET_ONE_USER, {
    variables: {
      id: value?.user?.id,
    },
  })
  const [viewDetail, setViewDetail] = useState('detail')

  const viewOptions = [
    { value: 'detail', display: t('event.detail') },
    { value: 'sponsors', display: t('event.sponsor') },
    { value: 'organizers', display: t('event.organization') },
  ]

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
        <Container maxWidth="lg">
          <Stack pt={isMobile ? 2 : 5} pb={isMobile ? 2 : 0}>
            <Stack spacing={1}>
              <Typography variant="h2">{event?.title}</Typography>
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
                  <Typography variant="body2" color="#67696E" mr={1}>
                    {locale === 'vi'
                      ? format(new Date(event?.start), "dd 'tháng' L uuuu", {
                          locale: viLocale,
                        })
                      : format(new Date(event?.start), 'd MMM uuuu')}
                  </Typography>
                  <Box
                    sx={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '100%',
                      backgroundColor: '#67696E',
                      flex: '1',
                    }}
                  />
                  <Typography variant="body2" color="#67696E">
                    {format(new Date(event?.start), 'HH:mm', {
                      locale: viLocale,
                    })}
                  </Typography>
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
                  color="#67696E"
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
                  backgroundColor: STATUS_OF_EVENT(event, 'background'),
                  color: STATUS_OF_EVENT(event, 'color'),
                  padding: '10px',
                  borderRadius: '4px',
                  width: 'max-content',
                }}
                justifyContent="center"
              >
                <Typography variant="button" sx={{ fontSize: '14px', fontWeight: 500 }}>
                  {STATUS_OF_EVENT(event, 'text', locale)}
                </Typography>
              </Box>
            </Stack>

            <Divider sx={{ marginTop: '30px' }} />

            <Stack direction="row" pt={2}>
              <Stack flex={3}>
                <Stack direction="row" spacing={2} mb={5}>
                  {viewOptions.map((item) => (
                    <Button
                      onClick={() => setViewDetail(item.value)}
                      key={item.value}
                      sx={{
                        fontSize: '14px',
                        fontWeight: viewDetail === item.value ? 700 : 600,
                        flex: '1',
                        color: viewDetail === item.value ? 'primary.main' : '#ADADAD',
                        backgroundColor: viewDetail === item.value ? '#F4F8FF' : 'transparent',
                      }}
                    >
                      {item.display}
                    </Button>
                  ))}
                </Stack>
                {viewDetail === 'detail' && event && (
                  <Stack>
                    <Typography
                      variant="body2"
                      textAlign="justify"
                      dangerouslySetInnerHTML={{
                        __html: event.description,
                      }}
                      sx={{ '& > p > img': { maxWidth: '100%', width: 'auto' } }}
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
                        Hình ảnh
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
                          mt: -5,
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
                          <Box
                            key={index}
                            sx={{
                              overflow: 'hidden',
                              position: 'relative',
                              paddingTop: '86.25%',
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
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 60vw"
                              objectPosition="center"
                              loading="lazy"
                            />
                          </Box>
                        ))}
                      </Carousel>
                    )}

                    {isMobile && (
                      <Stack
                        flex={1}
                        spacing={2}
                        mx={-2}
                        mt={2}
                        p={2}
                        sx={{
                          backgroundColor: '#F4F8FF',
                        }}
                      >
                        <Typography variant="h4" textAlign="justify">
                          {event?.title}
                        </Typography>
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
                            <Typography variant="body2" color="subtitle.main" mr={1}>
                              {locale === 'vi'
                                ? format(new Date(event?.start), "dd 'tháng' L uuuu", {
                                    locale: viLocale,
                                  })
                                : format(new Date(event?.start), 'd MMM uuuu')}
                            </Typography>
                            <Box
                              sx={{
                                width: '7px',
                                height: '7px',
                                borderRadius: '100%',
                                backgroundColor: '#67696E',
                              }}
                            />
                            <Typography variant="body2" color="subtitle.main">
                              {format(new Date(event?.start), 'HH:mm', {
                                locale: viLocale,
                              })}
                            </Typography>
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
                        <Stack direction="row" spacing={1} alignItems="flex-end">
                          <Image
                            src={
                              'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/User_733a86797b.png?updated_at=2022-10-25T06:56:56.323Z'
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
                            {event?.participant_num} {t('event.participants')}
                          </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="flex-end">
                          <Button
                            sx={{
                              textTransform: 'capitalize',
                              flex: '1',
                              color: 'primary.main',
                              backgroundColor: 'transparent',
                              borderRadius: '40px',
                            }}
                          >
                            {t('event.share')}
                          </Button>
                          <Button
                            onClick={handleOpenModalRegister}
                            disabled={registered}
                            sx={{
                              textTransform: 'capitalize',
                              flex: '1',
                              color: registered ? 'unactive.main' : '#FFFFFF',
                              backgroundColor: registered ? '#F1F1F1' : 'primary.main',
                              borderRadius: '40px',
                              '&:hover': {
                                color: '#FFFFFF',
                                backgroundColor: 'primary.main',
                                opacity: '0.9',
                              },
                            }}
                          >
                            {registered ? t('event.registered') : t('event.register')}
                          </Button>
                        </Stack>
                        <Stack>
                          <Box
                            sx={{
                              overflow: 'hidden',
                              position: 'relative',
                              height: '100%',
                              paddingTop: '76.25%',
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
                              src={event?.images?.[0]}
                              alt="Hình ảnh"
                              layout="fill"
                              objectFit="contain"
                              objectPosition="center"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 60vw"
                              loading="lazy"
                            />
                          </Box>
                        </Stack>
                      </Stack>
                    )}
                  </Stack>
                )}

                {viewDetail === 'sponsors' && event?.event_sponsors && event?.event_sponsors?.length > 0 && (
                  <Stack>
                    {event?.event_sponsors?.map((item: EventChild, index: number) => (
                      <Stack key={index}>
                        <EventChildCard eventChild={item} vertical={isMobile} />
                        {index < event?.event_sponsors?.length - 1 && (
                          <Divider orientation="horizontal" flexItem sx={{ my: isMobile ? 2 : 4 }} />
                        )}
                      </Stack>
                    ))}
                  </Stack>
                )}

                {viewDetail === 'organizers' && event?.event_organizers && event?.event_organizers?.length > 0 && (
                  <Stack>
                    {event?.event_organizers.map((item: EventChild, index: number) => (
                      <Stack key={index}>
                        <EventChildCard eventChild={item} vertical={isMobile} />
                        {index < event?.event_organizers?.length - 1 && (
                          <Divider orientation="horizontal" flexItem sx={{ my: isMobile ? 2 : 4 }} />
                        )}
                      </Stack>
                    ))}
                  </Stack>
                )}
              </Stack>
              {!isMobile && <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />}

              {!isMobile && (
                <Stack flex={1} spacing={2}>
                  <Typography variant="h4" textAlign="justify">
                    {event?.title}
                  </Typography>
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
                      <Typography variant="body2" color="subtitle.main" mr={1}>
                        {locale === 'vi'
                          ? format(new Date(event?.start), "dd 'tháng' L uuuu", {
                              locale: viLocale,
                            })
                          : format(new Date(event?.start), 'd MMM uuuu')}
                      </Typography>
                      <Box
                        sx={{
                          width: '7px',
                          height: '7px',
                          borderRadius: '100%',
                          backgroundColor: '#67696E',
                        }}
                      />
                      <Typography variant="body2" color="subtitle.main">
                        {format(new Date(event?.start), 'HH:mm', {
                          locale: viLocale,
                        })}
                      </Typography>
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
                  <Stack direction="row" spacing={1} alignItems="flex-end">
                    <Image
                      src={
                        'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/User_733a86797b.png?updated_at=2022-10-25T06:56:56.323Z'
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
                      {`${
                        event?.fake_participant_num === null || event?.fake_participant_num === 0
                          ? event?.participant_num
                          : event?.fake_participant_num
                      }`}{' '}
                      {t('event.participants')}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="flex-end">
                    <Button
                      sx={{
                        textTransform: 'capitalize',
                        flex: '1',
                        color: 'primary.main',
                        backgroundColor: 'transparent',
                        borderRadius: '40px',
                      }}
                      onClick={handleCopyUrl}
                    >
                      {t('event.share')}
                    </Button>
                    <Button
                      onClick={handleOpenModalRegister}
                      disabled={registered}
                      sx={{
                        textTransform: 'capitalize',
                        flex: '1',
                        color: registered ? 'unactive.main' : '#FFFFFF',
                        backgroundColor: registered ? '#F1F1F1' : 'primary.main',
                        borderRadius: '40px',
                        '&:hover': {
                          color: '#FFFFFF',
                          backgroundColor: 'primary.main',
                          opacity: '0.9',
                        },
                      }}
                    >
                      {registered ? t('event.registered') : t('event.register')}
                    </Button>
                  </Stack>

                  {event?.images?.length > 0 && (
                    <Stack>
                      <Box
                        sx={{
                          overflow: 'hidden',
                          position: 'relative',
                          height: '100%',
                          paddingTop: '600px',
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
                          src={event?.images?.[1] ?? event?.images?.[0]}
                          alt="Hình ảnh"
                          layout="fill"
                          objectFit="contain"
                          objectPosition="center"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 60vw"
                          loading="lazy"
                        />
                      </Box>
                    </Stack>
                  )}
                </Stack>
              )}
            </Stack>
          </Stack>

          <RegisterEventForm
            onClose={handleCloseModalRegister}
            open={modalRegister}
            openAlertModal={openAlertModal}
            event={event}
            dataUser={dataUser && dataUser}
            handleSubmitRegisterEvent={handleSubmitRegisterEvent}
            handleCloseAlertModal={handleCloseAlertModal}
          />
        </Container>
      )}
    </>
  )
}

export default EventComingDetail
