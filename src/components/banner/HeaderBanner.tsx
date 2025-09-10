import React, { useContext, useMemo } from 'react'
import Image from 'next/image'
import { Box } from '@mui/material'
import { useDesktop, useMobile } from '../common'
import { BannerContext } from '@app/contexts/bannerContext'

const HeaderBanner: React.FC = () => {
  const isMobile = useMobile()
  const isDesktop = useDesktop()
  const { banner } = useContext(BannerContext)

  const bannerStyles = useMemo(
    () => ({
      wrapper: {
        py: isDesktop && banner ? 2 : 0,
        width: '100%',
        maxWidth: isDesktop ? 1356 : isMobile ? 425 : 512,
        mx: 'auto',
      },
      imageContainer: {
        position: 'relative',
        width: '100%',
        paddingTop: '12.5%', // Maintain aspect ratio
      },
    }),
    [isDesktop, isMobile, banner]
  )

  const imageUrl = useMemo(() => banner?.link?.[0] || '', [banner])

  if (!banner || !imageUrl) {
    return null
  }

  return (
    <Box sx={bannerStyles.wrapper}>
      <a href={banner.url?.[0]} target="_blank" rel="nofollow noreferrer">
        <Box sx={bannerStyles.imageContainer}>
          <Image
            alt="banner"
            src={imageUrl}
            layout="fill"
            objectFit="contain"
            priority
            quality={isMobile ? 80 : 85}
            sizes={isMobile ? '425px' : '(max-width: 768px) 768px, 1356px'}
            loading="eager"
          />
        </Box>
      </a>
    </Box>
  )
}

export default React.memo(HeaderBanner)
