// components/FastImage.tsx  (TẠO MỚI) – <Image> tối ưu sẵn cho banner & thumbnail
import Image, { ImageProps } from 'next/image'

const shimmer = (w = 700, h = 475) =>
  `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <defs><linearGradient id="g"><stop stop-color="#eee" offset="20%"/><stop stop-color="#ddd" offset="50%"/><stop stop-color="#eee" offset="70%"/></linearGradient></defs>
    <rect width="${w}" height="${h}" fill="#eee"/><rect id="r" width="${w}" height="${h}" fill="url(#g)"/>
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1.2s" repeatCount="indefinite" />
  </svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str)

type Props = Omit<ImageProps, 'placeholder' | 'blurDataURL'> & {
  shimmerSize?: { w: number; h: number }
}

export default function FastImage({ shimmerSize, ...props }: Props) {
  const w = shimmerSize?.w ?? (typeof props.width === 'number' ? props.width : 700)
  const h = shimmerSize?.h ?? (typeof props.height === 'number' ? props.height : 475)

  return (
    <Image
      {...props}
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`}
      // Tối ưu decode & ưu tiên tải
      priority={props.priority}
      loading={props.priority ? 'eager' : 'lazy'}
      fetchPriority={props.priority ? 'high' : ('auto' as any)}
      decoding="async"
    />
  )
}
