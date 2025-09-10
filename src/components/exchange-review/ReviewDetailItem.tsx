/* eslint-disable @next/next/no-img-element */
import { Button, Stack, Typography } from '@mui/material'
import NextLink from 'next/link'
import { format } from 'date-fns'
import ReviewId from './ReviewId'
import { useRouter } from 'next/router'

interface ReviewDetailItemProps {
  data: any
  owner?: boolean
  isMobile?: boolean
}

const ReviewDetailItem = ({ data, owner = true, isMobile }: ReviewDetailItemProps) => {
  const idSplitted = ((data.id || '') as string).split('-')
  const router = useRouter()
  return (
    <NextLink href={`/${router.locale === 'vi' ? 'danh-gia-san' : 'exchange-review'}/${data.slug}`} passHref>
      <Stack
        sx={{
          flex: '1',
          cursor: 'pointer',
        }}
        direction="row"
      >
        <Stack sx={{ justifyContent: 'space-between', pr: 3, width: '100%' }}>
          <Stack spacing={1}>
            <Stack direction="row" sx={{ alignItems: 'center' }} spacing={1}>
              {/* <Stack>
                <Image
                  src={data.user.avatar || defaultAvatar}
                  style={{ borderRadius: 32 }}
                  alt="image of user"
                  width={32}
                  height={32}
                />
              </Stack>
              <Stack direction="row" sx={{ justifyContent: 'space-between', flex: '1', alignItems: 'center' }}>
                <Stack sx={{ flex: '1' }}>
                  <Typography>{data.user.displayName}</Typography>
                  <Typography variant="body2" sx={{ color: 'subtitle.main' }}>
                    {data.user.email}
                  </Typography>
                </Stack>
                
              </Stack> */}
              <ReviewId idSplitted={idSplitted} />
              <Stack sx={{ flex: '1', alignItems: 'flex-end' }}>
                <Typography variant="body2" sx={{ color: 'subtitle.main' }}>
                  {format(new Date(data.createdAt), 'dd/MM/yyyy')}
                </Typography>
              </Stack>
            </Stack>
            <Stack height="100px">
              <Typography
                variant="h3"
                sx={{
                  pr: 5,
                  display: '-webkit-box',
                  overflow: 'hidden',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 1,
                }}
              >
                {data.title}
              </Typography>

              <Typography
                dangerouslySetInnerHTML={{
                  __html: data?.description,
                }}
                sx={{
                  display: '-webkit-box',
                  overflow: 'hidden',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2,
                  pr: 5,
                }}
              />
            </Stack>
          </Stack>
          <Stack direction="row" spacing={4} sx={{ alignItems: 'center', mt: 2 }}>
            {!owner && data?.exchange?.logo && (
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <img src={data.exchange?.logo} alt="image of user" width={42} height={32} />
                <Typography variant="body2">{data.exchange.name}</Typography>
              </Stack>
            )}
            <Button
              variant="text"
              fullWidth={isMobile}
              sx={{
                backgroundColor: '#F4F8FF',
                borderRadius: '12px',
                position: 'static',
                padding: isMobile ? '8px 0' : '4px 12px ',
                marginLeft: '4px !important',
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  color: 'primary.main',
                  fontWeight: '500',
                }}
              >
                {data?.category?.name === 'Lừa đảo' && (router.locale === 'vi' ? 'Lừa đảo' : 'Scam')}

                {data?.category?.name === 'Hộp thư đánh giá và góp ý từ nhà đầu tư' &&
                  (router.locale === 'vi'
                    ? 'Hộp thư đánh giá và góp ý từ nhà đầu tư'
                    : 'Investor feedback and comments mailbox')}

                {data?.category?.name === 'Đánh giá tổng quát' &&
                  (router.locale === 'vi' ? 'Đánh giá tổng quát' : 'General Review')}

                {data?.category?.name === 'Lý do khác' && (router.locale === 'vi' ? 'Lý do khác' : 'Other problems')}
              </Typography>
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </NextLink>
  )
}

export default ReviewDetailItem
