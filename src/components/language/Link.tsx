/* eslint-disable jsx-a11y/anchor-has-content */
import { forwardRef, AnchorHTMLAttributes } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link'

interface NextLinkComposedProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    Omit<NextLinkProps, 'href' | 'as'> {
  to: NextLinkProps['href']
  linkAs?: NextLinkProps['as']
  href?: NextLinkProps['href']
}

export const NextLinkComposed = forwardRef<HTMLAnchorElement, NextLinkComposedProps>((props, ref) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { to, linkAs, href, replace, scroll, passHref, shallow, prefetch, locale, ...other } = props

  return (
    <NextLink
      href={to}
      prefetch={prefetch}
      as={linkAs}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref={passHref}
      locale={locale}
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <a ref={ref} {...other} />
    </NextLink>
  )
})

NextLinkComposed.displayName = 'NextLinkComposed'

export type LinkProps = {
  activeClassName?: string
  as?: NextLinkProps['as']
  href: NextLinkProps['href']
  noLinkStyle?: boolean
} & Omit<NextLinkComposedProps, 'to' | 'linkAs' | 'href'> &
  Omit<MuiLinkProps, 'href'>

// eslint-disable-next-line react/display-name
const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const {
    activeClassName = 'active',
    as: linkAs,
    className: classNameProps,
    href,
    noLinkStyle,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    role, // Link don't have roles.
    ...other
  } = props

  const router = useRouter()
  const pathname = typeof href === 'string' ? href : href.pathname
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  })

  const isExternal = typeof href === 'string' && (href.indexOf('http') === 0 || href.indexOf('mailto:') === 0)

  if (isExternal) {
    if (noLinkStyle) {
      return <a className={className} href={href as string} ref={ref as any} {...other} />
    }

    return <MuiLink className={className} href={href as string} ref={ref} {...other} />
  }

  if (noLinkStyle) {
    return <NextLinkComposed className={className} ref={ref as any} to={href} {...other} />
  }

  return <MuiLink component={NextLinkComposed} linkAs={linkAs} className={className} ref={ref} to={href} {...other} />
})

export default Link
