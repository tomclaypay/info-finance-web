import useBanner, { BannerPosition } from '@app/hooks/useBanner'
import { Box } from '@mui/material'
import Image from 'next/image'
import { useDesktop, useMobile } from '../common'
import { Banner } from '@app/operations/queries/banners/home-banners'

const HomeMiddleBanner = ({ dataBanner }: { dataBanner: Banner[] }) => {
  const isDesktop = useDesktop()
  if (!dataBanner[0]) {
    return null
  }
  return (
    <Box width={isDesktop ? '100%' : 512} mx="auto">
      <a href={dataBanner[0]?.url?.[0]} target="_blank" rel="nofollow noreferrer">
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
            src={dataBanner[0]?.link?.[0]}
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
