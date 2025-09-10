import React from 'react'
import { Box, Link, Stack, Typography } from '@mui/material'
import { Event } from '@app/interfaces/event'
import EventVerticalCard from '../events/card/EventVerticalCard'
import Slider from 'react-slick'
import { Container } from '@mui/system'
import NextLink from 'next/link'
import Image from 'next/image'
import { useMobile } from '../common'
import { useTranslation } from 'next-i18next'
import NextArrow from './NextArrow'
import PrevArrow from './PrevArrow'
import { useRouter } from 'next/router'

interface HomeSliderEventsProps {
  endEvent: Event[]
  registeredEvents?: Event[]
}
const HomeSliderEvents = ({ endEvent }: HomeSliderEventsProps) => {
  const { t } = useTranslation('home-page')
  const { locale } = useRouter()
  const isMobile = useMobile()
  const slidesToShow = 4

  return (
    <Container sx={{ px: '0 !important' }}>
      <Stack direction={'row'} alignItems={'center'} sx={{ mb: 3 }} justifyContent={'space-between'} spacing={1}>
        <Typography
          variant="h2"
          sx={{
            width: '100%',
            px: 2,
          }}
        >
          {t(`event.title`)}
        </Typography>
        <NextLink href={`/${locale === 'vi' ? 'su-kien' : 'event'}`} passHref>
          <Link
            sx={{
              width: '100%',
              color: 'primary.main',
              marginRight: '5px',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'end',
            }}
          >
            <Typography variant="button" sx={{ mr: 1 }}>
              {t('see-more')}
            </Typography>
            <Image
              src={
                'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Arrow_Right_18e705d65a.png?updated_at=2022-08-25T09:28:40.108Z'
              }
              alt="icon"
              width={24}
              height={24}
              loading="lazy"
            />
          </Link>
        </NextLink>
      </Stack>
      <Stack>
        <Slider
          nextArrow={isMobile ? <></> : <NextArrow slidesToShow={slidesToShow} />}
          prevArrow={isMobile ? <></> : <PrevArrow />}
          slidesToShow={isMobile ? 1 : slidesToShow}
          infinite={false}
          dots={isMobile ? true : false}
          slidesToScroll={isMobile ? 1 : 4}
        >
          {endEvent?.map((item, index) => (
            <Box key={index} pl={index === 0 || index === 4 ? 3 : 0} px={1} py={2}>
              <EventVerticalCard event={item} hasStatus />
            </Box>
          ))}
        </Slider>
      </Stack>
    </Container>
  )
}
export default HomeSliderEvents
