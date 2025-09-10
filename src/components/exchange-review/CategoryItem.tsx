import { Box, Button, Stack, Typography } from '@mui/material'
import { format } from 'date-fns'
import NextLink from 'next/link'

import Image from 'next/image'
import ReviewId from './ReviewId'
import { useRouter } from 'next/router'
interface ReviewCategoryProps {
  data: any
  isMobile?: boolean
}
const CategoryItem = ({ data, isMobile }: ReviewCategoryProps) => {
  const router = useRouter()
  const id = ((data.id || '') as string).split('-')

  return (
    <NextLink href={`/${router.locale === 'vi' ? 'danh-gia-san' : 'exchange-review'}/${data?.slug}`} passHref>
      <Box
        sx={{
          p: isMobile ? '16px' : '24px',
          borderRadius: '8px',
          border: '1px solid #d0d0d0',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '16px',
          minHeight: !isMobile && '220px',
          justifyContent: 'space-between',
        }}
      >
        {isMobile && data.images?.length > 0 && (
          <Stack sx={{ position: 'relative', borderRadius: '8px', width: '100%', height: '220px', overflow: 'hidden' }}>
            {data.images[0] && <Image src={data.images[0]} alt="Hình ảnh" layout="fill" objectFit={'cover'} />}
          </Stack>
        )}
        <Stack sx={{ justifyContent: 'space-between', pr: isMobile ? 0 : 2 }}>
          <Stack spacing={1}>
            <Stack direction="row" sx={{ alignItems: 'center' }} spacing={1}>
              <ReviewId idSplitted={id} />
              <Typography>•</Typography>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                {data?.exchange?.logo && (
                  <Image loading="lazy" src={data?.exchange?.logo} alt="image of user" width={42} height={32} />
                )}
                <Typography fontSize={16} lineHeight="19px">
                  {data?.exchange?.name}
                </Typography>
              </Stack>
            </Stack>
            <Typography variant="h3">{data?.title}</Typography>

            <Typography
              dangerouslySetInnerHTML={{
                __html: data?.description,
              }}
              sx={{
                maxWidth: '320px',
                WebkitLineClamp: 3,
                display: '-webkit-box',
                overflow: 'hidden',
                WebkitBoxOrient: 'vertical',
              }}
            />
          </Stack>

          <Stack
            sx={{
              gap: isMobile ? '24px' : '16px',
              alignItems: isMobile ? 'start' : 'center',
              flexDirection: isMobile ? 'column' : 'row',
            }}
          >
            <Typography variant="subtitle2" sx={{ color: 'subtitle.main' }} fontWeight={500}>
              {format(new Date(data.createdAt), 'dd/MM/yyyy')}
            </Typography>
          </Stack>
        </Stack>
        {!isMobile && (
          <Stack sx={{ position: 'relative', minWidth: '{300}' }}>
            <Stack sx={{ borderRadius: '8px', overflow: 'hidden' }}>
              {data.images?.length > 0 && data.images[0] && (
                <Image
                  src={data.images[0]}
                  alt="Hình ảnh"
                  width="200px"
                  height={300}
                  objectFit="scale-down"
                  objectPosition="center"
                  loading="lazy"
                />
              )}
            </Stack>
            {data.status === 'resolved' && (
              <Stack sx={{ position: 'absolute', transform: 'rotate(20deg)', right: '-10px', top: '5px' }}>
                <Image
                  src="https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Untitled_c79bfe0f29.png?updated_at=2022-08-29T03:08:07.937Z"
                  alt="Hình ảnh"
                  width="115px"
                  height="36px"
                  loading="lazy"
                />
              </Stack>
            )}
          </Stack>
        )}
      </Box>
      {/* )} */}
    </NextLink>
  )
}

export default CategoryItem
