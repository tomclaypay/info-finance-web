import useBanner, { BannerPosition } from '@app/hooks/useBanner'
import { Box } from '@mui/material'
import Image from 'next/image'
import { useMobile } from '../common'

const TopBrokerBanner = () => {
  const isMobile = useMobile()
  const { data } = useBanner({
    position: isMobile ? BannerPosition.ListTopMobile : BannerPosition.ListTopDesktop,
  })
  if (!data) {
    return null
  }
  return (
    <Box width={'100%'} mt={2}>
      <a href={data?.url?.[0]} target="_blank" rel="nofollow noreferrer">
        <Box position="relative" width={'100%'} paddingBottom={'18.75%'} height={0} overflow="hidden" mx={'auto'}>
          <Image
            alt="banner"
            layout="fill"
            src={data?.link?.[0]}
            objectFit="cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 60vw"
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
            loading="lazy"
          />
        </Box>
      </a>
    </Box>
  )
}

export default TopBrokerBanner
