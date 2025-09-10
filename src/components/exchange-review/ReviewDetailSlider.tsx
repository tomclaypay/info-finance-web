import { Box, Stack } from '@mui/material'
import Image from 'next/image'
import Carousel from 'react-material-ui-carousel'
interface ReviewDetailSliderProps {
  data: any
  isMobile?: boolean
}
const ReviewDetailSlider = ({ data, isMobile }: ReviewDetailSliderProps) => {
  return (
    <Stack
      sx={{
        backgroundColor: '#F4F8FF',
        overflow: 'hidden',
      }}
      pt={5}
      pb={isMobile ? 8 : 10}
      px={5}
    >
      <Carousel
        autoPlay={false}
        sx={{
          height: '100%',
          overflowX: 'hidden',
          overflow: 'visible',
        }}
        swipe
        cycleNavigation={isMobile ? true : false}
        animation="slide"
        navButtonsAlwaysVisible={isMobile ? false : true}
        // stopAutoPlayOnHover
        indicatorContainerProps={{
          style: {
            zIndex: '10',
            position: 'absolute',
            bottom: isMobile ? '-50px' : '-50px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'max-content',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        }}
        activeIndicatorIconButtonProps={{
          style: {
            backgroundColor: '#2A559C',
            borderColor: '#2A559C',
          },
        }}
        indicatorIconButtonProps={{
          style: {
            width: '15px',
            height: '15px',
            margin: '0 10px',
            border: '1px solid #000000',
            borderColor: '#000000',
            color: 'transparent',
          },
        }}
      >
        {data?.map((item: any, index: number) => (
          <Box
            key={index}
            sx={{
              overflow: 'hidden',
              position: 'relative',
              height: '100%',
              paddingTop: isMobile ? '90.25%' : '48.25%',
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
              src={item}
              alt="Hình ảnh"
              layout="fill"
              objectFit="contain"
              objectPosition="center"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 60vw"
              loading="lazy"
            />
          </Box>
        ))}
      </Carousel>
    </Stack>
  )
}

export default ReviewDetailSlider
