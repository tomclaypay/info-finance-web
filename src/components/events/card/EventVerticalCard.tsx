import { Box, Link, Typography, Stack } from '@mui/material'
import NextLink from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import viLocale from 'date-fns/locale/vi'
import { Event, STATUS_OF_EVENT } from '@app/interfaces/event'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import logoInfo from 'public/static/notFoundImage.png'

interface EventVerticalCardProps {
  event: Event
  ended?: boolean
  registered?: boolean
  hasStatus?: boolean
}

const EventVerticalCard = ({ event, ended, registered, hasStatus }: EventVerticalCardProps) => {
  const { t } = useTranslation('common')
  const { locale } = useRouter()

  return (
    <Stack
      spacing={1}
      sx={{
        height: '100%',
        position: 'relative',
      }}
    >
      {hasStatus && (
        <Stack
          sx={{
            position: 'absolute',
            zIndex: 10,
            top: 30,
            left: 25,
            backgroundColor: STATUS_OF_EVENT(event, 'background'),
            color: STATUS_OF_EVENT(event, 'color'),
            padding: '5px',
            borderRadius: '4px',
          }}
          justifyContent="center"
        >
          <Typography variant="button">{STATUS_OF_EVENT(event, 'text', locale)}</Typography>
        </Stack>
      )}
      <Stack
        sx={{
          border: '0.5px solid rgba(0,0,0,0.1)',
          borderRadius: '8px',
          position: 'relative',
        }}
      >
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
            src={event?.images?.[0] || logoInfo}
            alt="icon"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 60vw"
            loading="lazy"
          />
        </Box>
      </Stack>

      <Typography
        variant="subtitle2"
        sx={{
          display: '-webkit-box',
          overflow: 'hidden',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
          fontSize: '16px',
          fontWeight: 700,
          height: '52px',
        }}
      >
        {event?.title}
      </Typography>
      <Stack spacing={1} justifyContent="flex-start" flex={1}>
        <Stack direction="row" spacing={1} alignItems="flex-end">
          <Image
            src={
              'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Time_c16fcecd3c.png?updated_at=2022-11-21T02:53:00.756Z'
            }
            alt="icon"
            width={24}
            height={24}
            loading="lazy"
          />

          <Typography variant="body2" color="subtitle.main">
            {event?.end || event.start
              ? format(new Date(ended ? event?.end ?? null : event?.start ?? null), 'HH:mm', {
                  locale: viLocale,
                })
              : '-'}
          </Typography>
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
          <Typography variant="body2" color="subtitle.main">
            {event?.end || event.start
              ? locale === 'vi'
                ? format(new Date(ended ? event?.end ?? null : event?.start ?? null), "dd 'tháng' L uuuu", {
                    locale: viLocale,
                  })
                : format(new Date(ended ? event?.end ?? null : event?.start ?? null), 'd MMM uuuu')
              : '-'}
          </Typography>
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
            {event?.location ?? '-'}
          </Typography>
        </Stack>

        {event?.slug && (
          <Stack direction="row" justifyContent="space-between">
            <NextLink href={`/${locale === 'vi' ? 'su-kien' : 'events'}/${event?.slug}`} passHref>
              <Link
                sx={{
                  color: 'primary.main',
                  marginRight: '5px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography variant="button" sx={{ mr: 1, fontSize: '15px' }}>
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
            </NextLink>
          </Stack>
        )}
      </Stack>
    </Stack>
  )
}

export default EventVerticalCard
