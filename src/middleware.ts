// middleware.ts
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// Locale đang dùng trong app
const locales = ['vi', 'en'] as const
const defaultLocale = 'vi'

// Bật/tắt chế độ bảo trì
const maintenanceMode = false

// Các prefix cần bỏ qua (asset/API/static pages)
const excludedPrefixes = [
  '/_next',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
  '/manifest.json',
  '/maintenance',
  '/authentication/login',
  '/dashboard',
  '/static',
  '/api',
]

function isExcluded(pathname: string) {
  return excludedPrefixes.some((p) => pathname.startsWith(p))
}

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl

  // 1) Bỏ qua asset/API
  if (isExcluded(pathname)) return NextResponse.next()

  // 2) Đảm bảo có prefix locale (mặc định /vi)
  const segs = pathname.split('/').filter(Boolean)
  const hasLocale = segs.length > 0 && (locales as readonly string[]).includes(segs[0] as any)

  if (!hasLocale) {
    const url = req.nextUrl.clone()
    url.pathname = `/${defaultLocale}${pathname}`
    url.search = search // giữ nguyên query string
    return NextResponse.redirect(url)
  }

  // 3) Maintenance redirect (giữ đúng locale hiện tại)
  if (maintenanceMode) {
    const locale = segs[0]
    if (pathname !== `/${locale}/maintenance`) {
      const url = req.nextUrl.clone()
      url.pathname = `/${locale}/maintenance`
      return NextResponse.redirect(url)
    }
  }

  // 4) Cho qua bình thường
  return NextResponse.next()
}

// Matcher: áp cho tất cả route app, trừ asset/file tĩnh
export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
}
