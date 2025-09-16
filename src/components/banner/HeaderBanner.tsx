import React, { useContext, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Box } from '@mui/material'
import { useDesktop, useMobile } from '../common'
import { BannerContext } from '@app/contexts/bannerContext'

/** Link thông minh: chỉ render <a> khi có href, nội bộ dùng <Link>, bên ngoài mở tab mới + sponsored */
function SmartLink({ href, label, children }: { href?: string | null; label?: string; children: React.ReactNode }) {
  if (!href) return <div aria-label={label}>{children}</div>

  const isExternal = /^https?:\/\//i.test(href) || href.startsWith('//')
  const rel = isExternal ? 'sponsored noopener noreferrer' : undefined

  return isExternal ? (
    <a href={href} target="_blank" rel={rel} aria-label={label}>
      {children}
    </a>
  ) : (
    <Link href={href} aria-label={label} prefetch>
      {children}
    </Link>
  )
}

const HeaderBanner: React.FC = () => {
  const isMobile = useMobile()
  const isDesktop = useDesktop()
  const { banner } = useContext(BannerContext)

  const bannerStyles = useMemo(
    () => ({
      wrapper: {
        py: isDesktop && banner ? 2 : 0,
        width: '100%',
        maxWidth: isDesktop ? 1356 : isMobile ? 425 : 512,
        mx: 'auto',
      },
      imageContainer: {
        position: 'relative' as const,
        width: '100%',
        // giữ tỉ lệ khung, tránh CLS
        paddingTop: '12.5%',
      },
    }),
    [isDesktop, isMobile, banner]
  )

  // ảnh & link từ nhiều key khả dĩ
  const imageUrl = useMemo(() => banner?.link?.[0] ?? banner?.image_url ?? banner?.image?.url ?? '', [banner])

  const href = useMemo(() => {
    const raw = banner?.url?.[0] ?? banner?.href?.[0] ?? banner?.target_url?.[0] ?? banner?.url ?? banner?.href ?? null
    return typeof raw === 'string' && raw.trim() ? raw : null
  }, [banner])

  const alt = useMemo(() => banner?.alt?.[0] ?? banner?.title?.[0] ?? 'Header banner', [banner])

  if (!banner || !imageUrl) return null

  return (
    <Box sx={bannerStyles.wrapper}>
      <SmartLink href={href} label={alt}>
        <Box sx={bannerStyles.imageContainer}>
          <Image
            alt={alt}
            src={imageUrl}
            fill // Next 13+; nếu Next 12 dùng layout="fill"
            style={{ objectFit: 'contain' }}
            priority
            quality={isMobile ? 80 : 85}
            sizes={isMobile ? '425px' : '(max-width: 768px) 768px, 1356px'}
            fetchPriority="high"
          />
        </Box>
      </SmartLink>
    </Box>
  )
}

export default React.memo(HeaderBanner)
