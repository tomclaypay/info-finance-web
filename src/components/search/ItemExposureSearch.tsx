import React from 'react'
import { Button, Stack, Typography } from '@mui/material'
import { format } from 'date-fns'
import NextLink from 'next/link'
import Image from 'next/image'
import { useMobile } from '../common'
import ReviewId from '../exchange-review/ReviewId'
import { Container } from '@mui/system'
import { useRouter } from 'next/router'

const ItemReviewSearch = ({ data }: any) => {
  const isMobile = useMobile()
  const { locale } = useRouter()
  const id = ((data.id || '') as string).split('-')
  return (
    <NextLink href={`/${locale === 'vi' ? 'danh-gia-san' : 'exchange-review'}/${data?.slug}`} passHref>
      {isMobile ? (
        <Stack
          sx={{
            p: 3,
            borderRadius: '8px',
            border: '1px solid #d0d0d0',
            cursor: 'pointer',
          }}
          direction="row"
        >
          <Stack sx={{ flex: '2', justifyContent: 'space-between' }}>
            <Stack spacing={1}>
              <Stack direction="row" sx={{ alignItems: 'center' }} spacing={1}>
                <ReviewId idSplitted={id} />
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  {data?.exchange?.logo && (
                    <Image loading="lazy" src={data?.exchange?.logo} alt="image of user" width={42} height={32} />
                  )}
                  <Typography variant="body2">{data?.exchange?.name}</Typography>
                </Stack>
              </Stack>
              <Typography variant="h3">{data?.title}</Typography>

              <Typography
                dangerouslySetInnerHTML={{
                  __html: data?.description,
                }}
                sx={{
                  width: '300px',
                  WebkitLineClamp: 2,
                  display: '-webkit-box',
                  overflow: 'hidden',
                  WebkitBoxOrient: 'vertical',
                }}
              />
            </Stack>
            <Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
              <Typography variant="body2" sx={{ color: 'subtitle.main' }}>
                {format(new Date(data.createdAt), 'dd/MM/yyyy')}
              </Typography>
              <Button
                variant="text"
                sx={{
                  backgroundColor: '#F4F8FF',
                  borderRadius: '12px',
                  padding: '4px 12px ',
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: 'primary.main',
                    fontWeight: '500',
                  }}
                >
                  {data?.category?.name}
                </Typography>
              </Button>
            </Stack>
          </Stack>
        </Stack>
      ) : (
        <Container maxWidth="lg">
          <Stack
            sx={{
              width: '100',
              p: 3,
              borderRadius: '8px',
              border: '1px solid #d0d0d0',
              cursor: 'pointer',
            }}
            direction="row"
          >
            <Stack sx={{ flex: '2', justifyContent: 'space-between', pr: 3 }}>
              <Stack spacing={1}>
                <Stack direction="row" sx={{ alignItems: 'center' }} spacing={1}>
                  <ReviewId idSplitted={id} />
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    {data?.exchange?.logo && (
                      <Image loading="lazy" src={data?.exchange?.logo} alt="image of user" width={42} height={32} />
                    )}
                    <Typography variant="body2">{data?.exchange?.name}</Typography>
                  </Stack>
                </Stack>
                <Typography variant="h3">{data?.title}</Typography>

                <Typography
                  dangerouslySetInnerHTML={{
                    __html: data?.description,
                  }}
                  sx={{
                    width: '100%',
                    WebkitLineClamp: 2,
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                  }}
                />
              </Stack>
              <Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
                <Typography variant="body2" sx={{ color: 'subtitle.main' }}>
                  {format(new Date(data.createdAt), 'dd/MM/yyyy')}
                </Typography>
                <Button
                  variant="text"
                  sx={{
                    backgroundColor: '#F4F8FF',
                    borderRadius: '12px',
                    padding: '4px 12px ',
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: 'primary.main',
                      fontWeight: '500',
                    }}
                  >
                    {data?.category?.name}
                  </Typography>
                </Button>
              </Stack>
            </Stack>
            <Stack sx={{ flex: '1', position: 'relative' }}>
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
          </Stack>
        </Container>
      )}
    </NextLink>
  )
}

export default ItemReviewSearch
