import { Box, Link, Stack } from '@mui/material'
import Image from 'next/image'
import NextLink from 'next/link'
import { useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import { useMobile } from '../common'

interface HomeSupportImageProps {
  data?: { img: string; link: string }[]
}

export const HomeSupportImage = ({ data }: HomeSupportImageProps) => {
  const isMobile = useMobile()
  const [margin, setMargin] = useState('0 50px 0 -40px')

  const handleSwipe = (now?: number, previous?: number) => {
    if (now - previous == 1 || now - previous == -2) {
      setMargin('0 -40px 0 50px')
    } else setMargin('0 50px 0 -40px')
  }

  return isMobile ? (
    <Box my={7}>
      <Carousel
        autoPlay={false}
        sx={{
          height: '220px',
        }}
        swipe
        animation="slide"
        indicators={false}
        onChange={handleSwipe}
      >
        {data?.map((item, index) => (
          <Box
            key={index}
            sx={{
              overflow: 'hidden',
              position: 'relative',
              height: '100%',
              margin: margin,
              paddingTop: '56.25%',
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
              loading="lazy"
              src={item.img}
              alt="Hình ảnh"
              layout="fill"
              objectFit="contain"
              objectPosition="center"
            />
          </Box>
        ))}
      </Carousel>
    </Box>
  ) : (
    <Stack py={10} direction="row" justifyContent="space-between" spacing={2}>
      {data?.map((item: any, index: number) => (
        <Stack key={index} sx={{ flex: '1' }}>
          <Box
            key={index}
            sx={{
              overflow: 'hidden',
              position: 'relative',
              width: '100%',
              paddingTop: '56.25%',
              flex: '1',
              '& > span': {
                position: 'absolute!important',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              },
            }}
          >
            <NextLink href={item.link} passHref key={item.link}>
              <Link target="_blank">
                <Image loading="lazy" src={item.img} alt="Hình ảnh" layout="fill" objectFit="cover" />
              </Link>
            </NextLink>
          </Box>
        </Stack>
      ))}
    </Stack>
  )
}
