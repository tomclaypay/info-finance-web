import { Complaint } from '@app/interfaces/complaint'
import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/avatars-initials-sprites'
import { Box, Stack, Typography } from '@mui/material'
import { format } from 'date-fns'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import NextLink from 'next/link'
import resolvedTag from '../../../../public/static/resolved-tag.png'
import { COMPLAINT_STATUS } from '@app/constants/complaint'
import ReviewId from '@app/components/exchange-review/ReviewId'
import { useRouter } from 'next/router'
interface ReviewDetailItemProps {
  data: Complaint
}
const ComplaintCard = ({ data }: ReviewDetailItemProps) => {
  const { locale } = useRouter()
  const defaultAvatar = createAvatar(style, {
    seed: data.user ? data.user?.displayName || data.user?.fullname : '',
    dataUri: true,
  })
  const id = ((data.id || '') as string).split('-')
  const { t } = useTranslation('exchange')
  return (
    <Stack direction="row">
      <Stack sx={{ justifyContent: 'space-between', pr: 3, width: '100%' }} spacing={2} direction="row">
        <Stack spacing={1}>
          <Stack direction="row" sx={{ alignItems: 'center' }} spacing={1}>
            <Stack>
              <Image
                src={data.user.avatar || defaultAvatar}
                style={{ borderRadius: 32 }}
                alt="image of user"
                width={32}
                height={32}
                loading="lazy"
              />
            </Stack>
            <Stack direction="row" sx={{ justifyContent: 'space-between', flex: '1', alignItems: 'center' }}>
              <Stack sx={{ flex: '1' }}>
                {/*<Typography>{data?.id}</Typography>*/}
                <ReviewId idSplitted={id} enabledIcon={false} />
                <Typography variant="body2" sx={{ color: 'subtitle.main' }}>
                  {format(new Date(data.createdAt), 'dd/MM/yyyy')}
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          <Stack>
            <Typography variant="h3">{data.title}</Typography>
            {data?.description && (
              <Typography
                dangerouslySetInnerHTML={{
                  __html: data.description,
                }}
                sx={{
                  textAlign: 'justify',
                  display: '-webkit-box',
                  overflow: 'hidden',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 3,
                }}
              />
            )}

            <NextLink href={`/${locale === 'vi' ? 'danh-gia-san' : 'exchange-review'}/${data.slug}`} passHref>
              <Typography
                variant="body2"
                sx={{
                  color: 'primary.main',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                {t('complaint.detail')}
              </Typography>
            </NextLink>
          </Stack>
        </Stack>

        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            paddingTop: 1,
            paddingRight: 1,
            minWidth: 220,
            height: 220,
          }}
        >
          <Image src={data?.images?.[0] ?? ''} alt="Hình ảnh" layout="fill" objectFit="cover" loading="lazy" />
          {data?.status === COMPLAINT_STATUS.RESOLVED && <Image src={resolvedTag} alt="" width={100} height={60} />}
        </Box>
      </Stack>
    </Stack>
  )
}

export default ComplaintCard
