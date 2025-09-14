// middleware.ts
import {NextResponse, type NextRequest} from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'

const locales = ['vi', 'en'] as const
const defaultLocale = 'vi'

// 1) i18n middleware (tự thêm prefix locale, detect theo Accept-Language)
const intl = createIntlMiddleware({
  locales: [...locales],
  defaultLocale,
  localeDetection: true
})

// 2) Danh sách path bỏ qua kiểm tra bảo trì
const excludedPaths = [
  '/_next',
  '/favicon.ico',
  '/maintenance',
  '/authentication/login',
  '/dashboard',
  '/static',
]

const maintenanceMode = false

export default function middleware(req: NextRequest) {
  // Chạy i18n trước để URL luôn có prefix locale nhất quán
  const intlResponse = intl(req)
  // Nếu i18n đã yêu cầu redirect (thêm prefix locale), trả luôn
  if (intlResponse) {
    // next-intl trả NextResponse hoặc undefined; nếu là redirect thì đã đủ
    if (intlResponse.headers.get('Location')) return intlResponse
  }

  // Lấy locale hiện tại từ path sau khi i18n xử lý
  const segments = req.nextUrl.pathname.split('/').filter(Boolean)
  const maybeLocale = segments[0]
  const hasLocale = locales.includes(maybeLocale as any)
  const localePrefix = hasLocale ? `/${maybeLocale}` : `/${defaultLocale}`

  // 3) Maintenance redirect (nhưng bỏ qua asset/static)
  const isExcluded = excludedPaths.some((p) =>
    req.nextUrl.pathname.startsWith(p)
  )

  if (maintenanceMode && !isExcluded) {
    const url = req.nextUrl.clone()
    url.pathname = `${localePrefix}/maintenance`
    return NextResponse.redirect(url)
  }

  // Không redirect gì thêm
  return NextResponse.next()
}

// 4) Matcher: áp cho tất cả route app, tránh asset/_next
export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
}
