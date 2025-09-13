import { Box, Link, Typography, Stack } from '@mui/material'
import NextLink from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import viLocale from 'date-fns/locale/vi'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

interface EventCardProps {
  event: any
}

const EventCard = ({ event }: EventCardProps) => {
  const { t } = useTranslation('common')
  const { locale } = useRouter()
  return (
    <Stack spacing={2}>
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
          src={event.images?.[0]}
          alt="icon"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 60vw"
          loading="lazy"
        />
      </Box>

      <Stack direction="row" spacing={1} alignItems="flex-end">
        <CalendarMonthOutlinedIcon sx={{ color: '#67696E' }} />
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body2" textAlign="center" color="subtitle.main" mr={1}>
            {locale === 'vi'
              ? format(new Date(event?.start), "dd 'tháng' L uuuu", {
                  locale: viLocale,
                })
              : format(new Date(event?.start), 'd MMM uuuu')}
          </Typography>
          <Image
            src={
              'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/dot_Blur_485642392c.png?updated_at=2022-08-25T09:27:29.672Z'
            }
            alt="icon"
            width={6}
            height={7}
            loading="lazy"
          />
          <Typography variant="body2" color="subtitle.main">
            {format(new Date(event?.start), 'HH:mm', {
              locale: viLocale,
            })}
          </Typography>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={1} alignItems="flex-end">
        <LocationOnOutlinedIcon sx={{ color: '#67696E' }} />
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography
            variant="body2"
            textAlign="center"
            color="subtitle.main"
            mr={1}
            sx={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 1,
              // pr: 5,
            }}
          >
            {event?.location}
          </Typography>
        </Stack>
      </Stack>

      <Typography
        variant="subtitle2"
        sx={{
          display: '-webkit-box',
          overflow: 'hidden',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
          height: '60px',
          // pr: 5,
        }}
      >
        {event?.title}
      </Typography>

      <Link
        component={NextLink}
        href={`/${locale === 'vi' ? 'su-kien' : 'events'}`}
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
  )
}

export default EventCard
