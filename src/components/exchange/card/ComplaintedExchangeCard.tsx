import { Exchange } from '@app/interfaces/exchange'
import NextLink from 'next/link'
import { Link, Typography } from '@mui/material'
import React from 'react'
import { Box, Stack } from '@mui/system'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { useMobile } from '@app/components/common'
import { useRouter } from 'next/router'
interface ComplaintedExchangeCardProps {
  exchange: Exchange
}
const ComplaintedExchangeCard = ({ exchange }: ComplaintedExchangeCardProps) => {
  const { t } = useTranslation(['home-page'])
  const isMobile = useMobile()
  const { locale } = useRouter()
  return (
    <Link component={NextLink} href={`/${locale === 'vi' ? 'tra-cuu-san' : 'broker'}/${exchange?.slug}`} passHref>
      <Box gap={'16px'} sx={{ flexDirection: isMobile ? 'row' : 'row', display: 'flex' }}>
        <Box sx={{ height: '164px', width: '100%', position: 'relative' }}>
          <Image
            src={
              exchange?.logo ||
              'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Screenshot_2018_12_16_at_21_06_29_f07726afef.png?updated_at=2022-11-30T08:25:12.500Z'
            }
            alt="logo"
            layout="fill"
            objectFit="contain"
            quality={75}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            loading="lazy"
          />
        </Box>
        <Stack sx={{ width: '100%' }} mt={2}>
          <Typography
            variant="subtitle2"
            sx={{
              fontSize: isMobile ? '24px' : '32px',
              fontWeight: '700',
              color: 'text.primary',
            }}
          >
            {exchange?.name}
          </Typography>
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: '400',
              color: 'text.primary',
            }}
          >
            {t(`complaint.left.des`)}
          </Typography>
          <Typography
            sx={{
              fontSize: '24px',
              fontWeight: '700',
              color: 'text.primary',
            }}
          >
            {exchange?.complaints?.length}
          </Typography>
        </Stack>
      </Box>
    </Link>
  )
}

export default ComplaintedExchangeCard
