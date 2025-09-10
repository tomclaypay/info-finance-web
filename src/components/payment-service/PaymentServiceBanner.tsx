import { useDesktop, useMobile } from '@app/components/common'
import useBanner, { BannerPosition } from '@app/hooks/useBanner'
import { Box, keyframes } from '@mui/material'
import Image from 'next/image'
import NextLink from 'next/link'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`
const PaymentServiceBanner = ({ scrollTo }: { scrollTo: () => void }) => {
  const isMobile = useMobile()
  const isDesktop = useDesktop()
  const { data } = useBanner({
    position: isMobile ? BannerPosition.PaymentServiceMobile : BannerPosition.PaymentServiceDesktop,
  })
  return (
    <Box
      sx={{
        display: 'block',
        width: '100%',
        height: isMobile ? '580px' : isDesktop ? '759px' : 'auto',
        paddingTop: 0,
        position: 'relative',
      }}
    >
      <NextLink href={data?.url?.[0] || ''}>
        <Image
          loading="lazy"
          alt="payment-service-banner"
          src={data?.link[0] || ''}
          layout="fill"
          objectFit="cover"
          quality={isMobile ? 65 : 70}
        />
      </NextLink>
      <Box
        sx={{
          position: 'absolute',
          color: 'white',
          height: '60px',
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ExpandMoreIcon
          sx={{
            width: '60px',
            height: '60px',
            animation: `${bounce} 1.5s infinite`,
            cursor: 'pointer',
          }}
          onClick={scrollTo}
        />
      </Box>
    </Box>
  )
}

export default PaymentServiceBanner
