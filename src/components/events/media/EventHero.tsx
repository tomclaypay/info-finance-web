import Image from 'next/image'
import { Box } from '@mui/material'
import { useMobile } from '@app/components/common'

const EventHero = () => {
  const isMobile = useMobile()
  return (
    <Box>
      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          paddingTop: isMobile ? '107.25%' : '24.25%',
          '& > span': {
            position: 'absolute!important',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
        }}
      >
        <Image
          src={
            isMobile
              ? 'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Rectangle_168_cc8182ffbf.png?updated_at=2022-12-30T03:24:00.619Z'
              : 'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Rectangle_168_af5ce68b2b.jpg?updated_at=2022-10-20T11:02:57.802Z'
          }
          alt="Hình ảnh"
          layout="fill"
          objectFit="contain"
          objectPosition="center"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 60vw"
          loading="lazy"
        />
      </Box>
    </Box>
  )
}

export default EventHero
