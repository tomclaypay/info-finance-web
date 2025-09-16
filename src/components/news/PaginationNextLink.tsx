/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import React from 'react'
import Link from 'next/link'
import { PaginationItemProps } from '@mui/lab'

const PaginationNextLink = ({
  children,
  href,
  rel,
  ...props
}: {
  href: string
  rel?: string
} & PaginationItemProps) => (
  <Link href={href}>
    <p {...(rel && { rel })} {...props}>
      {children}
    </p>
  </Link>
)

export default PaginationNextLink
