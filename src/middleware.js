import { NextResponse } from 'next/server'

export function middleware(request) {
  const maintenanceMode = false

  const excludedPaths = [
    '/_next',
    '/_next/data',
    '/_next/image',
    '/_next/static',
    '/favicon.ico',
    '/maintenance',
    '/authentication/login',
    '/dashboard',
    '/static',
  ]

  if (maintenanceMode && !excludedPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    const url = request.nextUrl.clone()
    url.pathname = '/maintenance'
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}
