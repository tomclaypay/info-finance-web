import useBanner, { BannerPosition } from '@app/hooks/useBanner'
import { Box } from '@mui/material'
import Image from 'next/image'
import { useDesktop, useMobile } from '../common'

const HomeMiddleBanner = () => {
  const isMobile = useMobile()
  const isDesktop = useDesktop()
  const { data } = useBanner({ position: isMobile ? BannerPosition.HomeMobile : BannerPosition.HomeDesktop })
  if (!data) {
    return null
  }
  return (
    <Box width={isDesktop ? '100%' : 512} mx="auto">
      <a href={data?.url?.[0]} target="_blank" rel="nofollow noreferrer">
        <Box
          position="relative"
          height={0}
          // maxWidth={{ xs: '100%', sm: '100%', md: '900px', lg: '1200px', xl: '1400px' }}
          width={isDesktop ? '100%' : 512}
          paddingBottom={'12.5%'}
          mt={[3, 8]}
          mx={'auto'}
        >
          <Image
            alt="banner"
            layout="fill"
            src={data?.link?.[0]}
            objectFit="cover"
            sizes="(max-width: 768px) 100vw, 60vw"
            loading="lazy"
          />
        </Box>
      </a>
    </Box>
  )
}

export default HomeMiddleBanner
