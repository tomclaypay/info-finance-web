import useBanner, { BannerPosition } from '@app/hooks/useBanner'
import { Box } from '@mui/material'
import Image from 'next/image'
import { useDesktop, useMobile } from '../common'
import { Stack } from '@mui/system'

const BrokerSidebarBanner = () => {
  const isMobile = useMobile()
  const isDesktop = useDesktop()
  const { data } = useBanner({
    position: isMobile ? BannerPosition.ListSidebarMobile : BannerPosition.ListSidebarDesktop,
  })
  if (!data) {
    return null
  }
  return (
    <Stack alignItems={'center'} py={6}>
      <a href={data?.url?.[0]} target="_blank" rel="nofollow noreferrer">
        <Box position="relative" width={isDesktop ? 270 : 254} height={0} paddingBottom={'150%'} overflow="hidden">
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
    </Stack>
  )
}

export default BrokerSidebarBanner
