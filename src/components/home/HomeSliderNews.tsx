import { Box, Container, Stack } from '@mui/material'
import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { useMobile } from '../common'

const Slider = dynamic(() => import('react-slick').then((m) => m.default), { ssr: false })
const LatestNewsItem = dynamic(() => import('../news/LatestNews-item').then((m) => m.default), { ssr: false })
const NextArrow = dynamic(() => import('./NextArrow').then((m) => m.default), { ssr: false })
const PrevArrow = dynamic(() => import('./PrevArrow').then((m) => m.default), { ssr: false })

interface HomeSliderNewsProps {
  data: any[]
}

const HomeSliderNews = React.memo(({ data }: HomeSliderNewsProps) => {
  const slidesToShow = 4
  const isMobile = useMobile()

  const sliderSettings = useMemo(
    () => ({
      nextArrow: isMobile ? <></> : <NextArrow slidesToShow={slidesToShow} />,
      prevArrow: isMobile ? <></> : <PrevArrow />,
      slidesToShow: isMobile ? 1 : slidesToShow,
      infinite: false,
      dots: isMobile,
      slidesToScroll: isMobile ? 1 : 4,
      lazyLoad: 'ondemand' as const,
    }),
    [isMobile]
  )

  return (
    <Container sx={{ p: '0 !important', height: 'auto' }}>
      <Stack
        sx={{
          borderRadius: '24px',
          position: 'relative',
        }}
      >
        <Slider {...sliderSettings}>
          {data?.map((item, index) => (
            <Box sx={{ height: '100%', padding: '4px' }} key={index}>
              <Stack sx={{ backgroundColor: '#FFFFFF', borderRadius: '16px', height: '100%' }}>
                <LatestNewsItem data={item} />
              </Stack>
            </Box>
          ))}
        </Slider>
      </Stack>
    </Container>
  )
})

HomeSliderNews.displayName = 'HomeSliderNews'

export default HomeSliderNews
