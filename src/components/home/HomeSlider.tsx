import React, { useMemo, useContext } from 'react'
import Image from 'next/image'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useMobile } from '../common'
import { BannerContext } from '@app/contexts/bannerContext'

const Carousel = dynamic(() => import('react-material-ui-carousel').then((m) => m.default), {
  ssr: false,
  loading: () => <Box sx={{ height: '120px', backgroundColor: 'grey.200' }} />,
})

interface HomeSliderProps {
  banners: any[]
}

const HomeSlider = React.memo(({ banners }: HomeSliderProps) => {
  const { locale } = useRouter()
  const isMobile = useMobile()
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))
  const { banner: headerBanner } = useContext(BannerContext)

  const banner = useMemo(() => {
    return locale === 'en'
      ? banners?.find((item) => item.language === 'en')
      : banners?.find((item) => item.language === 'vn')
  }, [banners, locale])

  if (!banner || !banner.link || banner.link.length === 0) {
    return null
  }

  const indicatorStyles = {
    indicator: {
      width: 8,
      height: 8,
      margin: '0 4px',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      borderRadius: '50%',
      transition: 'all 0.3s',
    },
    activeIndicator: {
      width: 16,
      backgroundColor: 'white',
    },
  }

  return (
    <Box
      sx={{
        height: isDesktop ? '520px' : isMobile ? '145px' : 'auto',
        mt: !headerBanner ? 4 : isDesktop ? '220px' : '80px',
      }}
    >
      <Carousel
        interval={5000}
        animation="slide"
        indicators={true}
        autoPlay={true}
        indicatorContainerProps={{
          style: {
            position: 'absolute',
            bottom: isDesktop ? '100px' : '00px',
            zIndex: 1,
            textAlign: 'center',
            width: '100%',
          },
        }}
        indicatorIconButtonProps={{
          style: {
            ...indicatorStyles.indicator,
          },
        }}
        activeIndicatorIconButtonProps={{
          style: {
            ...indicatorStyles.indicator,
            ...indicatorStyles.activeIndicator,
          },
        }}
        navButtonsAlwaysInvisible={isMobile}
        sx={{ height: '100%' }}
      >
        {banner.link.map((item: string, index: number) => (
          <Box
            key={index}
            component="a"
            href={banner.url?.[index] || ''}
            rel="noreferrer"
            target="_blank"
            sx={{
              display: 'block',
              position: 'relative',
              width: '100%',
              paddingTop: isMobile ? '29.25%' : '31.00%',
              // height: '100%',
            }}
          >
            <Image
              src={item}
              alt={`home-slider-${index}`}
              fill
              style={{ objectFit: 'contain' }}
              priority={index < 2}
              loading={index < 2 ? 'eager' : 'lazy'}
              quality={isMobile ? 65 : 70}
              sizes={isMobile ? '80vw' : '(max-width: 768px) 768px, 70vw'}
            />
          </Box>
        ))}
      </Carousel>
    </Box>
  )
})

HomeSlider.displayName = 'HomeSlider'

export default HomeSlider
