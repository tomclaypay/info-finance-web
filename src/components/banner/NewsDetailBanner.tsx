import useBanner, { BannerPosition } from '@app/hooks/useBanner'
import { Box } from '@mui/material'
import Image from 'next/image'
import { useDesktop, useMobile } from '../common'

interface NewsDetailBannerProps {
  image_url_desktop?: string | undefined
  image_url_mobile?: string | undefined

  link_desktop?: string | undefined
  link_mobile?: string | undefined
}

const NewsDetailBanner = (props: NewsDetailBannerProps) => {
  const isMobile = useMobile()
  const isDesktop = useDesktop()
  const { data } = useBanner({
    position: isMobile ? BannerPosition.ArticleDetailMobile : BannerPosition.ArticleDetailDesktop,
  })
  const link = isMobile ? props?.link_mobile : props.link_desktop
  const image_url = isMobile ? props?.image_url_mobile : props?.image_url_desktop

  if (!data) {
    return null
  }
  return (
    <Box width={isDesktop ? '314px' : '254px'} mx="auto">
      <a href={link || data?.url?.[0]} target="_blank" rel="nofollow noreferrer">
        <Box
          position="relative"
          width={isDesktop ? '314px' : '254px'}
          height={0}
          paddingBottom={'150%'}
          overflow="hidden"
          my={6}
          mx="auto"
        >
          <Image
            alt="banner"
            layout="fill"
            src={image_url || data?.link?.[0]}
            objectFit="cover"
            sizes="(max-width: 768px) 100vw, 60vw"
            loading="lazy"
          />
        </Box>
      </a>
    </Box>
  )
}

export default NewsDetailBanner
