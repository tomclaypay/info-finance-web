import { useQuery } from '@apollo/client'
import { BannersListResponse } from '@app/interfaces/banner'
import GET_BANNERS from '@app/operations/queries/banners/get-banners'
import { Box } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useMobile } from '../common'
import { useMemo } from 'react'

const ReviewHero = () => {
  const { locale } = useRouter()
  const isMobile = useMobile()

  const { data: bannerData } = useQuery<BannersListResponse>(GET_BANNERS, {
    variables: {
      positionContain: `%complaint%`,
    },
  })
  const banner = useMemo(() => {
    return locale === 'en'
      ? bannerData?.banners?.find((item) => item.language === 'en')
      : bannerData?.banners?.find((item) => item.language === 'vn')
  }, [bannerData, locale])

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: isMobile ? 0 : '450px',
        height: 'max-content',
      }}
    >
      <Box
        rel="noreferrer"
        target="_blank"
        component="a"
        href={banner?.url}
        sx={{
          display: 'block',
          overflow: 'hidden',
          position: 'relative',
          height: '100%',
          paddingTop: '30.25%',
          '& > span': {
            position: 'absolute!important',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
        }}
      >
        {banner?.link?.map((item: string, index: number) => (
          <Image
            key={index}
            src={item}
            alt="Hình ảnh"
            layout="fill"
            objectFit="contain"
            objectPosition="center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 60vw"
            loading="lazy"
          />
        ))}
      </Box>
    </Box>
  )
}

export default ReviewHero
