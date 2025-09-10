import useBanner, { BannerPosition } from '@app/hooks/useBanner'
import { Box, Container, Grid } from '@mui/material'
import Image from 'next/image'
import { useDesktop, useMobile } from '../common'

const HomeSmallBanner = () => {
  const isMobile = useMobile()
  const isDesktop = useDesktop()
  const { data } = useBanner({ position: isMobile ? BannerPosition.SmallHomeMobile : BannerPosition.SmallHomeDesktop })

  if (!data) {
    return null
  }
  return (
    <Container>
      <Grid container justifyContent="center" mb={8} spacing={[4, 2]} alignItems="center">
        {data?.link?.map((url: string, index: number) => (
          <Grid
            item
            key={index}
            md={4}
            sm={4}
            xs={12}
            justifyContent="center"
            width={isDesktop ? '430px' : isMobile ? '327px' : '218px'}
          >
            <a
              href={data?.url?.[0]}
              target="_blank"
              rel="nofollow noreferrer"
              style={{ display: 'block', width: '100%' }}
            >
              <Box
                position="relative"
                height={0}
                paddingBottom={'56.25%'}
                width={isDesktop ? '430px' : isMobile ? '327px' : '218px'}
                borderRadius="8px"
                overflow="hidden"
                mx={'auto'}
              >
                <Image
                  alt="banner"
                  layout="fill"
                  src={url}
                  objectFit="cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  loading="lazy"
                />
              </Box>
            </a>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default HomeSmallBanner
