// src/styles/fonts.ts
import { Montserrat, Roboto, Roboto_Mono, Roboto_Slab } from 'next/font/google'

export const montserrat = Montserrat({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
  preload: true,
  variable: '--font-montserrat',
})

export const roboto = Roboto({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  preload: true,
  variable: '--font-roboto',
})

export const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  preload: true,
  variable: '--font-roboto-mono',
})

export const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  preload: true,
  variable: '--font-roboto-slab',
})
