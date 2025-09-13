import { Box, Link, Typography, Stack } from '@mui/material'
import NextLink from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import viLocale from 'date-fns/locale/vi'
import { Event, STATUS_OF_EVENT } from '@app/interfaces/event'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

interface EventHorizontalCardProps {
  event: Event
  ended?: boolean
  registered?: boolean
}

const EventHorizontalCard = ({ event, ended, registered }: EventHorizontalCardProps) => {
  const { t } = useTranslation('common')
  const { locale } = useRouter()
  return (
    <Stack direction="row" sx={{ width: '100%' }}>
      <Stack sx={{ flex: '1', border: '0.5px solid rgba(0,0,0,0.1)', borderRadius: '8px', position: 'relative' }}>
        {registered && (
          <Box
            px={2}
            py={0.5}
            sx={{
              zIndex: '10',
              position: 'absolute',
              top: 5,
              left: 10,
              backgroundColor: '#F4F8FF',
              borderRadius: '4px',
            }}
          >
            <Typography variant="body2" color="primary.main" fontWeight="500">
              {t('event.registered')}
            </Typography>
          </Box>
        )}
        <Box
          sx={{
            borderRadius: '8px',
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
              event?.images?.[0] ||
              'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Screenshot_2018_12_16_at_21_06_29_f07726afef.png?updated_at=2022-11-30T08:25:12.500Z'
            }
            alt="icon"
            layout="fill"
            objectFit="cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 60vw"
            loading="lazy"
          />
        </Box>
      </Stack>

      <Stack sx={{ flex: '2', pl: 2, pb: 1 }} justifyContent="space-between">
        <Stack>
          <Link component={NextLink} href={`/event`} passHref>
            <Typography
              variant="h3"
              sx={{
                color: 'text.main',
                textWrap: 'wrap',
                WebkitLineClamp: 2,
                display: '-webkit-box',
                overflow: 'hidden',
                WebkitBoxOrient: 'vertical',
                mt: 1,
              }}
            >
              {event.title}
            </Typography>
          </Link>

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
                  ? format(new Date(ended ? event.end : event.start), "dd 'tháng' L uuuu", {
                      locale: viLocale,
                    })
                  : format(new Date(ended ? event.end : event.start), 'd MMM uuuu')}
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
              <Typography variant="body2" color="subtitle.main">
                {format(new Date(ended ? event.end : event.start), 'HH:mm', {
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
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Stack
            sx={{
              backgroundColor: STATUS_OF_EVENT(event, 'background'),
              color: STATUS_OF_EVENT(event, 'color'),
              padding: '10px',
              borderRadius: '4px',
            }}
            justifyContent="center"
          >
            <Typography variant="button">{STATUS_OF_EVENT(event, 'text', locale)}</Typography>
          </Stack>

          <Link
            component={NextLink}
            href={`/${locale === 'vi' ? 'su-kien' : 'events'}/${event.slug}`}
            passHref
            sx={{
              color: 'primary.main',
              marginRight: '5px',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography variant="button" sx={{ mr: 1 }}>
              {t('event.detail')}
            </Typography>
            <Image
              src={
                'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Arrow_Right_18e705d65a.png?updated_at=2022-08-25T09:28:40.108Z'
              }
              alt="icon"
              width={20}
              height={20}
              loading="lazy"
            />
          </Link>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default EventHorizontalCard
