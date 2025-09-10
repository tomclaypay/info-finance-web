import { useMobile } from '@app/components/common'
import useBanner, { BannerPosition } from '@app/hooks/useBanner'
import { Stack } from '@mui/system'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const HomeLeftRightBanner = ({
  position,
  setLeftRightHome,
}: {
  position: 'left' | 'right'
  setLeftRightHome: (value: boolean) => void
}) => {
  const { data } = useBanner({
    position: position === 'left' ? BannerPosition.LeftHomeDesktop : BannerPosition.RightHomeDesktop,
  })
  const [isFixed, setIsFixed] = useState(false)
  const isMobile = useMobile()
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 610) {
        setIsFixed(true)
      } else {
        setIsFixed(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!data || !data.link?.[0] || isMobile) {
    setLeftRightHome(false)
    return null
  } else {
    setLeftRightHome(true)
  }

  return (
    <Stack
      sx={{
        top: isFixed ? '60px' : 0,
        position: isFixed ? 'fixed' : 'sticky',
        width: '150px',
        left: isFixed && position === 'left' ? 0 : 'auto',
        right: isFixed && position === 'right' ? 0 : 'auto',
        alignSelf: 'flex-start', // Đảm bảo không bị co lại
        height: 'calc(100vh - 20px)', // Đảm bảo vừa với viewport
      }}
    >
      <a href={data?.url?.[0] ?? ''} target="_blank" rel="nofollow noreferrer">
        <Image alt="banner" layout="fill" src={data?.link?.[0]} objectFit="cover" loading="lazy" />
      </a>
    </Stack>
  )
}

export default HomeLeftRightBanner
