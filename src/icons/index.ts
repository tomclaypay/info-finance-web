import dynamic from 'next/dynamic'
import { SVGProps } from 'react'
export const SearchHeaderIcon = dynamic<SVGProps<SVGSVGElement>>(() =>
  import('./searchHeaderIcon.svg').then((m) => m.default)
)
