import { EventChild } from '@app/interfaces/event'
import { Box, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useState } from 'react'

interface EventChildCardProps {
  eventChild: EventChild
  vertical?: boolean
}

const EventChildCard = ({ eventChild, vertical }: EventChildCardProps) => {
  const { t } = useTranslation('common')
  const [expand, setExpand] = useState(false)
  return (
    <Stack direction={vertical ? 'column' : 'row'} sx={{ width: '100%' }}>
      <Stack sx={{ flex: '1' }}>
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
          <Image src={eventChild?.images?.[0]} alt="icon" layout="fill" objectFit="contain" loading="lazy" />
        </Box>
      </Stack>

      <Stack sx={{ flex: '2', pl: vertical ? 0 : 2, pb: vertical ? 0 : 1 }} justifyContent="space-between">
        <Stack>
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
            {eventChild.name}
          </Typography>
          <Typography
            dangerouslySetInnerHTML={{
              __html: eventChild?.description,
            }}
            sx={{
              textAlign: 'justify',
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: expand ? 'none' : 3,
            }}
          />
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
            {!expand ? t('text.seeMore') : t('text.seeLess')}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default EventChildCard
