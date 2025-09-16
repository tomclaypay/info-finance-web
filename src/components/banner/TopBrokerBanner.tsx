import { Box, useMediaQuery, useTheme } from '@mui/material'
import Image from 'next/image'
import { Banner } from '@app/interfaces/banner'

const TopBrokerBanner = ({ dataListTopBanner }: { dataListTopBanner: Banner }) => {
  if (!dataListTopBanner) return null
  const src = dataListTopBanner?.link?.[0]
  const href = dataListTopBanner?.url?.[0]
  if (!src) return null

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box width="100%" mt={2}>
      <a
        href={href ?? '#'}
        target="_blank"
        rel="sponsored noopener noreferrer"
        style={{ display: 'block' }}
        aria-label="Top broker banner"
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            // cao hơn ở mobile để đỡ “dẹt” (ít viền đen hơn)
            aspectRatio: { xs: '16 / 5', sm: '16 / 4', md: '16 / 3' },
            minHeight: { xs: 120, sm: 140, md: 160 },
            overflow: 'hidden',
            mx: 'auto',
            bgcolor: 'black', // nền cho letterbox khi dùng contain
          }}
        >
          <Image
            alt="Top broker banner"
            src={src}
            fill
            sizes="100vw"
            priority
            fetchPriority="high"
            quality={85}
            style={{ objectFit: isMobile ? 'contain' : 'cover', objectPosition: 'center' }}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
          />
        </Box>
      </a>
    </Box>
  )
}

export default TopBrokerBanner
