import useBanner, { BannerPosition } from '@app/hooks/useBanner'
import { Box } from '@mui/material'
import Image from 'next/image'
import { useDesktop, useMobile } from '../common'
import { Stack } from '@mui/system'

const ReviewBanner = () => {
  const isMobile = useMobile()
  const isDesktop = useDesktop()
  const { data } = useBanner({
    position: isMobile ? BannerPosition.ComplaintSidebarMobile : BannerPosition.ComplaintSidebarDesktop,
  })

  if (!data) {
    return null
  }
  return (
    <Stack py={6} alignItems={'center'}>
      <a href={data?.url?.[0]} target="_blank" rel="nofollow noreferrer">
        <Box position="relative" width={isDesktop ? 358 : 254} paddingTop={'150%'} height={0} overflow="hidden" mt={4}>
          <Image
            alt="banner"
            layout="fill"
            src={data?.link?.[0]}
            objectFit="cover"
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
          />
        </Box>
      </a>
    </Stack>
  )
}

export default ReviewBanner
